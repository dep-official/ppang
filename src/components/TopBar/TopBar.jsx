"use client";
import "./TopBar.css";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { useViewTransition } from "@/hooks/useViewTransition";
import { useLenis } from "lenis/react";

const TopBar = ({ onMenuClick, isMenuOpen, onLogoClick }) => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  const [language, setLanguage] = useState("KR");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lenis = useLenis();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkScroll = (scrollY) => {
      // 스크롤 위치에 따라 배경 적용
      setHasScrolled(scrollY > 10);
      
      // 스크롤 방향 감지
      if (scrollY > lastScrollY.current && scrollY > 100) {
        // 아래로 스크롤하고 100px 이상 스크롤했을 때 숨김
        setIsVisible(false);
      } else if (scrollY < lastScrollY.current) {
        // 위로 스크롤하면 보이기
        setIsVisible(true);
      }
      
      lastScrollY.current = scrollY;
    };

    if (lenis) {
      const handleScroll = ({ scroll }) => {
        checkScroll(scroll);
      };

      lenis.on("scroll", handleScroll);
      checkScroll(lenis.scroll || 0); // 초기 상태 확인

      return () => {
        lenis.off("scroll", handleScroll);
      };
    } else {
      // Lenis가 없을 때 일반 스크롤 이벤트 사용
      const handleScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        checkScroll(scrollY);
      };
      
      handleScroll(); // 초기 상태 확인
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lenis]);
  
  return (
    <div 
      className={`top-bar ${hasScrolled ? "scrolled" : ""} ${!isVisible ? "hidden" : ""}`} 
      ref={topBarRef}
    >
      <div className="top-bar-logo">
        <a
          href="/"
          onClick={onLogoClick || ((e) => {
            e.preventDefault();
            navigateWithTransition("/");
          })}
        >
          <img src="/logos/logo_symbol.svg" alt="팡클리닉" />
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
        <button className="top-bar-user-btn">
          <Image 
            src="/topbar/ico-user.svg" 
            alt="사용자"
            width={48}
            height={48}
          />
        </button>
        <button 
          className={`top-bar-menu-btn ${isMenuOpen ? "open" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMenuClick();
          }}
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="menu-close-icon">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <Image 
              src="/topbar/ico-menu.svg" 
              alt="메뉴"
              width={24}
              height={24}
              className="menu-open-icon"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
