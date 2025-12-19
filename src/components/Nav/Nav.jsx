"use client";
import "./Nav.css";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import MenuBtn from "../MenuBtn/MenuBtn";
import TopBar from "../TopBar/TopBar";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(SplitText);

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const router = useRouter();
  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;

      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });

      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");

      h2Elements.forEach((h2, index) => {
        const split = SplitText.create(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      pElements.forEach((p, index) => {
        const split = SplitText.create(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onStart: () => {
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    } else {
    }
  }, [isAnimating, isNavigating]);

  const handleLinkClick = useCallback(
    (e, href) => {
      e.preventDefault();

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);
      navigateWithTransition(href);
    },
    [isNavigating, router, isOpen, setIsOpen]
  );

  const splitTextIntoSpans = (text) => {
    return text
      .split("")
      .map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;&nbsp;</span>
        ) : (
          <span key={index}>{char}</span>
        )
      );
  };

  const [expandedProgram, setExpandedProgram] = useState(null);

  const toggleProgram = (program) => {
    setExpandedProgram(expandedProgram === program ? null : program);
  };

  return (
    <div>
      <TopBar onMenuClick={toggleMenu} isMenuOpen={isOpen} />
      {!isOpen && <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />}
      <div className="menu" ref={menuRef}>
        <div className="menu-wrapper">
          {/* Desktop Menu */}
          <div className="menu-desktop">
            <div className="col col-1">
              <ul className="links">
                <li className="link">
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, "/")}
                  >
                    <h2>팡클리닉</h2>
                  </a>
                </li>
                <li className="link">
                  <a
                    href="/contact"
                    onClick={(e) => handleLinkClick(e, "/contact")}
                  >
                    <h2>오시는길</h2>
                  </a>
                </li>
                <li className="link">
                  <a
                    href="/interior"
                    onClick={(e) => handleLinkClick(e, "/interior")}
                  >
                    <h2>병원인테리어</h2>
                  </a>
                </li>
                <li className="link">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}
                  >
                    <h2>진료안내</h2>
                  </a>
                </li>
                <li className="link">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/events"); }}
                  >
                    <h2>이벤트</h2>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col col-2">
              <div className="socials">
                <div className="sub-col">
                  <div className="menu-meta menu-commissions">
                    <p>오시는길</p>
                    <p>서울특별시 마포구 양화로 140, 에이치큐브 9층<br/> 
                    (홍대입구역 9번 출구 앞, 애플스토어 건물)</p>
                  </div>
                  <div className="menu-meta">
                    <p>주차안내</p>
                    <p>건물 내 쾌적한 주차 타워 보유<br/>
                     - 승용차 및 중형 SUV까지 주차 가능</p>
                  </div>
                </div>
                <div className="sub-col">
                  <div className="menu-meta">
                    <p>진료시간</p>
                    <p> 월~금: 10:00~20:00<br />
                        토/일/공휴일: 10:00~17:00<br />
                        </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="menu-mobile">
            <div className="menu-section">
              <h2 className="menu-section-title">PROGRAM</h2>
              <div className="menu-section-content">
                <div className="menu-program-group">
                  <div className="menu-program-item">
                    <button 
                      className="menu-program-button"
                      onClick={() => toggleProgram("fat")}
                    >
                      <span>지방프로그램</span>
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 14 14" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={expandedProgram === "fat" ? "rotated" : ""}
                      >
                        <path d="M7 10.5L3.5 7L10.5 7L7 10.5Z" fill="#CCCCCC" stroke="#CCCCCC" strokeWidth="0.9"/>
                      </svg>
                    </button>
                    {expandedProgram === "fat" && (
                      <div className="menu-program-submenu">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}>PP-1·PP-3</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}>PP-5</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}>PP-7</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}>PM-1</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}>PM-3</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }}>PM-5</a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="menu-program-item">
                  <button className="menu-program-button">
                    <span>쁘띠</span>
                    
                  </button>
                </div>
                <div className="menu-program-item">
                  <button className="menu-program-button">
                    <span>레이저</span>
                    
                  </button>
                </div>
                <div className="menu-program-item">
                  <button className="menu-program-button">
                    <span>PA센터</span>
                    
                  </button>
                </div>
                <div className="menu-program-item">
                  <button className="menu-program-button">
                    <span>줄기세포</span>
                    
                  </button>
                </div>
              </div>
            </div>

            <div className="menu-divider"></div>


            <div className="menu-section">
              <h2 className="menu-section-title">팡클리닉</h2>
              <div className="menu-section-content">
                <a href="/contact" onClick={(e) => handleLinkClick(e, "/contact")} className="menu-story-link">
                  오시는길
                </a>
                <a href="/interior" onClick={(e) => handleLinkClick(e, "/interior")} className="menu-story-link">
                  병원인테리어
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }} className="menu-story-link">
                  진료안내
                </a>
              </div>
            </div>

            <div className="menu-divider"></div>

            <div className="menu-section">
              <h2 className="menu-section-title">STORY</h2>
              <div className="menu-section-content">
                <a href="/events" onClick={(e) => handleLinkClick(e, "/events")} className="menu-story-link">
                  이벤트
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }} className="menu-story-link">
                  리얼스토리
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick(e, "/"); }} className="menu-story-link">
                  후기
                </a>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
