import React, { useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import PageContainer from '../components/containers/PageContainer';
import Footer from './Footer';
function Page(props) {
  const { children, classes = '' } = props;
  const location = useLocation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
    setCount(count + 1);
  }, [location]); // eslint-disable-line

  return (
    <div className={`relative w-full min-h-screen flex flex-col ${classes}`}>
      <Navbar />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </div>
  );
}

Page.propTypes = {};

export default Page;
