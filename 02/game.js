(() => {
  let arr = [];
  let matchedCards = '';
  let firstCard = '';
  let secondCard = '';
  let time = 60;
  let container = document.getElementById('container');

  function createCardsNumberArray(count) {
    for (let i = 1; i <= count / 2; i++) {
      arr.push(i, i);
    }

    return arr;
  }

  function shuffle(arr) {
    let newArr = [...arr];
    newArr.sort(() => {
      return Math.random() > 0.5 ? 1 : -1;
    });

    return newArr;
  }

  function createCard(num) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.textContent = num;

    return card;
  }

  function openCard(e) {
    if (firstCard && secondCard) {
      return;
    }

    const currentCard = e.target;

    if (time > 0) {
      currentCard.classList.add('open');
      console.log(arr.length);

      if (currentCard !== firstCard) {
        if (!firstCard) {
          firstCard = currentCard;
          return;
        }

        secondCard = currentCard;

        let firstCardNum = firstCard.textContent;
        let secondCardNum = secondCard.textContent;

        matchedNumbers(firstCardNum, secondCardNum);
      }
    }
  }

  function matchedNumbers(first, second) {
    if (time <= 0) {
      firstCard.removeEventListener('click', openCard);
      secondCard.removeEventListener('click', openCard);
      firstCard = '';
      secondCard = '';

      return;
    }

    if (first == second) {
      matchedCards++;

      firstCard.classList.add('success');
      secondCard.classList.add('success');
      firstCard.style.pointerEvents = 'none';
      secondCard.style.pointerEvents = 'none';

      if (matchedCards * 2 == arr.length) {
        firstCard.removeEventListener('click', openCard);
        secondCard.removeEventListener('click', openCard);
        firstCard = '';
        secondCard = '';

        return;
      }
    }

    firstCard.classList.add('fail');
    secondCard.classList.add('fail');

    setTimeout(() => {
      firstCard.classList.remove('open', 'fail');
      secondCard.classList.remove('open', 'fail');
      firstCard = '';
      secondCard = '';
    }, 500);
  }

  function createGame(container, num) {
    matchedCards = 0;
    firstCard = '';
    secondCard = '';

    let list = document.createElement('ul');
    let cards = list.querySelectorAll('.card');

    list.classList.add('cardslist', 'flex');
    container.append(list);

    for (let card of cards) {
      card.remove();
    }

    let arr = shuffle(createCardsNumberArray(num));

    for (num of arr) {
      let card = createCard(num);

      card.classList.remove('open');
      card.addEventListener('click', openCard);
      list.append(card);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    createGame(container, 16);
  });
})();
