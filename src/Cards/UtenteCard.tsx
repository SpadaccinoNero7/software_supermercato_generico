import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type Utenti from "../infoComponents/interfaces";

export default function UtenteCard(data: []) {
  return (
    <Box>
      {data.data && data.data.length > 0 ? (
        data.data.map((utente: Utenti) => (
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
  );
}
