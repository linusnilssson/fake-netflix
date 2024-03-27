"use client";
import Toolbar from "@mui/material/Toolbar";

export default function Footer() {
  return (
    <Toolbar
      style={{
        justifyContent: "space-between",
        height: "15vh",
        position: "relative",
        backgroundColor: "00000",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <p> 1997-2024 © Netflix. Inc</p>

      <ul
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <li style={{ listStyle: "none", cursor: "pointer" }}>Home</li>
        <li style={{ listStyle: "none", cursor: "pointer" }}>Privacy</li>
        <li style={{ listStyle: "none", cursor: "pointer" }}>Help Center</li>
        <li style={{ listStyle: "none", cursor: "pointer" }}>Terms Of Use</li>
        <li style={{ listStyle: "none", cursor: "pointer" }}>Contact Us</li>
      </ul>
    </Toolbar>
  );
}
