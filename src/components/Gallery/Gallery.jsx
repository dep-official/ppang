"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "./Gallery.css";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  const images = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `/archive/archive-${i + 1}.jpg`,
    alt: `Gallery Image ${i + 1}`,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedImage) {
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
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
      } else if (e.key === "ArrowRight") {
        const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images]);

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={500}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <>
          {createPortal(
            <div className="gallery-modal-overlay" onClick={() => setSelectedImage(null)}>
              <div className="gallery-modal-container" onClick={(e) => e.stopPropagation()}>
                <button
                  className="gallery-modal-close"
                  onClick={() => setSelectedImage(null)}
                  aria-label="닫기"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button
                  className="gallery-modal-nav gallery-modal-prev"
                  onClick={handlePrev}
                  aria-label="이전 이미지"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="gallery-modal-image-wrapper">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    className="gallery-modal-image"
                    priority
                  />
                </div>

                <button
                  className="gallery-modal-nav gallery-modal-next"
                  onClick={handleNext}
                  aria-label="다음 이미지"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="gallery-modal-counter">
                  {images.findIndex((img) => img.id === selectedImage.id) + 1} / {images.length}
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </>
  );
}
