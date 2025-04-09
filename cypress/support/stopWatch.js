export class StopWatch {
    get timer() {
        return cy.get('#timer');
      }
    
      get startButton() {
        return cy.get('#start');
      }
    
      get zeroButton() {
        return cy.get('#zero');
      }

      get clearButton() {
        return cy.get('#refresh');
      }
    
      get results() {
        return cy.get('#results');
      }
    
      clickStart() {
        this.startButton.click();
      }

      clickZero() {
        this.zeroButton.click();
      }

      clickClear() {
        this.clearButton.click();
      }
}
