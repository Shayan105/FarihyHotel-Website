// VerticalPicture.tsx
import React from "react";

interface VerticalPictureProps {
  imagePath: string;
  altText?: string;
  containerClass?: string;
  maxWidth?: string | number;
  ratio?: string;
  focusPosition?: string;
  onClick?: () => void;
}

const VerticalPicture: React.FC<VerticalPictureProps> = ({
  imagePath,
  altText = "Vertical display image",
  containerClass = "",
  maxWidth = "400px",
  ratio = "4 / 5",
  focusPosition = "center",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`d-inline-block overflow-hidden shadow ${containerClass}`}
      style={{
        borderRadius: "0.375rem",
        maxWidth: maxWidth,
        width: "100%",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <img
        src={imagePath}
        alt={altText}
        className="d-block w-100"
        style={{
          aspectRatio: ratio,
          objectFit: "cover",
          objectPosition: focusPosition,
        }}
        // --- LAZY LOADING ADDED HERE ---
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default VerticalPicture;