import React, { useEffect, useState } from "react";
import api from "../../init/instance.js";
import Left from "./Left";
import Right from "./Right";

export default function Dashboard() {
  const [details, setDetails] = useState(null);
  const token = localStorage.getItem("tokens");

  const getAllDetails = async () => {
    try {
      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetails(res.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
      <div className="px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <Left />
          </div>
          <div>
            <Right details={details} />
          </div>
        </div>
      </div>
    </div>
  );
}
