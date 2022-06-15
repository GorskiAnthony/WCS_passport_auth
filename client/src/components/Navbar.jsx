import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">PassportJS</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="/signup">
            S'inscrire
          </Link>
          <Link className="mr-5 hover:text-gray-900" to="/login">
            Se connecter
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
