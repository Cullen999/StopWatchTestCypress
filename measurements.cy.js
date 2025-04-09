import { StopWatch } from "../../support/stopWatch"

const stopWatch = new StopWatch;

function complianceCheck(el) {
  stopWatch.timer.invoke('text').then(timerText => {
    const correctTime = timerText.split(' ').slice(0, -1);
    cy.wrap(el).invoke('text').then(measurementsText => {
     const correct =  measurementsText.split(' ').slice(2);
        expect(...correct).to.equal(...correctTime);
    })
  })
}

describe('тестирование замеров', () => {

    const count = 3;

    beforeEach(() => {
      for(let i = 0; i < count; i++) {
        stopWatch.clickStart();
        cy.wait(1000);
        stopWatch.clickStart();
      }

      cy.get('#results > div').should('have.length', count);
       
    })


    it('проверка на нумерацию и соответствие последнего замера', () => {
      
     cy.get('#results > div').each((el, index) => {
       const expectedNumber = count - index;
      
       // проверка на нумерацию
       cy.wrap(el).invoke('text').should('match', new RegExp(`^Замер №${expectedNumber}\\.\\s\\d{2}:\\d{2}:\\d{2}\\.\\d{3}`) )
     
       // проверка соответствие последнего замера
       if(expectedNumber == 3) {
        complianceCheck(el)
       }

     })

    });


    it('нумерация после обнуления', () => {
      stopWatch.clickZero();
      stopWatch.clickStart();
      cy.wait(1000);
      stopWatch.clickStart();

      // проверка что замер добавился после обнуления
      cy.get('#results > div').should('have.length', 4);

      cy.get('#results > div').each((el, index) => {
        const expectedNumber = count + 1 - index;

        // проверка на нумерацию
        
        // здесь баг, нумерация посл. элемента не соответствует посл. элементу;
        cy.wrap(el).invoke('text').should('match', new RegExp(`^Замер №${expectedNumber}\\.\\s\\d{2}:\\d{2}:\\d{2}\\.\\d{3}`) );
        
        if(expectedNumber == 4) {
          complianceCheck(el);
        }
      }) 

    });

    it('очистка замеров', () => {

      stopWatch.clickClear();

      // проверка что замеры очистились
      stopWatch.results.should('not.be.visible');
    })
})