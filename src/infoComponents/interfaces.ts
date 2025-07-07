export default interface Utenti {
    name: string;
    age: number;
    is_admin: boolean;
    codice_utente: number;
    password_utente: string;
}

export default interface Categorie {
    name: string;
}

export default interface SnackbarProps {
    open: boolean;
    duration: number;
    close: () => void;
    severity: "success" | "error" | "warning" | "info";
    text: string;
}