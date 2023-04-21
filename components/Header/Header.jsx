import React from "react";
import style from "./Header.module.scss";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
const Header = () => {
  const routes = ["Home", "Blog", "Works"];
  return (
    <div className={style.header}>
      <span className={style.brand}>
        <img src={logo.src} alt="logo" />
      </span>
      <div className={style.naves}>
        {routes.map((route, index) => (
          <Link key={index} href={`/${route.toLowerCase()}`}>
            {route}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
