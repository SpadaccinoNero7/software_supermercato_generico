import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorieAsync } from "../slice/categorieSlice";
import SelectNames from "../infoComponents/SelectNames";
import type { RootState } from "../store/store";

export default function AggiungiProdotto() {
  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategorieAsync());
  }, [dispatch]);

  const categorie = useSelector(
    (state: RootState) => state.categorie.data as { name: string }[]
  );
  const name = categorie.map((el) => el.name);
  console.log(value);

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
    </>
  );
}
