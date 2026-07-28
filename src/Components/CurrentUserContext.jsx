import React, { useState } from "react";
import { currentUser } from "./CurrentUser.js";
export default function CurrentUserContext({ children }) {
  const [user, setUser] = useState("");
  return (
    <currentUser.Provider value={{ user, setUser }}>
      {children}
    </currentUser.Provider>
  );
}
