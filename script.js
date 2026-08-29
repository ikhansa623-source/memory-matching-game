console.log('hello');

document.querySelector("#startbtn").addEventListener("click", () => {
    let cont2 = document.querySelector(".cont2")
    cont2.style.display = "block"
    let cont1 = document.querySelector(".cont1")
    cont1.style.display = "none"


})




let symbols = ["🐎", "🦋", "😃", "🦷", "🪲", "😎","🐰","🙉","🐻","🐧", 


]



let flippedCards = []
let matchedCount = 0;
let moves = 0

let cards = [...symbols, ...symbols]
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
    console.log(array.sort(() => Math.random() - 0.5));

}
cards = shuffle(cards)

let board = document.getElementById("board")

// cards.forEach((symbol, index) => {
//     let card = document.createElement("div")
//     card.className = "card"
//     card.dataset.symbol = symbol
//     card.textContent = "🧧"
//     board.appendChild(card)

// })

function startgame() {



    flippedCards = []
    matchedCount = 0;
    moves = 0
    document.getElementById("winScreen").style.display = "none"
    document.getElementById("looseScreen").style.display = "none"


    document.getElementById("MovesDisplay").textContent = "moves:" + moves

    let cards = shuffle([...symbols, ...symbols])
    board.innerHTML = ""
    cards.forEach((symbol, index) => {
        let card = document.createElement("div")
        card.className = "card dropping"
        card.dataset.symbol = symbol
        card.textContent = "🧧"
        card.style.animationDelay = (index * 0.08) + "s"   // <- har card thoda late aayega

        board.appendChild(card)

            card.addEventListener("animationend", () => {
        card.classList.remove("dropping")
    }, { once: true })

    })
}
startgame()


document.getElementById("playAgainBtn").addEventListener("click", (e) => {
    setTimeout(() => {

        startgame() // page reload karke naya game shuru karo
    }, 1000);
})

document.getElementById("playAgain").addEventListener("click", (e) => {
    setTimeout(() => {

        startgame() // page reload karke naya game shuru karo
    }, 1500);
})
board.addEventListener("click", (e) => {
    console.log(e.target);

    let clickedCard = e.target

    // agar card pehle se khuli hai, ya already 2 cards khuli hain, kuch mat karo
    if (clickedCard.textContent !== "🧧" || flippedCards.length === 2) return


    clickedCard.textContent = clickedCard.dataset.symbol   // card ko khol do
    flippedCards.push(clickedCard)


    if (flippedCards.length === 2) {
        moves++
        document.getElementById("MovesDisplay").textContent = "moves:" + moves


        checkMatch()

        if (moves >= 22 && matchedCount < symbols.length) {
            document.getElementById("looseScreen").style.display = "block"

        }
    }
})

function checkMatch() {

    let [first, second] = flippedCards
    if (first.dataset.symbol === second.dataset.symbol) {
        console.log('match ho gya');
        first.classList.add("matched")    // <- YE ADD KARO
        second.classList.add("matched")
        matchedCount++
        flippedCards = []


        if (matchedCount === symbols.length) {
            confetti({
                particleCount: 2000,
                spread: 150,
                origin: { y: 0.6 }
            })
            setTimeout(() => {

                document.getElementById("winScreen").style.display = "block"
                document.getElementById("MovesDisplay").textContent = `You won in ${moves} moves!`


            }, 1000);

        }

        // console.log(e.target);

        // document.getElementById("status").textContent = "  hurrray 🎉🎉you win your progress"
    } else {

        first.classList.add("wrong")
        second.classList.add("wrong")

        setTimeout(() => {
            first.textContent = "🧧"
            second.textContent = "🧧"
            first.classList.remove("wrong")
            second.classList.remove("wrong")

            flippedCards = []
        }, 800);
    }



}

