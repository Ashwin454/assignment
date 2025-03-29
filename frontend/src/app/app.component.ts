import { Component } from '@angular/core';
import { PersonsComponent } from "./MyComponents/persons/persons.component";

@Component({
  selector: 'app-root',
  imports: [PersonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  
}
