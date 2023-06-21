import { Alert, Card, CardContent } from "@mui/material";
import { ApuPostListComponentProps, ApuPostType } from "../../data/ApuPost.type";
import { ConfirmDeleteModalProps, ConfirmDeleteModalPropsDefault } from "../../../shared/types/ApplicationModal.type";
import { RootState } from "../../../shared/redux/App.store";
import { useApiService } from "../../hooks/useApiService.hook";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ApuPostDataGridComponent from "./ApuPostDataGrid.component";
import ConfirmDeleteModal from "../../../shared/dialogs/ConfirmDelete.modal";

const ApuPostListComponent = ({onHandleEditPost}: ApuPostListComponentProps) => {
  const postsListFromStore = useSelector(({apuPost}: RootState) => apuPost.postList);
  const {requestToFindAllPosts, requestToDeletePostById, requestToFindPostById} = useApiService();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<ConfirmDeleteModalProps>(ConfirmDeleteModalPropsDefault);

  useEffect(() => {
    console.log("searching posts list ...");
    requestToFindAllPosts();
  }, []);

  const handlePostEdit = (id: number) => {
    console.log(postsListFromStore);
    const post = postsListFromStore.find((p) => p.id === id);
    if (post !== undefined && post.isEdit === true) {
      onHandleEditPost(post);
    } else {
      requestToFindPostById(id, {onSuccess: (post) => onHandleEditPost(post)});
    }
  };

  const handlePostDelete = (id: number) => {
    setConfirmDeleteModal({
      isOpen: true,
      message: `¿ Desea eliminar el post con ID: ${id} ?`,
      onConfirm: () => {
        console.log(`deleting user with id: ${id}`);
        setConfirmDeleteModal({...confirmDeleteModal, isOpen: false});
        requestToDeletePostById(id);
      },
      onClose: () => 
        setConfirmDeleteModal({...confirmDeleteModal, isOpen: false})
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          {postsListFromStore.length <= 0 
          ?
            <Alert severity="warning">Por el momento, sin registros ...</Alert>
          :
            <ApuPostDataGridComponent 
              postsList={postsListFromStore}
              onHandleEdit={handlePostEdit}
              onHandleDelete={handlePostDelete}
            />
          }
        </CardContent>
      </Card>
      <ConfirmDeleteModal data={confirmDeleteModal} />
    </>
  );
};

export default ApuPostListComponent;