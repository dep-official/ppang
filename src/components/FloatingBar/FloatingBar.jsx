"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./FloatingBar.css";

export default function FloatingBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`floating-bar ${isVisible ? "visible" : ""}`}>
       <a 
        href="/events/reservation"
        rel="noopener noreferrer"
        className="floating-bar-button"
        aria-label="예약"
      >
        <Image 
          src="/floating-bar/ico-reservation.svg" 
          alt="예약"
          width={64}
          height={64}
        />
      </a>
      <a 
        href="/events"
        rel="noopener noreferrer"
        className="floating-bar-button"
        aria-label="이벤트"
      >
        <Image 
          src="/floating-bar/ico-events.svg" 
          alt="이벤트"
          width={64}
          height={64}
        />
      </a>
      <a 
        href="https://www.instagram.com/ppang_clinic"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-bar-button"
        aria-label="인스타그램 알림"
      >
        <Image 
          src="/floating-bar/ico-instagram-2.svg" 
          alt="인스타그램 알림"
          width={64}
          height={64}
        />
      </a>
      <a 
        href="https://www.youtube.com/@ppang_clinic"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-bar-button"
        aria-label="유튜브"
      >
        <Image 
          src="/floating-bar/ico-youtube.svg" 
          alt="유튜브"
          width={64}
          height={64}
        />
      </a>
      <a 
        href="https://pf.kakao.com/_tZgpn"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-bar-button"
        aria-label="카카오톡 채널"
      >
        <Image 
          src="/floating-bar/ico-kakao.svg" 
          alt="카카오톡 채널"
          width={64}
          height={64}
        />
      </a>
    </div>
  );
}

