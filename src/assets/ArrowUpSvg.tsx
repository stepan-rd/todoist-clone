type Props = {
  color?: string;
};

export function ArrowUpSvg({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      fill="none"
    >
      <path
        style={{ color: color }}
        fill="currentColor"
        fillRule="evenodd"
        d="M13.854 7.604a.5.5 0 0 1-.708 0L7 1.457.854 7.604a.5.5 0 0 1-.708-.707l6.5-6.5a.5.5 0 0 1 .708 0l6.5 6.5a.5.5 0 0 1 0 .707Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
