import React, { useEffect, useState } from "react";
import style from "./RecentBlog.module.scss";
import axios from "@/lib/axios";
import { Button, Card, Grid, Group, Image, Text } from "@mantine/core";

const RecentBlog = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/videos`).then((res) => {
      console.log(res);
      setBlogs(res.data);
    });
  }, []);
  useEffect(() => {
    if (blogs.length > 0) {
      let data = blogs.map((id, index) => (
        <Grid.Col key={index} sx={{ margin: "0" }} span={12} sm={4}>
          <div className={style.card}>
            
          </div>
        </Grid.Col>
      ));
      setCards(data);
    }
  }, [blogs]);
  return (
    <div className={style.recent}>
      <h3>Recent blogs</h3>
      <Grid sx={{ margin: "0", width: "100%", height: "100%" }}>{cards}</Grid>
    </div>
  );
};

export default RecentBlog;
