import { ApuUserType } from "../data/ApuData.type";

const API_URL = "https://jsonplaceholder.typicode.com/users/";

const FindOneUserById = async (id: number): Promise<ApuUserType> => {
  const response = await fetch(API_URL.concat(id.toString()));
  return (await response.json()) as ApuUserType;
};

export {
  FindOneUserById,
};