export const ProductSkeleton = ({ count = 5 }) => {
  return (
    <div className="event-detail-treatments-list">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="event-detail-treatment-card">
          <div className="event-detail-treatment-info">
            {/* 카테고리 Skeleton */}
            <span 
              className="product-skeleton product-skeleton-category"
              style={{
                display: 'inline-block',
                width: '80px',
                height: '20px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.25rem',
                marginBottom: '0.5rem',
              }}
            >
              &nbsp;
            </span>
            
            {/* 제품명 Skeleton */}
            <div 
              className="product-skeleton product-skeleton-title"
              style={{
                width: '100%',
                height: '24px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.25rem',
                marginBottom: '0.5rem',
              }}
            >
              &nbsp;
            </div>
            
            {/* 설명 Skeleton */}
            <div 
              className="product-skeleton product-skeleton-description"
              style={{
                width: '70%',
                height: '18px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.25rem',
              }}
            >
              &nbsp;
            </div>
          </div>
          
          <div className="event-detail-treatment-action">
            {/* 가격 Skeleton */}
            <div className="event-detail-treatment-price">
              <div 
                className="product-skeleton product-skeleton-price"
                style={{
                  width: '80px',
                  height: '24px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  borderRadius: '0.25rem',
                  marginBottom: '0.25rem',
                }}
              >
                &nbsp;
              </div>
              <div 
                className="product-skeleton product-skeleton-vat"
                style={{
                  width: '60px',
                  height: '14px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  borderRadius: '0.25rem',
                }}
              >
                &nbsp;
              </div>
            </div>
            
            {/* 버튼 Skeleton */}
            <div 
              className="product-skeleton product-skeleton-button"
              style={{
                width: '80px',
                height: '36px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
              }}
            >
              &nbsp;
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

