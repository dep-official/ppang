"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import "./real-story.css";

export default function RealStoryPage() {
  const router = useRouter();

  const realStories = [
    {
      id: 1,
      name: "나카무라 레이나님",
      image: "/real-story/001.webp",
      hashtag: "#강남",
    },
    {
      id: 2,
      name: "키타다 리리나님",
      image: "/real-story/002.webp",
      hashtag: "#강남",
    },
    {
      id: 3,
      name: "구하나님",
      image: "/real-story/003.webp",
      hashtag: "#강남",
    },
    {
      id: 4,
      name: "Takeuchi님",
      image: "/real-story/004.webp",
      hashtag: "#강남",
    },
    {
      id: 5,
      name: "Kiyora님",
      image: "/real-story/005.webp",
      hashtag: "#강남",
    },
  ];


  return (
    <>
      <Nav />
      <div className="real-story-page">
        <div className="real-story-container">
          <div className="real-story-title-section">
            <h1 className="real-story-main-title">PPANG REAR REAL STORY</h1>
            <p className="real-story-subtitle">쁘띠와 체형의 완벽한 밸런스, 오직 한 사람만을 위해</p>
            <p className="real-story-subtitle">설계된 디자인 Customizing Your Beauty.</p>
          </div>
          
          {/* 대표스토리 섹션 */}
          <section className="real-story-featured">
            <h2 className="real-story-section-title">대표스토리</h2>
            <div className="real-story-featured-cards">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 4.5,
                    spaceBetween: 24,
                  },
                }}
                className="real-story-featured-swiper"
              >
                {realStories.map((story) => (
                  <SwiperSlide key={story.id}>
                    <div className="real-story-card">
                      <div className="real-story-card-image">
                        <Image
                          src={story.image}
                          alt={story.name}
                          width={300}
                          height={400}
                          className="real-story-img"
                        />
                        <div className="real-story-card-overlay">
                          <div className="real-story-card-content">
                            <span className="real-story-label">Real Story</span>
                            <h3 className="real-story-name">{story.name}</h3>
                            <span className="real-story-hashtag">{story.hashtag}</span>
                          </div>
                          <AnimatedButton
                            label="View more"
                            onClick={() => router.push(`/real-story/${story.id}`)}
                            animate={false}
                            animateOnScroll={false}
                            iconType="plus"
                            variant="full"
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* 전체 스토리 그리드 섹션 */}
          <section className="real-story-grid-section">
            <h2 className="real-story-section-title">전체 스토리</h2>
            <div className="real-story-grid">
              {realStories.map((story) => (
                <div 
                  key={story.id} 
                  className="real-story-grid-card"
                  onClick={() => router.push(`/real-story/${story.id}`)}
                >
                  <div className="real-story-grid-card-image">
                    <Image
                      src={story.image}
                      alt={story.name}
                      width={300}
                      height={400}
                      className="real-story-grid-img"
                    />
                    <div className="real-story-grid-card-overlay">
                      <div className="real-story-grid-card-content">
                        <span className="real-story-label">Real Story</span>
                        <h3 className="real-story-name">{story.name}</h3>
                        <span className="real-story-hashtag">{story.hashtag}</span>
                      </div>
                      <AnimatedButton
                        label="View more"
                        onClick={() => router.push(`/real-story/${story.id}`)}
                        animate={false}
                        animateOnScroll={false}
                        iconType="plus"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <ConditionalFooter />
    </>
  );
}

