import { useAppColors } from "@/state/appColorsStore";
import { NavbarChoice } from "./NavbarChoice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbarStore } from "@/state/navbarStore";
import { OpenCloseSidebarSvg } from "@/assets/OpenCloseSidebarSvg";
import { AddTaskSvg } from "@/assets/AddTaskSvg";
import { InboxSvg } from "@/assets/InboxSvg";
import { TodaySvg } from "@/assets/TodaySvg";
import { UpcomingSvg } from "@/assets/UpcomingSvg";
import { AddTaskCard } from "../AddTaskCard";
import { Overlay } from "../Overlay";
import { OverlayInvisible } from "../OverlayInvisible";
import "@/styles/styles.css";
import { useTodayPage } from "@/state/todayPageStore";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

export function Navbar({}: Props) {
  const {
    navbarHidden,
    setNavbarHidden,
    navbarMdDevicesHidden,
    setNavbarMdDevicesHidden,
    showNavbarLgDevices,
    setShowNavbarLgDevices,
  } = useNavbarStore();

  const { appColors } = useAppColors();

  const navigate = useNavigate();

  const [activeChoice, setActiveChoice] = useState("today");
  const [openNavbarBtnVisible, setOpenNavbarBtnVisible] = useState(false);
  const [addingTask, setAddingTask] = useState(false);

  const AddTaskCardAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateY: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      translateY: 0,
      transition: {
        duration: 0.1,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      translateY: 50,
      transition: {
        duration: 0.1,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        console.log("hiding navbar bcs on md");
        setNavbarHidden(true);
        setNavbarMdDevicesHidden(true);
        setShowNavbarLgDevices(true);
      } else {
        if (showNavbarLgDevices) {
          setNavbarHidden(false);
          setShowNavbarLgDevices(false);
        }
      }
    };
    // Set the initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showNavbarLgDevices]);

  useEffect(() => {
    if (navbarHidden) {
      setTimeout(() => {
        setOpenNavbarBtnVisible(true);
      }, 165);
    } else {
      setOpenNavbarBtnVisible(false);
    }
  }, [navbarHidden]);

  return (
    <>
      <div
        className={`fixed h-screen p-4 transition-all duration-300`}
        style={{
          width: "210px",
          backgroundColor: appColors.secondaryBgColor,
          left: navbarHidden ? "-210px" : "0px",
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
          <OpenCloseSidebarSvg className="absolute right-4" />
        </div>
        <div
          className="flex items-center mt-5 hover:cursor-pointer"
          onClick={() => setAddingTask(true)}
        >
          <AddTaskSvg />
          <h1
            className="text-sm font-semibold"
            style={{ color: appColors.activeTextColor }}
          >
            Add task
          </h1>
        </div>
        <div className="mt-5">
          {choices.map((choice, choiceIndex) => (
            <NavbarChoice
              key={`${choiceIndex}-${choice}`}
              svg={choice.choiceSvg}
              text={choice.choiceText}
              isActive={activeChoice === choice.choiceName}
              handleChoiceClick={() => handleChoiceClick(choice.choiceName)}
            />
          ))}
        </div>
        <button
          className="absolute flex items-center justify-center bottom-2"
          style={{ color: appColors.textColor }}
        >
          <svg
            className="mr-2"
            style={{color: appColors.textColor}}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10.241 4.004h3.513c.554 0 1.004.448 1.004 1v9.638l-5.52-7.855V5.004c0-.552.449-1 1.003-1Zm4.844 15.4.048-.074a3.772 3.772 0 0 1-6.218.074L1.863 9.37a1.995 1.995 0 0 1 .493-2.786l2.878-2.007a2.012 2.012 0 0 1 2.795.49l.205.292v-.355c0-1.105.899-2 2.007-2h3.513c1.109 0 2.007.895 2.007 2v.361l.21-.298a2.012 2.012 0 0 1 2.796-.492l2.877 2.008a1.995 1.995 0 0 1 .493 2.785l-7.052 10.035Zm.676-12.295v9.589l5.554-7.903a.998.998 0 0 0-.247-1.393l-2.877-2.007a1.006 1.006 0 0 0-1.398.245L15.761 7.11ZM5.81 5.396 2.932 7.403a.998.998 0 0 0-.247 1.393L9.737 18.83a2.766 2.766 0 0 0 3.844.675 2.744 2.744 0 0 0 .678-3.83L7.207 5.64a1.006 1.006 0 0 0-1.398-.245Zm6.189 12.983a1.002 1.002 0 0 1-1.004-1c0-.552.45-1 1.004-1s1.003.448 1.003 1-.45 1-1.003 1Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <h1 className="text-sm" style={{color: appColors.textColor}}>Change theme</h1>
        </button>
      </div>
      {openNavbarBtnVisible && (
        <OpenCloseSidebarSvg className="absolute top-4 left-2" />
      )}
      <AnimatePresence>
        {addingTask && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={AddTaskCardAnimation}
          >
            <OverlayInvisible onClick={() => setAddingTask(false)} />

            <AddTaskCard
              type="global"
              className="relative z-50 shadow-lg bottom-32 add-task-card-global rounded-xl"
              setAddingTask={setAddingTask}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
