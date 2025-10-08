import { CustomDialogBoxProps } from "@/utils/interfaces";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CopyAllOutlined } from "@mui/icons-material";

const CustomDialogBox = ({
  open,
  onClose,
  shortCaption,
  longCaption,
}: CustomDialogBoxProps) => {
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
      <DialogTitle sx={{ m: 0, p: 2,borderBottom:'1px solid grey' }} id="customized-dialog-title">
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
      <DialogContent dividers sx={{borderBottom:'1px solid grey'}}>
        <Typography fontSize={16} fontWeight={500} color="textSecondary">
          this is generated caption for your instagram growth make sure to copy
          it to clipboard and paste it on your caption
        </Typography>
      </DialogContent>
      <DialogActions sx={{pt:3}}>
        <Button autoFocus variant="contained" color="error" onClick={handleClose} sx={{fontWeight:600}}>
         Close
        </Button>
        <Button autoFocus variant="contained" color="success" sx={{fontWeight:600}}>
          Copy to Clipboard <CopyAllOutlined sx={{ml:1}}/>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomDialogBox;
