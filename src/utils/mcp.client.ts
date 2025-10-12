import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export interface MCPClientConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export class MCPClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  async connect(config: MCPClientConfig): Promise<void> {
    try {
      this.transport = new StdioClientTransport({
        command: config.command,
        args: config.args || [],
        env: config.env,
      });

      this.client = new Client(
        {
          name: "instagram-caption-generator",
          version: "1.0.0",
        },
        {
          capabilities: {},
        }
      );

      await this.client.connect(this.transport);
      console.log("MCP Client connected successfully");
    } catch (error) {
      console.error("Failed to connect MCP client:", error);
      throw error;
    }
  }

  async callTool(toolName: string, args: Record<string, unknown>): Promise<any> {
    if (!this.client) {
      throw new Error("MCP Client not connected");
    }

    try {
      const result = await this.client.callTool({
        name: toolName,
        arguments: args,
      });
      return result;
    } catch (error) {
      console.error(`Error calling tool ${toolName}:`, error);
      throw error;
    }
  }

  async listTools(): Promise<any> {
    if (!this.client) {
      throw new Error("MCP Client not connected");
    }

    try {
      const tools = await this.client.listTools();
      return tools;
    } catch (error) {
      console.error("Error listing tools:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.transport = null;
      console.log("MCP Client disconnected");
    }
  }
}

export const mcpClient = new MCPClient();