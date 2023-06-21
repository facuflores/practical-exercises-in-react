import { ApuPostFilterComponentProps } from "../../data/ApuPost.type";
import { Button, Card, CardContent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const ApuPostFilterComponent = ({onHandleCreatePost}: ApuPostFilterComponentProps) => {
  return (
    <Card>
      <CardContent>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onHandleCreatePost()}
        >
          Agregar Post
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApuPostFilterComponent;