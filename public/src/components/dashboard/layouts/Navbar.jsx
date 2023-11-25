import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { Link } from 'react-router-dom';
// import "./index.css"
import styled from 'styled-components';
// import { logoutUser } from '../../../redux/api/authApiCall';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from "../../../Context";


const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;



const Navbar = ({ toggleSidebar }) => {
  const { user, logoutUser } = useGlobalContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className='flex space-x-5 items-center'>
          <Logo />
          <Link to="/">
            <h4 className='logo-text'>dashboard</h4>
          </Link>
        </div>
        <button type='button' onClick={() => { logoutUser() }} className='btn-container btn btn-sm'>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default Navbar;
