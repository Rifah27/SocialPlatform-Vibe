import React from "react";
import { FaClock, FaRocket } from "react-icons/fa";

export default function FeatureView({ title = "Feature", icon: Icon = FaRocket }) {
  return (
    <div
      className="feature-view glass-panel"
      style={{
        padding: "60px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        minHeight: "60vh",
        background: "rgba(255, 255, 255, 0.7)",
        border: "1px solid #fff",
        borderRadius: "32px",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          background: "var(--gradient-primary)",
          borderRadius: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "3rem",
          boxShadow: "0 20px 40px rgba(157, 80, 187, 0.2)",
        }}
      >
        <Icon />
      </div>

      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#1e293b",
          margin: 0,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#64748b",
          fontSize: "1.1rem",
          maxWidth: "400px",
          margin: 0,
        }}
      >
        We&apos;re currently building something amazing for the{" "}
        <strong>{title}</strong> section. Stay tuned!
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#9d50bb",
          fontWeight: "700",
          background: "rgba(157, 80, 187, 0.05)",
          padding: "12px 24px",
          borderRadius: "100px",
        }}
      >
        <FaClock />
        <span>Coming Soon in Vibera 2.0</span>
      </div>
    </div>
  );
}