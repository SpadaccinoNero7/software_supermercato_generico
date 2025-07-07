import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type SnackbarProps from "./interfaces";

export default function SnackBar({
  open,
  duration,
  close,
  severity,
  text,
}: SnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={close}>
      <Alert
        onClose={close}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
