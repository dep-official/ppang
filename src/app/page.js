"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import Image from "next/image";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-100%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }
      });

      tl.to(".spinner", {
        opacity: 0,
        duration: 0.3,
      });

      tl.to(
        ".word h1",
        {
          y: "0%",
          duration: 1,
        },
        "<"
      );

      tl.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () =>
          gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
      });

      tl.to("#word-1 h1", {
        y: "100%",
        duration: 1,
        delay: 0.3,
      });

      tl.to(
        "#word-2 h1",
        {
          y: "-100%",
          duration: 1,
        },
        "<"
      );

      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "<"
      );
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="intro-logo">
            <div className="word" id="word-1">
              <h1>
                <span>PPANG</span>
              </h1>
            </div>
            <div className="word" id="word-2">
              <h1>CLINIC</h1>
            </div>
          </div>
          <div className="divider"></div>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <Nav />
      <section className="hero">
        <div className="hero-bg">
          <iframe
            src="https://www.youtube.com/embed/rlb8gJGG9TA?autoplay=1&mute=1&loop=1&playlist=rlb8gJGG9TA&controls=0&modestbranding=1&rel=0&showinfo=0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
        <div className="hero-gradient"></div>
      </section>
      

      <section className="events-container">
        <div className="container text-center">
          <div className="featured-projects-header-callout mb-[32px]">
            <Copy delay={0.1}>
              <p>Open Your Beauty, PPang Clinic</p>
            </Copy>
          </div>
          <div className="featured-projects-header text-white">
            <Copy delay={0.15}>
              <h2 className="events-title">
                30년간의 연구,<br/>
                PP-1·3 용량 무제한<br/>
                지방분해주사
              </h2>
            </Copy>
          </div>
        </div>
        <div className="mt-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={64}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            // navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="service-swiper"
          >
            {Array.from({ length: 15 }, (_, i) => {
              const image1 = String(i * 2 + 1).padStart(3, '0');
              const image2 = String(i * 2 + 2).padStart(3, '0');
              return (
                <SwiperSlide key={i} className="!h-auto">
                  <div className="grid grid-cols-1 gap-[64px] h-full">
                    <div className="aspect-square">
                      <Image 
                        src={`/service/${image1}.png`} 
                        width={1000} 
                        height={1000} 
                        alt={`PP-${image1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="aspect-square">
                      <Image 
                        src={`/service/${image2}.png`} 
                        width={1000} 
                        height={1000} 
                        alt={`PP-${image2}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      <section className="client-reviews-container">
        <div className="container">
          {/* <div className="client-reviews-header-callout">
            <p className="text-[16px] font-bold text-white">introduce</p>
          </div> */}
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img src="/gallery-callout/gallery-callout-1.jpg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img src="/gallery-callout/gallery-callout-2.jpg" alt="" />
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img src="/gallery-callout/gallery-callout-3.jpg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img src="/gallery-callout/gallery-callout-4.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                    당신만의 데이터를 설계하는<br/> 
                    VIP CENTER
                </h3>
                <p style={{ marginTop: '14px', fontSize: '18px' }}>
                  오직 한 사람을 위한 맞춤 시술 공간인
                  VIP 센터를 운영합니다.
                </p>
              </Copy>
              <AnimatedButton label="자세히보기" route="/interior" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="/home/home.jpg"
        header="PPANG CLINIC"
        callout="Science creates beauty."
        description="science and aesthetics come together to create personalized body transformation solutions."
      />
      <ConditionalFooter />
    </>
  );
}
