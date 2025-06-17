import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const authSlice=createSlice({
    name:"auth",
    initialState: {
        loading:false,
        error:null,
        message:null,
        user:null,
        isAuthenticated:false,
    },
    reducers:{
        registerRequest(state){
            state.loading = true;
            state.error=null;
            state.message=null;
        },
        registerSuccess(state,action){
            state.loading=false;
            state.message=action.payload.message;

        },
        registerFailed(state){
            state.loading=false;
            state.error=action.payload;
        },
        
    },
})