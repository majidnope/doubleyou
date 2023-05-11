import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { Button, Grid, Input } from "@mantine/core";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";

const validationSchema = yup.object({
  videoId: yup.string("Enter a video id").length(4),
});

const Admin = ({ igVideos, ytVideos }) => {
  const router = useRouter();
  const [ytCards, setYtCards] = useState([]);
  const [igCards, setIgCards] = useState([]);
  const [selectID, setSelectID] = useState("");
  const [loading, setLoading] = useState(false);
  const deleteHandle = (id) => {
    setLoading(true);
    setSelectID(id);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "F8") {
        router.push("/home");
      }
    });
  }, []);
  useEffect(() => {
    const fetchIn = async () => {
      if (selectID) {
        try {
          const res = await axios.delete(`/videos?videoId=${selectID}`);

          if (res.status == 200) {
            setSelectID("");

            if (res.data.media == "yt") {
              axios.get(`/videos?media=yt`).then((res) => {
                setYtCards(res.data);
                setLoading(false);
              });
            } else if (res.data.media == "ig") {
              axios.get(`/videos?media=ig`).then((res) => {
                setIgCards(res.data);
                setLoading(false);
              });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchIn();
  }, [selectID]);
  
  useEffect(() => {
    if (ytVideos.length > 0) {
      setYtCards(ytVideos);
    }
  }, [ytVideos]);

  useEffect(() => {
    if (igVideos.length > 0) {
      setIgCards(igVideos);
    }
  }, [igVideos]);
  const formik = useFormik({
    initialValues: {
      videoIdIG: "",
      videoIdYT: "",
      media: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`/videos?media=${values?.media}`, values);
        if (values.media == "yt") {
          axios.get(`/videos?media=yt`).then((res) => {
            setYtCards(res.data);
          });
        } else if (values.media == "ig") {
          axios.get(`/videos?media=ig`).then((res) => {
            setIgCards(res.data);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const setField = (media) => formik.setFieldValue("media", media);
  return (
    <div style={{ padding: "30px" }}>
      <h3>YouTube Videos</h3>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setField("yt");
        }}
      >
        <Input
          name="videoIdYT"
          label="Video ID"
          value={formik.values.videoIdYT}
          onChange={formik.handleChange}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          ADD Video
        </Button>
      </form>
      <Grid sx={{ margin: "0" }}>
        {ytCards.map((id) => (
          <Grid.Col sx={{ margin: "0" }} span={12} sm={4}>
            <iframe
              src={`https://www.youtube.com/embed/${id}?rel=0&vq=hd720p600`}
              title="YouTube video player"
              frameborder="0"
              className="full-w full-w"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <br />
            <Stack direction="row" gap="20px" alignItems="center">
              <Button
                loading={selectID === id && loading}
                onClick={() => deleteHandle(id)}
                sx={{
                  background: "#fd0046",
                  ":hover": { background: "#f73b6e" },
                }}
              >
                Delete
              </Button>
              <span>videoID: {id}</span>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
      <h3>Instagram</h3>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setField("ig");
        }}
      >
        <Input
          name="videoIdIG"
          label="Video ID"
          value={formik.values.videoIdIG}
          onChange={formik.handleChange}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Add Video
        </Button>
      </form>
      <Grid sx={{ margin: "0" }}>
        {igCards.map((id) => (
          <Grid.Col sx={{ margin: "0" }} span={12} sm={4}>
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
            <br />
            <Stack direction="row" gap="20px" alignItems="center">
              <Button
                loading={selectID === id && loading}
                onClick={() => deleteHandle(id)}
                sx={{
                  background: "#fd0046",
                  ":hover": { background: "#f73b6e" },
                }}
              >
                Delete
              </Button>
              <span>videoID: {id}</span>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  try {
    await axios.get("/auth?option=profile", {
      headers: { token: context.req.cookies.token },
    });

    const ytVideos = (await axios.get("/videos?media=yt")).data;
    Object.keys(ytVideos).forEach((key) => {
      if (typeof ytVideos[key] === "undefined") {
        ytVideos[key] = null; // set undefined properties to null
      }
    });

    const igVideos = (await axios.get("/videos?media=ig")).data;
    Object.keys(igVideos).forEach((key) => {
      if (typeof igVideos[key] === "undefined") {
        igVideos[key] = null; // set undefined properties to null
      }
    });

    return {
      props: {
        ytVideos,
        igVideos,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/admin/auth",
        permanent: false,
      },
    };
  }
}
