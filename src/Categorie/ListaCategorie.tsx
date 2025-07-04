import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UtenteCard from "../Cards/UtenteCard";
import { getCategorieAsync } from "../slice/categorieSlice";

export default function ListaCategorie() {
  const { data, loading, error } = useSelector((state) => state.categorie);
  // Ensure data is always an array
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorieAsync());
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      {loading && <p>Caricamento in corso...</p>}
      {/*{utenti.length > 0 ? (
        utenti.map((utente: Utente) => (
          <div key={utente.id}>
            <h2>{utente.name}</h2>
            <p>Età: {utente.age}</p>
            <p>Admin? {utente.is_admin ? "Si" : "No"}</p>
            <p>Codice: {utente.codice_utente}</p>
          </div>
        ))
      ) : (
        <p>Nessun utente trovato.</p>
      )}*/}
      {error && <p>Errore: {error}</p>}
      <UtenteCard type="Categorie" data={data} />
    </div>
  );
}
