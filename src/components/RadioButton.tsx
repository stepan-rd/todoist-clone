import { useAppColors } from "@/state/appColorsStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  priority: number;
  className?: string;
  onClick: () => void;
};

export function RadioButton({ priority, className, onClick }: Props) {
  const { appColors } = useAppColors();
  
  const backgroundColor = getPriorityColor(priority, appColors);
  const lighterBackgroundColor = lightenColor(backgroundColor, 40); // Increase lightness by 20%

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      whileTap={{scale: 1.1}}
      className={`rounded-full hover:cursor-pointer ${className}`}
      style={{
        backgroundColor: lighterBackgroundColor,
        borderColor: backgroundColor,
        borderWidth: "2px",
        width: "18px",
        height: "18px",
      }}
    ></motion.div>
  );
}

function getPriorityColor(priority: number, appColors: any) {
  switch (priority) {
    case 3:
      return appColors.lowPriorityColor;
    case 2:
      return appColors.mediumPriorityColor;
    case 1:
      return appColors.highPriorityColor;

    default:
      return appColors.mainBgColor;
  }
}

function lightenColor(hex: string, percent: number) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l += percent / 100;
  if (hsl.l > 1) hsl.l = 1;
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}