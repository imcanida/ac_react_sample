import React, { createContext, useEffect, useReducer } from "react";
export const UserListContext = createContext({});

const UserListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      const ids = state.length > 0 ? state.map((user) => user.id) : [-1];
      action.payload.id = Math.max(...ids) + 1;
      action.payload.enabled = action.payload.enabled ?? true;
      return [...state, action.payload];
    case "TOGGLE_USER":
      return state.map((user) =>
        user.id === action.payload ? { ...user, enabled: !user.enabled } : user
      );
    case "REMOVE_USER":
      return state.filter((user) => user.id !== action.payload);
    case "SET_ALL_USERS":
      return action.payload;
    default:
      return state;
  }
};

export const UserListContextProvider = ({ children }) => {
  const [users, dispatch] = useReducer(UserListReducer, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetch("static/users.json")
        .then((response) => response.json() ?? [])
        .then((data) => dispatch({ type: "SET_ALL_USERS", payload: data }))
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const addUser = (user) => {
    dispatch({ type: "ADD_USER", payload: user });
  };

  const toggleUser = (id) => {
    dispatch({ type: "TOGGLE_USER", payload: id });
  };

  const removeUser = (id) => {
    dispatch({ type: "REMOVE_USER", payload: id });
  };
  return (
    <UserListContext.Provider
      value={{ users, addUser, toggleUser, removeUser }}
    >
      {children}
    </UserListContext.Provider>
  );
};
