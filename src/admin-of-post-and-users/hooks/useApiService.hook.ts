import { AppDispatch } from "../../to-move/test-react-redux/principal.store";
import { ApuDeleteUserByIdAction, ApuUpdateUserListAction } from "../redux/ApuUser.reducer";
import { ApuUserType } from "../data/ApuData.type";
import { useDispatch } from "react-redux";
import Api from "../services/Api.service";
import { ApuPostType } from "../data/ApuPost.type";
import { ApuDeletePostByIdAction, ApuSetUserListAction } from "../redux/ApuPost.reducer";

type Options<T = any, U = any> = {
  onSuccess?: (response?: T) => void,
  onError?: (error?: U) => void
};

export const useApiService = () => {
  const api = new Api();
  const appDispatch = useDispatch<AppDispatch>();

  const requestToFindUserById = (id: number, options?: Options<ApuUserType>) => {
    api.findUserById(id)
      .then(async (response: Response) => {
        const user = (await response.json()) as ApuUserType;
        if (options?.onSuccess) options.onSuccess(user);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const requestToFindAllUsers = (options?: Options<Array<ApuUserType>>) => {
    api.findAllUsers()
      .then(async (response: Response) => {
        const usersList = (await response.json()) as Array<ApuUserType>;
        appDispatch(ApuUpdateUserListAction(usersList));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const requestToDeleteUserById = (id: number, options?: Options) => {
    appDispatch(ApuDeleteUserByIdAction(id));
  };

  const requestToFindPostById = (id: number, options?: Options<ApuPostType>) => {
    api.findPostById(id)
      .then(async (response: Response) => {
        const post = (await response.json()) as ApuPostType;
        if (options?.onSuccess) options.onSuccess(post);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const requestToFindAllPosts = (options?: Options<ApuPostType>) => {
    api.findAllPosts()
      .then(async (response: Response) => {
        const postsList = (await response.json()) as Array<ApuPostType>;
        appDispatch(ApuSetUserListAction(postsList.splice(0, 4)));
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const requestToDeletePostById = (id: number, options?: Options) => {
    appDispatch(ApuDeletePostByIdAction(id));
  };

  return {
    requestToFindUserById,
    requestToFindAllUsers,
    requestToDeleteUserById,
    requestToFindPostById,
    requestToFindAllPosts,
    requestToDeletePostById,
  };
};