import React, { Suspense, useEffect, useState } from "react";
import style from "./Instagram.module.scss";
import axios from "@/lib/axios";
import { Grid } from "@mantine/core";
import Script from "next/script";

const Instagram = ({ children }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/videos?media=ig`).then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        let data = res.data.map((id, index) => (
          <Grid.Col key={index} sx={{ margin: "0" }} span={12} sm={4}>
            <div className={style.card}>
              <iframe
                className="instagram-media instagram-media-rendered"
                id="instagram-embed-0"
                src={`https://www.instagram.com/p/${id}/embed/?cr=1&amp;v=7&amp;wp=354&amp;rd=http%3A%2F%2Flocalhost%3A3000&amp;rp=%2Fhome#%7B%22ci%22%3A0%2C%22os%22%3A2524%2C%22ls%22%3A2222%2C%22le%22%3A2514%7D`}
                allowtransparency="true"
                allowfullscreen="true"
                frameborder="0"
                height="452"
                data-instgrm-payload-id="instagram-media-payload-0"
                scrolling="no"
                // style="background-color: white; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0px 0px 12px; min-width: 326px; padding: 0px;"
                data-dashlane-frameid="795"
              ></iframe>
            </div>
          </Grid.Col>
        ));
        setCards(data);
      }
    });
  }, []);

  return (
    <div className={style.instagram}>
      <h3>Instagram uploads</h3>
      <Grid sx={{ margin: "0", width: "100%", height: "100%" }}>{cards}</Grid>

      <Script defer src="//www.instagram.com/embed.js" />
    </div>
  );
};

export default Instagram;
