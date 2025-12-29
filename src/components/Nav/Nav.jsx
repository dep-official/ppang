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
      const submenuLinks = menu.querySelectorAll(".menu-program-submenu a, .menu-story-link");
      const menuButtons = menu.querySelectorAll(".menu-program-button span");

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

      // 메뉴 버튼들에 SplitText 적용 (프로그램 버튼들 - 먼저)
      menuButtons.forEach((button, index) => {
        const split = SplitText.create(button, {
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

      // 서브메뉴 링크들에 SplitText 적용 (커뮤니티, 팡클리닉 - 나중에)
      submenuLinks.forEach((link, index) => {
        const split = SplitText.create(link, {
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

      // SplitText 재초기화 (메뉴가 열릴 때마다)
      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");
      const submenuLinks = menu.querySelectorAll(".menu-program-submenu a, .menu-story-link");
      const menuButtons = menu.querySelectorAll(".menu-program-button span");

      // 기존 split 정리
      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      // h2 요소들에 SplitText 적용
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

      // p 요소들에 SplitText 적용
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

      // 메뉴 버튼들에 SplitText 적용 (프로그램 버튼들 - 먼저)
      menuButtons.forEach((button, index) => {
        const split = SplitText.create(button, {
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

      // 서브메뉴 링크들에 SplitText 적용 (커뮤니티, 팡클리닉 - 나중에)
      submenuLinks.forEach((link, index) => {
        const split = SplitText.create(link, {
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

      menu.style.pointerEvents = "all";

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      // 텍스트 애니메이션 시작
      splitTextRefs.current.forEach((split, index) => {
        gsap.to(split.lines, {
          y: "0%",
          stagger: 0.05,
          delay: 0.35 + index * 0.1,
          duration: 1,
          ease: "power4.out",
        });
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
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const toggleProgram = (programId) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
  };

  // 서브메뉴가 열릴 때 애니메이션 적용
  useEffect(() => {
    if (!menuRef.current || !isOpen) return;

    const menu = menuRef.current;
    
    // 약간의 지연 후 새로 나타난 서브메뉴 링크 찾기
    setTimeout(() => {
      const newlyVisibleSubmenus = menu.querySelectorAll(
        `.menu-program-submenu a`
      );

      // 새로 나타난 서브메뉴 링크들에만 SplitText 적용
      newlyVisibleSubmenus.forEach((link) => {
        // 이미 split이 적용된 요소는 제외
        if (link.querySelector(".split-line")) return;

        const split = SplitText.create(link, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);

        // 애니메이션 실행
        gsap.to(split.lines, {
          y: "0%",
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        });
      });
    }, 50);
  }, [expandedProgram, isOpen]);

  const menuItems = [
    {
      id: "program",
      title: "지방프로그램",
      href: "/",
      mobileSection: "프로그램",
      submenu: [
        { title: "PP-1", href: "/" },
        { title: "PP-3", href: "/" },
        { title: "PP-5", href: "/" },
        { title: "PP-7", href: "/" },
        { title: "PP-8·PP-9", href: "/" }
      ],
    },
    {
      id: "clinic",
      title: "쁘띠",
      href: "/",
      mobileSection: "프로그램",
      submenu: [
        { title: "PB프로그램", href: "/" },
        { title: "보톡스", href: "/" },
        { title: "필러", href: "/" },
        { title: "레이저", href: "/" },
        { title: "실리프팅", href: "/" },
      ],
    },
    {
      id: "pa",
      title: "PA센터",
      href: "/",
      mobileSection: "프로그램",
      submenu: [
        { title: "NP 무통프로그램", href: "/" },
        { title: "PR 수액프로그램", href: "/" },
      ],
    },
    {
      id: "events",
      title: "커뮤니티",
      href: "/",
      mobileSection: "커뮤니티",
      mobileSubmenu: [
        { title: "이벤트 · 체험가", href: "/events" },
        { title: "리얼모델", href: "/real-story" },
        { title: "전후사진", href: "/" },
      ],
      submenu: [
        { title: "이벤트 · 체험가", href: "/events" },
        { title: "리얼모델", href: "/real-story" },
        { title: "전후사진", href: "/" },
      ],
    },
    {
      id: "about",
      title: "팡클리닉",
      href: "/events",
      mobileSection: "팡클리닉",
      mobileSubmenu: [
        { title: "오시는길", href: "/contact" },
        { title: "병원인테리어", href: "/interior" },
        { title: "의료진소개", href: "/doctor" },
      ],
      submenu: [
        { title: "오시는길", href: "/contact" },
        { title: "병원인테리어", href: "/interior" },
        { title: "의료진소개", href: "/doctor" },
      ],
    },
  ];

  // Mobile 메뉴 섹션별 그룹화
  const mobileMenuSections = menuItems.reduce((acc, item) => {
    if (item.mobileSection) {
      if (!acc[item.mobileSection]) {
        acc[item.mobileSection] = [];
      }
      acc[item.mobileSection].push(item);
    }
    return acc;
  }, {});

  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();
      const currentPath = window.location.pathname;
      
      // 현재 페이지가 메인 페이지가 아니거나 메뉴가 열려있으면 네비게이션
      if (currentPath !== "/" || isOpen) {
        if (isOpen) {
          setIsOpen(false);
        }
        if (!isNavigating) {
          setIsNavigating(true);
          navigateWithTransition("/");
        }
      }
    },
    [isOpen, isNavigating, navigateWithTransition]
  );

  return (
    <div>
      <TopBar 
        onMenuClick={toggleMenu} 
        isMenuOpen={isOpen} 
        onLogoClick={handleLogoClick}
      />
      {/* {!isOpen && <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />} */}
      <div className="menu" ref={menuRef}>
        <div className="menu-wrapper">
          {/* Desktop Menu */}
          <div className="menu-desktop">
            <div 
              className="menu-main-area"
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className="col col-1">
                <ul className="links">
                {menuItems.map((item) => (
                  <li 
                    key={item.id}
                    className="link"
                    onMouseEnter={() => {
                      if (item.submenu) {
                        setHoveredMenu(item.id);
                      } else {
                        setHoveredMenu(null);
                      }
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      <h2>{item.title}</h2>
                    </a>
                  </li>
                ))}
                </ul>
              </div>
              <div className="col col-2">
                {hoveredMenu && (() => {
                  const currentItem = menuItems.find(item => item.id === hoveredMenu);
                  if (!currentItem?.submenu) return null;
                  
                  return (
                    <div className="menu-submenu">
                      {currentItem.submenu.map((subItem, index) => (
                        <a
                          key={index}
                          href={subItem.href}
                          onClick={(e) => handleLinkClick(e, subItem.href)}
                          className="menu-submenu-link"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="col col-3">
              <div className="menu-info-fixed">
                <div className="menu-meta">
                  <p>주차안내</p>
                  <p>건물 내 쾌적한 주차타워 보유<br/>
                   - 승용차 및 중형 SUV까지 주차 가능</p>
                </div>
                <div className="menu-meta">
                  <p>진료시간</p>
                  <p> 월~금: 10:00~20:00<br />
                      토/일/공휴일: 10:00~17:00<br />
                      </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="menu-mobile">
            {Object.entries(mobileMenuSections).map(([sectionTitle, items], sectionIndex) => (
              <div key={sectionTitle}>
                {sectionIndex > 0 && <div className="menu-divider"></div>}
                <div className="menu-section">
                  <h2 className="menu-section-title">{sectionTitle}</h2>
                  <div className="menu-section-content">
                    {items.map((item) => {
                      // mobileSubmenu가 있는 경우 (커뮤니티, 팡클리닉) - 바로 서브메뉴 링크 표시 (우선순위)
                      if (item.mobileSubmenu) {
                        return item.mobileSubmenu.map((subItem, idx) => (
                          <a 
                            key={`${item.id}-${idx}`}
                            href={subItem.href} 
                            onClick={(e) => handleLinkClick(e, subItem.href)} 
                            className="menu-story-link"
                          >
                            {subItem.title}
                          </a>
                        ));
                      }
                      
                      // 서브메뉴가 있는 일반 메뉴 (지방프로그램, 쁘띠, PA센터)
                      if (item.submenu) {
                        return (
                          <div key={item.id} className="menu-program-item">
                            <button 
                              className="menu-program-button"
                              onClick={() => toggleProgram(item.id)}
                            >
                              <span>{item.title}</span>
                              <svg 
                                width="14" 
                                height="14" 
                                viewBox="0 0 14 14" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                className={expandedProgram === item.id ? "rotated" : ""}
                              >
                                <path d="M7 10.5L3.5 7L10.5 7L7 10.5Z" fill="#CCCCCC" stroke="#CCCCCC" strokeWidth="0.9"/>
                              </svg>
                            </button>
                            {expandedProgram === item.id && (
                              <div className="menu-program-submenu">
                                {item.submenu.map((subItem, idx) => (
                                  <a 
                                    key={idx}
                                    href={subItem.href} 
                                    onClick={(e) => { 
                                      e.preventDefault(); 
                                      handleLinkClick(e, subItem.href); 
                                    }}
                                  >
                                    {subItem.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      
                      // 단순 링크 - submenu 없으므로 화살표 없음
                      return (
                        <div key={item.id} className="menu-program-item">
                          <button 
                            className="menu-program-button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(e, item.href);
                            }}
                          >
                            <span>{item.title}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
