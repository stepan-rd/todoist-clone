import React from "react";

type Props = {
  onClick?: () => void;
};

export function Overlay({onClick}: Props) {
  return (
    <div className="fixed inset-0 z-30 w-screen h-screen bg-stone-900 opacity-45" onClick={onClick}></div>
  );
}
