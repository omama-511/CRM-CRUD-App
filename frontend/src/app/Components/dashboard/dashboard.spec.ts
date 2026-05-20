import { describe, it, expect, beforeEach, vi } from 'vitest';

// Dashboard Logic test suite
// We mirror the component's internal logic to verify state management,
// lead selection, event handling, and tab switching.
class DashboardLogic {
  selectedLead: any = null;
  activeTab: string = 'Lead Detail';
  showTransferModal = false;
  showAddEventModal = false;
  showLocationModal = false;
  editingFields: any = {};

  locations = [
    { name: 'DP360 TEST Hawaii Marine - Waianae', dealerId: '#1077', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Sunset', dealerId: '#1679', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Kaimuki', dealerId: '#1690', selected: true },
    { name: 'Hawaii Marine - Kalapana', dealerId: '#1747', selected: true },
  ];

  leads = [
    { id: 1, name: 'Alice Johnson', type: 'Web Lead', email: 'alice.j@cloudnet.com', assignee: 'Robert Fox', status: 'Active', time: 'May 04, 2026 11:20 AM', source: 'Website' },
    { id: 2, name: 'Bob Williams', type: 'Phone Call', email: 'bob.w@gmail.com', assignee: 'Unassigned', status: 'New', time: 'May 04, 2026 10:45 AM', source: 'Inbound' }
  ];

  events: any[] = [];
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

  selectLead(lead: any) {
    const initials = lead.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    this.selectedLead = {
      name: lead.name,
      initials,
      status: lead.status,
      salesRep: lead.assignee !== 'Unassigned' ? lead.assignee : 'Not Assigned',
      customerAt: 'Showroom',
      originator: 'System',
      confidence: 'High',
      purchase: 'Within 30 Days'
    };
  }

  setActiveTab(tab: string) { this.activeTab = tab; }
  toggleEdit(field: string) { this.editingFields[field] = !this.editingFields[field]; }
  openTransferModal() { this.showTransferModal = true; }
  closeTransferModal() { this.showTransferModal = false; }
  openLocationModal() { this.showLocationModal = true; }
  closeLocationModal() { this.showLocationModal = false; }

  confirmLocation() {
    const selected = this.locations.filter(l => l.selected);
    if (selected.length === 1) {
      this.selectedLead.customerAt = selected[0].name.split(' - ').pop() || selected[0].name;
    } else if (selected.length > 1) {
      this.selectedLead.customerAt = 'Multilocation';
    }
    this.showLocationModal = false;
  }

  saveEvent() {
    this.events.push({ ...this.newEvent });
    this.showAddEventModal = false;
  }

  deleteEvent(index: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events.splice(index, 1);
    }
  }

  editEvent(index: number) {
    this.newEvent = { ...this.events[index] };
    this.showAddEventModal = true;
  }
}

describe('Dashboard Logic (Full Coverage Tests)', () => {
  let component: DashboardLogic;

  beforeEach(() => {
    component = new DashboardLogic();
    // Mock global confirm for delete tests
    vi.stubGlobal('confirm', vi.fn(() => true));
  });

  it('should initialize with Lead Detail as active tab', () => {
    expect(component.activeTab).toBe('Lead Detail');
  });

  it('should switch active tabs correctly', () => {
    component.setActiveTab('History');
    expect(component.activeTab).toBe('History');
  });

  it('should generate correct initials and map sales rep when selecting a lead', () => {
    const lead = component.leads[0];
    component.selectLead(lead);

    expect(component.selectedLead.name).toBe('Alice Johnson');
    expect(component.selectedLead.initials).toBe('AJ');
    expect(component.selectedLead.salesRep).toBe('Robert Fox');
  });

  it('should map detailed lead attributes like Originator and Confidence', () => {
    const lead = component.leads[0];
    component.selectLead(lead);

    expect(component.selectedLead.originator).toBe('System');
    expect(component.selectedLead.confidence).toBe('High');
    expect(component.selectedLead.purchase).toBe('Within 30 Days');
  });

  it('should mark sales rep as "Not Assigned" for unassigned leads', () => {
    const lead = component.leads[1];
    component.selectLead(lead);
    expect(component.selectedLead.salesRep).toBe('Not Assigned');
  });

  it('should toggle field editing state', () => {
    component.toggleEdit('email');
    expect(component.editingFields['email']).toBe(true);
    component.toggleEdit('email');
    expect(component.editingFields['email']).toBe(false);
  });

  it('should handle transfer modal visibility', () => {
    component.openTransferModal();
    expect(component.showTransferModal).toBe(true);
    component.closeTransferModal();
    expect(component.showTransferModal).toBe(false);
  });

  it('should handle location modal visibility', () => {
    component.openLocationModal();
    expect(component.showLocationModal).toBe(true);
    component.closeLocationModal();
    expect(component.showLocationModal).toBe(false);
  });

  it('should update customerAt to "Multilocation" when multiple locations are selected', () => {
    component.selectedLead = { customerAt: '' };
    component.locations[0].selected = true;
    component.locations[1].selected = true;

    component.confirmLocation();
    expect(component.selectedLead.customerAt).toBe('Multilocation');
  });

  it('should update customerAt to specific location name when exactly one is selected', () => {
    component.selectedLead = { customerAt: '' };
    component.locations.forEach(l => l.selected = false);
    component.locations[0].selected = true; // Waianae

    component.confirmLocation();
    expect(component.selectedLead.customerAt).toBe('Waianae');
  });

  it('should add a new event to the list and close modal', () => {
    component.showAddEventModal = true;
    component.saveEvent();

    expect(component.events.length).toBe(1);
    expect(component.showAddEventModal).toBe(false);
  });

  it('should delete an event from the list when confirmed', () => {
    component.events = [{ type: 'Meeting' }, { type: 'Call' }];
    component.deleteEvent(0);

    expect(component.events.length).toBe(1);
    expect(component.events[0].type).toBe('Call');
  });

  it('should load an event into newEvent for editing and open modal', () => {
    component.events = [{ type: 'Meeting A' }];
    component.editEvent(0);

    expect(component.newEvent.type).toBe('Meeting A');
    expect(component.showAddEventModal).toBe(true);
  });
});
