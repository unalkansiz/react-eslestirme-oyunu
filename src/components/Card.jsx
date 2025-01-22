import React from "react";

const Card = ({ card, handleSelected, rotated, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleSelected(card);
    }
  };

  return (
    <div className="w-[200px] card">
      <div className={rotated ? "rotated" : ""}>
        <img className={`front`} src={card.path} />
        <img className="back" onClick={handleClick} src="/img/kapak.png" />
      </div>
    </div>
  );
};

export default Card;
