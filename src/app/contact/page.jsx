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
                  <h1 className="contact-title">홍대입구역 9번 출구, <br/>
                  가장 번화한 곳에서 만나는 당신만의 우주.</h1>
                  <p className="contact-title-sub">
                    (Hongik Univ. Station Exit 9, Your Private Universe)
                  </p>
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
                <img className="contact-map"  src="/contact/map.png" alt="약도" />
                <div className="contact-info-block">
                  <Copy delay={1.0}>
                    <p>AIRPLANE : 공항 이용 시</p>
                    <p>
                      <strong>인천공항에서 오시는 방법</strong><br />
                      ㆍ공항 리무진 버스 (6002번)<br />
                      제1터미널: 1층 4B 게이트 승차 → 6002번 탑승 → 서교동 정류장 하차<br />
                      제2터미널: 지하 1층 승차장 → 6002번 탑승 → 서교동 정류장 하차
                    </p>
                    <p>
                      ㆍ공항철도 (AREX)<br />
                      인천공항역 승차 → 홍대입구역 하차 → 9번 출구로 나와 도보 약 3분
                    </p>
                    <p>
                      <strong>김포공항에서 오시는 방법</strong><br />
                      ㆍ공항철도 이용<br />
                      김포공항역 승차 → 홍대입구역 하차 → 9번 출구로 나와 도보 약 3분
                    </p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>SUBWAY : 지하철 이용 시</p>
                    <p>
                      ㆍ홍대입구역 9번 출구 (도보 1분)<br />
                      2호선 / 공항철도 / 경의중앙선 모두 이용 가능합니다.<br />
                      9번 출구로 나오셔서 바로 앞 애플스토어(Apple) 건물 9층으로 오시면 됩니다.
                    </p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>CAR : 자가용 이용 시</p>
                    <p>
                      네비게이션 안내<br />
                      ㆍ상호 검색: 팡클리닉의원<br />
                      ㆍ주소 검색: 서울특별시 마포구 양화로 140, 에이치큐브 9층<br />
                      (홍대입구역 9번 출구 앞, 애플스토어 건물 9층)
                    </p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.45}>
                    <p>주차 안내</p>
                    <p>건물 내 쾌적한 주차 타워 보유<br/>
                    - 승용차 및 중형 SUV까지 주차 가능</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.6}>
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
