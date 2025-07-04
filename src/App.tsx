import "./App.css";
import { useForm, type Resolver } from "react-hook-form";
import { useState } from "react";

export const MAX_LENGTH = 4;

type FormValues = {
  codiciOperatore: string;
  passwordOperatore: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values:
      values.codiciOperatore.length === MAX_LENGTH && values.passwordOperatore
        ? values
        : {},
    errors:
      values.codiciOperatore.length !== MAX_LENGTH
        ? {
            codiciOperatore: {
              type: "required",
              message: `Inserisci le ${MAX_LENGTH} cifre del tuo codice operatore!`,
            },
            passwordOperatore: !values.passwordOperatore
              ? {
                  type: "required",
                  message: "Campo obbligatorio!",
                }
              : undefined,
          }
        : !values.passwordOperatore
        ? {
            passwordOperatore: {
              type: "required",
              message: "Campo obbligatorio!",
            },
          }
        : {},
  };
};

export default function App() {
  const [codice, setCodice] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      codiciOperatore: "",
      passwordOperatore: "",
    },
  });

  const handleChangeCodiceOperatore = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value.replace(/\D/g, ""); // rimuove tutto tranne cifre
    if (val.length <= MAX_LENGTH) {
      setCodice(val);
      setValue("codiciOperatore", val);
    }
  };
  const handleChangePasswordOperatore = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value.replace(/\D/g, ""); // rimuove tutto tranne cifre
    if (val.length <= MAX_LENGTH) {
      setPassword(val);
      setValue("codiciOperatore", val);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Dati inviati:", data);
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={MAX_LENGTH}
        value={codice}
        onChange={handleChangeCodiceOperatore}
        placeholder={`Inserisci ${MAX_LENGTH} cifre`}
      />
      {errors?.codiciOperatore && <p>{errors.codiciOperatore.message}</p>}

      <input
        {...register("passwordOperatore")}
        type="password"
        placeholder="Password operatore"
        maxLength={MAX_LENGTH}
        value={password}
        onChange={handleChangePasswordOperatore}
      />
      {errors?.passwordOperatore && <p>{errors.passwordOperatore.message}</p>}

      <input type="submit" value="Invia" />
    </form>
  );
}
