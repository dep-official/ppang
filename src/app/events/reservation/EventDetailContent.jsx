"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import CartModal from "./CartModal";
import "./event-detail.css";

export default function EventDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // URL에서 초기 카테고리 읽기 (키를 전체 이름으로 변환)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const categoryKey = searchParams.get("category");
    return categoryKey && categoryMapping[categoryKey] ? categoryMapping[categoryKey] : null;
  });

  const allTreatments = [
    // 보톡스 (Botox)
    {
      id: 1,
      category: "보톡스 (Botox)",
      title: "주름보톡스 1부위 (눈가/눈밑/미간/입꼬리/자갈턱/콧볼)",
      description: "",
      salePrice: "9,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 2,
      category: "보톡스 (Botox)",
      title: "보톡스 50U (관자/턱)",
      description: "",
      salePrice: "15,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 3,
      category: "보톡스 (Botox)",
      title: "스킨보톡스 (얼굴전체 4cc)",
      description: "",
      salePrice: "69,000원",
      vatNote: "VAT 별도",
    },
    // 스킨부스터 (Skin Booster)
    {
      id: 4,
      category: "스킨부스터 (Skin Booster)",
      title: "팡스킨부스터 1cc (물광+스킨보톡스+PDRN)",
      description: "",
      salePrice: "39,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 5,
      category: "스킨부스터 (Skin Booster)",
      title: "물광주사 PB-1 1cc",
      description: "",
      salePrice: "29,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 6,
      category: "스킨부스터 (Skin Booster)",
      title: "쥬베룩 아이 1cc",
      description: "",
      salePrice: "39,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 7,
      category: "스킨부스터 (Skin Booster)",
      title: "쥬베룩 스킨 1cc",
      description: "",
      salePrice: "49,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 8,
      category: "스킨부스터 (Skin Booster)",
      title: "쥬베룩 G 4cc",
      description: "",
      salePrice: "89,900원",
      vatNote: "VAT 별도",
    },
    {
      id: 9,
      category: "스킨부스터 (Skin Booster)",
      title: "리쥬란 HB 1cc + 무통주사",
      description: "",
      salePrice: "159,000원",
      vatNote: "VAT 별도",
    },
    // 레이저 (Laser)
    {
      id: 10,
      category: "레이저 (Laser)",
      title: "슈링크 100샷",
      description: "",
      salePrice: "30,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 11,
      category: "레이저 (Laser)",
      title: "인모드 1부위",
      description: "",
      salePrice: "39,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 12,
      category: "레이저 (Laser)",
      title: "온다 (얼굴) 10kj",
      description: "",
      salePrice: "49,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 13,
      category: "레이저 (Laser)",
      title: "온다 (바디) 10kj",
      description: "",
      salePrice: "79,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 14,
      category: "레이저 (Laser)",
      title: "펌핑팁 + 팡스킨부스터 4cc",
      description: "",
      salePrice: "399,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 15,
      category: "레이저 (Laser)",
      title: "펌핑팁 + 쥬베룩스킨 4cc",
      description: "",
      salePrice: "499,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 16,
      category: "레이저 (Laser)",
      title: "n팁 + 팡스킨부스터(도포침투/2cc)",
      description: "",
      salePrice: "99,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 17,
      category: "레이저 (Laser)",
      title: "펌핑팁 + 리쥬란 힐러 2cc + 쥬베룩 스킨 2cc",
      description: "",
      salePrice: "449,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 18,
      category: "레이저 (Laser)",
      title: "리니어지 이벤트 400샷",
      description: "",
      salePrice: "229,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 19,
      category: "레이저 (Laser)",
      title: "덴서티 하이 100샷 + 리니어지 100샷",
      description: "",
      salePrice: "249,000원",
      vatNote: "VAT 별도",
    },
    // 실리프팅 (Thread Lifting)
    {
      id: 20,
      category: "실리프팅 (Thread Lifting)",
      title: "실리프팅(민트실) 1줄",
      description: "",
      salePrice: "49,000원",
      vatNote: "VAT 별도",
    },
    // 필러 & 콜라겐 (Filler & Volumizing)
    {
      id: 21,
      category: "필러 & 콜라겐 (Filler & Volumizing)",
      title: "목주름 필러 1cc",
      description: "",
      salePrice: "99,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 22,
      category: "필러 & 콜라겐 (Filler & Volumizing)",
      title: "애교살 or 코 필러",
      description: "",
      salePrice: "159,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 23,
      category: "필러 & 콜라겐 (Filler & Volumizing)",
      title: "팔자주름 필러 2cc",
      description: "",
      salePrice: "199,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 24,
      category: "필러 & 콜라겐 (Filler & Volumizing)",
      title: "엘란쎄 S (이마/관자/팔자/턱끝/옆볼/앞광대/어깨)",
      description: "",
      salePrice: "599,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 25,
      category: "필러 & 콜라겐 (Filler & Volumizing)",
      title: "엘란쎄 M (이마/관자/팔자/턱끝/옆볼/앞광대/어깨)",
      description: "",
      salePrice: "699,000원",
      vatNote: "VAT 별도",
    },
    // 비만 & 바디 케어 (Obesity & Body Care)
    {
      id: 26,
      category: "비만 & 바디 케어 (Obesity & Body Care)",
      title: "지방분해주사 PP-1(얼굴) 1부위",
      description: "",
      salePrice: "9,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 27,
      category: "비만 & 바디 케어 (Obesity & Body Care)",
      title: "지방분해주사 PP-1(바디) 1부위",
      description: "",
      salePrice: "59,000원",
      vatNote: "VAT 별도",
    },
    {
      id: 28,
      category: "비만 & 바디 케어 (Obesity & Body Care)",
      title: "PR-3 수액 (화이트닝 or 활력 + 다이어트)",
      description: "",
      salePrice: "49,000원",
      vatNote: "VAT 별도",
    },
  ];

  const treatments = allTreatments;

  const handleAddToCart = (treatment) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === treatment.id);
      if (exists) {
        return prev;
      }
      return [...prev, treatment];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // "900,000원" 형식에서 숫자만 추출
      const priceStr = item.salePrice.replace(/[^0-9]/g, "");
      const price = parseInt(priceStr) || 0;
      return total + price;
    }, 0);
  };

  // 카테고리 키와 전체 이름 매핑
  const categoryMapping = {
    "botox": "보톡스 (Botox)",
    "skin-booster": "스킨부스터 (Skin Booster)",
    "laser": "레이저 (Laser)",
    "thread-lifting": "실리프팅 (Thread Lifting)",
    "filler": "필러 & 콜라겐 (Filler & Volumizing)",
    "body-care": "비만 & 바디 케어 (Obesity & Body Care)",
  };

  const categories = [
    [{ key: "botox", name: "보톡스", fullId: "보톡스 (Botox)" }, { key: "skin-booster", name: "스킨부스터", fullId: "스킨부스터 (Skin Booster)" }],
    [{ key: "laser", name: "레이저", fullId: "레이저 (Laser)" }, { key: "thread-lifting", name: "실리프팅", fullId: "실리프팅 (Thread Lifting)" }],
    [{ key: "filler", name: "필러/콜라겐", fullId: "필러 & 콜라겐 (Filler & Volumizing)" }, { key: "body-care", name: "비만/바디케어", fullId: "비만 & 바디 케어 (Obesity & Body Care)" }],
  ];

  // URL 변경 감지 (브라우저 뒤로가기/앞으로가기 등)
  useEffect(() => {
    const categoryKey = searchParams.get("category");
    const categoryFullName = categoryKey && categoryMapping[categoryKey] ? categoryMapping[categoryKey] : null;
    setSelectedCategory(categoryFullName);
  }, [searchParams]);

  // 전체 카테고리 이름을 키로 변환
  const getCategoryKey = (fullId) => {
    return Object.keys(categoryMapping).find(key => categoryMapping[key] === fullId) || null;
  };

  const handleCategoryClick = (categoryFullId) => {
    const newCategory = selectedCategory === categoryFullId ? null : categoryFullId;
    const categoryKey = newCategory ? getCategoryKey(newCategory) : null;
    
    // URL 업데이트 (키 사용)
    const params = new URLSearchParams(searchParams.toString());
    if (categoryKey) {
      params.set("category", categoryKey);
    } else {
      params.delete("category");
    }
    
    // 경로 끝의 슬래시 제거하고 URL 생성
    const cleanPathname = pathname.replace(/\/$/, "");
    const queryString = params.toString();
    const newUrl = queryString ? `${cleanPathname}?${queryString}` : cleanPathname;
    
    // router.replace를 사용하여 히스토리에 추가하지 않고 URL만 변경
    router.replace(newUrl, { scroll: false });
  };

  // 필터링된 시술 목록
  const filteredTreatments = selectedCategory
    ? allTreatments.filter((treatment) => {
        // 정확한 문자열 매칭
        return treatment.category.trim() === selectedCategory.trim();
      })
    : allTreatments;

  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        <button 
          className="event-detail-back"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="event-detail-title">그랜드 오픈 1회 특별 체험가</h1>
        <button 
          className="event-detail-share"
          aria-label="공유하기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="black"/>
          </svg>
        </button>
      </div>

      <div className="event-detail-tabs">
        <button
          className="event-detail-tab active"
        >
          1회 체험가
        </button>
      </div>

      <div className="event-detail-categories">
        <div className="event-detail-categories-list">
          {categories.map((row, rowIndex) => {
            const categoryIndex0 = rowIndex * 2; // 첫 번째 카테고리 전체 인덱스
            const categoryIndex1 = rowIndex * 2 + 1; // 두 번째 카테고리 전체 인덱스
            
            return (
              <div key={rowIndex} className="event-detail-category-item">
                <div className="event-detail-category-row">
                  <span 
                    className={`event-detail-category-name ${selectedCategory === row[0].fullId ? "active" : ""} ${categoryIndex0 % 2 === 0 ? "even" : "odd"}`}
                    onClick={() => handleCategoryClick(row[0].fullId)}
                  >
                    {row[0].name}
                  </span>
                  <div className="event-detail-category-divider"></div>
                  <span 
                    className={`event-detail-category-name ${selectedCategory === row[1].fullId ? "active" : ""} ${categoryIndex1 % 2 === 0 ? "even" : "odd"}`}
                    onClick={() => handleCategoryClick(row[1].fullId)}
                  >
                    {row[1].name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="event-detail-treatments">
        <h2 className="event-detail-section-title">시술 목록</h2>
        <div className="event-detail-treatments-list">
          {filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="event-detail-treatment-card">
              <div className="event-detail-treatment-info">
                <span className="event-detail-treatment-category">{treatment.category}</span>
                <h3 className="event-detail-treatment-title">{treatment.title}</h3>
                <p className="event-detail-treatment-description">{treatment.description}</p>
              </div>
              <div className="event-detail-treatment-action">
                <div className="event-detail-treatment-price">
                  <span className="event-detail-sale-price">{treatment.salePrice}</span>
                  {treatment.vatNote && (
                    <span className="event-detail-vat-note">{treatment.vatNote}</span>
                  )}
                </div>
                <button 
                  className="event-detail-add-cart"
                  onClick={() => handleAddToCart(treatment)}
                >
                  시술담기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="event-detail-footer">
        <div className="event-detail-cart-badge">
          <span>{cartItems.length}</span>
        </div>
        <button 
          className="event-detail-reserve-btn"
          onClick={() => setIsCartOpen(true)}
        >
          예약 신청하기
        </button>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        totalPrice={calculateTotalPrice()}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}

