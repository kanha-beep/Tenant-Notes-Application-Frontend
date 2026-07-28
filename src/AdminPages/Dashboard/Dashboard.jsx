import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "../../init/instance.js";
import Left from "./Left";
import Right from "./Right";

export default function Dashboard() {
  const [details, setDetails] = useState(null);

  const getAllDetails = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setDetails(res.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <div className="h-[42rem]">
      <div className="">
        <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          >
            <Left details={details} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          >
            <Right details={details} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
