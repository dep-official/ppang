"use client";
import "./TopBar.css";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { useViewTransition } from "@/hooks/useViewTransition";
import { useAuth } from "@/hooks/useAuth";
// Lenis 제거됨 - 네이티브 스크롤 사용

const TopBar = ({ onMenuClick, isMenuOpen, onLogoClick }) => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  const { isAuthenticated, user, logout } = useAuth();
  const [language, setLanguage] = useState("KR");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const userMenuRef = useRef(null);

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

    // 네이티브 스크롤 이벤트 사용
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      checkScroll(scrollY);
    };
    
    handleScroll(); // 초기 상태 확인
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogin = () => {
    setIsUserMenuOpen(false);
    navigateWithTransition("/login");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      alert("로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const handleMyPage = () => {
    setIsUserMenuOpen(false);
    navigateWithTransition("/mypage");
  };
  
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
            navigateWithTransition("/?skip=true");
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
        
        {/* 사용자 메뉴 드롭다운 */}
        <div className="top-bar-user-menu" ref={userMenuRef}>
          <button 
            className="top-bar-user-btn"
            onClick={handleUserMenuToggle}
            aria-label="사용자 메뉴"
          >
            <Image 
              src="/topbar/ico-user.svg" 
              alt="사용자"
              width={48}
              height={48}
            />
          </button>

          {isUserMenuOpen && (
            <div className="user-dropdown-menu">
              {isAuthenticated ? (
                <>
                  <div className="user-dropdown-header">
                    <span className="user-name">{user?.name || "사용자"}님</span>
                  </div>
                  <button 
                    className="user-dropdown-item"
                    onClick={handleMyPage}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    마이페이지
                  </button>
                  <button 
                    className="user-dropdown-item"
                    onClick={handleLogout}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    로그아웃
                  </button>
                </>
              ) : (
                <button 
                  className="user-dropdown-item"
                  onClick={handleLogin}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V3.33333C14 2.97971 13.8595 2.64057 13.6095 2.39052C13.3594 2.14048 13.0203 2 12.6667 2H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33333 11.3333L2 8L5.33333 4.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  로그인
                </button>
              )}
            </div>
          )}
        </div>
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
