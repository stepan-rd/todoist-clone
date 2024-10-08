import { useAppColors } from "@/state/appColorsStore";

type Props = {
  activeChoice: string;
};

export function TodaySvg({ activeChoice }: Props) {
  const { appColors } = useAppColors();

  const date = new Date().getDate();

  return activeChoice !== "today" ? (
    <svg
      width="24"
      height="24"
      style={{ color: appColors.secondaryTextColor }}
      viewBox="0 0 24 24"
    >
      <g fill="currentColor" fill-rule="evenodd">
        <path
          fill-rule="nonzero"
          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
        ></path>
        <text
          fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
          fontSize="9"
          transform="translate(4 2)"
          fontWeight="500"
        >
          <tspan x="8" y="15" text-anchor="middle">
            {date.toString().padStart(2, "0")}
          </tspan>
        </text>
      </g>
    </svg>
  ) : (
    <svg
      style={{ color: appColors.iconicColor }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 6.00049C20 4.89592 19.1046 4.00049 18 4.00049H6C4.89543 4.00049 4 4.89592 4 6.00049V18.0005C4 19.1051 4.89543 20.0005 6 20.0005H18C19.1046 20.0005 20 19.1051 20 18.0005V6.00049ZM17 8.00049C17.2761 8.00049 17.5 8.22435 17.5 8.50049C17.5 8.77663 17.2761 9.00049 17 9.00049H7C6.72386 9.00049 6.5 8.77663 6.5 8.50049C6.5 8.22435 6.72386 8.00049 7 8.00049H17Z"
        fill="currentColor"
      ></path>
      <text
        font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
        font-size="9"
        transform="translate(4 2)"
        font-weight="500"
        fill={appColors.tooltipsTextColor}
      >
        <tspan x="8" y="15" text-anchor="middle">
          {date.toString().padStart(2, "0")}
        </tspan>
      </text>
    </svg>
  );
}
