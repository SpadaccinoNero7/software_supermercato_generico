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
import ListaProdotti from "./Prodotti/ListaProdotti.tsx";
import AggiungiProdotto from "./Prodotti/AggiungiProdotto.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/utenti" element={<ListaUtenti />} />
          <Route path="/prodotti" element={<ListaProdotti />} />
          <Route path="/categorie" element={<ListaCategorie />} />
          <Route path="/aggiungiUtente" element={<AggiungiUtente />} />
          <Route path="/aggiungiCategoria" element={<AggiungiCategoria />} />
          <Route path="/aggiungiCategoria" element={<AggiungiCategoria />} />
          <Route path="/aggiungiProdotto" element={<AggiungiProdotto />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
