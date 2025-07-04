import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type Utenti from "../infoComponents/interfaces";
import type Categprie from "../infoComponents/interfaces";

interface UtenteCardProps {
  type: string;
  data: Utenti[];
}

export default function UtenteCard({ type, data }: UtenteCardProps) {
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
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nessuna categoria trovata.
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}
