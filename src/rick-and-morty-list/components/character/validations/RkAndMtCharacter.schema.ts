import * as Yup from 'yup';

export const RkAndMtCharacterSchema = Yup.object({
  name: Yup
    .string()
    .max(50, "Nombre solo puede tener 50 caracteres maximo")
    .required("Nombre es requerido"),
  species: Yup
    .string()
    .max(20, "Especie solo puede tener 20 caracteres maximo")
    .required("Especie es requerido"),
  status: Yup
    .string()
    .not(["none"], "Status es requerido")
    .required("Status es requerido"),
  gender: Yup
    .string()
    .not(["none"], "Género es requerido")
    .required("Género es requerido")
});