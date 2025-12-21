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
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import EventCard from "@/components/EventCard/EventCard";
import FloatingBar from "@/components/FloatingBar/FloatingBar";
import InteriorGallery from "@/components/InteriorGallery/InteriorGallery";
import Image from "next/image";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const eventCards = [
  {
    id: 1,
    image: "/service/001.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 2,
    image: "/service/002.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 3,
    image: "/service/003.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 4,
    image: "/service/004.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 5,
    image: "/service/005.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 6,
    image: "/service/006.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 7,
    image: "/service/007.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 8,
    image: "/service/008.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 9,
    image: "/service/009.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 10,
    image: "/service/010.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 11,
    image: "/service/011.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 12,
    image: "/service/012.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 13,
    image: "/service/013.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 14,
    image: "/service/014.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 15,
    image: "/service/015.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 16,
    image: "/service/016.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 17,
    image: "/service/017.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 18,
    image: "/service/018.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 19,
    image: "/service/019.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 20,
    image: "/service/020.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 21,
    image: "/service/021.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 22,
    image: "/service/022.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 23,
    image: "/service/023.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 24,
    image: "/service/024.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 25,
    image: "/service/025.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 26,
    image: "/service/026.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 27,
    image: "/service/027.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 28,
    image: "/service/028.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "승모근 집중관리\n패키지",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 29,
    image: "/service/029.png",
    badge: "쁘띠",
    date: "~ 2025. 12. 27",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "90,000  50%",
    salePrice: "90"
  },
  {
    id: 30,
    image: "/service/030.png",
    badge: "지방프로그램",
    date: "~ 2025. 12. 27",
    title: "9부위 용량 무제한\n전신풀튜닝",
    originalPrice: "90,000  50%",
    salePrice: "90"
  }
];

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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
            src="https://www.youtube.com/embed/KgbDa3-pFSg?autoplay=1&mute=1&loop=1&playlist=KgbDa3-pFSg&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
        <div className="hero-gradient"></div>
      </section>
      

      <section className="events-container">
        <div className="container">
          <div className="events-section">
            <div className="events-title-section">
              <div className="events-title-group">
                <Copy delay={0.1}>
                  <h2 className="events-main-title">
                    30년간의 연구,<br/>
                    PP-1·3 용량 무제한<br/>
                    지방분해주사
                  </h2>
                </Copy>
                <Copy delay={0.15}>
                  <p className="events-subtitle">
                    과학이 아름다움을 만든다.<br/>
                    체형 쁘띠를 연구하는 연구실
                  </p>
                </Copy>
              </div>
            </div>
            <div className="events-cards-swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, Grid]}
                spaceBetween={16}
                slidesPerView={2}
                grid={{
                  rows: 2,
                  fill: 'row',
                }}
                slidesPerGroup={2}
                breakpoints={{
                  1024: {
                    slidesPerView: 2,
                    grid: {
                      rows: 2,
                      fill: 'row',
                    },
                    slidesPerGroup: 2,
                  },
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={false}
                className="events-swiper"
              >
                {eventCards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <EventCard
                      image={card.image}
                      badge={card.badge}
                      date={card.date}
                      title={card.title}
                      originalPrice={card.originalPrice}
                      salePrice={card.salePrice}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
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
                <img src="/gallery-callout/001.webp" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img src="/gallery-callout/002.webp" alt="" />
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img src="/gallery-callout/004.webp" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img src="/gallery-callout/005.webp" alt="" />
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
              <AnimatedButton 
                label="자세히보기" 
                route={null}
                onClick={() => setIsGalleryOpen(true)}
              />
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
      <FloatingBar />
      <InteriorGallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
    </>
  );
}
