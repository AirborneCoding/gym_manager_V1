import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: white;
  }
`;
import img from '/not-found.svg';
const Error = () => {
  const error = useRouteError();
  console.log("erro", error);

  if (error.status === 401) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3 className='text-black'>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/' className='btn btn-sm text-white'>back home</Link>
        </div>
      </Wrapper>
    );
  }

  if (error.response.status === 401) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3 className='text-white'>Ohh! Not Authorize to access this page</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/' className='btn btn-sm text-white'>back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );

};
export default Error;
