import { useAppColors } from "@/state/appColorsStore";
import { useNavbarStore } from "@/state/navbarStore";
import { useEffect, useState } from "react";
import "@/styles/styles.css"

type Props = {
  className?: string;
};

export function OpenCloseSidebarSvg({ className }: Props) {
  const { appColors } = useAppColors();

  const { setNavbarHidden, navbarMdDevicesHidden, setNavbarMdDevicesHidden } =
    useNavbarStore();

  const [isHovered, setIsHovered] = useState(false);
  const [playClickAnimation, setPlayClickAnimation] = useState(false);

  function handleClick() {
    console.log("clicked");
    setNavbarHidden((prev) => {
      const newNavbarHidden = !prev;
      if (window.innerWidth < 768) {
        console.log("setting md navbar hidden to " + newNavbarHidden);
        setNavbarMdDevicesHidden(newNavbarHidden);
      }
      return newNavbarHidden;
    });
    setPlayClickAnimation(true);
  }

  useEffect(() => {
    if (playClickAnimation) {
      const timeoutId = setTimeout(() => {
        setPlayClickAnimation(false);
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [playClickAnimation]);


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`p-1 transition-all rounded-lg hover:cursor-pointer ${className}`}
      style={{
        backgroundColor: isHovered
          ? appColors.hoverElementBgColor
          : appColors.mainBgColor,
      }}
    >
      <svg
        style={{
          color: isHovered ? appColors.textColor : appColors.secondaryTextColor,
        }}
        className={`${playClickAnimation ? "icon-clicked" : ""}`}
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
    </div>
  );
}
