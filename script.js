const wordEl = document.getElementById('word')
const popup = document.getElementById('popup-container')
const message = document.getElementById('success-message')
const wrong_letters = document.getElementById('wrong-letters')
const items = document.querySelectorAll(".item")
const messageEl = document.getElementById("message")
const btn = document.getElementById('play-again')

const correctLetters = []
const wrongLetters = []
let selectedWord = getRandomWord()

function getRandomWord() {
    const words = ['javascript', 'java', 'python', 'css', 'html', 'react', 'frontend', 'backend', 'function']

    return words[Math.floor(Math.random() * words.length)]
}

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `<div class='letter'>${correctLetters.includes(letter) ? letter : ''}</div>`).join('')}
    `

    const w = wordEl.innerText.replace(/\n/g, '')
    if (w === selectedWord) {
        popup.style.display = 'flex'
        message.innerText = 'Tebrikler, kazandınız.'
    }
}

function updateWrongLetters() {
    wrong_letters.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler:</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length

        if (index < errorCount) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex'
        message.innerText = 'Maalesef kaybettiniz.'
    }
}

function displayMessage() {
    messageEl.classList.add('show')
    setTimeout(() => {
        messageEl.classList.remove('show')
    }, 2000);
}

btn.addEventListener('click', function() {
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = getRandomWord()

    displayWord()
    updateWrongLetters()

    popup.style.display = 'none'
})

window.addEventListener('keydown', function(e) {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)
                displayWord()
            } else {
                displayMessage()
            }
        }else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
                updateWrongLetters()
            } else {
                displayMessage()
            }
        }
    }
})

displayWord()