import { Info, Warning } from "@mui/icons-material";
import { Alert, Box, LinearProgress, Typography } from "@mui/material";

interface RateLimitDisplayProps {
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
  } | null;
  queueStatus: {
    position: number;
    activeJobs: number;
  } | null;
}

export default function RateLimitDisplay({
  rateLimit,
  queueStatus,
}: RateLimitDisplayProps) {
  if (!rateLimit) return null;

  const percentage = (rateLimit.remaining / rateLimit.limit) * 100;
  const resetDate = new Date(rateLimit.reset * 1000);

  const getSeverity = () => {
    if (percentage > 50) return "info";
    if (percentage > 20) return "warning";
    return "error";
  };

  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity={getSeverity()}
        icon={percentage > 20 ? <Info /> : <Warning />}
        sx={{ mb: 1 }}
      >
        <Typography variant="body2" fontWeight={600}>
          Usage: {rateLimit.remaining} of {rateLimit.limit} requests remaining
        </Typography>

         <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          Resets at {resetDate.toLocaleTimeString()}
        </Typography>
      </Alert>

      <LinearProgress
        variant="determinate"
        value={percentage}
        color={getSeverity() === "error" ? "error" : "primary"}
        sx={{ height: 8, borderRadius: 1 }}
      />

       {queueStatus && queueStatus.position > 0 && (
        <Alert severity="info" sx={{ mt: 2 }} icon={<Info />}>
          <Typography variant="body2">
            Your request is in queue. Position: {queueStatus.position}
          </Typography>
          <Typography variant="caption">
            Active Requests: {queueStatus.activeJobs}
          </Typography>
        </Alert>
      )}
    </Box>
  );
}
