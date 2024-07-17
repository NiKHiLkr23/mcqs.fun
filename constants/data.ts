import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Explore",
    href: "/explore",
    icon: "explore",
    label: "Explore",
  },

  {
    title: "Dashboard",
    href: "/dashboard",
    disabled: true,
    icon: "profile",
    label: "Dashboard",
  },

  {
    title: "Leaderboard",
    href: "/leaderBoard",
    disabled: true,
    icon: "leaderBoard",
    label: "Leaderboard",
  },
  {
    title: "Billing",
    href: "/billing",
    disabled: true,
    icon: "billing",
    label: "Billing",
  },
];
