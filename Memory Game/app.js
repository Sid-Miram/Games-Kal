document.addEventListener('DOMContentLoaded', () => {
   
    const cardArray = [
        { name: 'fries', img: 'images/fries.png' },
        { name: 'cheeseburger', img: 'images/cheeseburger.png' },
        { name: 'ice-cream', img: 'images/ice-cream.png' },
        { name: 'pizza', img: 'images/pizza.png' },
        { name: 'milkshake', img: 'images/milkshake.png' },
        { name: 'hotdog', img: 'images/hotdog.png' },
        { name: 'fries', img: 'images/fries.png' },
        { name: 'cheeseburger', img: 'images/cheeseburger.png' },
        { name: 'ice-cream', img: 'images/ice-cream.png' },
        { name: 'pizza', img: 'images/pizza.png' },
        { name: 'milkshake', img: 'images/milkshake.png' },
        { name: 'hotdog', img: 'images/hotdog.png' }
    ];

   
    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const timerDisplay = document.querySelector('#timer');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let timer;
    let seconds = 0;

 
    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `Time: ${seconds}s`;
        }, 1000);
    }

   
    function stopTimer() {
        clearInterval(timer);
    }

   
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
        startTimer();  
    }

   
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        
        if(optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('You clicked the same image!');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry, try again!');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        
       
        if (cardsWon.length === cardArray.length / 2) {
            stopTimer();
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();  
});
