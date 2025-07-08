import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProdottiAsync } from "../slice/prodottiSlice";
import GlobalCard from "../Cards/GloabalCard";
import { getCategorieAsync } from "../slice/categorieSlice";

export default function ListaProdotti() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProdottiAsync());
    dispatch(getCategorieAsync());
  }, [dispatch]);

  const prodotti = useSelector((state) => state.prodotti.data);
  const categorie = useSelector((state) => state.categorie.data);

  // Example: filter categories for the first product's category_id, if prodotti is an array and not empty
  const x =
    Array.isArray(prodotti) && prodotti.length > 0
      ? categorie.filter((el) => el.id === prodotti[0].category_id)
      : [];
  console.log(x);

  console.log(prodotti);
  return (
    <div>
      <h1>Lista prodotti</h1>
      <GlobalCard data={prodotti} type="Prodotti" />
    </div>
  );
}
