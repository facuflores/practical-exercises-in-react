import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { ApuCreateUserAction, ApuUpdateUserAction } from "../../redux/ApuUser.reducer";
import { ApuUserDialogProps, ApuUserDialogTypeDefault, ApuUserFormType, ApuUserType } from "../../data/ApuData.type";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ApuUserDialog from "./dialogs/ApuUser.dialog";
import ApuUserFilterComponent from "./ApuUserFilter.component";
import ApuUserListComponent from "./ApuUserList.component";

const ApuUserTabPanelComponent = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const [userDialog, setUserDialog] = useState<ApuUserDialogProps>(ApuUserDialogTypeDefault);

  const handleCreateUser = () => {
    setUserDialog({
      isCreate: true,
      isOpen: true,
      data: undefined,
      onConfirm: (content: ApuUserFormType) => {
        setUserDialog({...userDialog, isCreate: false, isOpen: false});
        const userCreated: ApuUserType = {...content, company: {name: content.companyName}};
        appDispatch(ApuCreateUserAction(userCreated));
      },
      onClose: () => {
        setUserDialog({...userDialog, isCreate: false, isOpen: false});
      }
    });
  };

  const handleEditUser = (user: ApuUserType) => {
    setUserDialog({
      isCreate: false,
      isOpen: true,
      data: {...user, companyName: user.company.name},
      onConfirm: (content: ApuUserFormType) => {
        setUserDialog({...userDialog, isCreate: false, isOpen: false});
        const userUpdated: ApuUserType = {...content, isEdit: true, company: {name: content.companyName}};
        appDispatch(ApuUpdateUserAction(userUpdated));
      },
      onClose: () => {
        setUserDialog({...userDialog, isCreate: false, isOpen: false});
      }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ApuUserFilterComponent 
          onHandleCreateUser={handleCreateUser}
        />
      </Grid>
      <Grid item xs={12}>
        <ApuUserListComponent
          onHandleEditUser={handleEditUser}
        />
      </Grid>

      <ApuUserDialog 
        dialogProps={userDialog}
      />
    </Grid>
  );
};

export default ApuUserTabPanelComponent;