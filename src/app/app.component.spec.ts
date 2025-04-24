import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { provideHttpClient } from "@angular/common/http";

describe("Test App Component", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should contain <app-dashboard />", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("app-dashboard")).toBeTruthy();
  });
});
