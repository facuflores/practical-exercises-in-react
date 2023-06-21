import { ApuUserFilterComponentProps } from "../../data/ApuData.type";
import { Button, Card, CardContent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const ApuUserFilterComponent = ({onHandleCreateUser}: ApuUserFilterComponentProps) => {
  return (
    <Card>
      <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => onHandleCreateUser()}
        >
          Agregar Usuario
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApuUserFilterComponent;