import { Alert, Card, CardContent } from "@mui/material";
import { ApuUserListComponentProps } from "../../data/ApuData.type";
import { ConfirmDeleteModalProps, ConfirmDeleteModalPropsDefault } from "../../../shared/types/ApplicationModal.type";
import { RootState } from "../../../shared/redux/App.store";
import { useApiService } from "../../hooks/useApiService.hook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApuUserDataGridComponent from "./ApuUserDataGrid.component";
import ConfirmDeleteModal from "../../../shared/dialogs/ConfirmDelete.modal";

const ApuUserListComponent = ({onHandleEditUser}: ApuUserListComponentProps) => {
  const { requestToFindUserById ,requestToFindAllUsers, requestToDeleteUserById } = useApiService();
  const usersListFromStore = useSelector(({apuUser}: RootState) => apuUser.usersList);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<ConfirmDeleteModalProps>(ConfirmDeleteModalPropsDefault);

  useEffect(() => initializeUserListComponent(), []);

  const initializeUserListComponent = () => {
    console.log("searching users list ...");
    requestToFindAllUsers();
  };

  const handleUserEdit = (id: number) => {
    console.log(`updating user with id: ${id}`);
    const usersFromStore = usersListFromStore.filter((u) => u.id === id);
    if (usersFromStore.length > 0 && usersFromStore[0].isEdit === true) {
      onHandleEditUser(usersFromStore[0]);
    } else {
      requestToFindUserById(id, {onSuccess: (user) => onHandleEditUser(user)});
    }
  };

  const handleUserDelete = (id: number) => {
    setConfirmDeleteModal({
      isOpen: true,
      message: `¿ Desea eliminar el usuario con ID: ${id} ?`,
      onConfirm: () => {
        setConfirmDeleteModal({...confirmDeleteModal, isOpen: false});
        executeDeleteUserById(id);
      },
      onClose: () => {
        setConfirmDeleteModal({...confirmDeleteModal, isOpen: false});
      }
    });
  };

  const executeDeleteUserById = (id: number) => {
    console.log(`deleting user with id: ${id} ...`);
    requestToDeleteUserById(id);
  };

  return (
    <Card>
      <CardContent>
        {usersListFromStore.length <= 0 && (
          <Alert severity="warning">Por el momento, sin registros ...</Alert>
        )}
        {usersListFromStore.length > 0 && (
          <ApuUserDataGridComponent 
            usersList={usersListFromStore}
            onHandleEdit={handleUserEdit}
            onHandleDelete={handleUserDelete}
          />
        )}
      </CardContent>
      <ConfirmDeleteModal data={confirmDeleteModal} />
    </Card>
  );
};

export default ApuUserListComponent;