import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Stars from "../Stars/Stars";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const reviews = [
  { name: "Sarah Johnson", text: "The black striped t-shirt is my new favorite! Super comfortable fit and the quality is top-notch. Will definitely buy more from here!", rating: 5 },
  { name: "Mike Chen", text: "Ordered the gradient graphic tee and it arrived in 2 days. Perfect for gym sessions, great material that doesn't fade after washes.", rating: 4.8 },
  { name: "Emily Davis", text: "Love the customer service! Had an issue with sizing on the skinny jeans, they exchanged it hassle-free. Highly recommend!", rating: 5 },
  { name: "David Wilson", text: "The polo shirts with contrast trims are stylish and versatile. Wore it to work and got compliments all day.", rating: 4.7 },
  { name: "Lisa Rodriguez", text: "One Life Graphic T-shirt exceeded expectations. Bold design, soft fabric, perfect casual look for weekends.", rating: 4.9 },
  { name: "James Taylor", text: "Faded skinny jeans fit like a glove. Great price for the quality, and free shipping made it even better.", rating: 4.6 },
  { name: "Anna Kowalski", text: "Exceptional variety of formal and party wear. The vertical striped shirt is elegant and well-made.", rating: 5 }
];

export default function Testimonials() {
  return (
    <div className="lg:max-w-6xl w-full mx-auto sm:px-4 xs:px-0 lg:py-12 relative">

      <div className="swiper-wrapper-relative"> {/* Wrapper for positioning */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 4000 }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >

          {reviews.map((review, i) => (
            <SwiperSlide key={i} className=" py-6 sm:px-4 px-0">
              <div className="bg-white/80 shadow-lg p-8 rounded-2xl  border border-gray h-fit min-h-62.5 flex flex-col ">

                <div>
                  <h4 className="font-bold text-xl">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Stars rate={review.rating} />
                    <span className="font-semibold">
                      {review.rating}
                    </span>
                  </div>

                </div>
                <div className=" py-4 rounded-xl ">
                  <p className="text-gray-800 italic font-medium">
                    "{review.text}"
                  </p>
                </div>


              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
          <div className="absolute  lg:left-143 lg:top-100 sm:top-81.5 sm:left-48.75 md:left-85.75 top-94.5 left-30.75 ">
      <button className="custom-next text-white bg-black absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12  rounded-full shadow-2xl  hover:scale-110 hover:rotate-12 transition-all duration-300 flex items-center justify-center lg:text-xl text-[14px] font-bold border-2 border-white/30 backdrop-blur-sm" aria-label="Previous slide">
        <MdOutlineKeyboardArrowRight />
      </button>
      <button className="custom-prev text-white bg-black absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-2xl  hover:scale-110 hover:-rotate-12 transition-all duration-300 flex items-center justify-center lg:text-xl text-[14px] font-bold border-2 border-white/30 backdrop-blur-sm" aria-label="Previous slide">
        <MdOutlineKeyboardArrowLeft />
      </button>
          </div>

      <div className="custom-pagination mt-8 flex justify-center gap-2 z-10">
      </div>

    </div>
  );
}