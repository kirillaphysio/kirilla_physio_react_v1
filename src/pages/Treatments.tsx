import React from 'react';
import {isMobile} from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import {opinions} from "../components/opinions/opinions";
import "../components/opinions/opinions.scss"

const Treatments: React.FC = () => {
  return (
    <div className="landing-page">
      Egyeni kezelesek

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        grabCursor={true}
        loop={true}
        modules={[Autoplay, Navigation, Pagination, A11y]}
        navigation
        pagination={{ dynamicBullets: true }}
        slidesPerView={isMobile ? 1 : 3}
        spaceBetween={32}
        style={{
          "--swiper-navigation-size": "22px"
        }}
      >
        {opinions.map((opinion: any) => (<SwiperSlide className={`opinion ${isMobile ? "mobile" : "desktop"}`}>
          <p className="message">{opinion.description}</p>
          <div className="author">{opinion.author}</div>
        </SwiperSlide>))}
      </Swiper>
    </div>
  );
};

export default Treatments;