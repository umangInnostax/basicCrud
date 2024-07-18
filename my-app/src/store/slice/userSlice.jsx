import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        initialUsers: (state, action) => {
            state.users = action.payload;
        },
        addNewUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUserInfo: (state, action) => {
            state.users = state.users.filter((user)=> user.userId !== action.payload);
        },
        editUserInfo: (state, action) => {
            state.users = state.users.map((user)=> {
                if(user.userId !== action.payload.userId){
                    return user;
                }
                else return action.payload;
            });

        }
    }
})

export const { initialUsers, addNewUser, deleteUserInfo, editUserInfo} = userSlice.actions;

export default userSlice.reducer;

