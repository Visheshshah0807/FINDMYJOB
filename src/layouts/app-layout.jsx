import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "@/components/header";

const AppLayouts = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="max-w-screen-xl mx-auto min-h-screen p-5">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayouts;
