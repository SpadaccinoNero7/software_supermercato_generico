import { useEffect } from "react";
import { useFetch } from "../customHooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getUtentiAsync } from "../slice/utentiSlice";

type Utente = {
  id: number;
  name: string;
  age: number;
  isAdmin: boolean;
  codice: number;
};

export default function ListaUtenti() {
  const { data, loading, error } = useSelector((state) => state.utenti);
  // Ensure data is always an array
  const utenti: Utente[] = Array.isArray(data) ? data : [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUtentiAsync());
  }, [dispatch]);
  return (
    <div>
      {loading && <p>Caricamento in corso...</p>}
      {utenti.length > 0 ? (
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
      )}
      {error && <p>Errore: {error}</p>}
    </div>
  );
}
