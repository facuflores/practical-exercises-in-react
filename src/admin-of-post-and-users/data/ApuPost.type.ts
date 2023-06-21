import { ApuUserType } from "./ApuData.type";

export type ApuPostType = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: ApuUserType;
  isEdit?: boolean;
};

export type ApuPostStateType = {
  postList: Array<ApuPostType>;
};

export type ApuPostFilterComponentProps = {
  onHandleCreatePost: Function;
};

export type ApuPostListComponentProps = {
  onHandleEditPost: Function;
};

export type ApuPostDataGridComponentProps = {
  postsList: Array<ApuPostType>;
  onHandleEdit: Function;
  onHandleDelete: Function;
};

export type ApuPostDialogProps = {
  isCreate: boolean;
  isOpen: boolean;
  data?: any;
  onConfirm: (content: ApuPostType) => void;
  onClose?: () => void;
};

export const ApuPostDefaultValue: ApuPostType = {
  id: -1,
  title: "",
  body: "",
  userId: -1,
  isEdit: false,
};

export const ApuPostDefaultDialogProps: ApuPostDialogProps = {
  isCreate: false,
  isOpen: false,
  data: undefined,
  onConfirm: () => {},
  onClose: () => {}
};