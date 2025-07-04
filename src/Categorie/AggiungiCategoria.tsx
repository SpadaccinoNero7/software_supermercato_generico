import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategorieAsync } from "../slice/categorieSlice";
import { Link } from "react-router-dom";

export default function AggiungiCategoria() {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (name && name.trim() !== "") {
      const newCategory = {
        name: name,
      };
      dispatch(addCategorieAsync(newCategory));
      setName("");
    } else {
      alert("Per favore, compila tutti i campi.");
    }
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
    </div>
  );
}
