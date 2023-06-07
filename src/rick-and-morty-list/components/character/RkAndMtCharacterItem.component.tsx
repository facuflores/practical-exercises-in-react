import { Card, CardContent, IconButton, CardActions, CardMedia, Typography } from "@mui/material";
import { GetRkAndMtGenderByKey, GetRkAndMtStatusByKey } from "../../store/data/RkAndMtKeyAndValue.type";
import { RkAndMtCharacterType } from "../../store/data/RkAndMtData.type";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

const RkAndMtCharacterItemComponent = ({item, onHandleItemEdit, onHandleItemDetail, onHandleItemDelete}: {item: RkAndMtCharacterType, onHandleItemEdit: any, onHandleItemDetail: any, onHandleItemDelete: any}) => {
  return (
    <Card>
      <CardMedia 
        component="img"
        alt={item.name}
        height="200"
        image={item.image}
      />
      <CardContent>
        <Typography component="div" variant="h5">
          {item.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          Status: {GetRkAndMtStatusByKey(item.status || "").value}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          Género: {GetRkAndMtGenderByKey(item.gender || "").value}
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "center"}}>
        <IconButton onClick={() => onHandleItemDetail(item)}>
          <PreviewIcon />
        </IconButton>
        <IconButton onClick={() => onHandleItemEdit(item)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onHandleItemDelete(item)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RkAndMtCharacterItemComponent;