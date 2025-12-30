"use client";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "./InteriorGallery.css";

export default function InteriorGallery({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const images = [
    "/gallery-callout/1.webp",
    "/gallery-callout/2.webp",
    "/gallery-callout/3-1.webp",
    "/gallery-callout/3.webp",
    "/gallery-callout/4.webp",
    "/gallery-callout/5.webp",
    "/gallery-callout/6.webp",
    "/gallery-callout/7.webp",
    "/gallery-callout/8.webp",
    "/gallery-callout/9.webp",
    "/gallery-callout/10.webp",
    "/gallery-callout/11.webp",
    "/gallery-callout/12.webp",
    "/gallery-callout/13.webp",
    "/gallery-callout/14.webp",
    "/gallery-callout/15.webp",
    "/gallery-callout/16.webp",
    "/gallery-callout/17.webp",
    "/gallery-callout/18.webp",
    "/gallery-callout/19.webp",
    "/gallery-callout/20.webp",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // 썸네일 스크롤 함수 (useEffect보다 먼저 정의)
  const scrollToThumbnail = useCallback((index) => {
    setTimeout(() => {
      const thumbnailsContainer = document.querySelector('.interior-gallery-thumbnails');
      const thumbnail = thumbnailsContainer?.children[index];
      
      if (thumbnail && thumbnailsContainer) {
        const containerWidth = thumbnailsContainer.clientWidth;
        const thumbnailWidth = thumbnail.offsetWidth;
        const gap = 12; // CSS gap 값
        
        // 썸네일 중앙 정렬을 위한 스크롤 위치
        const thumbnailCenter = (thumbnailWidth + gap) * index + (thumbnailWidth / 2);
        const scrollLeft = thumbnailCenter - (containerWidth / 2);
        
        thumbnailsContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }, 50);
  }, []);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    scrollToThumbnail(newIndex);
  }, [currentIndex, images.length, scrollToThumbnail]);

  const handlePrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    scrollToThumbnail(newIndex);
  }, [currentIndex, images.length, scrollToThumbnail]);

  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
    scrollToThumbnail(index);
  }, [scrollToThumbnail]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("gallery-modal-open");
      // 초기 로드 시 현재 썸네일을 중앙에 배치
      scrollToThumbnail(currentIndex);
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("gallery-modal-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("gallery-modal-open");
    };
  }, [isOpen, currentIndex, scrollToThumbnail]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="interior-gallery-overlay" onClick={onClose}>
      <div className="interior-gallery-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="interior-gallery-close"
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className="interior-gallery-nav interior-gallery-prev"
          onClick={handlePrev}
          aria-label="이전 이미지"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="interior-gallery-image-wrapper">
          <Image
            src={images[currentIndex]}
            alt={`Interior ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="interior-gallery-image"
            priority
          />
        </div>

        <button
          className="interior-gallery-nav interior-gallery-next"
          onClick={handleNext}
          aria-label="다음 이미지"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="interior-gallery-thumbnails">
          {images.map((img, index) => (
            <button
              key={index}
              className={`interior-gallery-thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`이미지 ${index + 1} 보기`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="thumbnail-image"
              />
            </button>
          ))}
        </div>

        <div className="interior-gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body
  );
}
