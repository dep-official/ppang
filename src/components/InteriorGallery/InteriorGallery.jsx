"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "./InteriorGallery.css";

export default function InteriorGallery({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const images = [
    "/gallery-callout/001.webp",
    "/gallery-callout/002.webp",
    "/gallery-callout/004.webp",
    "/gallery-callout/005.webp",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("gallery-modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("gallery-modal-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("gallery-modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
              onClick={() => setCurrentIndex(index)}
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
