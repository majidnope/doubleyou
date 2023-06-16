import React from "react";
import sx from "./page.module.scss";
const Page = () => {
  const data = [
    {
      name: "Sapphire",
      dis: "Powerful VFX plugin for video editing and compositing.",
      img: "img/BorisFX_Sapphire.jpg",
      url: "https://drive.google.com/file/d/1VloI3UUg9DqD9B3_V8M7OFwJ5WNxRzdX/view?usp=sharing",
    },

    {
      name: "Fx Console",
      dis: "Time-saving plugin for managing effects in After Effects.",
      img: "img/VC_Logo_White.png",
      url: "https://www.videocopilot.net/blog/2018/05/fx-console-updated-to-v1-0-3/",
    },
    {
      name: "Animation Composer",
      dis: "Simplifies complex animation creation in After Effects.",
      img: "img/open_g.jpg",
      url: "https://misterhorse.com/products-for-after-effects",
    },
    {
      name: "Magic Bullet Looks",
      dis: "Color grading and finishing plugin for stunning visuals.",
      img: "img/redgiant-effects.png",
      url: "https://drive.google.com/file/d/11iy1CNaC4kTM9vBEMAi0apAClTofe_yW/view?usp=sharing",
    },
    {
      name: "Optical Flares",
      dis: "Plugin for creating realistic lens flares and light effects.",
      img: "img/VC_Logo_White.png",
      url:"https://drive.google.com/file/d/1_eUJGM4EEIQqcaUzfGEZ86MX9Emz1G23/view?usp=sharing",
    },
    {
      name: "Deep Glow",
      dis: "Plugin for adding vibrant and glowing effects to visuals.",
      img: "img/deepGlow.jpg",
      url:"https://drive.google.com/file/d/11W6VnJOeQHood6ijnU7blgcVzukmI1SL/view?usp=sharing",
    },
    {
      name: "Twitch",
      dis: "Plugin for adding glitch and distortion effects to videos.",
      img: "img/VC_Logo_White.png",
      url: "https://drive.google.com/file/d/1h3alj8hGTg5pkKsv-I7Dq5hCKGsGuPRc/view?usp=sharing",
    },
    {
      name: "Saber",
      dis: "Plugin for creating realistic light saber and energy beam effects.",
      img: "img/VC_Logo_White.png",
      url:"https://www.videocopilot.net/blog/2016/03/new-plug-in-saber-now-available-100-free/",

    
    },
    {
      name: "All in One",
      dis: "All these plugins are together in one folder.",
      img: "img/Allinone.jpg",
      url: "https://drive.google.com/file/d/1RwPH5QtFgqta786bJQEBipveMEZ8MSFT/view?usp=sharing",
    },
  ];
  const li = data.map((el) => (
    <>
      <li>
        <div onClick={()=>window.open(el.url)}>
          <div>
            <h4>{el.name}</h4>
            <img width="100" src={"/"+el.img} alt="thumbnail" />
          </div>
          <p>{el.dis}</p>
        </div>
      </li>
      <hr />
    </>
  ));
  return (
    <>
      <section className={sx.holder}>
        <h1 align="center">8 Adobe After Effect Plugins</h1>
        <ol>{li}</ol>
      </section>
    </>
  );
};

export default Page;
