import { configureStore } from "@reduxjs/toolkit";
import listReducers from "./createSlice"

let store=configureStore({
    reducer:{

        todostate: listReducers ,   

    }
})

export {store}

