"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Image from "next/image";
import "./events.css";

export default function EventsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("event");

  const events = [
    {
      id: 1,
      image: "/service/001.png",
      badge: "쁘띠",
      date: "2025-11-18 ~ 2025-11-30",
      title: "11월 연말 할인 이벤트",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    },
    {
      id: 2,
      image: "/service/002.png",
      badge: "종료된 이벤트",
      date: "2025-11-18 ~ 2025-11-30",
      title: "11월 연말 할인 이벤트",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: true,
    },
    {
      id: 3,
      image: "/service/003.png",
      badge: "종료된 이벤트",
      date: "2025-11-18 ~ 2025-11-30",
      title: "11월 연말 할인 이벤트",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: true,
    },
    {
      id: 4,
      image: "/service/004.png",
      badge: "쁘띠",
      date: "2025-11-18 ~ 2025-11-30",
      title: "11월 연말 할인 이벤트",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    },
    {
      id: 5,
      image: "/service/005.png",
      badge: "지방프로그램",
      date: "2025-11-18 ~ 2025-11-30",
      title: "11월 연말 할인 이벤트",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: false,
    },
    {
      id: 6,
      image: "/service/006.png",
      badge: "종료된 이벤트",
      date: "2025-11-18 ~ 2025-11-30",
      title: "11월 연말 할인 이벤트",
      originalPrice: "90,000  50%",
      salePrice: "90만원",
      isEnded: true,
    },
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
              onClick={() => setActiveTab("first-visit")}

            >
              첫방문체험가
            </button>
          </div>

          <div className="events-page-list">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="events-page-card"
                onClick={() => router.push(`/events/reservation`)}
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

