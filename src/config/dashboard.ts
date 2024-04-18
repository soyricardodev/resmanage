import { ChefHat, LayoutDashboard, ListTree, SquareMenu } from "lucide-react";

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Tu restaurante",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Restaurantes",
          href: "/dashboard/restaurantes",
          icon: ChefHat,
          items: [],
        },
        {
          title: "Menus",
          href: "/dashboard/menus",
          icon: SquareMenu,
          items: [],
        },
        {
          title: "Categorias",
          href: "/dashboard/categorias",
          icon: ListTree,
          items: [],
        },
      ],
    },
  ],
};
