export default interface Utenti {
    name: string;
    age: number;
    is_admin: boolean;
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

export default interface InputTestoProps {
    value: string;
    variant?: "outlined" | "filled" | "standard";
    label: string
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    autoFocus?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default interface CheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => boolean;
    labelPlacement?: "end" | "start" | "top" | "bottom";
    color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}