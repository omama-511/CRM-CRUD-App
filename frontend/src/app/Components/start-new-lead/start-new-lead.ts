import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { API_BASE_URL } from '../../config';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start-new-lead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule, MatSnackBarModule],
  templateUrl: './start-new-lead.html',
  styleUrl: './start-new-lead.css'
})
export class StartNewLead {
  leadForm: FormGroup;
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.leadForm = this.fb.group({
      // Lead Info
      lead_type: ['Web Lead'],
      step: ['New Lead'],
      open_close: ['Open'],
      tag: [''],
      source: [''],
      sub_source: [''],
      sales_person: ['William Smith'],
      split_deal_user: [''],

      // Contact Info
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      company_name: [''],
      email: ['', [Validators.required, Validators.email]],
      alternate_email: [''],
      cell: [''],
      phone: [''],
      work_number: [''],
      fax: [''],
      address: ['', Validators.required],
      address_line_2: [''],
      country: ['United States (US)'],
      city: [''],
      state_province: ['']
    });
  }

  onSubmit() {
    if (this.leadForm.valid) {
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this.http.post(`${API_BASE_URL}/leads/add`, this.leadForm.value, { headers }).subscribe({
        next: (response: any) => {
          this.snackBar.open('Lead Saved successfully!', 'Close', { 
            duration: 3000, 
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error saving lead', err);
          this.snackBar.open('Failed to save lead.', 'Close', { 
            duration: 5000, 
            panelClass: ['error-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
        }
      });
    } else {
      this.leadForm.markAllAsTouched();
    }
  }
}
