import IUserProfile from '../../redux/Interfaces/UserAuth/IUserProfile';
import IUserLogin  from '../../redux/Interfaces/UserAuth/IUserLogin';
export const genToken= (parm:IUserLogin) =>{
    return "token"
}
export const LoadUserProfile= (token:string,username:string) =>{
    let profile :IUserProfile ={
        username:username,
        email:"test@test.com"
    }
    return profile
}
export default {
    genToken,
    LoadUserProfile

}