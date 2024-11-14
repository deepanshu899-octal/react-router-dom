import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import imagesCont from "./imagesCont"; // An array of image objects with `src`, `thumbnail`, and optionally `isSelected`

export default function ReactGridGallery() {
  const [images, setImages] = useState(imagesCont);
  const hasSelected = images.some((image) => image.isSelected);

  const handleSelect = (index) => {
    const nextImages = images.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setImages(nextImages);
  };

  const handleSelectAllClick = () => {
    const nextImages = images.map((image) => ({
      ...image,
      isSelected: !hasSelected,
    }));
    setImages(nextImages);
  };

  return (
    <div>
      <div className="p-t-1 p-b-1">
        <button onClick={handleSelectAllClick}>
          {hasSelected ? "Clear selection" : "Select all"}
        </button>
      </div>
      <Gallery
        images={images}
        onClickThumbnail={(index) => handleSelect(index)}
      />
    </div>
  );
}
