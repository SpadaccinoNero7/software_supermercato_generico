import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type CheckBoxProps from "./interfaces";

export default function CheckBox({
  label,
  checked,
  onChange,
  labelPlacement,
  color,
}: CheckBoxProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox color={color || "default"} />}
        label={label}
        checked={checked}
        onChange={onChange}
        labelPlacement={labelPlacement || "start"}
      />
    </FormGroup>
  );
}
