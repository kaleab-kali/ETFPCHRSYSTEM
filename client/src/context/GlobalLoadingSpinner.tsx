// GlobalLoadingSpinner.tsx
import React from "react";
import { Spin } from "antd";
import { useLoading } from "./LoadingContext";

const GlobalLoadingSpinner: React.FC = () => {
  const { loading } = useLoading();

  return loading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <Spin size="large" />
    </div>
  ) : null;
};

export default GlobalLoadingSpinner;
