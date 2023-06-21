import * as Yup from "yup";

export const ApuPostSchema = Yup.object({
  title: Yup
    .string()
    .max(80, "Titulo solo puede tener hasta 80 caracteres máximo")
    .required("Titulo es requerido"),
  body: Yup
    .string()
    .max(255, "Descripción solo puede tener hasta 255 caracteres máximo")
    .required("Descripción es requerido"),
  userId: Yup
    .string()
    .not(["-1"], "Usuario es requerido")
    .required("Usuario es requerido")
});