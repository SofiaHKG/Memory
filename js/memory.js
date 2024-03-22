document.addEventListener("DOMContentLoaded", () => {
 // Spielername erfassen
 const userName = prompt("Gib deinen Namen ein:");
 var spieler = document.getElementById("userName");
 var usernameText = document.createTextNode(userName);
 spieler.appendChild(usernameText);

 // Timer für die Spielzeit in Sekunden
 const timerElement = document.getElementById("timer");
 const start = Date.now();
 const timer = setInterval(() => {
    let seconds = Math.round((Date.now() - start) / 1000);
    timerElement.textContent = "Zeit: " + seconds;
   }, 1000);

 // Inkrementieren und Anzeigen des Versuche-Counters
 const attemptsDisplay = document.querySelector("#attempts");
 attemptsDisplay.textContent = 0;
 function incrAttempt() {
   attemptsDisplay.textContent = parseInt(attemptsDisplay.textContent) + 1;
 }

 // Sammlung der Karten in Array
 const cardArray = [
  { name: "card1", img: "pics/card1.png" },
  { name: "card1", img: "pics/card1.png" },
  { name: "card2", img: "pics/card2.png" },
  { name: "card2", img: "pics/card2.png" },
  { name: "card3", img: "pics/card3.png" },
  { name: "card3", img: "pics/card3.png" },
  { name: "card4", img: "pics/card4.png" },
  { name: "card4", img: "pics/card4.png" },
  { name: "card5", img: "pics/card5.png" },
  { name: "card5", img: "pics/card5.png" },
  { name: "card6", img: "pics/card6.png" },
  { name: "card6", img: "pics/card6.png" },
  { name: "card7", img: "pics/card7.png" },
  { name: "card7", img: "pics/card7.png" },
  { name: "card8", img: "pics/card8.png" },
  { name: "card8", img: "pics/card8.png" }
 ];

 // Mischen des Arrays
 cardArray.sort(() => 0.5 - Math.random());
 // Erstellen des Spielegrids
 const grid = document.querySelector("#spielbereich");
 // Durchläuft Kartenarray und führt für jede Karte eine Funktion aus
 cardArray.forEach((card, index) => {
   const gameCard = document.createElement("img");
   gameCard.src = "pics/memoryBg.png";
   gameCard.dataset.id = index;
   gameCard.addEventListener("click", flipCard);
   grid.appendChild(gameCard);
 });

 // Umdrehen der Karten
 let chosenCard = [];
 let chosenCardId = [];
 let cardsWon = [];
 function flipCard() {
   const cardId = this.dataset.id;
   if (cardsWon.includes(cardArray[cardId].name) || chosenCardId.includes(cardId)) {
     return;
   }
   chosenCard.push(cardArray[cardId].name);
   chosenCardId.push(cardId);
   this.src = cardArray[cardId].img;
   if (chosenCard.length === 2) {
     setTimeout(matchControl, 400);
   }
 }

 // Kontrolliert ob Karten-Paar gefunden
 function matchControl() {
  incrAttempt();
  const [optionOneId, optionTwoId] = chosenCardId;
  const [firstCard, secondCard] = chosenCard;
  const cards = document.querySelectorAll("img");
  const matchingCards = firstCard === secondCard;
  // Ternärer Operator für Konkat. des filenames bei gefundenem Paar (von memoryBg.png -> memoryBgI.png)
  cards[optionOneId].setAttribute("src", `pics/memoryBg${matchingCards ? "I" : ""}.png`);
  cards[optionTwoId].setAttribute("src", `pics/memoryBg${matchingCards ? "I" : ""}.png`);
  if (matchingCards) {
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(firstCard);
    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
    }
  }
  chosenCard = [];
  chosenCardId = [];
}
});