import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'app-expense-edit-modal',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  template: `
    <div class="modal-backdrop" *ngIf="isOpen">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit Expense</h2>
          <button class="close-button" (click)="close()">&times;</button>
        </div>
        <div class="modal-body">
          <app-expense-form
            [expense]="expense"
            (submit)="onSubmit($event)"
            [isEditMode]="true"
          ></app-expense-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
  `]
})
export class ExpenseEditModalComponent {
  @Input() isOpen = false;
  @Input() expense: Expense | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<Expense>();

  close() {
    this.closeModal.emit();
  }

  onSubmit(expense: Expense) {
    this.save.emit(expense);
    this.close();
  }
} 