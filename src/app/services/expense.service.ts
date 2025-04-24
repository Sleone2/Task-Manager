import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Expense } from "../models/expense";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;
  private expensesSubject = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient) {
    this.loadExpenses();
  }

  private loadExpenses(): void {
    this.http.get<Expense[]>(this.apiUrl).subscribe(expenses => {
      this.expensesSubject.next(expenses);
    });
  }

  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  addExpense(expense: Expense): void {
    this.http.post<Expense>(this.apiUrl, expense).subscribe(newExpense => {
      this.loadExpenses();
    });
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense).pipe(
      tap(() => {
        this.loadExpenses();
      })
    );
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadExpenses();
      })
    );
  }

  getTotalBalance(): number {
    let total = 0;
    this.expensesSubject.value.forEach(expense => {
      total += expense.type === "income" ? expense.amount : -expense.amount;
    });
    return total;
  }
}
