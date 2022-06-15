import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
