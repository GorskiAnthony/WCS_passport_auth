import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import api from "../services/api";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    api
      .delete("/auth/logout", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
        }
      })
      .catch((err) => console.error(err));
  };
  console.log(user);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">PassportJS</span>
        </Link>
        {!user ? (
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" to="/signup">
              S'inscrire
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="/login">
              Se connecter
            </Link>
          </nav>
        ) : (
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <img className="mr-5 w-10 h-10" src={user.picture} alt="avatar" />
            <Link className="mr-5 hover:text-gray-900" to="#!">
              {user.name}
            </Link>
            <button className="mr-5 hover:text-gray-900" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
