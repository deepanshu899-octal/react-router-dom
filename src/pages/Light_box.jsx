import React, { useRef, useState } from 'react';
import { Modal, Box } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';

const images = [
  {
    original: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
  },
  {
    original: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
  },
  {
    original: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    embed: true,
  },
  {
    original: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
  },
  {
    original: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
  },
  {
    original: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    embed: true,
  },
  {
    original: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
  },
  {
    original: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
  },
  {
    original: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    embed: true,
  },
  {
    original: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
  },
  {
    original: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
  },
  {
    original: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    embed: true,
  },
  {
    original: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1527406099874-4bfdfe4d7431?q=80&w=2070&auto=format&fit=crop',
  },
  {
    original: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
  },
  {
    original: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1719164750222-5b133c3b52aa?q=80&w=1932&auto=format&fit=crop',
    embed: true,
  },
];

function VideoElement({item}){
  const videoRef = useRef(null);
  return(
    <video
    controls
    className="image-gallery-video"
    onFocus={(e) => e.target.play()} // Play video on focus
    onBlur={(e) => e.target.pause()} // Pause video on blur
    ref={videoRef}
    onMouseEnter={()=>{videoRef.current.play()}}
  >
    <source src={item.original} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  )
}

export default function ImageGalleryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const renderVideo = (item, index) => {
    return (
      <VideoElement item={item}/>
  )};

  // Custom next button
  const customRightNav = (onClick) => (
    <ArrowRightTwoToneIcon
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        zIndex: 1,
      }}
    />
  );

  // Custom previous button
  const customLeftNav = (onClick) => (
    <ArrowLeftIcon
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        zIndex: 1,
      }}
    />
  );

  return (
    <>
      {/* Display a single image that opens the gallery modal */}
      <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <img
          className="w-full rounded cursor-pointer"
          src={images[0].original}
          alt="Main Image"
          onClick={openModal}
          style={{ width: '50vh' }}
        />
      </div>

      {/* Material-UI Modal with a custom width */}
      <Modal open={isOpen} onClose={closeModal} closeAfterTransition sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '80vw',
            maxWidth: '1200px',
            margin: 'auto',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            outline: 'none',
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="image-gallery-wrapper">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              renderItem={(item, index) =>
                item.embed ? renderVideo(item, index) : <img src={item.original} className="image-gallery-image" alt="" />
              }
              showIndex
              renderRightNav={customRightNav}
              renderLeftNav={customLeftNav}
              // onBeforeSlide={(currentIndex)=>{console.log(currentIndex)}}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
}

// {
//   _id: ObjectId,
//   ownerId: Objectid - which would be userId,
//   otherUserid: ObjectId - which would be other user id,
//   lastMessageDetails: {
//                         senderId:"",
//                         receiverId: "",
//                         messageType: "",
//                         message: "",
//                         seen:"",-optional
//                       },
//  messages:[
//   {
//     senderId:"",
//     receiverId: "",
//     messageType: "",
//     message: "",
//     seen:"",-optional
//   }...........
//  ]
// }