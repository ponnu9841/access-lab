import {
  FaHome,
  FaHandshake,
  FaCogs,
  FaComments,
  FaImages,
  FaUsers,
  FaAddressBook,
  FaInfoCircle,
} from "react-icons/fa";
import { NavUser } from "./nav-user";
import { Logo } from "./logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import getCurrentRoute from "@/utils/getCurrentRoute";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: FaHome,
  },
  {
    title: "About",
    url: "/dashboard/about",
    icon: FaInfoCircle,
  },
  {
    title: "Partners",
    url: "/dashboard/partners",
    icon: FaHandshake,
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: FaCogs,
  },
  {
    title: "Testimonials",
    url: "/dashboard/testimonials",
    icon: FaComments,
  },
  {
    title: "Gallery",
    url: "/dashboard/gallery",
    icon: FaImages,
  },
  {
    title: "Teams",
    url: "/dashboard/teams",
    icon: FaUsers,
  },
  {
    title: "Contact",
    url: "/dashboard/contact",
    icon: FaAddressBook,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={getCurrentRoute(router.pathname) === item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
