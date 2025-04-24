import { TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { provideHttpClient } from "@angular/common/http";

describe("Test Dashboard Component", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();
  });

  it("should create the dashboard component", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // create a test to check if h1 has Expense Tracker
  it("should contain h1 with Expense Tracker", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain(
      "Expense Tracker"
    );
  });

  it("should contain <app-expense-form/>", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("app-expense-form")).toBeTruthy();
  });

  it("should contain <app-expense-lsit/>", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("app-expense-list")).toBeTruthy();
  });
});
