"use client";
import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">진료시간</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <div className="flex items-start leading-[1.2] flex-col text-white">
                   <h2 className="inline">월-금: 10:00 - 19:00</h2><br/>
                   <h2 className="inline">일/공휴일: 휴진</h2>
                </div>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/");
                  }}
                >
                  <h3>병원소개</h3>
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("https://pf.kakao.com/_tZgpn");
                  }}
                >
                  <h3>예약안내</h3>
                </a>
                <a
                  href="/interior"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/interior");
                  }}
                >
                  <h3>시설안내</h3>
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/contact");
                  }}
                >
                  <h3>오시는길</h3>
                </a>
              </Copy>
            </div>
          </div>
        </div>
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <div className="icon">
                <RiInstagramLine />
              </div>
              <div className="icon">
                <RiYoutubeLine />
              </div>
            </div>
          </div>
          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>
              과학이 아름다움을 만든다. <br/>
              체형 쁘띠를 연구하는 연구실
              </p>
            </Copy>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <img src="/logos/footer-logo.svg" alt="푸터 로고" />
          </div>
          <div className="footer-copyright">
            <p>
              beauty through — <span>science</span>
            </p>
            <p>beautiful body, beautiful life</p>
            <p>All rights reserverd &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
