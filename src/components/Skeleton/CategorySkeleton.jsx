export const CategorySkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((index) => (
        <div key={index} className="event-detail-category-item">
          <div className="event-detail-category-row">
            <span 
              className="event-detail-category-skeleton"
              style={{
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
                height: '2.5rem',
                display: 'block',
                flex: 1,
              }}
            >
              &nbsp;
            </span>
            <div className="event-detail-category-divider"></div>
            <span 
              className="event-detail-category-skeleton"
              style={{
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
                height: '2.5rem',
                display: 'block',
                flex: 1,
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySkeleton;

