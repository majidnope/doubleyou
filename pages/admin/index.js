import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, Grid, Input } from "@mantine/core";
import axios from "@/lib/axios";
import { Router } from "next/router";

const validationSchema = yup.object({
  email: yup.string("Enter a video id"),
});

const Admin = ({ videos }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (videos.length > 0) {
      let data = videos.map((id) => (
        <Grid.Col sx={{ margin: "0" }} span={12} sm={4}>
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0&vq=hd720p600`}
            title="YouTube video player"
            frameborder="0"
            className="full-w full-w"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Grid.Col>
      ));
      setCards(data);
    }
  }, [videos]);
  const formik = useFormik({
    initialValues: {
      videoId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post(`/admin/auth`, values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="videoId"
          label="Video ID"
          value={formik.values.videoId}
          onChange={formik.handleChange}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          ADD Video
        </Button>
      </form>

      <Grid sx={{ margin: "0" }}>{cards}</Grid>
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  try {
    const profile = (
      await axios.get("/auth?option=profile", {
        headers: { token: context.req.cookies.token },
      })
    ).data;
    if (profile) {
    }
    const videos = (await axios.get("/videos")).data;
    Object.keys(videos).forEach((key) => {
      if (typeof videos[key] === "undefined") {
        videos[key] = null; // set undefined properties to null
      }
    });

    return {
      props: {
        videos,
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
