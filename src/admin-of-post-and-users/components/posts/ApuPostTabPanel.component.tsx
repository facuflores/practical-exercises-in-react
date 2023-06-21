import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { ApuCreatePostAction, ApuUpdatePostAction } from "../../redux/ApuPost.reducer";
import { ApuPostDefaultDialogProps, ApuPostDialogProps, ApuPostType } from "../../data/ApuPost.type";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ApuPostDialog from "./dialogs/ApuPost.dialog";
import ApuPostFilterComponent from "./ApuPostFilter.component";
import ApuPostListComponent from "./ApuPostList.component";

const ApuPostTabPanelComponent = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const [postDialog, setPostDialog] = useState<ApuPostDialogProps>(ApuPostDefaultDialogProps);
  
  const handleCreatePost = () => {
    console.log(`creating post ...`);
    setPostDialog({
      isCreate: true,
      isOpen: true,
      data: undefined,
      onConfirm: (content: ApuPostType) => {
        setPostDialog({...postDialog, isCreate: false, isOpen: false});
        appDispatch(ApuCreatePostAction(content));
      },
      onClose: () => {
        setPostDialog({...postDialog, isCreate: false, isOpen: false});
      }
    });
  };

  const handleEditPost = (post: ApuPostType) => {
    console.log(`updating post with id: ${post.id}`);
    setPostDialog({
      isCreate: false,
      isOpen: true,
      data: {...post},
      onConfirm: (content: ApuPostType) => {
        setPostDialog({...postDialog, isCreate: false, isOpen: false});
        const updatedPost: ApuPostType = {...content, isEdit: true};
        appDispatch(ApuUpdatePostAction(updatedPost));
      },
      onClose: () => {
        setPostDialog({...postDialog, isCreate: false, isOpen: false});
      }
    });
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ApuPostFilterComponent 
          onHandleCreatePost={handleCreatePost}
        />
      </Grid>
      <Grid item xs={12}>
        <ApuPostListComponent 
          onHandleEditPost={handleEditPost}
        />
      </Grid>
      <ApuPostDialog 
        dialogProps={postDialog} 
      />
    </Grid>
  );
};

export default ApuPostTabPanelComponent;