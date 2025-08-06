import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { MdSpaceDashboard } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";

import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

export function AppSidebar() {
  return (
    <Sidebar className="px-3">
      <SidebarHeader>
        <div className="flex gap-3 items-center">
          <div>
            <img
              src="/logo5.svg"
              alt="logo company"
              className="w-[50px] h-[50px] "
            />
          </div>
          <div>
            <p className="font-bold text-blue-400">AI MED</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link href={"/"} className="font-bold text-neutral-500">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-200 rounded-3xl transition p-3 mb-1">
              <div>
                <MdSpaceDashboard size={26} />
              </div>
              <div>Главная</div>
            </div>
          </Link>
          <Link href={"/analysis"} className="font-bold text-neutral-500">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-200 rounded-3xl transition p-3">
              <div>
                <MdAnalytics size={26} />
              </div>
              <div>Анализы</div>
            </div>
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <hr />
      <SidebarFooter>
        <Link href={"/"} className="font-bold text-neutral-500">
          <div className="flex gap-3 items-center cursor-pointer hover:bg-blue-200 rounded transition p-3">
            <div>
              <IoSettingsSharp size={26} />
            </div>
            <div>
              <p>Настройки</p>
            </div>
          </div>
        </Link>

        <div className="flex gap-3 items-center cursor-pointer text-red-500  hover:bg-blue-200 rounded transition p-3">
          <div>
            <FiLogOut size={26} />
          </div>
          <div>
            <p>Выход</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
