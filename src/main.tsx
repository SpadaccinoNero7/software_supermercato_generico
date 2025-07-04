import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaUtenti from "./listaUtenti/ListaUtenti.tsx";
import AggiungiUtente from "./listaUtenti/AggiungiUtente.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import AggiungiCategoria from "./Categorie/AggiungiCategoria.tsx";
import ListaCategorie from "./Categorie/ListaCategorie.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/utenti" element={<ListaUtenti />} />
          <Route path="/categorie" element={<ListaCategorie />} />
          <Route path="/aggiungiUtente" element={<AggiungiUtente />} />
          <Route path="/aggiungiCategoria" element={<AggiungiCategoria />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
