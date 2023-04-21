import React, { useState } from "react";
import style from "./Banner.module.scss";
import { Button, Input } from "@mantine/core";
const Banner = () => {
  const quotes = [
    <>
      <span> Hey </span>there! If you're reading this, you've somehow stumbled
      upon my website. Congratulations, you've won the internet lottery! As your
      prize, you get to learn all about my editing work process and maybe even
      laugh at a few of my terrible puns.
    </>,
  ];

  const [word, setWord] = useState([quotes[0]]);

  return (
    <div className={style.banner}>
      <div className={style.left}>
        <h3>DoubleYou</h3>

        <Input
          wrapperProps={{className:style.wrap}}
          sx={{ borderColor: "black" }}
          radius="xl"
          placeholder="Enter your email"
          rightSection={
            <Button sx={{ borderRadius: "50px", backgroundColor: "#0f1824" }}>
              subscribe
            </Button>
          }
        />
      </div>
      <div className={style.right}>
        <p>{word}</p>
      </div>
    </div>
  );
};

export default Banner;
