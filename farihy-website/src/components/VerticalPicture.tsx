import React from "react";

interface VerticalPictureProps {
  imagePath: string;
  altText?: string;
  containerClass?: string;
  maxWidth?: string | number;

  ratio?: string;
}

const VerticalPicture: React.FC<VerticalPictureProps> = ({
  imagePath,
  altText = "Vertical display image",
  containerClass = "",
  maxWidth = "400px",
  ratio = "4 / 5",
}) => {
  return (
    <div
      className={`d-inline-block overflow-hidden shadow ${containerClass}`}
      style={{
        borderRadius: "40px",
        maxWidth: maxWidth,
        width: "100%",
      }}
    >
      <img
        src={imagePath}
        alt={altText}
        className="d-block w-100"
        style={{
          aspectRatio: ratio,
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default VerticalPicture;
