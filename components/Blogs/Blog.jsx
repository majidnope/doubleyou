import React, { useEffect, useState } from "react";
import style from "./Blog.module.scss";
import axios from "@/lib/axios";
import { Button, Card, Grid, Group, Image, Text } from "@mantine/core";
const direction = ["row-reverse", "row"];
const Blog = ({ latest }) => {
  const [blogs, setBlogs] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`/blogs?latest=${latest}`).then((res) => {
      console.log(res);
      setBlogs(res.data);
    });
  }, []);

  const ShortContent = ({ content }) => {
    const [show, setShow] = useState(false);

    if (!show) {
      return (
        <>
          {content.length >= 833
            ? content?.slice(833, content.length - 833) + "..."
            : content}
          {content.length >= 833 ? (
            <span className={style.readMore} onClick={() => setShow((s) => !s)}>
              {" "}
              read more
            </span>
          ) : (
            ""
          )}
        </>
      );
    } else {
      return (
        <>
          {content}
          <br />
          <span className={style.readMore} onClick={() => setShow((s) => !s)}>
            {`show less`}
          </span>
        </>
      );
    }
  };

  useEffect(() => {
    if (blogs.length > 0) {
      let data = blogs.map((data, index) => (
        <Grid.Col key={index} sx={{ margin: "0" }} span={12}>
          <div
            className={style.card}
            style={{ flexDirection: index % 2 ? direction[1] : direction[0] }}
          >
            <div className={style.content}>
              <p>
                <ShortContent content={data.content} />
              </p>
            </div>
            <div className={style.banner}>
              <img src={data.image} alt="banner" />
            </div>
          </div>
        </Grid.Col>
      ));
      setCards(data);
    }
  }, [blogs]);
  return (
    <div className={style.recent}>
      {latest ? <h3>Recent blogs</h3> : <h3>Blogs</h3>}
      <Grid sx={{ margin: "0", width: "100%", height: "100%", gap: "70px" }}>
        {cards}
      </Grid>
    </div>
  );
};

export default Blog;






// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '802876067841476',
//       xfbml      : true,
//       version    : 'v16.0'
//     });
//     FB.AppEvents.logPageView();
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>