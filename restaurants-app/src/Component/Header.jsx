import React, { useState } from "react";
import logo from "../img/logo.png";
import avatar from "../img/avatar.png";
import { BsFillBasket3Fill } from "react-icons/bs";
import { MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Header.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const Login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      // console.log(response);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      //storing the login value in local storage
      //js syntax for storing the value locally
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const toggleMenu = () => {
    setIsMenu(false);
  }

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-9 md:px-16 bg-primary">
      {/* Desktop and Tablet view */}
      <div className="hidden md:flex h-full w-full item-center justify-between">
        <Link to={"/"} className="flex item-center gap-2">
          <motion.img
            whileTap={{ scale: 0.9 }}
            className="w-8 object-cover"
            src={logo}
            alt="Logo"
          />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        {/* heading coloum and cart icon */}
        <div className="flex item-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex item-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 
          tansition-all ease-in-out cursor-pointer"
              onClick={toggleMenu}
            >
              Home
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 
          tansition-all ease-in-out cursor-pointer"
              onClick={toggleMenu}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 
          tansition-all ease-in-out cursor-pointer"
              onClick={toggleMenu}
            >
              About us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 
          tansition-all ease-in-out cursor-pointer"
              onClick={toggleMenu}
            >
              Service
            </li>
          </motion.ul>
          <div className="relative flex item-center justify-center">
            <BsFillBasket3Fill className="text-textColor text-2xl cursor-pointer" />
            <div
              className="absolute -top-4 -right-3 w-5 h-5 rounded-full bg-cartNumBg 
              flex item-center justify-center"
            >
              <p className="text-xs text-white font-semiBold">2</p>
            </div>
          </div>

          <div>
            <img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              alt="userprofile"
              className="w-8 min-w-[40px] h-8 min-h-[40px] drop-shadow-xl cursor-pointer profileHeader
                rounded-full"
              onClick={Login}
            />
            {isMenu ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-16
            right-14"
              >
                {user && user.email === "9874tariq@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
              transition-all duration-100 ease-in-out  text-textColor text-base "
              onClick={toggleMenu}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300
              transition-all duration-100 ease-in-out  text-textColor text-base "
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={"/"} className="flex item-center gap-2">
          <motion.img
            whileTap={{ scale: 0.9 }}
            className="w-8 object-cover"
            src={logo}
            alt="Logo"
          />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative flex mobileBasket item-center justify-center">
          <BsFillBasket3Fill className="text-textColor text-2xl cursor-pointer" />
          <div
            className="absolute -top-4 -right-3 w-5 h-5 rounded-full bg-cartNumBg 
              flex item-center justify-center"
          >
            <p className="text-xs text-white font-semiBold">2</p>
          </div>
        </div>
        <div>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            alt="userprofile"
            className="w-8 min-w-[40px] h-8 min-h-[40px] drop-shadow-xl cursor-pointer profileHeader
                rounded-full"
            onClick={Login}
          />
          {isMenu ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-16
            right-14"
            >
              {user && user.email === "9874tariq@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                    transition-all duration-100 ease-in-out  text-textColor text-base"
                    onClick={toggleMenu}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 
          tansition-all ease-in-out cursor-pointer px-4 py-2"
          onClick={toggleMenu}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 
          tansition-all ease-in-out cursor-pointer px-4 py-2"
          onClick={toggleMenu}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 
          tansition-all ease-in-out cursor-pointer px-4 py-2"
          onClick={toggleMenu}
                >
                  About us
                </li>
                <li
                  className="text-base text-textColor hover:bg-slate-100 duration-100 
          tansition-all ease-in-out cursor-pointer px-4 py-2"
          onClick={toggleMenu}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300
              transition-all duration-100 ease-in-out  text-textColor text-base "
                onClick={logout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
