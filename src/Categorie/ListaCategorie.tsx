import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorieAsync } from "../slice/categorieSlice";
import GlobalCard from "../Cards/GloabalCard";

export default function ListaCategorie() {
  const { data, loading, error } = useSelector((state) => state.categorie);
  // Ensure data is always an array
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorieAsync());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Caricamento in corso...</p>}
      {error && <p>Errore: {error}</p>}
      <GlobalCard type="Categorie" data={data} />
    </div>
  );
}
