"use client";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './InstagramModal.css';

export default function InstagramModal({ url, onClose }) {
  const modalRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Instagram embed 스크립트 로드
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // ESC 키로 닫기
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);

    // 바디 스크롤 방지
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [mounted, onClose]);

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // Instagram URL을 embed URL로 변환
  const getEmbedUrl = (instagramUrl) => {
    // URL에서 /reel/ 또는 /p/ 부분 추출
    const match = instagramUrl.match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
    if (match) {
      return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
    }
    return instagramUrl + '/embed';
  };

  if (!mounted) return null;

  return createPortal(
    <div 
      ref={modalRef}
      className="instagram-modal-backdrop" 
      onClick={handleBackdropClick}
    >
      <div className="instagram-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button 
          className="instagram-modal-close" 
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Instagram Embed */}
        <div className="instagram-embed-wrapper">
          <iframe
            src={getEmbedUrl(url)}
            className="instagram-embed-iframe"
            frameBorder="0"
            scrolling="no"
            allowtransparency="true"
            allow="autoplay; encrypted-media; fullscreen"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

