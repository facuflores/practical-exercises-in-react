import * as Yup from "yup";

export const ApuUserSchema = Yup.object({
  name: Yup
    .string()
    .max(30, "Nombre solo puede tener hasta 30 caracteres máximo")
    .required("Nombre es requerido"),
  username: Yup
    .string()
    .max(10, "Alias solo puede tener hasta 10 caracteres máximo")
    .required("Alias es requerido"),
  email: Yup
    .string()
    .max(30, "Email solo puede tener hasta 30 caracteres máximo")
    .email("Email invalido")
    .required("Email es requerido"),
  phone: Yup
    .string()
    .max(30, "Télefono solo puede tener hasta 30 digitos máximo")
    .required("Télefono es requerido"),
  companyName: Yup
    .string()
    .max(30, "Empresa solo puede tener hasta 30 caracteres máximo")
    .required("Empresa es requerido")
});