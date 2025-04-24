import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTableModule } from "@angular/material/table";
import { ExpenseListComponent } from "./expense-list.component";
import { provideHttpClient } from "@angular/common/http";

describe("Test Expense List Component", () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseListComponent, MatTableModule], 
      providers: [
        provideHttpClient()
      ]// Importing necessary Angular Material modules
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should load the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display Total Balance, Total Income, and Total Expenses in the template", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const totalBalance = compiled.querySelector(
      ".bg-primary .card-title"
    )?.textContent;
    const totalIncome = compiled.querySelector(
      ".bg-success .card-title"
    )?.textContent;
    const totalExpenses = compiled.querySelector(
      ".bg-danger .card-title"
    )?.textContent;

    expect(totalBalance).toContain("Total Balance");
    expect(totalIncome).toContain("Total Income");
    expect(totalExpenses).toContain("Total Expenses");
  });

  it("should have 6 column table", () => {
    const html = fixture.nativeElement;
    const rows = html.querySelectorAll("th.mat-mdc-header-cell");
    expect(rows.length).toBe(6);
  });

  it("should have 6 column headers", () => {
    const html = fixture.nativeElement;
    const rows = html.querySelectorAll("th.mat-mdc-header-cell");
    expect(rows[0].textContent).toContain("Date");
    expect(rows[1].textContent).toContain("Description");
    expect(rows[2].textContent).toContain("Category");
    expect(rows[3].textContent).toContain("Amount");
    expect(rows[4].textContent).toContain("Type");
    expect(rows[5].textContent).toContain("Actions");
  });
});
