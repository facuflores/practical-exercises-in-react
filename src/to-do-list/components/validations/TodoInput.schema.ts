import moment from 'moment';
import * as Yup from 'yup';

export const TodoInputSchema = Yup.object({
    nameOrDescription: Yup
        .string()
        .max(50, "Nombre o descripción tiene como maximo 50 caracteres")
        .required("Nombre o descripción es requerido"),
    dateOfRealization: Yup
        .date()
        .required("Fecha es requerido")
        .test("isAfterOrEqualsDateToNow", "Fecha no puede ser menor a la actual", (value: Date) => {
            const dateNow = moment().toDate();
            return value.getFullYear() >= dateNow.getFullYear()
                && value.getMonth() >= dateNow.getMonth()
                && value.getDate() >= dateNow.getDate();
        }),
    specificType: Yup
        .string()
        .not(["none"], "Tipo es requerido")
        .required("Tipo es requerido")
});