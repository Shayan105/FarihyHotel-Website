// VerticalPicture.tsx
import React from "react";

interface VerticalPictureProps {
  imagePath: string;
  altText?: string;
  containerClass?: string;
  maxWidth?: string | number;
  ratio?: string;
  focusPosition?: string;
  // New prop
  onClick?: () => void;
}

const VerticalPicture: React.FC<VerticalPictureProps> = ({
  imagePath,
  altText = "Vertical display image",
  containerClass = "",
  maxWidth = "400px",
  ratio = "4 / 5",
  focusPosition = "center",
  onClick, // Destructure new prop
}) => {
  return (
    <div
      onClick={onClick} // Attach click handler
      className={`d-inline-block overflow-hidden shadow ${containerClass}`}
      style={{
        borderRadius: "0.375rem",
        maxWidth: maxWidth,
        width: "100%",
        // Add pointer cursor if onClick exists
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
      />
    </div>
  );
};

export default VerticalPicture;
