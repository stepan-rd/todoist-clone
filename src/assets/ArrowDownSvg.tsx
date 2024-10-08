import React from "react";

type Props = {
  color?: string;
};

export function ArrowDownSvg({ color }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path
        style={{ color: color }}
        fill="currentColor"
        fill-rule="evenodd"
        d="M5.146 8.397a.5.5 0 0 1 .708 0L12 14.543l6.146-6.146a.5.5 0 0 1 .708.707l-6.5 6.5a.5.5 0 0 1-.708 0l-6.5-6.5a.5.5 0 0 1 0-.707Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}
