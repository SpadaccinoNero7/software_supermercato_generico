import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFetch } from "../customHooks/useFetch";
import { addUtentiAsync } from "../slice/utentiSlice";

export default function AggiungiUtente() {
  const { data, loading, error } = useFetch("/api/utenti");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [codiceUtente, setCodiceUtente] = useState<string>("0000");
  const [passwordUtente, setPasswordUtente] = useState<string>("0000");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (name && age && codiceUtente && passwordUtente !== undefined) {
      const newUser = {
        name: name,
        age: age,
        is_admin: isAdmin,
        codice_utente: codiceUtente,
        password_utente: passwordUtente,
      };
      dispatch(addUtentiAsync(newUser));
      setName("");
      setAge(0);
      setIsAdmin(false);
      setCodiceUtente("0000");
      setPasswordUtente("0000");
    } else {
      alert("Per favore, compila tutti i campi.");
    }
  };

  return (
    <div>
      <h1>Aggiungi un utente</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <br />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Età"
      />
      <br />
      <input
        type="checkbox"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
      <br />
      <input
        type="text"
        value={codiceUtente}
        onChange={(e) => setCodiceUtente(e.target.value)}
        placeholder="Codice Utente"
      />
      <br />
      <input
        type="text"
        value={passwordUtente}
        onChange={(e) => setPasswordUtente(e.target.value)}
        placeholder="Codice Utente"
      />
      <br />
      <button type="submit" onClick={handleAdd}>
        Aggiungi
      </button>
    </div>
  );
}
