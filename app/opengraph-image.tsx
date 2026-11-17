import { ImageResponse } from "next/og";

export const alt = "Aorigoon — Apps and small AI models, built from scratch";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#fafaf9",
          color: "#1c1917",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-140px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: "1px solid rgba(28, 25, 23, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "1px solid rgba(161, 98, 7, 0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(28, 25, 23, 0.22)",
          }}
        />
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Aorigoon
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "72px",
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            maxWidth: "820px",
          }}
        >
          Apps and small AI models, built from scratch.
        </div>
        <div
          style={{
            marginTop: "28px",
            width: "64px",
            height: "2px",
            backgroundColor: "#a16207",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
