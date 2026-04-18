import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import NewUsersCards from "./UsersCards/NewUsersCards.jsx";
import Msg from "../Components/AlertBoxes/Msg";

export default function NewUsers({ msg, token }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  console.log("userId: ", userId);
  console.log("users: ", users);

  return (
    <div className="w-full">
      <Msg msg={msg} />
      {users && (
        <NewUsersCards
          users={users}
          setUsers={setUsers}
          token={token}
          navigate={navigate}
          n={users}
        />
      )}
    </div>
  );
}
