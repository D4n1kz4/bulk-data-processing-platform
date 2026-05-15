import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from './model/customer';
import { CustomerService } from './services/customer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  customers: Customer[] = [];
  searchTerm = '';
  loading = true;
  currentPage = 1;
  pageSize = 5;

  showForm = false;
  editingCustomer: Customer | null = null;
  saving = false;

  showDeleteModal = false;
  customerToDelete: Customer | null = null;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  formData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService.getCustomers()
      .subscribe({
        next: (data) => {
          this.customers = data;
          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Error loading customers:', error);
          this.loading = false;
          this.showToastMessage('Could not load customers.', 'error');
          this.cdr.detectChanges();
        }
      });
  }

  get filteredCustomers(): Customer[] {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      return this.customers;
    }

    return this.customers.filter(customer =>
      customer.firstName.toLowerCase().includes(term) ||
      customer.lastName.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.pageSize);
  }

  get paginatedCustomers(): Customer[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(start, start + this.pageSize);
  }

  get isFormValid(): boolean {
    return (
      this.formData.firstName.trim().length >= 2 &&
      this.formData.lastName.trim().length >= 2 &&
      this.isEmailValid(this.formData.email)
    );
  }

  get hasFormChanged(): boolean {
    if (!this.editingCustomer) {
      return (
        this.formData.firstName.trim() !== '' ||
        this.formData.lastName.trim() !== '' ||
        this.formData.email.trim() !== ''
      );
    }

    return (
      this.formData.firstName.trim() !== this.editingCustomer.firstName ||
      this.formData.lastName.trim() !== this.editingCustomer.lastName ||
      this.formData.email.trim() !== this.editingCustomer.email
    );
  }

  get canSaveCustomer(): boolean {
    return this.isFormValid && this.hasFormChanged && !this.saving;
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  openCreateForm(): void {
    this.editingCustomer = null;
    this.formData = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.showForm = true;
  }

  openEditForm(customer: Customer): void {
    this.editingCustomer = customer;

    this.formData = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email
    };

    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.saving = false;
  }

  saveCustomer(): void {
    if (!this.canSaveCustomer || this.saving) {
      return;
    }

    this.saving = true;

    if (this.editingCustomer) {
      this.customerService.updateCustomer(
        this.editingCustomer.id,
        this.formData
      ).subscribe({
        next: (updatedCustomer) => {
          this.customers = this.customers.map(customer =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
          );

          this.saving = false;
          this.closeForm();
          this.showToastMessage('Customer updated successfully.');
        },

        error: (error) => {
          console.error('Error updating customer:', error);
          this.saving = false;
          this.showToastMessage('Could not update customer.', 'error');
        }
      });

      return;
    }

    this.customerService.createCustomer(this.formData)
      .subscribe({
        next: (createdCustomer) => {
          this.customers = [...this.customers, createdCustomer];

          this.saving = false;
          this.closeForm();
          this.showToastMessage('Customer created successfully.');
        },

        error: (error) => {
          console.error('Error creating customer:', error);
          this.saving = false;
          this.showToastMessage('Could not create customer.', 'error');
        }
      });
  }

  openDeleteModal(customer: Customer): void {
    this.customerToDelete = customer;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.customerToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.customerToDelete) {
      return;
    }

    this.customerService.deleteCustomer(this.customerToDelete.id)
      .subscribe({
        next: () => {
          this.customers = this.customers.filter(
            customer => customer.id !== this.customerToDelete?.id
          );

          this.cancelDelete();
          this.showToastMessage('Customer archived successfully.');
        },

        error: (error) => {
          console.error('Error deleting customer:', error);
          this.cancelDelete();
          this.showToastMessage('Could not archive customer.', 'error');
        }
      });
  }

  showToastMessage(
    message: string,
    type: 'success' | 'error' = 'success'
  ): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

}