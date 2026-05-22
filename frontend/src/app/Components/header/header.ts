import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_BASE_URL } from '../../config';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private http = inject(HttpClient);
  private searchSubject = new Subject<string>();
  
  constructor(private router: Router) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length < 3) {
          return [ { data: { leads: [] } } ];
        }
        return this.http.get(`${API_BASE_URL}/leads?q=${query}`, {
          headers: { 'Accept': 'application/json' }
        });
      })
    ).subscribe((response: any) => {
      this.searchResults = response?.data?.leads || [];
    });
  }

  @Input() isSidebarOpened = true;
  @Output() toggleSidebar = new EventEmitter<void>();

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

  showNewLeadModal = false;

  openNewLeadModal() {
    this.showNewLeadModal = true;
  }

  closeNewLeadModal() {
    this.showNewLeadModal = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  searchQuery = '';
  searchResults: any[] = [];

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  selectSearchResult(lead: any) {
    // For now, let's just log it and close the modal
    // In a real app, we might navigate to dashboard and select this lead
    console.log('Selected lead:', lead);
    this.closeNewLeadModal();
    // We could use a service to communicate with Dashboard or just navigate
    // Let's assume for now we just want to show we found it.
  }

  navigateToStartNewLead() {
    this.closeNewLeadModal();
    this.router.navigate(['/start-new-lead']);
  }
}
