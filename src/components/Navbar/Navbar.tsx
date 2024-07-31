import { useAppColors } from "@/state/appColorsStore";
import { NavbarChoice } from "./NavbarChoice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbarStore } from "@/state/navbarStore";

type Props = {};

export function Navbar({}: Props) {
  const { navbarWidth } = useNavbarStore();

  const { appColors } = useAppColors();

  const navigate = useNavigate();

  const [choiceActive, setChoiceActive] = useState("today");

  const openCloseSidebarSvg = (
    <svg
      style={{ color: appColors.secondaryTextColor }}
      className="absolute right-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const AddTaskSvg = (
    <svg
      className="mr-2"
      style={{ color: appColors.iconicColor }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const inboxSvg =
    choiceActive !== "inbox" ? (
      <svg
        style={{ color: appColors.secondaryTextColor }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246c.04.159.06.322.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4Zm0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a.997.997 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758H8.061Zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1h-2.295Z"
          clipRule="evenodd"
        ></path>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill={appColors.iconicColor}
        viewBox="0 0 24 24"
      >
        <path
          fill={appColors.iconicColor}
          fillRule="evenodd"
          d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246c.04.159.06.322.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4Zm0 1a1 1 0 0 0-.97.758L5.03 14.004h4.78a.5.5 0 0 1 .44.496 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .44-.496h4.78L16.91 5.758a1 1 0 0 0-.97-.758H8.061Z"
          clipRule="evenodd"
        ></path>
      </svg>
    );

  const todaySvg =
    choiceActive !== "today" ? (
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
              31 {/* TODO CHANGING BASED ON CURR DATE */}
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
            31
          </tspan>
        </text>
      </svg>
    );

  const upcomingSvg =
    choiceActive !== "upcoming" ? (
      <svg
        style={{ color: appColors.secondaryTextColor }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
          clip-rule="evenodd"
        ></path>
      </svg>
    ) : (
      <svg
        style={{ color: appColors.iconicColor }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6.5 8.5A.5.5 0 0 1 7 8h10a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5ZM16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-7 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clip-rule="evenodd"
        ></path>
      </svg>
    );

  const choices = [
    {
      choiceName: "inbox",
      choiceSvg: inboxSvg,
      choiceText: "Inbox",
    },
    {
      choiceName: "today",
      choiceSvg: todaySvg,
      choiceText: "Today",
    },
    {
      choiceName: "upcoming",
      choiceSvg: upcomingSvg,
      choiceText: "Upcoming",
    },
  ];

  const handleChoiceClick = (choiceName: string) => {
    setChoiceActive(choiceName);
    navigate(choiceName);
  };

  return (
    <div
      className="fixed h-screen p-4"
      style={{
        backgroundColor: appColors.secondaryBgColor,
        minWidth: "210px",
        maxWidth: "420px",
        width: `${navbarWidth}px`,
      }}
    >
      <div className="flex items-center">
        <img
          src="https://placehold.co/20x20?text=PFP"
          className="p-px mr-2 border-2 rounded-full"
          style={{ borderColor: appColors.iconicColor }}
          alt="pfpImg"
        />
        <h1 className="text-sm font-semibold">username</h1>
        {openCloseSidebarSvg}
      </div>
      <div className="flex items-center mt-5 hover:cursor-pointer">
        {AddTaskSvg}
        <h1
          className="text-sm font-semibold"
          style={{ color: appColors.activeTextColor }}
        >
          Add task
        </h1>
      </div>
      <div className="mt-5">
        {choices.map((choice) => (
          <NavbarChoice
            svg={choice.choiceSvg}
            text={choice.choiceText}
            isActive={choiceActive === choice.choiceName}
            handleChoiceClick={() => handleChoiceClick(choice.choiceName)}
          />
        ))}
      </div>
    </div>
  );
}
