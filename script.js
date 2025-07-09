let flippedCards = []
let matchedPairs = 0
let attempts = 0
let isCheckingPair = false

const pairs = [
  { pergunta: "Qual é o maior país da América do Sul?", resposta: "Brasil" },
  { pergunta: "Qual é o país com mais vulcões ativos?", resposta: "Chile" },
  { pergunta: "Qual é a capital da Argentina?", resposta: "Buenos Aires" },
  { pergunta: "Qual é a moeda do Peru?", resposta: "Sol" },
  { pergunta: "Qual país não tem saída para o mar?", resposta: "Paraguai" },
  { pergunta: "Qual é a língua oficial da Bolívia?", resposta: "Espanhol" },
  { pergunta: "Qual é a cordilheira que atravessa o continente?", resposta: "Andes" },
  { pergunta: "Qual é a maior floresta da região?", resposta: "Amazônia" }
]

let cards = []

pairs.forEach((pair) => {
    cards.push({id: pair.pergunta, texto: pair.pergunta, tipo: "pergunta", matched: false})
    cards.push({id: pair.pergunta, texto: pair.resposta, tipo: "resposta", matched: false})
})

function shuffleCards(array) {
    const shuffled = array.sort(() => Math.random() > 0.5 ? 1 : -1)
    return shuffled
}

function createdCard(cardData) {
    const cardElement = document.createElement("div")
    cardElement.classList.add("card")

    cardElement.dataset.id = cardData.id
    cardElement.dataset.tipo = cardData.tipo

    const cardFront = document.createElement("span")
    cardFront.classList.add("card-front")
    cardFront.textContent = cardData.texto

    cardElement.appendChild(cardFront)

    cardElement.addEventListener("click", () => handleCardClick(cardElement, cardData))

    return cardElement
}

function renderCards() {
    const deck = document.getElementById("deck")
    deck.innerHTML = ""

    const shuffled = shuffleCards(cards)
    shuffled.forEach((item) => {
        const cardElement = createdCard(item)
        deck.appendChild(cardElement)
    })
}

function handleCardClick(cardElement, cardData) {
    if (
        isCheckingPair ||
        cardElement.classList.contains("revealed")
    ) { 
        return
    }

    cardElement.classList.add("revealed")

    flippedCards.push({cardElement, cardData})

    if(flippedCards.length === 2){
        isCheckingPair = true
        attempts++

        const [first, second] = flippedCards

        
        const isMatch =
            first.cardData.id === second.cardData.id &&
            first.cardData.tipo !== second.cardData.tipo

        if (isMatch) {
            matchedPairs++
            cards.forEach(card => {
                if (card.id === first.cardData.id) {
                    card.matched = true
                }
            })

            flippedCards = []

            isCheckingPair = false

            updateScore()

            const toFind = cards.find(card => !card.matched)
            if(!toFind){
                setTimeout(() => {
                    alert("🎉 Parabéns, você encontrou todos os pares!")
                }, 200)
            }
        }   else {
            setTimeout(() => {
                first.cardElement.classList.remove("revealed")
                second.cardElement.classList.remove("revealed")
                flippedCards = []
                isCheckingPair = false
                updateScore()
            }, 2000)
        }
    }
}

function updateScore() {
    const score = document.getElementById("score")
    score.textContent = `${matchedPairs} acertos de ${attempts} tentativas`
}

function resetGame () {
    flippedCards = []
    matchedPairs = 0
    attempts = 0
    isCheckingPair = false

    cards.forEach((card) => card.matched = false)

    renderCards()
    updateScore()
}

function initGame() {
    renderCards()
    updateScore()
    document.getElementById("restart").addEventListener("click", resetGame)
}

initGame()