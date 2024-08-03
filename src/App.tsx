import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { useNavbarStore } from "./state/navbarStore";
import { useCallback, useEffect, useState } from "react";
import { Overlay } from "./components/Overlay";

function App() {
  const {
    navbarHidden,
    setNavbarHidden,
    navbarMdDevicesHidden,
    setNavbarMdDevicesHidden,
  } = useNavbarStore();

  const [paddingLeft, setPaddingLeft] = useState("0px");

  useEffect(() => {
    function getPaddingLeft() {
      if (navbarHidden) return "0px";
      else if (navbarMdDevicesHidden === false) return "0px";

      return "210px";
    }

    const paddingLeft = getPaddingLeft();

    setPaddingLeft(paddingLeft);
  }, [navbarHidden, navbarMdDevicesHidden]);

  return (
    <div className="flex">
      <Navbar />
      <div
        className="w-full transition-all duration-300"
        style={{ paddingLeft: paddingLeft }}
      >
        {navbarMdDevicesHidden === false && (
          <Overlay
            onClick={() => {
              setNavbarHidden(true);
              setNavbarMdDevicesHidden(true);
            }}
          />
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
