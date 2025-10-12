"use client";
import { CustomDialogBoxProps } from "@/utils/interfaces";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CheckCircleOutline, CopyAllOutlined } from "@mui/icons-material";
import { useState } from "react";

const CustomDialogBox = ({
  open,
  onClose,
  caption = "",
  loading = false,
}: CustomDialogBoxProps) => {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setSnackbarOpen(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"md"}
      fullWidth
      PaperProps={{
        sx: {
          padding: 2,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, borderBottom: "1px solid grey" }}
        id="customized-dialog-title"
      >
        <Typography fontWeight={600} fontSize={20}>
          AI Generated Caption
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 3, minHeight: 200 }}>
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight={200}
          >
            <CircularProgress size={50} />
            <Typography mt={2} color="text.secondary">
              Generating your perfect caption...
            </Typography>
          </Box>
        ) : caption ? (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "text.primary",
              }}
            >
              {caption}
            </Typography>

            <IconButton
              onClick={handleCopy}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: copied ? "success.main" : "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: copied ? "success.dark" : "primary.dark",
                },
                transition: "all 0.3s",
              }}
              size="small"
            >
              {copied ? (
                <CheckCircleOutline fontSize="small" />
              ) : (
                <CopyAllOutlined fontSize="small" />
              )}
            </IconButton>
          </Paper>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={200}
          >
            <Typography color="text.secondary">
              No caption generated yet
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          borderTop: "1px solid #e0e0e0",
          pt: 2,
        }}
      >
        <Button
          onClick={handleCopy}
          variant="contained"
          startIcon={copied ? <CheckCircleOutline /> : <CopyAllOutlined />}
          disabled={!caption || loading}
          color={copied ? "success" : "primary"}
          sx={{ mr: 1 }}
        >
          {copied ? "Copied!" : "Copy Caption"}
        </Button>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Caption copied to clipboard!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};
export default CustomDialogBox;
