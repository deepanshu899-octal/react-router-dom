import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const images = [
  {
    original: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
  },
  {
    original: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
  },
  // Add more images here
  {
    original: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    embed: true, // Custom field to identify video
  },
];

export default function ImageGalleryModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Custom render function for video
  const renderVideo = (item) => (
    <video controls style={{ width: '100%' }}>
      <source src={item.original} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  return (
    <>
      {/* Display a single image that opens the gallery modal */}
      <div style={{ width: "100vw", display: 'flex', justifyContent: 'center' }}>
        <img
          className="w-full rounded cursor-pointer"
          src={images[0].original}
          alt="Main Image"
          onClick={openModal}
          style={{ width: "50vh" }}
        />
      </div>

      {/* Bootstrap Modal with the image gallery */}
      <Modal show={isOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageGallery
            items={images}
            showThumbnails={true}
            renderItem={(item) => item.embed ? renderVideo(item) : <img src={item.original} alt="" />}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
