import { Component, OnInit, OnDestroy, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  currentDate: Date = new Date();
  private intervalId: any;

  // Signals for reliable state management in zone-less mode
  leads: WritableSignal<any[]> = signal([]);
  selectedLead: WritableSignal<any | null> = signal(null);
  activeTab: string = 'Lead Detail';
  editingFields: any = {};
  showLocationModal = false;
  showTransferModal = false;
  showroomTooltip = false;
  showEditLeadModal = false;
  editLeadForm: any = {};

  openTransferModal() {
    this.showTransferModal = true;
  }

  closeTransferModal() {
    this.showTransferModal = false;
  }

  locations = [
    { name: 'DP360 TEST Hawaii Marine - Waianae', dealerId: '#1077', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Sunset', dealerId: '#1679', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Kaimuki', dealerId: '#1690', selected: true },
    { name: 'Hawaii Marine - Kalapana', dealerId: '#1747', selected: true },
  ];

  private toggleTimeout: any;

  toggleEdit(field: string) {
    // Prevent double triggers from enter + blur
    if (this.toggleTimeout) {
      clearTimeout(this.toggleTimeout);
    }

    this.toggleTimeout = setTimeout(() => {
      const isSaving = this.editingFields[field];
      this.editingFields[field] = !this.editingFields[field];

      if (isSaving && this.selectedLead()) {
        this.updateLead();
      }
    }, 150);
  }

  showAddEventModal = false;
  events = signal<any[]>([
    {
      type: 'Sales Appointment',
      status: 'Scheduled',
      salesPerson: 'M.Mahsam Abbas',
      department: 'Sales',
      description: '',
      date: 'May 09, 2026',
      startTime: '09:15 PM',
      endTime: '09:30 PM'
    },
    {
      type: 'Phone Call Out',
      status: 'Scheduled',
      salesPerson: 'M.Mahsam Abbas',
      department: 'Sales',
      description: '',
      date: 'May 09, 2026',
      startTime: '09:15 PM',
      endTime: '09:30 PM'
    }
  ]);
  newEvent = {
    type: 'Sales Appointment',
    status: 'Scheduled',
    salesPerson: 'M.Mahsam Abbas',
    department: 'Sales',
    description: '',
    date: 'May 09, 2026',
    startTime: '09:15 PM',
    endTime: '09:30 PM'
  };

  onAddEvent() {
    this.showAddEventModal = true;
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
  }

  saveEvent() {
    this.events.update(evts => [...evts, { ...this.newEvent }]);
    this.closeAddEventModal();
    // Reset form
    this.newEvent = {
      type: 'Sales Appointment',
      status: 'Scheduled',
      salesPerson: 'M.Mahsam Abbas',
      department: 'Sales',
      description: '',
      date: 'May 09, 2026',
      startTime: '09:15 PM',
      endTime: '09:30 PM'
    };
  }

  deleteEvent(index: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events.update(evts => evts.filter((_, i) => i !== index));
    }
  }

  editEvent(index: number) {
    this.newEvent = { ...this.events()[index] };
    this.showAddEventModal = true;
    // For now this just re-adds, we could make it update instead by tracking index
  }

  openLocationModal() {
    this.showLocationModal = true;
  }

  closeLocationModal() {
    this.showLocationModal = false;
  }

  confirmLocation() {
    const selected = this.locations.filter(l => l.selected);
    const currentLead = this.selectedLead();
    if (currentLead) {
      if (selected.length === 1) {
        currentLead.customerAt = selected[0].name.split(' - ').pop() || selected[0].name;
      } else if (selected.length > 1) {
        currentLead.customerAt = 'Multilocation';
      }
      this.selectedLead.set({ ...currentLead });
    }
    this.showLocationModal = false;
  }



  // Handles lead selection
  selectLead(lead: any) {
    const initials = lead.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();

    this.selectedLead.set({
      id: lead.id,
      name: lead.name,
      initials,
      type: lead.type,
      email: lead.email,
      status: lead.status,
      salesRep: lead.assignee !== 'Unassigned' ? lead.assignee : 'Not Assigned',
      modifiedDate: lead.time,
      source: lead.source,
      soldStatus: lead.status === 'Sold' ? 'Sold' : 'Not Sold',
      customerAt: 'Showroom',
      phone: lead.phone,
      location: 'New York, NY',
      createdDate: 'May 01, 2026',
      step: 'Write Up',
      leadAge: '3 Days',
      originator: 'System',
      originatorSub: 'Auto-assigned',
      confidence: 'High',
      department: 'Sales',
      purchase: 'Within 30 Days'
    });
  }

  // Handle tab clicks
  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  ngOnInit() {
    // Small delay to ensure view and zone are stable
    setTimeout(() => {
      this.fetchLeads();
    }, 0);

    // Updates current date every minute
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 60000);
  }

  ngOnDestroy() {
    // Prevent memory leak
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchLeads() {
    const headers = { 'Accept': 'application/json' };
    this.http.get('http://localhost:8765/leads', { headers }).subscribe({
      next: (response: any) => {
        if (response && response.status === 'success' && response.data && response.data.leads) {
          // Map backend data to frontend format
          const mappedLeads = response.data.leads.map((lead: any) => ({
            id: lead.id,
            name: (lead.first_name || '') + ' ' + (lead.last_name || ''),
            type: lead.lead_type || 'Unknown',
            email: lead.email || 'N/A',
            assignee: lead.sales_person || 'Unassigned',
            status: lead.open_close || 'New',
            time: lead.created ? new Date(lead.created).toLocaleString() : 'N/A',
            source: lead.source || 'Website',
            phone: lead.phone || lead.cell || 'N/A',
            company: lead.company_name || 'N/A'
          }));

          this.leads.set(mappedLeads);

          if (mappedLeads.length > 0) {
            const currentSelected = this.selectedLead();
            if (currentSelected && currentSelected.id) {
              const updatedLead = mappedLeads.find((l: any) => l.id === currentSelected.id);
              if (updatedLead) {
                this.selectLead(updatedLead);
              } else {
                this.selectLead(mappedLeads[0]);
              }
            } else {
              this.selectLead(mappedLeads[0]);
            }
          }
        }
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
      }
    });
  }

  updateLead() {
    const currentLead = this.selectedLead();
    if (!currentLead || !currentLead.id) return;

    // Split name into first and last
    const nameParts = (currentLead.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: currentLead.email,
      phone: currentLead.phone,
      sales_person: currentLead.salesRep !== 'Not Assigned' ? currentLead.salesRep : '',
      department: currentLead.department
    };

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this.http.put(`http://localhost:8765/leads/edit/${currentLead.id}`, payload, { headers }).subscribe({
      next: (res) => {
        this.snackBar.open('Lead inline update saved successfully', 'Close', { 
          duration: 3000, panelClass: ['success-snackbar'], horizontalPosition: 'end', verticalPosition: 'bottom' 
        });
        this.fetchLeads(); // Refresh list to reflect changes
      },
      error: (err) => {
        console.error('Error updating lead', err);
        this.snackBar.open('Failed to update lead via inline edit.', 'Close', { 
          duration: 5000, panelClass: ['error-snackbar'], horizontalPosition: 'end', verticalPosition: 'bottom' 
        });
      }
    });
  }

  openEditLeadModal() {
    const currentLead = this.selectedLead();
    if (currentLead) {
      this.editLeadForm = { ...currentLead };
      this.showEditLeadModal = true;
    }
  }

  closeEditLeadModal() {
    this.showEditLeadModal = false;
  }

  saveEditLeadForm() {
    if (!this.editLeadForm || !this.editLeadForm.id) return;

    const nameParts = (this.editLeadForm.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: this.editLeadForm.email,
      phone: this.editLeadForm.phone,
      sales_person: this.editLeadForm.salesRep !== 'Not Assigned' ? this.editLeadForm.salesRep : '',
      department: this.editLeadForm.department
    };

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this.http.put(`http://localhost:8765/leads/edit/${this.editLeadForm.id}`, payload, { headers }).subscribe({
      next: (res) => {
        this.snackBar.open('Lead details updated successfully', 'Close', { 
          duration: 3000, panelClass: ['success-snackbar'], horizontalPosition: 'end', verticalPosition: 'bottom' 
        });
        this.closeEditLeadModal();
        this.fetchLeads(); // Refresh list to reflect changes
      },
      error: (err) => {
        console.error('Error updating lead via modal', err);
        this.snackBar.open('Failed to update lead details.', 'Close', { 
          duration: 5000, panelClass: ['error-snackbar'], horizontalPosition: 'end', verticalPosition: 'bottom' 
        });
      }
    });
  }

  deleteLead(id: number) {
    if (confirm('Are you sure you want to delete this lead? This cannot be undone.')) {
      const headers = { 'Accept': 'application/json' };
      this.http.delete(`http://localhost:8765/leads/delete/${id}`, { headers }).subscribe({
        next: (res) => {
          this.snackBar.open('Lead deleted successfully', 'Close', { 
            duration: 3000, panelClass: ['success-snackbar'], horizontalPosition: 'end', verticalPosition: 'bottom' 
          });
          this.selectedLead.set(null);
          this.fetchLeads();
        },
        error: (err) => {
          console.error('Error deleting lead', err);
          this.snackBar.open('Failed to delete lead.', 'Close', { 
            duration: 5000, panelClass: ['error-snackbar'], horizontalPosition: 'end', verticalPosition: 'bottom' 
          });
        }
      });
    }
  }
}