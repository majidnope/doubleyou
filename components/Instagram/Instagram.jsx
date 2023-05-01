import React, { Suspense, useEffect, useState } from "react";
import style from "./Instagram.module.scss";
import axios from "@/lib/axios";
import { Grid } from "@mantine/core";
import Script from "next/script";

const Instagram = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/videos`).then((res) => {
      console.log(res);
      setVideos(res.data);
    });
  }, []);
  useEffect(() => {
    if (videos.length > 0) {
      let data = videos.map((id, index) => (
        <Grid.Col key={index} sx={{ margin: "0" }} span={12} sm={4}>
          <div className={style.card}>
            <Suspense>
              <blockquote class="instagram-media" data-instgrm-version="7">
                <a href="https://www.instagram.com/p/ClGil5YMnNh/"></a>
              </blockquote>
            </Suspense>
          </div>
        </Grid.Col>
      ));
      setCards(data);
    }
  }, [videos]);
  return (
    <div className={style.instagram}>
      <h3>Instagram uploads</h3>
      <Grid sx={{ margin: "0", width: "100%", height: "100%" }}>{cards}</Grid>

      <Script async defer src="//platform.instagram.com/en_US/embeds.js" />
    </div>
  );
};

export default Instagram;
