export type RkAndMtKeyAndValue = {
    key: string;
    value: string;
}

export const GetAllRkAndMtStatusList = (): RkAndMtKeyAndValue[] => {
  return [
    { key: "alive", value: "Vivo" },
    { key: "dead", value: "Muerto" },
    { key: "unknown", value: "Desconocido" }
  ];
};

export const GetAllRkAndMtGenderList = (): RkAndMtKeyAndValue[] => {
  return [
    { key: "female", value: "Femenino" },
    { key: "male", value: "Masculino" },
    { key: "genderless", value: "Sin género" },
    { key: "unknown", value: "Desconocido" }
  ];
}; 

export const GetRkAndMtStatusByKey = (statusKey: string): RkAndMtKeyAndValue => {
  const result = GetAllRkAndMtStatusList().filter((s) => s.key === statusKey.toLowerCase());
  return result.length > 0 ? result[0] : {key: "", value: ""};
};

export const GetRkAndMtGenderByKey = (genderKey: string): RkAndMtKeyAndValue => {
  const result = GetAllRkAndMtGenderList().filter((g) => g.key === genderKey.toLowerCase());
  return result.length > 0 ? result[0] : {key: "", value: ""};
};