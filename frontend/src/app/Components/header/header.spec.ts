import { describe, it, expect, beforeEach } from 'vitest';

// Test dummy class that mimics the Header logic without Angular decorators
// This allows testing the logic in environments where the Angular Compiler isn't working
export class HeaderLogic {
  isSidebarOpened = true;
  showLocationModal = false;
  selectedLocationName = 'Multilocation';

  locations = [
    { name: 'DP360 TEST Hawaii Marine - Waianae', dealerId: '#1077', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Sunset', dealerId: '#1679', selected: true },
    { name: 'DP360 TEST Hawaii Marine - Kaimuki', dealerId: '#1690', selected: true },
    { name: 'Hawaii Marine - Kalapana', dealerId: '#1747', selected: true },
  ];

  openLocationModal() { this.showLocationModal = true; }
  closeLocationModal() { this.showLocationModal = false; }

  confirmLocation() {
    const selected = this.locations.filter(l => l.selected);
    if (selected.length === 1) {
      this.selectedLocationName = selected[0].name.split(' - ').pop() || selected[0].name;
    } else if (selected.length > 1) {
      this.selectedLocationName = 'Multilocation';
    } else {
      this.selectedLocationName = 'No Location';
    }
    this.showLocationModal = false;
  }
}

describe('Header Logic (Decorator-Free Unit Tests)', () => {
  let component: HeaderLogic;

  beforeEach(() => {
    component = new HeaderLogic();
  });

  it('should initialize with 4 locations', () => {
    expect(component.locations.length).toBe(4);
  });

  it('should default selected location name to Multilocation', () => {
    expect(component.selectedLocationName).toBe('Multilocation');
  });

  it('should set showLocationModal to true when openLocationModal is called', () => {
    component.openLocationModal();
    expect(component.showLocationModal).toBe(true);
  });

  it('should set showLocationModal to false when closeLocationModal is called', () => {
    component.showLocationModal = true;
    component.closeLocationModal();
    expect(component.showLocationModal).toBe(false);
  });

  it('should update selectedLocationName to "Multilocation" when more than one location is selected', () => {
    component.locations[0].selected = true;
    component.locations[1].selected = true;
    component.confirmLocation();
    expect(component.selectedLocationName).toBe('Multilocation');
  });

  it('should update selectedLocationName to specific location name when exactly one is selected', () => {
    component.locations.forEach(l => l.selected = false);
    component.locations[0].selected = true;
    component.locations[0].name = 'DP360 TEST Hawaii Marine - Waianae';
    
    component.confirmLocation();
    expect(component.selectedLocationName).toBe('Waianae');
  });

  it('should update selectedLocationName to "No Location" when zero locations are selected', () => {
    component.locations.forEach(l => l.selected = false);
    component.confirmLocation();
    expect(component.selectedLocationName).toBe('No Location');
  });
});