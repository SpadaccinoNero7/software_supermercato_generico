import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type CheckBoxProps from "./interfaces";
import "../listaUtenti/utenti.css";

export default function CheckBox({
  label,
  checked,
  onChange,
  labelPlacement,
  color,
}: CheckBoxProps) {
  return (
    <div className="checkbox-container">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              color={color || "default"}
              className="checkbox-container"
            />
          }
          label={label}
          checked={checked}
          onChange={onChange}
          labelPlacement={labelPlacement || "start"}
        />
      </FormGroup>
    </div>
  );
}
