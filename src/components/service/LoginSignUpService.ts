import {
  CommonResponseType,
  LoginRequestType,
  SignUpRequestType,
} from "../types/CommonTypes";
import api from "./api";

export const doSignUpService = async (signUpRequest: SignUpRequestType) =>
  api
    .post("/signup", signUpRequest)
    .then((res) => res.data as CommonResponseType);

export const doSignInService = async (loginRequest: LoginRequestType) =>
  api
    .post("/login", loginRequest)
    .then((res) => res.data as CommonResponseType);

export const doLogOutService = async () =>
  api.get("/logout").then((res) => res.data as CommonResponseType);
