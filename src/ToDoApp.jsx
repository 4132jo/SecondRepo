import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItems, deleteItem, displayNum, makeList, searchItem, storeInput } from "./createSlice";
import "./todo.css";

function ToDoApp() {
  let [inputdata, setinputdata] = useState("");
  let [searchvalue,setsearchvalue]=useState("");
  let { itemsList,searchData,totalNum } = useSelector((store) =>
  {

    return store.todostate;
  });

  let inputref = useRef();
  let btnref=useRef();
  let searchref=useRef();
  let display
  let dispatch = useDispatch();

  let updateinputdata = (e) => 
  {
    setinputdata(e.target.value);
   
  };
  let updateSearch=({target:{value}})=>{
     setsearchvalue(value)
  }
  return (
    <div className="container">
      <div className="nav">
        <p className="logo">Your Go-to Notepad</p>
        <div className="nav-menu">
          <input  
            ref={inputref}
            type="text"
            placeholder="Add to list"
            onChange={(eventobj) => {
              updateinputdata(eventobj);
              dispatch(storeInput(inputdata));
            }}
          />
          <button
            onClick={() => {
              let prevData= (itemsList.length !==0 && itemsList.find((item)=>{
                console.log(item);
                return item === inputdata
              }))

              console.log(prevData);
              if (!prevData)
                 {
               
                dispatch(makeList(inputdata));
                setinputdata("");
                inputref.current.value = "";
                dispatch(displayNum())
              }
            }}

           
          >
            Add Item
          </button>
          <p className="totalitems">{totalNum}</p>
          <button
            onClick={() => {
              dispatch(clearItems());
              dispatch(displayNum())
            }}
          >
            Clear
          </button>
        </div>
      </div>

     <div className="item-layout">
      <div className="item-search">
        <p className="desc">Search from your List</p>
        <div className="searchbox">
          <input ref={searchref} onChange={updateSearch} type="text" placeholder="Search"/>
          <button onClick={()=>{
            dispatch(searchItem(searchvalue))
            searchref.current.value=""
          }}><i class="fa-solid fa-magnifying-glass"></i></button>

        </div>
        <h3>{searchData}</h3>
      </div>
     <div className="item-card">
      <p className="desc">Your List</p>
        {itemsList?.map((item, id) => {
          return (
            <div className="itemlist">
              <li type="none" key={id}>
                <p>{item}</p>
                <button
                  onClick={() => {
                    dispatch(deleteItem(id));
                    dispatch(displayNum())
                  }}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </li>
            </div>
          );
        })}
      </div>
     </div>
    </div>
  );
}

export default ToDoApp;
