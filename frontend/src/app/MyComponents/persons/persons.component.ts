import { Component, OnInit } from '@angular/core';
import { Person } from '../../person';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';
import { PersonItemComponent } from '../person-item/person-item.component';
import { AddPersonComponent } from '../add-person/add-person.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  imports: [CommonModule, PersonItemComponent, AddPersonComponent],
  styleUrl: './persons.component.css'
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [];
  loading: boolean = false;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.personService.getPersons().then((res) => {
      this.persons = res;
    });
  }

  addPerson(person: Person) {
    this.loading = true;
    this.personService.addPerson(person).then((res) => {
      this.loadPersons();
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      alert(err?.response?.data?.message || 'Failed to add person');
    });
  }

  deletePerson(person: Person) {
    this.loading = true;
    this.personService.deletePerson(person._id!).then(() => {
      this.loadPersons();
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      alert(err?.response?.data?.message || 'Failed to delete person');
    });
  }

  editPerson(person: Person) {
    this.loading = true;
    this.personService.editPerson(person._id!, person).then(() => {
      this.loadPersons();
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      alert(err?.response?.data?.message || 'Failed to edit person');
    });
  }
}
