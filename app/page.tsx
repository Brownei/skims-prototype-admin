"use client"
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import LoginForm from "@/components/forms/loginForm";

 const RegisterPage = () => {  
  return (
    <section className="h-full w-full lg:bg-[#eceaf2]">
        <div className="flex flex-col justify-between items-center lg:flex-row">
            {/* Large Screen View  */}
            <Swiper className="hidden w-1/2 h-full z-30 lg:block" modules={[EffectFade, Autoplay]} effect="fade" autoplay>
                <SwiperSlide>
                    <Image className="w-full h-screen object-cover hidden lg:block" src={'https://cdn.sanity.io/images/hfqi0zm0/production/0ba25e33a89f1645800dcda38ac00c3bb04fbde5-706x894.jpg?q=95&auto=format'} width={1000} height={1000} quality={100} alt="1"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Image className="w-full h-screen object-cover hidden lg:block" src={'https://cdn.sanity.io/images/hfqi0zm0/production/4a2848b2be381cfc6df860ed85a6ff3ad04ceb85-706x894.jpg?q=95&auto=format'} width={1000} height={1000} quality={100} alt="1"/>
                </SwiperSlide>
                <SwiperSlide>
                    <Image className="w-full h-screen object-cover hidden lg:block" src={'https://cdn.sanity.io/images/hfqi0zm0/production/5ee76456b9499bed5a7a78cc55eb36946bed672e-706x894.jpg?q=95&auto=format'} width={1000} height={1000} quality={100} alt="1"/>
                </SwiperSlide>
            </Swiper>
            <div className="hidden bg-white p-10 m-5 rounded-lg min-h-full flex-1 flex-col justify-center z-30 lg:block">
                <h1 className="text-center font-ProExtraBold text-[2vw]">Register with SKIMS</h1>
                <p className="text-center font-ProLight text-sm mb-4">Here you can focus on creating a solution for every body</p>
                <LoginForm />
            </div>
        </div>

        {/* Small Screen View */}
        <div className="mx-auto absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-20 lg:hidden"/>
        <Swiper className="absolute top-0 left-0 right-0 bottom-0 -z-20 lg:hidden" modules={[EffectFade, Autoplay]} effect="fade" autoplay>
            <SwiperSlide>
                <Image className="w-full h-screen object-cover lg:hidden" src={'https://cdn.sanity.io/images/hfqi0zm0/production/0ba25e33a89f1645800dcda38ac00c3bb04fbde5-706x894.jpg?q=95&auto=format'} width={1000} height={1000} quality={100} alt="1"/>
            </SwiperSlide>
            <SwiperSlide>
                <Image className="w-full h-screen object-cover lg:hidden" src={'https://cdn.sanity.io/images/hfqi0zm0/production/4a2848b2be381cfc6df860ed85a6ff3ad04ceb85-706x894.jpg?q=95&auto=format'} width={1000} height={1000} quality={100} alt="1"/>
            </SwiperSlide>
            <SwiperSlide>
                <Image className="w-full h-screen object-cover lg:hidden" src={'https://cdn.sanity.io/images/hfqi0zm0/production/5ee76456b9499bed5a7a78cc55eb36946bed672e-706x894.jpg?q=95&auto=format'} width={1000} height={1000} quality={100} alt="1"/>
            </SwiperSlide>
        </Swiper>
        <div className="bg-white p-5 rounded-lg absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[80%] z-30 lg:hidden">
            <h1 className="text-center font-ProExtraBold text-[5vw]">SKIMS</h1>
            <p className="text-center font-ProLight text-sm mb-4">Solution for every body</p>
            <LoginForm />
        </div>
    </section>
  )
}

export default RegisterPage;