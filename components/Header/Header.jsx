import React, { useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/MenuOpenRounded";
import { useMediaQuery } from "@mantine/hooks";
const Header = () => {
  const routes = ["Home", "Blog", "Works"];
  const matches = useMediaQuery("(max-width: 992px)");
  const menuRef = useRef();
  const navRef = useRef();
  const [active, setActive] = useState(false);
  const [nanShow, setNavShow] = useState(true);

  useEffect(() => {
    if (matches) {
      setNavShow(true);

      navRef.current.style.position = "absolute";
      navRef.current.style.right = "10%";
      navRef.current.style.zIndex = "1";
      navRef.current.style.width = "0";
      navRef.current.style.opacity = "0";
      navRef.current.style.fontSize = "small";


    } else {
      navRef.current.style.fontSize = null;
      navRef.current.style.color = null;
      navRef.current.style.position = null;
      navRef.current.style.right = null;
      navRef.current.style.zIndex = null;
      navRef.current.style.width = null;
      navRef.current.style.opacity = null;
      navRef.current.style.gap = null;

      setNavShow(false);
    }
  }, [matches]);

  let handleClick = () => {

    menuRef.current.style.boxShadow = "0px 0px 0px 0 #acacac5e";
    if (active) {
      navRef.current.style.gap = "0";
      navRef.current.style.width = "0";
      navRef.current.style.opacity = "0";
    } else {
      navRef.current.style.width = "80%";
      navRef.current.style.opacity = "1";

      navRef.current.style.gap = "50px";
    }

    setActive((ac) => !ac);

    setTimeout(() => {
      menuRef.current.style.boxShadow = "1px 5px 8px 0 #acacac5e";

    }, 300);
  };
  return (
    <div className={style.header}>
      <span className={style.brand}>
        <img src={logo.src} alt="logo" />
      </span>
      <div className={style.naves} ref={navRef}>
        {!matches &&
          routes.map((route, index) => (
            <Link key={index} href={`/${route.toLowerCase()}`}>
              {route}
            </Link>
          ))}
        {nanShow &&
          routes.map((route, index) => (
            <Link key={index} href={`/${route.toLowerCase()}`}>
              {route}
            </Link>
          ))}
      </div>
      {matches && (
        <span className={style.menu} onClick={handleClick} ref={menuRef}>
          <MenuIcon />
        </span>
      )}
    </div>
  );
};

export default Header;
