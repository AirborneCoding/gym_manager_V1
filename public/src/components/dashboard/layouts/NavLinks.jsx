import { NavLink } from 'react-router-dom';
// import "./index.css"
import { useSelector } from "react-redux"

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';
const links = [
  {
    text: 'stats',
    path: '',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'all clients',
    path: 'all-clients',
    icon: <MdQueryStats />,
  },
  {
    text: 'add client',
    path: 'add-client',
    icon: <FaWpforms />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  // {
  //   text: 'admin',
  //   path: 'admin',
  //   icon: <MdAdminPanelSettings />,
  // },
];

const NavLinks = ({ isBigSidebar, toggleSidebar }) => {
  // const { user } = useSelector(state => state.auth)
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        // const { role } = user;
        // if (path === 'admin' && role !== 'admin') return; // todo
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
