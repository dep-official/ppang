"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import ShortCard from "@/components/ShortCard/ShortCard"

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const PRELOADER_KEY = 'ppang-clinic-preloader-shown';

const eventCards = [
  {
    id: 1,
    image: "/service/001.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "주름보톡스",
    originalPrice: "18,000  50%",
    salePrice: "0.9"
  },
  {
    id: 2,
    image: "/service/002.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "지방분해주사",
    originalPrice: "18,000  50%",
    salePrice: "0.9"
  },
  {
    id: 3,
    image: "/service/003.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "보톡스",
    originalPrice: "30,000  50%",
    salePrice: "1.5"
  },
  {
    id: 4,
    image: "/service/004.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "물광주사",
    originalPrice: "58,000  50%",
    salePrice: "2.9"
  },
  {
    id: 5,
    image: "/service/005.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "슈링크",
    originalPrice: "60,000  50%",
    salePrice: "3"
  },
  {
    id: 6,
    image: "/service/006.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "인모드",
    originalPrice: "78,000  50%",
    salePrice: "3.9"
  },
  {
    id: 7,
    image: "/service/007.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "스킨부스터",
    originalPrice: "78,000  50%",
    salePrice: "3.9"
  },
  {
    id: 8,
    image: "/service/008.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "쥬베룩 아이",
    originalPrice: "78,000  50%",
    salePrice: "3.9"
  },
  {
    id: 9,
    image: "/service/009.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "실리프팅",
    originalPrice: "98,000  50%",
    salePrice: "4.9"
  },
  {
    id: 10,
    image: "/service/010.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "온다 (얼굴 10kj)",
    originalPrice: "98,000  50%",
    salePrice: "4.9"
  },
  {
    id: 11,
    image: "/service/011.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "PR-3 수액",
    originalPrice: "98,000  50%",
    salePrice: "4.9"
  },
  {
    id: 12,
    image: "/service/012.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "바디 체크 패키지",
    originalPrice: "98,000  50%",
    salePrice: "4.9"
  },
  {
    id: 13,
    image: "/service/013.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "쥬베룩 스킨",
    originalPrice: "98,000  50%",
    salePrice: "4.9"
  },
  {
    id: 14,
    image: "/service/014.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "지방분해주사",
    originalPrice: "118,000  50%",
    salePrice: "5.9"
  },
  {
    id: 15,
    image: "/service/015.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "스킨보톡스",
    originalPrice: "138,000  50%",
    salePrice: "6.9"
  },
  {
    id: 16,
    image: "/service/016.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "온다 (바디 10kj)",
    originalPrice: "158,000  50%",
    salePrice: "7.9"
  },
  {
    id: 17,
    image: "/service/017.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "입술 무제한 패키지",
    originalPrice: "158,000  50%",
    salePrice: "7.9"
  },
  {
    id: 18,
    image: "/service/018.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "쥬베룩 G",
    originalPrice: "178,000  50%",
    salePrice: "8.9"
  },
  {
    id: 19,
    image: "/service/019.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "목주름 필러",
    originalPrice: "198,000  50%",
    salePrice: "9.9"
  },
  {
    id: 20,
    image: "/service/020.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "애교살 or 코 필러",
    originalPrice: "318,000  50%",
    salePrice: "15.9"
  },
  {
    id: 21,
    image: "/service/021.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "무통 리쥬란 HB",
    originalPrice: "318,000  50%",
    salePrice: "15.9"
  },
  {
    id: 22,
    image: "/service/022.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "팔자주름 필러",
    originalPrice: "398,000  50%",
    salePrice: "19.9"
  },
  {
    id: 23,
    image: "/service/023.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "무제한 목주름 필 패키지",
    originalPrice: "498,000  50%",
    salePrice: "24.9"
  },
  {
    id: 24,
    image: "/service/024.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "전신 라인 관리 패키지",
    originalPrice: "598,000  50%",
    salePrice: "29.9"
  },
  {
    id: 25,
    image: "/service/025.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "팡V라인 풀패키지",
    originalPrice: "598,000  50%",
    salePrice: "29.9"
  },
  {
    id: 26,
    image: "/service/026.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "디자인 볼링크",
    originalPrice: "778,000  50%",
    salePrice: "38.9"
  },
  {
    id: 27,
    image: "/service/027.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "복부 365도 다이어트 패키지",
    originalPrice: "798,000  50%",
    salePrice: "39.9"
  },
  {
    id: 28,
    image: "/service/028.png",
    badge: "쁘띠",
    date: "~ 2026. 01. 31",
    title: "집중 아이 리프팅 패키지",
    originalPrice: "798,000  50%",
    salePrice: "39.9"
  },
  {
    id: 29,
    image: "/service/029.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "프리미엄 윤곽 리프팅 패키지",
    originalPrice: "2,198,000  50%",
    salePrice: "109.9"
  },
  {
    id: 30,
    image: "/service/030.png",
    badge: "지방프로그램",
    date: "~ 2026. 01. 31",
    title: "프리미엄 바디 BOX",
    originalPrice: "1,998,000  50%",
    salePrice: "99.9"
  }
];

