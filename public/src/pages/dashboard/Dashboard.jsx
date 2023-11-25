import React, { useState } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar, Loading } from "../../components";
import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"

  return <Wrapper className="bg-blue-700 bg-opacity-50 h-screen">
    <main className='dashboard '>
      <SmallSidebar
        toggleSidebar={toggleSidebar}
        showSidebar={showSidebar}
      />
      <BigSidebar
        toggleSidebar={toggleSidebar}
        showSidebar={showSidebar}
      />
      <div>
        <Navbar
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
        />
        <div className='dashboard-page '>
          {isPageLoading ? <Loading /> : <Outlet />}
        </div>
        {/* user in outlet is possible */}
      </div>
    </main>
  </Wrapper>
};

export default Dashboard;
