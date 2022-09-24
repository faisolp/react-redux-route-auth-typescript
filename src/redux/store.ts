import {configureStore} from '@reduxjs/toolkit';
import userStoreSlice from "./userStoreSlice";


export default configureStore({
    reducer:{
        userStore:userStoreSlice,
    }
})