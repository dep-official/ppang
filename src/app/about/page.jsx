"use client";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import "./about.css";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="about-page">
        <div className="about-container">
          <h1 className="about-title">원장님 약력</h1>
          
          <div className="about-doctor">
            <h2 className="doctor-name">이규승 총괄원장</h2>
            
            <div className="doctor-info-section">
              <h3 className="section-title">현직</h3>
              <ul className="doctor-list">
                <li>팡클리닉 대표원장 (대한 비만 연구 의사회 인증 비만 전문 인증의)</li>
              </ul>
            </div>

            <div className="doctor-info-section">
              <h3 className="section-title">경력</h3>
              <ul className="doctor-list">
                <li>전) 글로벌쁨의원 수석원장</li>
                <li>전) 올라인의원 총괄원장</li>
                <li>전) 원진성형외과 총괄원장</li>
                <li>전) 포에버의원 총괄원장</li>
                <li>전) 귀족성형외과 대표원장</li>
                <li>전) 레아트성형외과 원장</li>
                <li>전) 유캔비성형외과 원장</li>
                <li>전) 설레임의원 대표원장</li>
                <li>전) S라인성형외과 대표원장</li>
                <li>전) 톡스유의원 대표원장</li>
                <li>전) 샤인스타의원 수석원장</li>
                <li>전) 위즈앤미의원 수석원장</li>
              </ul>
            </div>

            <div className="doctor-info-section">
              <h3 className="section-title">해외 자문</h3>
              <ul className="doctor-list">
                <li>전) 중국 화메이클리닉 자문의사</li>
                <li>전) 중국 메이라이클리닉 자문의사</li>
                <li>전) 중국 상해 썬택병원 성형외과 피부과 자문의사</li>
                <li>전) 중국 북경 그린병원 성형외과 피부과 자문의사</li>
                <li>전) 인도네시아 자타르타 M클리닉 자문의사</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ConditionalFooter />
    </>
  );
}
