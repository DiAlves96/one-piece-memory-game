const allCards = [
  { id: "luffy", img: "/images/cards/luffy-card.png" },
  { id: "zoro", img: "/images/cards/zoro-card.png" },
  { id: "nami", img: "/images/cards/nami-card.png" },
  { id: "usopp", img: "/images/cards/usopp-card.png" },
  { id: "sanji", img: "/images/cards/sanji.png" },
  { id: "chopper", img: "/images/cards/choper-card.png" },
  { id: "robin", img: "/images/cards/robin-card.png" },
  { id: "franky", img: "/images/cards/franky-card.png" },
  { id: "brook", img: "/images/cards/brook-card.png" },
  { id: "ace", img: "/images/cards/ace-card.png" },
  { id: "buggy", img: "/images/cards/buggy-card.png" },
  { id: "doflamingo", img: "/images/cards/doflamingo-card.png" },
  { id: "hancok", img: "/images/cards/hancok-card.png" },
  { id: "jinbe", img: "/images/cards/jinbe-card.png" },
  { id: "law", img: "/images/cards/law-card.png" },
  { id: "sabo", img: "/images/cards/sabo-card.png" },
  { id: "shanks", img: "/images/cards/shanks-card.png" },
  { id: "sunny", img: "/images/cards/sunny-card.png" },
];

export function generateDeck(difficulty = "easy") {
  const size = difficulty === "easy" ? 6
    : difficulty === "medium" ? 8
      : difficulty === "hard" ? 10
        : 8;

  const selected = allCards
    .sort(() => 0.5 - Math.random())
    .slice(0, size);

  const deck = [...selected, ...selected]
    .map((card, i) => ({ ...card, uuid: `${card.id}-${i}` }))
    .sort(() => 0.5 - Math.random());

  return deck;
}