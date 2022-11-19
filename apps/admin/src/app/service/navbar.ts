import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavBarItem, NavBarItemMenuType } from "libs/ui/src/lib/navbar/service/navbar.domain";

export const NAV_BAR_ITEMS = [
  Object.assign(new NavBarItem(), {
    id: 'account',
    type: NavBarItemMenuType.SubMenu, 
    title: 'Account',
    icon: faUser,
    children: [
      Object.assign(new NavBarItem(), {
        id: 'list',
        type: NavBarItemMenuType.Link, 
        title: 'List',
        path: '/account/list'
      }),
      Object.assign(new NavBarItem(), {
        id: 'chart',
        type: NavBarItemMenuType.Link, 
        title: 'Chart',
        path: '/account/chart'
      })
    ]
  })
];