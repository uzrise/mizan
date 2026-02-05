import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b4b3f",
        }}
      >
        <div
          style={{
            fontSize: 200,
            fontWeight: 800,
            fontFamily: "Inter, Arial, sans-serif",
            color: "#bfe7b9",
            letterSpacing: "-8px",
            textTransform: "lowercase",
          }}
        >
          mizan
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
