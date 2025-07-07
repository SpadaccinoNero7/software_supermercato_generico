import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUtentiAsync } from "../slice/utentiSlice";
import SnackBar from "../infoComponents/SnackBarComponent";
import { Link } from "react-router-dom";
import InputTesto from "../infoComponents/InputTesto";
import CheckBox from "../infoComponents/CheckBox";

export default function AggiungiUtente() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [snackText, setSnackText] = useState<string>("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (name && age !== undefined) {
      const newUser = {
        name: name,
        age: age,
        is_admin: isAdmin,
      };
      dispatch(addUtentiAsync(newUser));
      setName("");
      setAge(18);
      setIsAdmin(false);
      setSnackText("Utente aggiunto con successo!");
      setSnackSeverity("success");
      setOpen(true);
    } else {
      setSnackText("Tutti i campi sono obbligatori.");
      setSnackSeverity("warning");
      setOpen(true);
      setName("");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div>
      <h1>Aggiungi un utente</h1>
      <InputTesto
        value={name}
        label="Inserisci il nome"
        color="error"
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <InputTesto
        value={age}
        label="Inserisci l'età"
        color="warning"
        onChange={(e) => {
          const soloNumeriDueCifre = e.target.value
            .replace(/[^0-9]/g, "")
            .slice(0, 2);
          setAge(soloNumeriDueCifre);
        }}
      />
      <br />
      <CheckBox
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
        label="L'utente è un admin?"
        labelPlacement="top"
        color="secondary"
      />
      <br />
      <button type="submit" onClick={handleAdd}>
        Aggiungi
      </button>
      <br />
      <Link to="/utenti">
        <button>Visualizza utenti</button>
      </Link>
      <SnackBar
        open={open}
        duration={5000}
        close={handleClose}
        severity={snackSeverity}
        text={snackText}
      />
    </div>
  );
}
