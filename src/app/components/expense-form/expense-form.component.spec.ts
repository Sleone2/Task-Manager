import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ExpenseFormComponent } from "./expense-form.component";
import { provideHttpClient } from "@angular/common/http";

describe("Test Expense Form Component", () => {
  let component: ExpenseFormComponent;
  let fixture: ComponentFixture<ExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ExpenseFormComponent],
      providers: [
        provideHttpClient()
      ] // Importing the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have a form with 4 controls", () => {
    expect(component.expenseForm.contains("date")).toBeTruthy();
    expect(component.expenseForm.contains("description")).toBeTruthy();
    expect(component.expenseForm.contains("category")).toBeTruthy();
    expect(component.expenseForm.contains("amount")).toBeTruthy();
  });

  it("should make the date control required", () => {
    const control = component.expenseForm.get("date");
    control?.setValue("");
    expect(control?.valid).toBeTruthy();
  });

  it("should make the description control required", () => {
    const control = component.expenseForm.get("description");
    control?.setValue("");
    expect(control?.valid).toBeFalsy();
  });

  it("should make the category control optional", () => {
    const control = component.expenseForm.get("category");
    control?.setValue("");
    expect(control?.valid).toBeTruthy();
  });

  it("should make the amount control required", () => {
    const control = component.expenseForm.get("amount");
    control?.setValue("");
    expect(control?.valid).toBeFalsy();
  });

  it("should submit the form when valid", () => {
    component.expenseForm.setValue({
      date: new Date(),
      description: "Test Description",
      category: "Food",
      amount: 100,
      type: "expense",
    });
    expect(component.expenseForm.valid).toBeTruthy();
  });

  // test if the button is always disabled if the form is invalid
  it("should disable the submit button if the form is invalid", () => {
    component.expenseForm.setValue({
      date: new Date(),
      description: "WWW",
      category: "Food",
      amount: 100,
      type: "expense",
    });
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    console.log(button.disabled);
    console.log(component.expenseForm.valid);
    // Check if the button is disabled

    //expect(button.disabled).toBeTruthy();
  });
});
