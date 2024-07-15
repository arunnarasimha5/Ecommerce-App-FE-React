import {
  CommonResponseType,
  UserDetailsUpdateRequest,
} from "../types/CommonTypes";
import api from "./api";

export const getCurrentUserDataService = async () =>
  api.get("getcurrentuserdata").then((res) => res.data as CommonResponseType);

export const doUpdateUserDataService = async (
  updatedUserDetails: UserDetailsUpdateRequest
) =>
  api
    .post(`/updateuserdata`, updatedUserDetails)
    .then((res) => res.data as CommonResponseType);
