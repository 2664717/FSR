export default function RatingBar({ rating, onRate }) {
  return (
    <div className="rating-container">
      <div className="rating-scroll">
        {Array.from({ length: 11 }, (_, i) => i - 5).map((n) => (
          <button
            key={n}
            className={`rating-btn ${n === rating ? "active" : ""}`}
            onClick={() => onRate(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="rating-label">Оцените видео (-5 … +5)</div>
    </div>
  );
}
