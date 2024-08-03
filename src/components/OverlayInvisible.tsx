import React from "react";

type Props = { onClick: () => void };

export function OverlayInvisible({ onClick }: Props) {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen" onClick={onClick}></div>
  );
}
