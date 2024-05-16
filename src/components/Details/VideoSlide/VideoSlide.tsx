import "./VideoSlide.scss";

import React from "react";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";
import { WithTestId } from "app/types/WithTestId";

const SafIcon = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafIcon),
  { ssr: false }
);

interface VideoSlideProps extends WithTestId {
  src: string;
  playable?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function VideoSlide({
  src,
  playable,
  onClick,
  "data-testid": testId,
}: VideoSlideProps) {
  if (playable) {
    return (
      <SwiperSlide
        onClick={onClick}
        data-testid={testId ?? "video-slide-playable"}
      >
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <iframe
            src={src}
            title={testId}
            width="950"
            height="565"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </SwiperSlide>
    );
  }
  return (
    <SwiperSlide
      onClick={onClick}
      data-testid={testId ?? "video-slide-non-playable"}
    >
      <div
        className="d-flex align-items-center justify-content-center w-100 h-100 video-slide-no-playable"
        style={{ backgroundImage: `url(${src})` }}
      >
        <SafIcon iconName="circle-play" size={64} color="white" />
      </div>
    </SwiperSlide>
  );
}

VideoSlide.displayName = "SwiperSlide";
