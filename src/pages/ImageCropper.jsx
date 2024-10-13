import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCrop = useCallback(async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      // Convert the cropped image URL to a Blob
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      
      // Create a File from the Blob
      const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
      
      // Log the file to the console
      console.log(file);

      // You can now use this file for uploading to your server or any other purpose.
      
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {imageSrc && (
        <>
          <div className="crop-container">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="controls">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
            <button onClick={handleCrop}>Crop Image</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCropper;

export const getCroppedImg = (imageSrc, cropPixels) => {
  const canvas = document.createElement('canvas');
  const image = new Image();
  
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const scaleX = image.width / image.naturalWidth;
      const scaleY = image.height / image.naturalHeight;

      canvas.width = cropPixels.width;
      canvas.height = cropPixels.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        cropPixels.x * scaleX,
        cropPixels.y * scaleY,
        cropPixels.width * scaleX,
        cropPixels.height * scaleY,
        0,
        0,
        cropPixels.width,
        cropPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    };
    
    image.onerror = () => {
      reject(new Error('Failed to load image.'));
    };
    
    image.src = imageSrc;
  });
};
