import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const TodoInputComponent = ({onOpenModalToAddOrUpdateTask}: any) => {
    return (
        <>
            <Button 
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => onOpenModalToAddOrUpdateTask({})}>
                Agregar Tarea
            </Button>
        </>
    );
};

export default TodoInputComponent;