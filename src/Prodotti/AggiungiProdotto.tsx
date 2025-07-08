import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorieAsync } from "../slice/categorieSlice";
import SelectNames from "../infoComponents/SelectNames";
import { addProdottiAsync } from "../slice/prodottiSlice";
import SnackBar from "../infoComponents/SnackBarComponent";
import { Link } from "react-router-dom";

export default function AggiungiProdotto() {
  const [value, setValue] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [open, setOpen] = useState<boolean>(false);
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [snackText, setSnackText] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategorieAsync());
  }, [dispatch]);

  const categorie = useSelector(
    (state) => state.categorie.data as { name: string }[]
  );
  const name = categorie.map((el) => el.name);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleAddProdotto = () => {
    if (!value || !product || price <= 0 || !date) {
      setSnackText("Tutti i campi sono obbligatori.");
      setSnackSeverity("warning");
      setOpen(true);
      return;
    } else {
      const newProdotto = {
        name: product,
        expiration_date: date,
        category_id: value,
        price: price,
        stock: 45,
        is_available: true,
      };
      dispatch(addProdottiAsync(newProdotto));
      setOpen(true);
      setSnackSeverity("success");
      setSnackText("Prodotto aggiunto con successo!");
      setDate(new Date().toISOString().split("T")[0]);
      setProduct("");
      setPrice(0);
    }
  };

  return (
    <>
      {categorie.length === 0 ? (
        <div>
          <h1>Nessuna categoria disponibile</h1>
        </div>
      ) : (
        <div>
          <SelectNames
            options={name}
            value={value}
            label={"Scegli la categoria"}
            onChange={(e) => setValue(e.target.value as string)}
          />
        </div>
      )}
      <div>
        <h1>Categoria selezionata:</h1>
        {value}
        <input
          type="text"
          value={product}
          placeholder="Inserisci il nome del prodotto"
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="Inserisci il prezzo del prodotto"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddProdotto}>Aggiungi</button>
        <Link to="/prodotti">
          <button>Vai alla lista dei prodotti</button>
        </Link>
        <SnackBar
          open={open}
          duration={5000}
          close={handleClose}
          severity={snackSeverity}
          text={snackText}
        />
      </div>
    </>
  );
}
