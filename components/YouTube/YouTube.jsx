import React, { useEffect, useState } from "react";
import style from "./YouTube.module.scss";
import axios from "@/lib/axios";
import { Grid } from "@mantine/core";

const YouTube = ({ latest }) => {
  const [videos, setVideos] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/videos?media=yt`).then((res) => {

      setVideos(res.data);
    });
  }, []);
  useEffect(() => {
    if (videos.length > 0) {
      let data = videos.map((id, index) => (
        <Grid.Col key={index} sx={{ margin: "0" }} span={12} sm={4}>
          <div className={style.card}>
            <iframe
              src={`https://www.youtube.com/embed/${id}?rel=0&vq=hd720p600`}
              title="YouTube video player"
              frameborder="0"
              className="full-w full-w"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </Grid.Col>
      ));
      setCards(data);
    }
  }, [videos]);
  return (
    <div className={style.youtube}>
      <h3>Recent uploads</h3>
      <Grid sx={{ margin: "0", width: "100%", height: "100%" }}>{cards}</Grid>
    </div>
    
  );
};

export default YouTube;
