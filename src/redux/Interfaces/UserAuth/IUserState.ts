import { TLoading } from "../../Types/TLoading";
import IUserProfile from "./IUserProfile";

export default interface IUserState {
    authToken:string;
    userProfile:IUserProfile|null
    loading:TLoading;
    error:string;
  }