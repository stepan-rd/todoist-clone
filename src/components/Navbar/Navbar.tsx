import { useAppColors } from "@/state/appColorsStore";
import { NavbarChoice } from "./NavbarChoice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbarStore } from "@/state/navbarStore";
import { OpenCloseSidebarSvg } from "@/assets/OpenCloseSidebarSvg";
import { AddTaskSvg } from "@/assets/AddTaskSvg";
import { InboxSvg } from "@/assets/InboxSvg";
import { TodaySvg } from "@/assets/TodaySvg";
import { UpcomingSvg } from "@/assets/UpcomingSvg";

type Props = {};

export function Navbar({}: Props) {
  const { navbarWidth } = useNavbarStore();

  const { appColors } = useAppColors();

  const navigate = useNavigate();

  const [activeChoice, setActiveChoice] = useState("today");

  const choices = [
    {
      choiceName: "inbox",
      choiceSvg: <InboxSvg activeChoice={activeChoice} />,
      choiceText: "Inbox",
    },
    {
      choiceName: "today",
      choiceSvg: <TodaySvg activeChoice={activeChoice} />,
      choiceText: "Today",
    },
    {
      choiceName: "upcoming",
      choiceSvg: <UpcomingSvg activeChoice={activeChoice} />,
      choiceText: "Upcoming",
    },
  ];

  const handleChoiceClick = (choiceName: string) => {
    setActiveChoice(choiceName);
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
        <OpenCloseSidebarSvg />
      </div>
      <div className="flex items-center mt-5 hover:cursor-pointer">
        <AddTaskSvg />
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
            isActive={activeChoice === choice.choiceName}
            handleChoiceClick={() => handleChoiceClick(choice.choiceName)}
          />
        ))}
      </div>
    </div>
  );
}
