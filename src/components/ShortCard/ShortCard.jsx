"use client";
import Image from "next/image";
import { useState } from "react";
import InstagramModal from "../InstagramModal/InstagramModal";
import "./ShortCard.css";

export default function ShortCard({
  image,
  badge,
  date,
  title,
  originalPrice,
  salePrice,
  url,
  language = "KR" // 기본값 KR
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLanguageIcon = () => {
    switch (language) {
      case "KR":
        return "/home/ico_kr.svg";
      case "EN":
        return "/home/ico_en.svg";
      case "JP":
        return "/home/ico_jp.svg";
      case "CN":
        return "/home/ico_cn.svg";
      default:
        return "/home/ico_kr.svg";
    }
  };

  const handleClick = () => {
    if (url) {
      setIsModalOpen(true); // 모달 열기
    }
  };

  return (
    <>
      <div 
        className="short-card" 
        onClick={handleClick}
        style={{ cursor: url ? 'pointer' : 'default' }}
      >
        <div className="short-card-figure-badge">
          <div className="short-card-figure">
            <div className="short-card-mask"></div>
            {image && (
              <Image
                src={image}
                alt={title}
                width={400}
                height={400}
                className="short-card-img"
              />
            )}
            {/* 재생 아이콘 */}
            <div className="short-card-play-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.9)"/>
                <path d="M18 14L34 24L18 34V14Z" fill="#000"/>
              </svg>
            </div>
            <div className="short-card-language-icon">
              <Image
                src={getLanguageIcon()}
                alt={language}
                width={32}
                height={32}
              />
            </div>
          </div>
        {badge && (
          <div className="short-card-badge">
            <span>{badge}</span>
          </div>
        )}
      </div>
      <div className="short-card-info-price">
        <div className="short-card-info">
          {date && (
            <p className="short-card-date">{date}</p>
          )}
          {title && (
            <p className="short-card-title">{title}</p>
          )}
        </div>
        <div className="short-card-price">
          {originalPrice && (
            <p className="short-card-price-original">{originalPrice}</p>
          )}
          {salePrice && (
            <p className="short-card-price-sale">{salePrice}
               <span className="text-[16px]">만원</span>
            </p>
          )}
        </div>
      </div>
    </div>

    {/* Instagram 모달 */}
    {isModalOpen && (
      <InstagramModal 
        url={url} 
        onClose={() => setIsModalOpen(false)} 
      />
    )}
  </>
  );
}

