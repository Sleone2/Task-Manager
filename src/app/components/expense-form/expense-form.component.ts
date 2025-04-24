import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExpenseService } from "../../services/expense.service";
import { Expense } from "../../models/expense";

@Component({
  selector: "app-expense-form",
  templateUrl: "./expense-form.component.html",
  styles: ``,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense: Expense | null = null;
  @Input() isEditMode = false;
  @Output() submit = new EventEmitter<Expense>();

  expenseForm: FormGroup;
  categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) {
    this.expenseForm = this.fb.group({
      description: ["", [Validators.required]],
      amount: ["", [Validators.required, Validators.min(0)]],
      category: [""],
      date: [new Date()],
      type: ["expense", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.expense) {
      this.expenseForm.patchValue({
        description: this.expense.description,
        amount: this.expense.amount,
        category: this.expense.category,
        date: this.expense.date,
        type: this.expense.type,
      });
    }
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      const expenseData: Expense = {
        ...formValue,
        id: this.expense?.id,
      };

      if (this.isEditMode && this.expense?.id) {
        this.expenseService.updateExpense(this.expense.id, expenseData).subscribe({
          next: () => {
            this.snackBar.open("Expense updated successfully!", "Close", {
              duration: 3000,
            });
            this.submit.emit(expenseData);
          },
          error: (error) => {
            this.snackBar.open("Error updating expense!", "Close", {
              duration: 3000,
            });
          }
        });
      } else {
        this.expenseService.addExpense(expenseData);
        this.expenseForm.reset({
          description: "",
          amount: "",
          category: "",
          date: new Date(),
          type: "expense",
        });
        this.snackBar.open("Expense added successfully!", "Close", {
          duration: 3000,
        });
        this.submit.emit(expenseData);
      }
    }
  }
}
