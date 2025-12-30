"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Image from "next/image";
import "./events.css";
import { AlignHorizontalSpaceAround } from "lucide-react";

export default function EventsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("event");

  const events = [
    {
      id: 1,
      image: "/events/event_01.png",
      badge: "진행중",
      date: "2026-01-01 ~ 2026-01-31",
      title: "해피 뉴 팡, HAPPY NEW PPANG!",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    },
    {
      id: 2,
      image: "/events/event_02.png",
      badge: "진행중",
      date: "2026-01-01 ~ 2026-01-31",
      title: "팡클리닉 연말 결산 타임 세일",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    },
    {
      id: 3,
      image: "/events/event_03.png",
      badge: "진행중",
      date: "2026-01-01 ~ 2026-02-28",
      title: "팡클리닉 연구소의 선물 겨울 상자가 도착했습니다. PPANG WINTER BOX EVENT",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    },
    {
      id: 4,
      image: "/events/event_04.png",
      badge: "진행중",
      date: "2026-01-01 ~ 2026-12-31",
      title: "VIP 멤버쉽 · PPANG CLINIC Vip Membership",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    }
  ];

  const filteredEvents = activeTab === "event" 
    ? events.filter(e => !e.isEnded)
    : events;

  return (
    <>
      <Nav />
      <div className="events-page">
        <div className="events-page-container">
          <h1 className="events-page-title">이벤트 게시판</h1>
          
          <div className="events-page-tabs">
            <button
              className={`events-tab ${activeTab === "event" ? "active" : ""}`}
              onClick={() => setActiveTab("event")}
            >
              이벤트
            </button>
            <button
              className={`events-tab first ${activeTab === "first-visit" ? "active" : ""}`}
              onClick={() => router.push(`/events/reservation`)}

            >
              첫방문체험가
            </button>
          </div>

          <div className="events-page-list">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="events-page-card"
                onClick={() => router.push(`/events/${event.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="events-page-card-image">
                  <div className="events-page-card-figure">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={359}
                      height={225}
                      className="events-page-image"
                    />
                    {event.isEnded && (
                      <div className="events-page-badge">
                        <span>{event.badge}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="events-page-card-info">
                  <h3 className={`events-page-card-title ${event.isEnded ? "ended" : ""}`}>
                    {event.title}
                  </h3>
                  <p className="events-page-card-date">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConditionalFooter />
    </>
  );
}

