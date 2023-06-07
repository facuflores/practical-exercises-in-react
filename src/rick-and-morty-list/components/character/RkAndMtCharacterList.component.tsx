import { Alert, Grid } from "@mui/material";
import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { DialogIdEnum } from "../../../shared/dialogs/DialogId.enum";
import { OnOpenAppDeleteDialog } from "../../../shared/redux/AppDialog.reducer";
import { RkAndMtCharacterFilterType } from "../../store/data/RkAndMtFilter.type";
import { RkAndMtCharacterType } from "../../store/data/RkAndMtData.type";
import { RootState } from "../../../shared/redux/App.store";
import { FindOneCharacterById, SearchAllCharacterByFilters } from "../../redux/RkAndMtCharacter.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ConfirmDeleteDialog from "../../../shared/dialogs/ConfirmDelete.dialog";
import RkAndMtCharacterItemComponent from "./RkAndMtCharacterItem.component";
import RkAndMtCharacterItemDetailDialog from "./dialogs/RkAndMtCharacterItemDetail.dialog";
import { useNavigate } from "react-router-dom";

const RkAndMtCharacterListComponent = () => {

  const appNavigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();
  const characterList = useSelector(({rkAndMtCharacter}: RootState) => rkAndMtCharacter.characterList);

  useEffect(() => {
    if (characterList.length <= 0) {
      const filtersByDefault: RkAndMtCharacterFilterType = {name: "", status: "", gender: ""};
      appDispatch(SearchAllCharacterByFilters(filtersByDefault));
    }
  }, []);

  const handleItemEdit = (item: RkAndMtCharacterType) => {
    appNavigate(`/rick-and-morty-list/${item.id}/edit`);
  };

  const handleItemDetail = (item: RkAndMtCharacterType) => {
    appDispatch(FindOneCharacterById(item.id || -1));
  };

  const handleItemDelete = (item: RkAndMtCharacterType) => {
    appDispatch(OnOpenAppDeleteDialog({
      id: item.id || -1,
      type: DialogIdEnum.RK_AND_MT_DELETE_ITEM,
      message: `¿ Desea eliminar el personaje ${item.name} ?`
    }));
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {characterList.length <= 0 && (
        <Grid item xs={12}>
          <Alert severity="warning">Por el momento, sin registros ...</Alert>
        </Grid>
      )}
      {characterList.map((c: RkAndMtCharacterType) => (
        <Grid item xs={12} md={3} key={c.id}>
          <RkAndMtCharacterItemComponent 
            item={c}
            onHandleItemEdit={handleItemEdit}
            onHandleItemDetail={handleItemDetail}
            onHandleItemDelete={handleItemDelete}
          />
        </Grid>
      ))}

      <RkAndMtCharacterItemDetailDialog />
      <ConfirmDeleteDialog />
    
    </Grid>
  );
};

export default RkAndMtCharacterListComponent;