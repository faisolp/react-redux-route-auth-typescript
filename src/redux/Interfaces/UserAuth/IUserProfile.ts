export default  interface IUserProfile {
    username:string
    email:string
}
export const InitUserProfile =():IUserProfile=> ({
    username:"",
    email:""
})