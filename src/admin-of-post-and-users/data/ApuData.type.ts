export type ApuUserFilterComponentProps = {
  onHandleCreateUser: Function;
};

export type ApuUserListComponentProps = {
  onHandleEditUser: Function;
};

export type ApuUserDialogProps = {
  isCreate: boolean;
  isOpen: boolean;
  data?: ApuUserFormType;
  onConfirm: (content: ApuUserFormType) => void;
  onClose?: () => void;
};

export type ApuCompanyType = {
  name: string;
};

export type ApuUserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: ApuCompanyType;
  isEdit?: boolean;
};

export type ApuUserFormType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  companyName: string;
  isEdit?: boolean;
};

export type ApuUserStateType = {
  usersList: ApuUserType[];
}

export const ApuUserDialogTypeDefault: ApuUserDialogProps = {
  isCreate: false,
  isOpen: false,
  data: undefined,
  onConfirm: () => {},
  onClose: () => {}
};

export const ApuUserFormTypeDefault: ApuUserFormType = {
  id: -1,
  name: "",
  username: "",
  email: "",
  phone: "",
  companyName: "",
  isEdit: false
};