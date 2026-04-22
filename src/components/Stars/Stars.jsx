import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Stars = ({ rate = 0 }) => {
  if (rate === null || rate === undefined || isNaN(rate)) {
    return <div style={{ display: "flex", gap: "4px", color: "#f5a623" }}>
      {[...Array(5)].map((_, i) => (
        <FaRegStar key={"empty-" + i} />
      ))}
    </div>;
  }

  const clampedRate = Math.max(0, Math.min(5, rate));
  const rounded = Math.round(clampedRate * 2) / 2;

  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", gap: "4px", color: "#f5a623"  }} className="w-20 lg:w-30">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={"full-" + i} />
      ))}

      {hasHalfStar && <FaStarHalfAlt />}

      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={"empty-" + i} />
      ))}
    </div>
  );
};

export default Stars;