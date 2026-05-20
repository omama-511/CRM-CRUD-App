import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Sidebar } from './Components/sidebar/sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontendDesign');
}
