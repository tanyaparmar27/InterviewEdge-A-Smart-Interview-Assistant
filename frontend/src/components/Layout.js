import React from 'react';
import Footer from './Footer';
import Head from './Head';

const Layout = ({ children }) => {
  return (
    <>
      <Head />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
