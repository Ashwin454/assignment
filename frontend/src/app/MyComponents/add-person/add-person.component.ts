import { Component, EventEmitter, Output } from '@angular/core';
import { Person } from '../../person';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-person',
  imports: [
    FormsModule
  ],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  person: Person = new Person('', 0, '', 0)
  @Output() personAdd: EventEmitter<Person> = new EventEmitter();
  addPerson() {
    console.log("Person Added: ", this.person);
    this.personAdd.emit(this.person)
    this.person = new Person('', 0, '', 0);
  }
}
