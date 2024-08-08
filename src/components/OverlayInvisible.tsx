import React from "react";

type Props = { onClick: () => void };

export function OverlayInvisible({ onClick }: Props) {
  return (
    <div className="fixed inset-0 w-screen h-screen z-45" onClick={onClick}></div>
  );
}
