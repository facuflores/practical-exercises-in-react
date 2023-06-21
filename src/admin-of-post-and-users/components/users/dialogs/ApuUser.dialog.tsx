import { ApuUserDialogProps, ApuUserFormType, ApuUserFormTypeDefault } from "../../../data/ApuData.type";
import { ApuUserSchema } from "../validations/ApuUser.schema";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

const ApuUserDialog = ({dialogProps}: {dialogProps: ApuUserDialogProps}) => {
  const {isOpen, isCreate, data, onConfirm, onClose} = dialogProps;
  const [open, setOpen] = useState<boolean>(isOpen);
  const [userDataForm, setUserDataForm] = useState<ApuUserFormType>(data || ApuUserFormTypeDefault);

  useEffect(() => initializateWhenIsOpenChange(), [isOpen]);
 
  const formik = useFormik<ApuUserFormType>({
    enableReinitialize: true,
    initialValues: {...userDataForm},
    validationSchema: ApuUserSchema,
    onSubmit: (values: ApuUserFormType, {resetForm}) => {
      onConfirm(values); 
      resetForm();
    }
  });

  const initializateWhenIsOpenChange = () => {
    if (!isCreate && data !== undefined) setUserDataForm(data);
    else setUserDataForm(ApuUserFormTypeDefault);
    setOpen(isOpen);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Usuario</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} 
                  display={isCreate ? "none": "block"}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      disabled 
                      id="userId"
                      name="userId"
                      type="text"
                      label="ID de Usuario"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      id="userName"
                      name="userName"
                      type="text"
                      label="Nombre de Usuario"
                      value={formik.values.name}
                      onChange={(e) => formik.setFieldValue("name", e.target.value, true)}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </FormControl>    
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      id="userUsername"
                      name="userUsername"
                      type="text"
                      label="Alias de Usuario"
                      value={formik.values.username}
                      onChange={(e) => formik.setFieldValue("username", e.target.value, true)}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      id="userEmail"
                      name="userEmail"
                      type="text"
                      label="Email de Usuario"
                      value={formik.values.email}
                      onChange={(e) => formik.setFieldValue("email", e.target.value, true)}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      id="userPhone"
                      name="userPhone"
                      type="text"
                      label="Télefono de Usuario"
                      value={formik.values.phone}
                      onChange={(e) => formik.setFieldValue("phone", e.target.value, true)}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      id="companyName"
                      name="companyName"
                      type="text"
                      label="Nombre de la Empresa"
                      value={formik.values.companyName}
                      onChange={(e) => formik.setFieldValue("companyName", e.target.value, true)}
                      error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                      helperText={formik.touched.companyName && formik.errors.companyName}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" type="submit">Guardar Cambios</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ApuUserDialog;