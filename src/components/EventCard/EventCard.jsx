import Image from "next/image";
import "./EventCard.css";

export default function EventCard({ 
  image, 
  badge, 
  date, 
  title, 
  originalPrice, 
  salePrice,
  onClick,
}) {
  return (
    <div 
      className="event-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="event-card-figure-badge">
        <div className="event-card-figure">
          <div className="event-card-mask"></div>
          {image && (
            <Image 
              src={image} 
              alt={title}
              width={400}
              height={400}
              className="event-card-img"
            />
          )}
        </div>
        {badge && (
          <div className="event-card-badge">
            <span>{badge}</span>
          </div>
        )}
      </div>
      <div className="event-card-info-price">
        <div className="event-card-info">
          {date && (
            <p className="event-card-date">{date}</p>
          )}
          {title && (
            <p className="event-card-title">{title}</p>
          )}
        </div>
        <div className="event-card-price">
          {originalPrice && (
            <p className="event-card-price-original">{originalPrice}</p>
          )}
          {salePrice && (
            <p className="event-card-price-sale">{salePrice}
               <span className="text-[16px]">만원</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

