import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Person } from '../../person';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-person-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent {
  @Input() person!: Person;
  @Output() personDelete: EventEmitter<Person> = new EventEmitter();
  @Output() personEdit: EventEmitter<Person> = new EventEmitter();

  @ViewChild('editModal') editModalRef!: ElementRef;

  selectedPerson: Person = {} as Person;
  modal: any;

  ngOnChanges() {
    this.selectedPerson = { ...this.person };
  }

  ngAfterViewInit() {
    if (this.editModalRef) {
      this.modal = new bootstrap.Modal(this.editModalRef.nativeElement);
    }
  }

  onDelete() {
    this.personDelete.emit(this.person);
  }

  onEdit() {
    this.selectedPerson = { ...this.person };
    if (this.modal) {
      this.modal.show();
    }
  }

  onSaveChanges() {
    this.personEdit.emit(this.selectedPerson);
    if (this.modal) {
      this.modal.hide();
    }
  }
}
