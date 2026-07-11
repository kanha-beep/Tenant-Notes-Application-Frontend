import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plan.css";
import api from "../init/instance.js";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast } from "../utils/toast.js";

export default function Plan() {
  const [userRole, setUserRole] = useState("");
  const [roleMsg, setRoleMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [planState, setPlanState] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({ plan: "team", seats: 25, slaHours: 24 });
  const getPlan = async () => {
    try {
      const res = await api.get("/admin/plan");
      setPlanState(res.data);
    } catch (e) {
      console.log("error plan", e.response.data.message);
      setUserRole(e.response.data.user);
      setRoleMsg(createToast(e.response.data.message));
    }
  };
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleBuyPlan = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post(`/admin/plan`, data);
      setPlanState(res.data);
      setMsg(createToast("Plan updated successfully", "success"));
    } catch (e) {
      console.log("error Plan F:", e.response.data);
    }
  };
  useEffect(() => {
    getPlan();
  }, []);
  return (
    <div>
      <Msg msg={msg} setMsg={setMsg} />
      <Msg msg={roleMsg} setMsg={setRoleMsg} />
      <h1> Billing and SLA </h1>
      {planState && (
        <p>
          Current plan: {planState.plan} | Seats: {planState.billing?.seats} | SLA hours:{" "}
          {planState.settings?.slaHours}
        </p>
      )}
      <div>
        <div>
          <form onSubmit={handleBuyPlan}>
            <label>Plan</label>&nbsp;
            <select onChange={handleChange} name="plan" value={data.plan}>
              <option value="free">Free</option>
              <option value="team">Team</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <br />
            <br />
            <label>Seats</label>&nbsp;
            <input
              type="number"
              onChange={handleChange}
              placeholder="Seats"
              name="seats"
              value={data.seats}
            />
            <br />
            <br />
            <label>SLA Hours</label>&nbsp;
            <input
              type="number"
              onChange={handleChange}
              placeholder="24"
              name="slaHours"
              value={data.slaHours}
            />
            <br />
            <br />
            <button> buy </button>
          </form>
        </div>
      </div>
      <br />
      {userRole === "user" && (
        <button
          onClick={() => {
            navigate("/notes");
          }}
        >
          Notes
        </button>
      )}
      <br />
      <br />
      <button
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
}
