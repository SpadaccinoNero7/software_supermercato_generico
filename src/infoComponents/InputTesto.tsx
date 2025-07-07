import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type InputTestoProps from "./interfaces";

export default function InputTesto({
  value,
  label,
  variant,
  color,
  autoFocus,
  onChange,
}: InputTestoProps) {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant={variant || "standard"}
        value={value}
        color={color || "primary"}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </Box>
  );
}
