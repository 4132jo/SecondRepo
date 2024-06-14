import { createSlice } from "@reduxjs/toolkit";



let initialState={                    
    items:"",
    itemsList:[],
    searchData:[],
    totalNum:0,
}


let listSlice=createSlice({             
    
    name:"todoapp",
    initialState,
    reducers:{
        storeInput:(cstate,action)=>{
             cstate.items=action.payload
          
        },
        makeList:(cstate,action)=>{            
            cstate.itemsList=[...cstate.itemsList,action.payload.toLowerCase()]
            
        },
        deleteItem:(cstate,action)=>{
            let remainingItems=cstate.itemsList.filter((item,id)=>{
                return id!==action.payload
            })
            console.log(remainingItems);
            cstate.itemsList=remainingItems
        },
        clearItems:(cstate,action)=>{
            cstate.itemsList=[];
        },
        searchItem:(cstate,action)=>{
            let searchvalue=cstate.itemsList.filter((item)=>
            {
                return item===action.payload.toLowerCase()
            })
            cstate.searchData=searchvalue
        },
        displayNum:(cstate,action)=>{
              cstate.totalNum=cstate.itemsList.length
        },
       
        
        
      
    } 
    
          
})

export let {storeInput,makeList,deleteItem,clearItems,searchItem,displayNum}=listSlice.actions;

export default listSlice.reducer
