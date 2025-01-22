import { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";

function App() {
  const defaultCards = [
    {
      path: "/img/ananas.png",
      matched: false,
    },
    {
      path: "/img/cilek.png",
      matched: false,
    },
    {
      path: "/img/karpuz.png",
      matched: false,
    },
    {
      path: "/img/muz.png",
      matched: false,
    },
    {
      path: "/img/nar.png",
      matched: false,
    },
    {
      path: "/img/uzum.png",
      matched: false,
    },
  ];

  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const prepareCards = () => {
    const sortedCards = [...defaultCards, ...defaultCards]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(sortedCards);
    resetState();
  };

  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);

      if (selectedOne.path === selectedTwo.path) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.path === selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-5 mt-10">
      <h1 className="text-3xl font-semibold text-center">Tahmin Etme Oyunu</h1>
      <button
        className="bg-[#00ADB5] px-3 py-2 rounded hover:-translate-y-1 transition-all"
        onClick={() => prepareCards()}
      >
        Oyunu Başlat
      </button>

      <div className="grid grid-cols-4 gap-2 mt-10">
        {cards.map((card, ind) => (
          <Card
            card={card}
            key={ind}
            handleSelected={handleSelected}
            disabled={disabled}
            rotated={
              card === selectedOne || card === selectedTwo || card.matched
            }
          />
        ))}
      </div>
    </section>
  );
}

export default App;
