import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export class NavBarItem {
  id: string;
  type: NavBarItemMenuType; 
  title: string;
  icon: IconDefinition;
  path: string;
  children?: NavBarItem[];
  isFolded = true
}

export enum NavBarItemMenuType {
  SubMenu = 'SubMenu',
  Link = 'Link'
}