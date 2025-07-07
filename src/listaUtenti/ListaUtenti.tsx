import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUtentiAsync } from "../slice/utentiSlice";
import GlobalCard from "../Cards/GloabalCard";

export default function ListaUtenti() {
  const { data, loading, error } = useSelector((state) => state.utenti);
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(getUtentiAsync());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Caricamento in corso...</p>}
      {error && <p>Errore: {error}</p>}
      <GlobalCard type="Utenti" data={data} />
    </div>
  );
}
