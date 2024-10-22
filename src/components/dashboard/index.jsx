import React, { useState } from "react";
import { Dashboard } from "./DashboardPageService";
import TabDashboard from "../tabDashboad";

const DashboardPage = () => {
  return (
    <div className="container">
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      <div>
        <TabDashboard />
      </div>
    </div>
  );
};
export default DashboardPage;
