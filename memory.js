const cardsColor = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray",
    "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"
];

let cards = document.querySelectorAll("div");

cards = [...cards];

//LICZNIK CZASU
const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
    console.log('klik');
    activeCard = this;

    if (activeCard == activeCards[0]) {
        return
    }



    activeCard.classList.remove("hidden");

    activeCard.style.animation = "cardAnime 1s linear";




    //czy to 1 kliknięcie
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }

    //czy to 2 kliknięcie
    else {
        cards.forEach((card) => {
            card.removeEventListener("click", clickCard)
        })

        activeCards[1] = activeCard;

        setTimeout(() => {

            if (activeCards[0].className === activeCards[1].className) {
                console.log('wygrana');
                activeCards.forEach((card) => {
                    card.classList.add("off")
                });
                gameResult++;

                cards = cards.filter(card => !card.classList.contains("off"));

                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Twoja gra trwała: ${gameTime} sekund`)
                    console.log('WYGRANA GRA');
                    location.reload();
                }

            } else {
                console.log('przegrana');
                activeCards.forEach((card) => {
                    card.classList.add("hidden")
                })
            }

            activeCard = "";
            activeCards.length = 0;
            cards.forEach((card) => {
                card.addEventListener("click", clickCard);
            })
        }, 500)


    }

}

const init = function () {
    cards.forEach((card) => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1) //usunięcie elementu z tablicy po jego wylosowaniu
    })

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    }, 4000)
}

init()