const shortCards = [
  {
    id: 1,
    image: "/shorts/001.jpg",
    title: "윤곽 + 눈 + 코",
    originalPrice: "PPANG SHORTS",
    url: "https://www.instagram.com/reel/DSjr0SRiKOE/?igsh=NWM5ZndjNzluY3Rl",
    language: "KR"
  },
  {
    id: 2,
    image: "/shorts/002.jpg",
    title: "윤곽2종 + 코재수술",
    originalPrice: "PPANG SHORTS",
    url: "https://www.instagram.com/reel/DSXFGT5iTng/?igsh=MXhldjlvcHlzNHhyMA==",
    language: "CN"
  },
  {
    id: 3,
    image: "/shorts/001.jpg",
    title: "안보이는 뒷라인까지\n허벅지 돌려깎기",
    originalPrice: "PPANG SHORTS",
    language: "JP"
  },
  {
    id: 4,
    image: "/shorts/002.jpg",
    title: "승모근 집중관리\n패키지",
    originalPrice: "PPANG SHORTS",
    language: "EN"
  },
  {
    id: 5,
    image: "/shorts/001.jpg",
    title: "보톡스 50% 할인\n팡클리닉 오픈 감사제",
    originalPrice: "PPANG SHORTS",
    language: "KR"
  }
];

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const lenis = useLenis();
  const router = useRouter();

  useEffect(() => {
    // 클라이언트에서만 localStorage 체크
    const hasSeenPreloader = localStorage.getItem(PRELOADER_KEY);
    if (!hasSeenPreloader) {
      setShowPreloader(true);
    }
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
            if (typeof window !== 'undefined') {
              localStorage.setItem(PRELOADER_KEY, 'true');
            }
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
        <div className="hero-bg-image"></div>
        <div className="hero-bg">
          <iframe
            src="https://player.vimeo.com/video/1148645524?autoplay=1&muted=1&loop=1&background=1&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="팡클리닉"
          />
        </div>
        <div className="hero-gradient"></div>
      </section>
      

      <section className="events-container">
        <video
          className="events-bg-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/home/bg_main_2.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <div className="events-section">
            <Swiper
              modules={[Pagination]}
              pagination={{ 
                clickable: true,
                dynamicBullets: false
              }}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              className="events-banner-swiper"
            >
              <SwiperSlide>
                <Link href="/events" className="events-banner">
                  <Image src="/home/event_banner.webp" alt="events" width={1000} height={1000} />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="/events" className="events-banner">
                  <Image src="/home/event_banner.webp" alt="events" width={1000} height={1000} />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href="/events" className="events-banner">
                  <Image src="/home/event_banner.webp" alt="events" width={1000} height={1000} />
                </Link>
              </SwiperSlide>
            </Swiper>

            <div className="events-title-section">
              <div className="events-title-group">
                <Copy delay={0.1}>
                  <h2 className="events-main-title">
                   체형과 쁘띠를 연구하는<br/>
                   팡클리닉, 연구로 설계된<br/>
                   프로그램 이벤트
                  </h2>
                </Copy>
                <Copy delay={0.15}>
                  <p className="events-subtitle">
                    Science X Beauty Lab
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
                slidesPerGroup={1}
                breakpoints={{
                  1024: {
                    slidesPerView: 4,
                    grid: {
                      rows: 1,
                      fill: 'row',
                    },
                    slidesPerGroup: 1,
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

                
      {/* <section className="client-reviews-container">
        <div className="container">
          <Image 
            className="docter" 
            src="/clients/docter.png" 
            alt="의료진 소개"
            width={1200}
            height={800}
            unoptimized
          />
        </div>
      </section> */}

      <section className="short-container">
        <div className="container">
          <div className="short-section">
            <div className="short-title-section">
              <div className="short-title-group">
                <Copy delay={0.1}>
                  <h2 className="short-main-title">
                    <span className="short-main-title-language">GLOBAL <Image src="/topbar/ico-language.svg" alt="KR" width={32} height={32} /></span> <br/>
                    PPANG SHORTS 
                  </h2>
                </Copy>
                <Copy delay={0.15}>
                  <p className="short-subtitle">
                    전 세계가 주목하는 팡클리닉, <br/>
                    K-Beauty의 새로운 기준이 되다.
                  </p>
                </Copy>
              </div>
            </div>
            <div className="short-cards-swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, Grid]}
                spaceBetween={16}
                slidesPerView={2}
                grid={{
                  rows: 1,
                  fill: 'row',
                }}
                slidesPerGroup={2}
                navigation={true}
                breakpoints={{
                  1024: {
                    slidesPerView: 4,
                    grid: {
                      rows: 1,
                      fill: 'row',
                    },
                    slidesPerGroup: 1,
                  },
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={false}
                className="short-swiper"
              >
                {shortCards.map((card) => (
                  <SwiperSlide key={card.id}>
                    <ShortCard
                      image={card.image}
                      badge={card.badge}
                      date={card.date}
                      title={card.title}
                      originalPrice={card.originalPrice}
                      salePrice={card.salePrice}
                      url={card.url}
                      language={card.language}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="about-container">
        <a className="container" href="/doctor"> 
          <div>
            <h3 className="about-main-title">PPANG CLINIC GlOBAL<br/> K-Beauty의 기준이 되다</h3>
            <p className="about-main-subtitle">
              언어와 국경을 넘어 인정받는 실력. 
              <br/>
              전 세계가 찾아오는 팡클리닉의<br className="only-mobile"/>
              의료진을 소개합니다.
              </p>
              <AnimatedButton 
                label="자세히보기" 
                route={null}
                onClick={() => router.push('/doctor')}
              />
          </div>
          <Image src="/clients/docter.png" className="about-docter" alt="의료진소개" width={1000} height={1000} />
        </a>
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
                    오직 당신만을 위한<br className="only-mobile"/>
                    프라이빗 데이터 연구소<br/> 
                    VIP DATA ROOM
                </h3>

                <p style={{ marginTop: '14px', fontSize: '18px' }}>
                  홍대 파노라마 뷰가 펼쳐진 호텔급 프라이빗 룸.<br/> 
                  완벽하게 분리된 이 공간에서 당신의 데이터를 설계하고 디자인합니다.
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
