import React from "react";

type Props = {
  onClick?: () => void;
  className?: string;
};

export function Overlay({ onClick, className }: Props) {
  return (
    <div
      className={`fixed inset-0 w-screen h-screen bg-stone-900 opacity-45 ${className}`}
      onClick={onClick}
    ></div>
  );
}
