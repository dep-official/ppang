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
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
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
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <Nav />
      <section className="hero">
        <div className="hero-bg bg-black">
          <video autoPlay muted loop playsInline className="w-full h-full">
            <source src="/home/video_main.mp4" type="video/mp4" />
          </video>
          {/* <img src="/home/hero.jpg" alt="" /> */}
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 10 : 0.85}>
                <h1 className="leading-[1.3] text-[28px] font-bold">뷰티 실험실의 정교함<br/> 반평생 경험으로 완성하다.</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 10.15 : 1}>
                <p>
                과학이 아름다움을 만든다. <br/>
                체형 쁘띠를 연구하는 연구실
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="둘러보기"
              route="/"
              animateOnScroll={false}
              delay={showPreloader ? 10.3 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>2255+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>다이어트 성공 고객수</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>27</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>임상 연구기간(년)</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>2</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>평균 성공기간(개월)</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>150</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>비만데이터 분석 건수(만건)</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                {/* At Terrene, we design with purpose and clarity, creating spaces
                that speak through light, scale, and the quiet confidence of
                lasting form. */}
                K-Custom Fat Solution, supported by years of clinical research
                An unlimited-volume fat reduction solution
              </h1>
            </Copy>
          </div>
          {/* <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>
                  <span className="text-[18px] font-bold">
                    Fat Engineering Program
                  </span>
                </p>
              </Copy>

              <Copy delay={0.15}>
                <p>
                  <span className="text-[32px] font-bold">
                    체지방을 과학으로 설계하다
                  </span>
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>승모근</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>팔뚝</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>복부</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>러브핸들</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>옆구리</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>허벅지</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>종아리</h3>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <section className="events-container">
        <div className="container text-center">
          <div className="featured-projects-header-callout text-white mb-[32px]">
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
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Open Your Beauty, PPang Clinic</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>설레는 겨울, 팡클리닉 뷰티 연구소의 선물 상자가 도착했습니다.</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
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
                {/* <div className="gallery-callout-img-content">
                  <h3>5+</h3>
                  <p>VIP ROOM</p>
                </div> */}
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
