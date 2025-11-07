import React from "react";
import noteIcon from "../assets/icons/note.png";
import hourglass from "../assets/icons/hourglass.png";
import streakIcon from "../assets/icons/fire.png";
import tick from "../assets/icons/tick.png";
import dashboardIcon from "../assets/icons/dashboard.png";
import secureIcon from "../assets/icons/security.png";

export const cardData = [
  {
    title: "Smart Note Management",
    description:
      "Organize your thoughts, ideas, and study material efficiently with a clean and intuitive note-taking experience.",
    icon: noteIcon,
  },
  {
    title: "Spaced Learning Engine",
    description:
      "Boost long-term memory retention with our built-in spaced repetition system that schedules note reviews intelligently.",
    icon: hourglass,
  },
  {
    title: "Daily Streak Tracker",
    description:
      "Build consistent habits with a streak system that keeps you motivated and accountable every day.",
    icon: streakIcon,
  },
  {
    title: "Integrated To-Do Lists",
    description:
      "Stay productive by creating and managing task lists alongside your notes for a streamlined workflow.",
    icon: tick,
  },
  {
    title: "Personalized Dashboard",
    description:
      "Access everything at a glance — upcoming reviews, current streak, pinned notes, and more — all in one place.",
    icon: dashboardIcon,
  },
  {
    title: "Secure and Sync Ready",
    description:
      "All your data is protected and can be accessed anytime, anywhere, with secure backend integration.",
    icon: secureIcon,
  },
];
