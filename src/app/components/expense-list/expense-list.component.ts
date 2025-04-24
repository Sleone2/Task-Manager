import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { ExpenseService } from "../../services/expense.service";
import { Expense } from "../../models/expense";
import { ExpenseEditModalComponent } from "../expense-edit-modal/expense-edit-modal.component";
import { FilterPipe } from "../../pipes/filter.pipe";
import { SumPipe } from "../../pipes/sum.pipe";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ExpenseEditModalComponent,
    FilterPipe,
    SumPipe,
  ],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  displayedColumns: string[] = [
    "date",
    "description",
    "category",
    "amount",
    "type",
    "actions",
  ];
  totalBalance = 0;
  isEditModalOpen = false;
  selectedExpense: Expense | null = null;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
      this.calculateTotalBalance();
    });
  }

  calculateTotalBalance(): void {
    this.totalBalance = this.expenses.reduce((total, expense) => {
      return expense.type === "income"
        ? total + expense.amount
        : total - expense.amount;
    }, 0);
  }

  getAmountClass(type: string): string {
    return type === "income" ? "text-success" : "text-danger";
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

  openEditModal(expense: Expense): void {
    this.selectedExpense = { ...expense };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedExpense = null;
  }

  handleExpenseUpdate(updatedExpense: Expense): void {
    if (updatedExpense.id) {
      this.expenseService.updateExpense(updatedExpense.id, updatedExpense).subscribe({
        next: () => {
          this.loadExpenses();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating expense:', error);
        }
      });
    }
  }
}
