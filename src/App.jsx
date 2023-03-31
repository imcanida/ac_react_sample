import "./App.css";
import React from "react";
import { UserListContextProvider } from "./ContextProviders/UserListContextProvider";
import { UserList } from "./Components/UserList";

function App() {
  return (
    <div className="App">
      <UserListContextProvider>
        <UserList />
      </UserListContextProvider>
    </div>
  );
}

export default App;
