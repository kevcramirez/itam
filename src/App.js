import React, { useState } from "react";
import Login from "./component/login";
import TodoLists from "./component/todolists";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      {!currentUser ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <TodoLists currentUser={currentUser} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
