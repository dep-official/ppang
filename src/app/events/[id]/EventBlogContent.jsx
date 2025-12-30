"use client";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

// 이벤트 데이터 (실제로는 API에서 가져와야 함)
// 관리자에서 이미지 등록 및 순서 관리
const eventsData = {
  1: {
    id: 1,
    title: "해피 뉴 팡, HAPPY NEW PPANG!",
    date: "2026-01-01 ~ 2026-01-31",
    badge: "진행중",
    thumbnail: "/events/event_01.png", // 목록용 썸네일
    detailImages: [
      { order: 1, src: "/events/detail/001_kr_01.png", alt: "해피 뉴 팡 이벤트 상세 1" }
    ]
  },
  2: {
    id: 2,
    title: "팡클리닉 연말 결산 타임 세일",
    date: "2026-01-01 ~ 2026-01-31",
    badge: "진행중",
    thumbnail: "/events/event_02.png",
    detailImages: [
      { order: 1, src: "/events/detail/002_kr_01.png", alt: "연말 결산 타임 세일 상세 1" },
    ]
  },
  3: {
    id: 3,
    title: "팡클리닉 연구소의 선물 겨울 상자가 도착했습니다. PPANG WINTER BOX EVENT",
    date: "2026-01-01 ~ 2026-02-28",
    badge: "진행중",
    thumbnail: "/events/event_03.png",
    detailImages: [
      { order: 1, src: "/events/detail/003_kr_01.png", alt: "윈터 박스 이벤트 상세 1" },
      { order: 2, src: "/events/detail/003_kr_02.png", alt: "윈터 박스 이벤트 상세 2" }
    ]
  },
  4: {
    id: 4,
    title: "VIP 멤버쉽 · PPANG CLINIC Vip Membership",
    date: "2026-01-01 ~ 2026-12-31",
    badge: "진행중",
    thumbnail: "/events/event_04.png",
    detailImages: [
      { order: 1, src: "/events/detail/004_kr_01.png", alt: "VIP 멤버십 상세 1" },
      { order: 2, src: "/events/detail/004_kr_02.png", alt: "VIP 멤버십 상세 2" }
    ]
  }
};

export default function EventBlogContent() {
  const router = useRouter();
  const params = useParams();
  const eventId = parseInt(params.id);
  const event = eventsData[eventId];

  // 이벤트 데이터가 없으면 404 또는 목록으로 이동
  if (!event) {
    router.push('/events');
    return null;
  }

  const handleReservation = () => {
    router.push('/events/reservation');
  };

  const handleGoBack = () => {
    router.push('/events');
  };

  return (
    <div className="event-blog-page">
      <div className="event-blog-container">
        {/* 헤더 - 중앙 정렬 */}
        <div className="event-blog-header">
          <div className="event-blog-badge">
            <span>{event.badge}</span>
          </div>
          <h1 className="event-blog-title">{event.title}</h1>
          <p className="event-blog-date">{event.date}</p>
        </div>

        {/* 상세 이미지들 - 순서대로 렌더링 */}
        <div className="event-blog-detail-images">
          {event.detailImages
            .sort((a, b) => a.order - b.order)
            .map((image) => (
              <div key={image.order} className="event-blog-detail-image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={0}
                  style={{ height: 'auto', width: '100%' }}
                  priority={image.order === 1}
                />
              </div>
            ))}
        </div>

        {/* 하단 액션 버튼 */}
        <div className="event-blog-actions">
          {/* <button 
            className="event-blog-btn event-blog-btn-primary"
            onClick={handleReservation}
          >
            예약하기
          </button> */}
          <button 
            className="event-blog-btn event-blog-btn-secondary"
            onClick={handleGoBack}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

