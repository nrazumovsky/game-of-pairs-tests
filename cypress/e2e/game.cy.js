/* eslint-disable */
describe('Игра в пары', () => {
  beforeEach(() => {
    cy.visit('./02/index.html');
  });
  it('По умолчанию на поле должно быть 16 карт. Карты закрыты', () => {
    cy.get('.card').should('have.length', 16);
    cy.get('.card').each((card) => {
      cy.wrap(card).should('not.have.text');
    });
  });

  it('Карта должна оставаться открытой', () => {
    cy.get('.card').eq(0).click();
    cy.get('.card').eq(0).should('have.class', 'open');
  });

  it.only('Найденная пара карточек осталась видимой', () => {
    function checkPair(firstCard, secondCard) {
      cy.get('.card')
        .eq(firstCard)
        .click()
        .invoke('text')
        .then((text) => {
          const firstCardValue = text;

          cy.wait(500);
          cy.get('.card')
            .eq(++secondCard)
            .click()
            .invoke('text')
            .then((text) => {
              const secondCardValue = text;

              cy.wait(500);
              if (firstCardValue === secondCardValue) {
                return;
              } else {
                checkPair(firstCard, secondCard);
              }
            });
        });
    }

    checkPair(0, 0);
  });

  it('После нажатия на вторую карточку обе становятся невидимыми', () => {
    function checkCard(index) {
      cy.get('.card')
        .eq(index)
        .click()
        .invoke('text')
        .then((text) => {
          const firstCardValue = text;

          cy.wait(500);
          cy.get('.card')
            .eq(index + 1)
            .click()
            .invoke('text')
            .then((text) => {
              const secondCardValue = text;

              cy.wait(500);
              if (firstCardValue !== secondCardValue) {
                return;
              } else {
                checkCard(index + 2);
              }
            });
        });
    }

    checkCard(0);
  });
});
