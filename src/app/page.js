"use client"
import "./tailwind.css"
import { useReducer } from "react";



const reducer = (state, action) => {
  
  if (action.type === "SET_ITEM") {
    const newItem = action.payload;
    return { ...state, item: newItem };
  }
  if (action.type === "SET_LIST") {
    const addItem = {
      id: crypto.randomUUID(),
      name: state.item,
    };
    return { ...state, list:[...state.list, addItem], item:"" };
  }
  if (action.type === "CLEAR_LIST") {
    return { ...state, list: [], item: "" };
  }
  if (action.type === "DELETE_ITEM") {
    const total = state.list.filter((lis) => {
      return lis.id !== action.payload;
    });
    return { ...state, list: total };
  }

  throw new Error("Not matching type");
};


const initialState = {
  item: "",
  list: [],
};

export default function ShoppItem() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleDeleteItem = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.item.trim() !== "") { 
      dispatch({ type: "SET_LIST" });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Shopping List</h1>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={state.item}
          onChange={(e) => {
            dispatch({ type: "SET_ITEM", payload: e.target.value });
          }}
          className="flex-grow border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Add an item"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Add Item
        </button>
      </form>
      <div>
        <List list={state.list} handleDeleteItem={handleDeleteItem} />
        <button
          type="button"
          onClick={() => dispatch({ type: "CLEAR_LIST" })}
          className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2"
        >
          Clear List
        </button>
      </div>
    </div>
  );
}

const List = ({ list, handleDeleteItem }) => {
  return (
    <div className="space-y-2">
      {list.map((lis) => {
        return (
          <div key={lis.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
            <p>{lis.name}</p>
            <button
              type="button"
              onClick={() => {
                handleDeleteItem(lis.id);
              }}
              className="bg-red-500 text-white rounded-lg px-2 py-1"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};