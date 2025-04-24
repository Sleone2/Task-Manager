// cypress/e2e/add_transaction_form.cy.ts

describe("Add New Transaction Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("should fill and submit the form successfully", () => {
    cy.get('input[formControlName="description"]')
      .scrollIntoView()
      .click({ force: true }) // Ensure it's focused and visible
      .type("Groceries at Walmart");

    cy.get('input[formControlName="amount"]')
      .scrollIntoView()
      .click({ force: true }) // Ensure it's focused and visible
      .type("100");

    cy.get('mat-select[formControlName="category"]')
      .scrollIntoView()
      .click({ force: true }) // Ensure it's focused and visible
      .get("mat-option")
      .contains("Food")
      .click({ force: true });

    // Submit the form
    cy.get('button[type="submit"]').should("not.be.disabled").click();
  });

  it("should show validation errors for description fields", () => {
    cy.get('input[formControlName="description"]')
      .scrollIntoView()
      .click({ force: true }) // Ensure it's focused and visible
      .blur();

    cy.get('input[formControlName="description"]')
      .scrollIntoView()
      .should("have.class", "ng-invalid");
  });

  it("should show validation errors for amount fields", () => {
    cy.get('input[formControlName="amount"]')
      .scrollIntoView()
      .click({ force: true }) // Ensure it's focused and visible
      .blur();

    cy.get('input[formControlName="description"]')
      .scrollIntoView()
      .should("have.class", "ng-invalid");
  });
});
