import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategorieAsync } from "../slice/categorieSlice";
import { Link } from "react-router-dom";
import SnackBar from "../infoComponents/SnackBarComponent";
import type { RootState } from "../store"; // usa il path giusto per lo store

export default function AggiungiCategoria() {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [snackText, setSnackText] = useState<string>("");

  const error = useSelector((state: RootState) => state.categorie.error);
  const dispatch = useDispatch();

  const capitalizeWords = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleAdd = () => {
    if (name.trim() !== "") {
      const capitalizedName = capitalizeWords(name.trim());

      const newCategory = {
        name: capitalizedName,
      };

      dispatch(addCategorieAsync(newCategory))
        .unwrap()
        .then(() => {
          setSnackText("Categoria aggiunta con successo!");
          setSnackSeverity("success");
          setOpen(true);
          setName("");
        })
        .catch((err: string) => {
          setSnackText(err || "Errore durante l'aggiunta.");
          setSnackSeverity("error");
          setOpen(true);
          setName("");
        });
    } else {
      setSnackText("Il nome della categoria non può essere vuoto.");
      setSnackSeverity("warning");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div>
      <h1>Aggiungi una categoria</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Categoria"
      />
      <button type="submit" onClick={handleAdd}>
        Aggiungi
      </button>
      <div>
        <Link to="/categorie">
          <button>Visualizza categorie</button>
        </Link>
      </div>

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
