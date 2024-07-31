import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { useState } from "react";
import { useNavbarStore } from "./state/navbarStore";

function App() {

  const { navbarWidth } = useNavbarStore();

  return (
    <div className="flex">
      <Navbar />
      <div style={{paddingLeft: `${navbarWidth}px`}}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
