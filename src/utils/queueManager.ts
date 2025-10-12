interface QueueJob<T> {
  id: string;
  data: T;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  timestamp: number;
}

export class QueueManager<T>{
  private queue: QueueJob<T>[] = [];
  private processing = false;
  private concurrentLimit: number;
  private activeJobs = 0;
  private processor: (data: T) => Promise<any>;
  private maxQueueSize: number;
  private jobTimeout: number;

  constructor(config:{
    concurrentLimit?: number;
    maxQueueSize?: number;
    jobTimeout?: number;
    processor:(data:T)=>Promise<any>;
  }){
    this.concurrentLimit = config.concurrentLimit || 3;
    this.maxQueueSize = config.maxQueueSize || 100;
    this.jobTimeout = config.jobTimeout || 30000; 
    this.processor = config.processor;
  }

  async add(id:string,data:T):Promise<any>{
    if(this.queue.length>= this.maxQueueSize){
        throw new Error("Queue is full. Please Try again later")
    }

    return new Promise((resolve,reject)=>{
        const job:QueueJob<T>={
            id,
            data,
            resolve,
            reject,
            timestamp:Date.now(),
        };
        this.queue.push(job);
        this.processQueue();
    });
  }


  private async processQueue():Promise<void>{
    if(this.processing) return;
    this.processing = true;
    while(this.queue.length>0 && this.activeJobs< this.concurrentLimit){
        const job = this.queue.shift();
        if(!job) break;

        if (Date.now() - job.timestamp > this.jobTimeout) {
        job.reject(new Error("Request timeout"));
        continue;
      }
       this.activeJobs++;
      this.processJob(job);

    }
     this.processing = false;
  }

   private async processJob(job: QueueJob<T>): Promise<void> {
    try {
      const result = await Promise.race([
        this.processor(job.data),
        this.createTimeout(this.jobTimeout),
      ]);
      job.resolve(result);
    } catch (error) {
      job.reject(error);
    } finally {
      this.activeJobs--;
      this.processQueue();
    }
  }

  private createTimeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Operation timeout")), ms);
    });
  }

  getQueueStatus():{
    queueLength:number;
    activeJobs:number;
    availableSlots:number;
  }{
     return {
      queueLength: this.queue.length,
      activeJobs: this.activeJobs,
      availableSlots: this.concurrentLimit - this.activeJobs,
    };
  }
}