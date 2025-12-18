"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1 className="contact-title">오직 한 사람을 위한 맞춤 시술 공간인<br/>
                  VIP 센터를 운영합니다.</h1>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;25</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>오시는길</p>
                    <p> 서울특별시 마포구 양화로 140, 에이치큐브 9층<br/> 
                    (홍대입구역 9번 출구 앞, 애플스토어 건물)</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>주차 안내</p>
                    <p>건물 내 쾌적한 주차 타워 보유<br/>
                    - 승용차 및 중형 SUV까지 주차 가능</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>진료시간</p>
                    <p>
                      월~금: 10:00~20:00<br />
                      토/일/공휴일: 10:00~17:00<br />
                    </p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="/contact/contact-img.jpg"
                  alt="Terrene studio workspace"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
