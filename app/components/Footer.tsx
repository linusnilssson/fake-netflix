"use client";
import Toolbar from "@mui/material/Toolbar";

export default function Footer() {
  return (
    <Toolbar
      style={{
        justifyContent: "center",
        height: "15vh",
        position: "relative",
        backgroundColor: "#20262E",
        color: "white",
      }}
    >
      <p> Netflix. Inc © 2024</p>
    </Toolbar>
  );
}
