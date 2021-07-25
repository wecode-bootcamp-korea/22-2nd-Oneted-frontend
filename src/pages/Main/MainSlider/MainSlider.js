import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, A11y, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import styled from 'styled-components';

SwiperCore.use([Navigation, Autoplay, A11y]);

function MainSlider() {
  return (
    <>
      <Swiper navigation {...settings}>
        {SLIDE_IMAGE.map((image, index) => (
          <SwiperSlide key={index}>
            <Slide url={image.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default MainSlider;

const Slide = styled.div`
  background-image: url(${props => props.url});
  background-position: bottom;
  background-size: cover;
  height: 400px;
  margin-left: auto;
  margin-top: 51px;
  right: 0;
`;

const settings = {
  slidesPerView: 'auto',
  loop: true,
  loopAdditionalSlides: 1,
  autoplay: {
    delay: 5000,
  },
};

const SLIDE_IMAGE = [
  {
    url: 'images/slide1.jpg',
  },
  {
    url: 'images/slide2.jpg',
  },
  {
    url: 'images/slide3.jpg',
  },
];
