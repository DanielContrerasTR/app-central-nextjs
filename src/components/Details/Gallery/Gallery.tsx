/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import "swiper/css";
import "./Gallery.scss";

import { useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";

import "swiper/css/free-mode";

import { VideoSlide } from "../VideoSlide/VideoSlide";

const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);
const SafButton = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafButton),
  { ssr: false }
);
const SafDialog = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafDialog),
  { ssr: false }
);

interface GalleryProps {
  video?: string;
  images: string[];
}

export function Gallery({ images, video }: GalleryProps) {
  const [swiperRef, setSwiperRef] = useState<any | null>(null);
  const [videoPlayable, setVideoPlayable] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [videoImage, ...restImages] = images;

  const closeModal = () => {
    setVideoPlayable(false);
    setIsOpen(false);
  };

  const openModal = () => {
    video && swiperRef?.activeIndex === 0 && setVideoPlayable(true);
    setIsOpen(true);
  };

  return (
    <>
      <Swiper
        spaceBetween={8}
        slidesPerView={3.3}
        modules={[FreeMode, Mousewheel]}
        freeMode={true}
        mousewheel={true}
        className="lower-carrousel"
        data-testid="gallery-carrousel"
      >
        <div>
          {video && (
            <VideoSlide
              src={videoImage}
              onClick={() => {
                swiperRef?.slideTo(0);
                openModal();
              }}
              data-testid="gallery-video-slide"
            />
          )}
          {(video ? restImages : images).map((img, index) => (
            <SwiperSlide
              key={img}
              onClick={() => {
                const slideIndex = video ? index + 1 : index + 1;
                swiperRef?.slideTo(slideIndex);
                openModal();
              }}
              data-testid={`gallery-image-slide-${index}`}
              role="region"
              aria-label="gallery"
              tabIndex={0}
            >
              <img src={img} alt={`gallery-${index}`} className="d-block" />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      <SafDialog
        modal
        hidden={!isOpen}
        onClose={closeModal}
        className="position-absolute top-0 gallery-dialog"
        data-testid="gallery-modal"
        isHeader="false"
      >
        <div className="d-flex top-0 start-0 justify-content-between align-items-center gallery-dialog-header">
          <span className="gallery-dialog-header-title">
            Syncly demo - iManage and HighQ Integration
          </span>
          <SafButton onClick={closeModal}>
            <div className="d-flex align-items-center">
              <SafIcon
                slot="start"
                className="d-flex align-items-center"
                iconName="xmark-large"
                data-testid="gallery-close-modal-button"
              />
            </div>
          </SafButton>
        </div>
        <div
          className="d-flex align-items-center gallery-dialog-content"
          onClick={closeModal}
        >
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={1}
            className="mh-100 full-screen-carrousel"
          >
            {video && (
              <VideoSlide
                onClick={e => {
                  e.preventDefault();
                }}
                playable={videoPlayable}
                src={video}
                data-testid="gallery-modal-video-slide"
              />
            )}
            {(video ? restImages : images).map(img => (
              <SwiperSlide key={img}>
                <img src={img} alt="" className="d-block w-100 h-100 p-3" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SafDialog>
    </>
  );
}
