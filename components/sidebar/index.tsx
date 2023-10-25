import Sidenav from "../sidenav";
import { SidebarTextsType } from "@/types";

type SidebarType = {
  locale: string;
  texts: SidebarTextsType;
};

export default function Sidebar({ locale, texts }: SidebarType) {
  return <Sidenav locale={locale} texts={texts} />;
}
