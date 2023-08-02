import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode"
import 'swiper/css/pagination';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Course_Card from "./Course_Card";

function CourseSlider({courses}){
    return (
        <div>
{
    courses?.length?(
        <Swiper 
        slidesPerView={1}
        loop={true} 
        

        spaceBetween={30}
        modules={
            [Autoplay , Pagination]
        }
        pagination={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
 {
    courses?.map((course ,index)=>(
        <SwiperSlide  key={index}>
            <Course_Card course={course} height={"h-[250px]"} />

        </SwiperSlide>
    ))
 }
        </Swiper>
     ):(
 <div>No Course Found </div>    )
}
        </div>
    )
}

export default CourseSlider;