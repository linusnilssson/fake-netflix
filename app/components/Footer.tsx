"use client";
import Toolbar from "@mui/material/Toolbar";

export default function Footer() {
  return (
    <Toolbar
      style={{
        textAlign: "center",
        flex: 1,
        height: "15vh",
        bottom: "0",
        position: "relative",
        backgroundColor: "#20263e",
      }}
    >
      <p> Netflix © 2024</p>
    </Toolbar>
  );
}
