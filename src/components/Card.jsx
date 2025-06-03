import "../styles/Card.css";

function Card({ card, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={`${import.meta.env.BASE_URL}${card.img.replace(/^\/+/, "")}`} alt={card.id} />
        </div>
        <div className="card-back">
          <img src={`${import.meta.env.BASE_URL}images/cards/card-verso.png`} alt="carta virada" />
        </div>
      </div>
    </div>
  );
}

export default Card;
