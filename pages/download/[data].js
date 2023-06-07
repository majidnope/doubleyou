import React from "react";
import sx from "./page.module.scss";
import { Button } from "@mantine/core";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter as useNav } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
  const nav = useNav();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const submitHandler = async () => {
    if (!form.email.length > 0 && !form.name > 0) {
      alert("Fill the box");
      return;
    }
    if (!form.email.includes("@") && !form.email.includes(".")) {
      alert("Enter proper email");
      return;
    }
    setLoading(true);
    await axios.post("/subscribe", form);
    setLoading(false);
    alert("subscribed");
    nav.push("/plugin");
  };
  const onChange = (e) => {
    setForm((fil) => ({ ...fil, [e.target.name]: e.target.value }));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "url('/bg.jpg')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        position: "relative",
      }}
    >
      <div className={sx.form}>
        <form action="" method="post">
          <input
            value={form["name"]}
            onChange={onChange}
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <input
            value={form["email"]}
            onChange={onChange}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <Button
            onClick={submitHandler}
            loading={loading}
            sx={{
              width: "240px",
              height: "31px",
              background: "#00AADF",
              borderRadius: "14px",
              fontFamily: "Lexend Exa",
              textShadow: "1px 1px 3px #1e1e1e ",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "#1e1e1e",
              boxShadow:
                "0px -12px 17px -1px #000000, inset 2px 3px 4px 1px rgba(0, 0, 0, 0.25)",
            }}
          >
            Claim Your Free Plugins
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
