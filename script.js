const moves = document.getElementById("moves-count"); /*zemi element od ID "moves count" i skladiraj vo "moves" */
const timeValue = document.getElementById("time"); /*zemi go elemetot IT "time" i skladiraj vp " time value "*/
const startButton = document.getElementById("start"); /* zemi go element IT "start" i skladiraj vo " start Button "*/
const stopButton = document.getElementById("stop"); /*zemi go elementot ID "stop" i skladiraj vo "stopButton "*/
const gameContainer = document.querySelector(".game-container"); /*Dobij go elementot vo klasa " game container " i skladirah go " game Container "*/
const result = document.getElementById("result"); /*dobij fo element ID " rezultat" i skladiraj go vo " rezultat"*/
const controls = document.querySelector(".controls-container"); /*zemete go elementot " controls container " i skladirah go vo " controls"*/
let cards; /*promenlica " cards " podocna ke bidat tuka karticki*/
let interval; /*promenliva " interval " za skladiranje na vremenski interval*/
let firstCard = false; /*deklariraj promenliva " first card " i instaliraj ja vo "false"*/
let secondCard = false; /*deklariraj promenliva " second card" i inicijaliziraj ja vo "false"*/
const items = [
    /*deklariraj niza " items" sto sodrzi objekti*/
    { name: "1", image: "1.JPG" }, /*prv so svojsta ime i slika */
    { name: "2", image: "2.JPG" },
    { name: "3", image: "3.JPG" },
    { name: "4", image: "4.JPG" },
    { name: "5", image: "5.JPG" },
    { name: "6", image: "6.JPG" },
    { name: "7", image: "7.JPG" },
    { name: "8", image: "8.JPG" },

];

let seconds = 0,
    /*dekariraj promenliva "seconds" i inizijaliziraj ja na 0 */
    minutes = 0;
let movesCount = 0,
    winCount = 0;

const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        /*
            Create Cards
            before => front side (contains question mark)
            after => back side (contains actual image);
            data-card-values is a custom attribute which stores the names of the cards to match later
          */
        gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img style="height: 100%; width: 100%;" src="${cardValues[i].image}" class="image"/></div>
       
     </div>
     `;
    }


    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    movesCounter();

                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue === secondCardValue) {

                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
});

//Stop game
stopButton.addEventListener(
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};