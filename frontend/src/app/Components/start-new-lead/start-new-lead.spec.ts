import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { StartNewLead } from './start-new-lead';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('StartNewLead', () => {
  let component: StartNewLead;
  let fixture: ComponentFixture<StartNewLead>;
  let httpMock: HttpTestingController;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartNewLead, NoopAnimationsModule, MatSnackBarModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // Empty routes for simple navigation mocking
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StartNewLead);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges(); // Initialize bindings and form
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify(); // Ensure no outstanding requests
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization & Validation', () => {
    it('should initialize the form with default values and empty required fields', () => {
      expect(component.leadForm).toBeDefined();
      expect(component.leadForm.get('lead_type')?.value).toBe('Web Lead');
      expect(component.leadForm.get('first_name')?.value).toBe('');
      expect(component.leadForm.get('last_name')?.value).toBe('');
      expect(component.leadForm.valid).toBe(false); // Should be invalid initially due to required fields
    });

    it('should mark form as invalid when required fields are empty', () => {
      const form = component.leadForm;
      form.patchValue({
        first_name: '',
        last_name: '',
        email: '',
        address: ''
      });
      expect(form.valid).toBe(false);
    });

    it('should validate email format correctly', () => {
      const emailControl = component.leadForm.get('email');
      
      // Invalid email
      emailControl?.setValue('invalid-email');
      expect(emailControl?.valid).toBe(false);
      expect(emailControl?.errors?.['email']).toBeTruthy();

      // Valid email
      emailControl?.setValue('test@example.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should mark form as valid when all required fields are filled correctly', () => {
      component.leadForm.patchValue({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        address: '123 Main St'
      });
      expect(component.leadForm.valid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      vi.spyOn((component as any).snackBar, 'open').mockImplementation(() => ({} as any));
      vi.spyOn(router, 'navigate').mockResolvedValue(true);
    });

    it('should not submit the form and should mark all as touched if invalid', () => {
      component.onSubmit();
      
      expect(component.leadForm.touched).toBe(true);
      expect((component as any).snackBar.open).not.toHaveBeenCalled();
      httpMock.expectNone('http://localhost:8765/leads/add');
    });

    it('should submit form data, alert success, and navigate home on successful API response', () => {
      // Fill out the required form fields
      component.leadForm.patchValue({
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        address: '456 Tech Ave'
      });

      component.onSubmit();

      // Expect the HTTP POST request to have been made
      const req = httpMock.expectOne('http://localhost:8765/leads/add');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.first_name).toBe('Jane');
      
      // Simulate successful server response
      req.flush({
        status: 'success',
        data: {
          lead: { id: 123, first_name: 'Jane', last_name: 'Smith' }
        }
      });

      // Verify the success behaviors
      expect((component as any).snackBar.open).toHaveBeenCalledWith('Lead Saved successfully!', 'Close', expect.any(Object));
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should show an error alert if the API response fails', () => {
      // Fill out the required form fields
      component.leadForm.patchValue({
        first_name: 'Error',
        last_name: 'User',
        email: 'error@example.com',
        address: '789 Bad Gateway'
      });

      component.onSubmit();

      // Expect the request
      const req = httpMock.expectOne('http://localhost:8765/leads/add');
      
      // Simulate server error (e.g. 500 or 400)
      req.flush({
        status: 'error',
        message: 'Failed to save lead',
        data: { errors: { email: ['The email format is invalid'] } }
      }, { status: 400, statusText: 'Bad Request' });

      // Verify error behavior
      expect((component as any).snackBar.open).toHaveBeenCalledWith('Failed to save lead.', 'Close', expect.any(Object));
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
