"use client";
import "./TopBar.css";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const TopBar = ({ onMenuClick, isMenuOpen }) => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  const [language, setLanguage] = useState("KR");
  let lastScrollY = 0;
  let isScrolling = false;

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;

    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;

      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  });

  return (
    <div className="top-bar" ref={topBarRef}>
      <div className="top-bar-logo">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
          }}
        >
          <img src="/logos/logo.svg" alt="팡클리닉" />
        </a>
      </div>
      <div className="top-bar-right">
        <div className="top-bar-language">
          <Image 
            src="/topbar/ico-language.svg" 
            alt="언어 선택"
            width={24}
            height={24}
          />
          <span className="language-text">{language}</span>
        </div>
        {isMenuOpen ? (
          <button 
            className="top-bar-menu-btn open"
            onClick={onMenuClick}
            aria-label="메뉴 닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <button 
            className="top-bar-menu-btn"
            onClick={onMenuClick}
            aria-label="메뉴 열기"
          >
            <Image 
              src="/topbar/ico-menu.svg" 
              alt="메뉴"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
