import React from "react";

interface VerticalPictureProps {
  imagePath: string;
  altText?: string;
  containerClass?: string;
  maxWidth?: string | number;
  ratio?: string;
  /** * Controls the focal point of the crop. 
   * Examples: "center", "top", "bottom", "left", "right", "50% 20%" 
   */
  focusPosition?: string; 
}

const VerticalPicture: React.FC<VerticalPictureProps> = ({
  imagePath,
  altText = "Vertical display image",
  containerClass = "",
  maxWidth = "400px",
  ratio = "4 / 5",
  focusPosition = "center", // Default remains center
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
          // This allows you to shift the image
          objectPosition: focusPosition, 
        }}
      />
    </div>
  );
};

export default VerticalPicture;