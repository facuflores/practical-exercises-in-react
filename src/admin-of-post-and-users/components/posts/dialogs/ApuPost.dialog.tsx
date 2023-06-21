import { ApuPostDefaultValue, ApuPostDialogProps, ApuPostType } from "../../../data/ApuPost.type";
import { ApuPostSchema } from "../validations/ApuPost.schema";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { RootState } from "../../../../shared/redux/App.store";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import TextField from "@mui/material/TextField";

const ApuPostDialog = ({dialogProps}: {dialogProps: ApuPostDialogProps}) => {
  const {isOpen, isCreate, data, onConfirm, onClose} = dialogProps;
  const [open, setOpen] = useState<boolean>(isOpen);
  const [postInputsForm, setPostInputsForm] = useState<ApuPostType>(ApuPostDefaultValue);
  const usersListFromStore = useSelector(({apuUser}: RootState) => apuUser.usersList);

  useEffect(() => {
    if (isCreate) setPostInputsForm(ApuPostDefaultValue);
    if (!isCreate && data !== undefined) setPostInputsForm(data);
    setOpen(isOpen); 
  }, [isOpen]);

  const formik = useFormik<ApuPostType>({
    enableReinitialize: true,
    validationSchema: ApuPostSchema,
    initialValues: {...postInputsForm},
    onSubmit: (values: ApuPostType, {resetForm}) => {
      onConfirm(values);
      resetForm();
    }
  });

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Formulario de Posts</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}
                  display={isCreate ? "none" : "block"}
                >
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      disabled
                      id="postId"
                      name="postId"
                      type="text"
                      label="ID de Post"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      id="postTitle"
                      name="postTitle"
                      type="text"
                      label="Titulo de Post"
                      value={formik.values.title}
                      onChange={(e) => formik.setFieldValue("title", e.target.value, true)}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <TextField 
                      multiline
                      rows={4}
                      id="postBody"
                      name="postBody"
                      label="Descripción de Post"
                      value={formik.values.body}
                      onChange={(e) => formik.setFieldValue("body", e.target.value, true)}
                      error={formik.touched.body && Boolean(formik.errors.body)}
                      helperText={formik.touched.body && formik.errors.body}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      select 
                      id="postUserId"
                      name="postUserId"
                      label="Usuario del Post"
                      value={formik.values.userId}
                      onChange={(e) => formik.setFieldValue("userId", e.target.value, true)}
                      error={formik.touched.userId && Boolean(formik.errors.userId)}
                      helperText={formik.touched.userId && formik.errors.userId}
                    >
                      <MenuItem key="-1" value="-1">
                        -- Seleccione un usuario --
                      </MenuItem>
                      {usersListFromStore.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
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

export default ApuPostDialog;
// id, title, descrip, userid