"use client";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import Image from "next/image";
import "./doctor.css";

export default function DoctorPage() {
  return (
    <>
      <Nav />
      <div className="doctor-page">
        <div className="doctor-container">
          <div className="doctor-layout">
            {/* Left Section - English Name and Description */}
            <div className="doctor-left">
              <div className="doctor-left-content">
                <Copy delay={0.1}>
                  <h1 className="doctor-english-name">Lee</h1>
                </Copy>
                <Copy delay={0.15}>
                  <h2 className="doctor-english-name-last">Gyu Seung</h2>
                </Copy>
                <Copy delay={0.2}>
                  <p className="doctor-korean-title">팡클리닉 총괄원장</p>
                </Copy>
             
                <Copy delay={0.25}>
                  <p className="doctor-description">
                  과학적 기술력과 전문적인 진단을 기반으로<br/>
                  안전하고 개인에게 최적화된 치료로<br/>
                  건강한 아름다움을 실현합니다.
                  </p>
                </Copy>
              </div>
              <figure className="doctor-photo">
                  <Image 
                    src="/clients/lee-doctor.png" 
                    alt="대표원장 이규승" 
                    width={400} 
                    height={600}
                    className="doctor-image"
                  />
                </figure>
            </div>

            <div className="doctor-right">
               <Copy delay={0.35}>
                  <h3 className="doctor-korean-name">
                    <span>총괄원장</span> 이규승
                    </h3>
                </Copy>

                <div className="doctor-career-history">
                  <Copy delay={0.55}>
                    <ul className="doctor-list">
                      <li>현) 팡클리닉 대표원장 (대한 비만 연구 의사회 인증 비만 전문 인증의)</li>
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
                      <li>전) 중국 화메이클리닉 자문의사</li>
                      <li>전) 중국 메이라이클리닉 자문의사</li>
                      <li>전) 중국 상해 썬택병원 성형외과 피부과 자문의사</li>
                      <li>전) 중국 북경 그린병원 성형외과 피부과 자문의사</li>
                      <li>전) 인도네시아 자타르타 M클리닉 자문의사</li>
                    </ul>
                  </Copy>
                </div>
            </div>
          </div>

          {/* 김아름 대표원장 섹션 */}
          <div className="doctor-layout doctor-layout-second">
            {/* Left Section - English Name and Description */}
            <div className="doctor-left">
              <div className="doctor-left-content">
                <Copy delay={0.1}>
                  <h1 className="doctor-english-name">Kim</h1>
                </Copy>
                <Copy delay={0.15}>
                  <h2 className="doctor-english-name-last">Ah Reum</h2>
                </Copy>
                <Copy delay={0.2}>
                  <p className="doctor-korean-title">팡클리닉 대표원장</p>
                </Copy>
             
                <Copy delay={0.25}>
                  <p className="doctor-description">
                    사람을 먼저 생각하는 진단과<br/>
                    개인에게 맞춘 치료로<br/>
                    자연스럽고 건강한 아름다움을 함께 만들어갑니다.
                  </p>
                </Copy>
              </div>
              <figure className="doctor-photo">
                  <Image 
                    src="/clients/kim-doctor.png" 
                    alt="대표원장 김아름" 
                    width={400} 
                    height={600}
                    className="doctor-image"
                  />
                </figure>
            </div>

            <div className="doctor-right">
               <Copy delay={0.35}>
                  <h3 className="doctor-korean-name">
                    <span>대표원장</span> 김아름
                    </h3>
                </Copy>

                <div className="doctor-career-history">
                  <Copy delay={0.55}>
                    <ul className="doctor-list">
                      <li>현) 팡클리닉 대표원장 (대한 비만 연구 의사회 인증 비만 전문 인증의)</li>
                      <li>전) 올라인 의원 부원장</li>
                      <li>전) 쁨 글로벌 강남 총괄원장 및 교육 원장</li>
                      <li>전) 픽셀랩 (구 클로엔 성형외과) 성형외과 부원장</li>
                      <li>삼성 서울병원 전공의 수련</li>
                      <li>삼성 서울병원 인턴 수료</li>
                      <li>이화여자대학교 의과대학</li>
                    </ul>
                  </Copy>
                </div>

                <div className="doctor-associations">
                  <Copy delay={0.6}>
                    <h4 className="doctor-section-title">학회활동 및 기타</h4>
                  </Copy>
                  <Copy delay={0.65}>
                    <ul className="doctor-list">
                      <li>대한 비만 연구 의사회 정회원</li>
                      <li>대한 비만 학회 정회원</li>
                      <li>대한 임상레이저 학회 정회원</li>
                      <li>대한 리프팅 연구회 정회원</li>
                    </ul>
                  </Copy>
                </div>
            </div>
          </div>
        </div>
      </div>
      <ConditionalFooter />
    </>
  );
}




