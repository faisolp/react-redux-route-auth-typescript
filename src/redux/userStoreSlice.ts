import {
    createSlice, 
    createAsyncThunk, 
    //CaseReducer, 
    PayloadAction,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import IUserState from './Interfaces/UserAuth/IUserState'
import IUserProfile,{ InitUserProfile} from './Interfaces/UserAuth/IUserProfile';
import IUserLogin  from './Interfaces/UserAuth/IUserLogin';
import AuthController from './../controllers/local/Auth.controller';
import IUserToken from './Interfaces/UserAuth/IUserToken';


const initialState:IUserState = {    
    authToken:"",
    userProfile:InitUserProfile(),
    loading: 'idle',
    error: "",
} 

/*----------------------------------*/
// Await/Async Methods  
export const Login = createAsyncThunk<string, IUserLogin>(
  'userStore/Login',async (_user,{ rejectWithValue })=> {
  
    try {
      
      let ret = await AuthController.genToken(_user)
    
      return ret
    } catch (err) {
    
      return rejectWithValue(String(err))
    }
   

})

export const LoadUserProfileServer = createAsyncThunk<IUserProfile, IUserToken>(
  'userStore/LoadUserProfile',async (pram,{ rejectWithValue })=> {
  
    try {
      let ret = await AuthController.LoadUserProfile(pram.token,pram.username)
      //console.log("LoadUserProfile ret",ret);
      
      return ret
    } catch (err) {
    
      return rejectWithValue(String(err))
    }
  
})

export const LogOut = createAsyncThunk<string, void>(
  'userStore/LogOut',async(_data,{ rejectWithValue })=> {
    let ret="";
    try {
      
      return ret
    } catch (err) {
    
      return rejectWithValue(String(err))
    }

})
/*----------------------------------*/

const userStoreSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      // fill in primary logic here
      // Normal Methods 
      ClearStatus(state:IUserState) {
        state.error="";
        state.loading="idle";
      },
      
    },
    extraReducers: (builder) => {
      
      //Login Function
      LoginBuilder(builder)
      LogOutBuilder(builder)
      
      
      //Load Profile 
      LoadUserProfileServerBuilder(builder)
    
     
    }
    
})

const LoginBuilder =(builder: ActionReducerMapBuilder<IUserState>) =>{
  //Login Function
  builder.addCase(Login.fulfilled, (state, { payload }) => {
         
      state.loading='succeeded'
      state.authToken= payload;
  })
  builder.addCase(Login.pending, (state, { payload }) => {
    state.loading='pending';
    
  })
  builder.addCase(Login.rejected, (state, { payload }) => {

    state.loading='failed';
    state.error=String(payload)

  })
}

const LoadUserProfileServerBuilder =(builder: ActionReducerMapBuilder<IUserState>) =>{
  builder.addCase(LoadUserProfileServer.fulfilled, (state, { payload }) => {    
    //console.log("builder LoadUserProfile payload",payload);
        state.loading='succeeded'
        state.userProfile= payload;
  })
  builder.addCase(LoadUserProfileServer.pending, (state, { payload }) => {
      state.loading='pending';         
  })
  builder.addCase(LoadUserProfileServer.rejected, (state, { payload }) => { 
      state.loading='failed';
      state.error=String(payload)
  })
}

const LogOutBuilder =(builder: ActionReducerMapBuilder<IUserState>) =>{
  builder.addCase(LogOut.fulfilled, (state, { payload }) => {    
    //console.log("builder LoadUserProfile payload",payload);
        state.loading='succeeded'
        state.userProfile= InitUserProfile();
        state.authToken="";
  })
  builder.addCase(LogOut.pending, (state, { payload }) => {
      state.loading='pending';         
  })
  builder.addCase(LogOut.rejected, (state, { payload }) => { 
      state.loading='failed';
      state.error=String(payload)
  })
}



export const { 
                ClearStatus,
             } = userStoreSlice.actions;
export {userStoreSlice}
export default userStoreSlice.reducer;
