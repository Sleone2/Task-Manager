import { Component } from "@angular/core";
import { ExpenseFormComponent } from "../expense-form/expense-form.component";
import { ExpenseListComponent } from "../expense-list/expense-list.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: ``,
  imports: [ExpenseFormComponent, ExpenseListComponent],
})
export class DashboardComponent {}
