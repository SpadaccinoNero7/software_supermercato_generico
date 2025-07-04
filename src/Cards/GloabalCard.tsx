import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type Utenti from "../infoComponents/interfaces";
import type Categorie from "../infoComponents/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteCategorieAsync } from "../slice/categorieSlice";
import { Link } from "react-router-dom";
interface UtenteCardProps {
  type: string;
  data: Utenti[];
}

export default function GlobalCard({ type, data }: UtenteCardProps) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteCategorieAsync(id));
  };
  return (
    <>
      {type === "Utenti" && (
        <Box>
          {data && data.length > 0 ? (
            data.map((utente: Utenti) => (
              <Card key={utente.id} sx={{ minWidth: 275, mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {utente.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Età: {utente.age}
                  </Typography>
                  <Typography variant="body2">
                    Admin: {utente.is_admin ? "Si" : "No"}
                  </Typography>
                  <Typography variant="body2">
                    Codice Utente: {utente.codice_utente}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nessun utente trovato.
            </Typography>
          )}
        </Box>
      )}
      {type === "Categorie" && (
        <Box>
          {data && data.length > 0 ? (
            data.map((el: Categorie) => (
              <Card key={el.id} sx={{ width: "fit-content", mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {el.name}
                  </Typography>

                  <DeleteIcon
                    sx={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(el.id)}
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="white">
              Nessuna categoria trovata
              <br />
              Aggiungine una cliccando {""}
              <Link to="/aggiungiCategoria">
                <span style={{ color: "white", textDecoration: "underline" }}>
                  qui
                </span>
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}
