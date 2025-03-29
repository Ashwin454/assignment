import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../person';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  private apiUrl = 'https://assignment-11bo.onrender.com/api/v1';
  constructor(){}

  async getPersons(): Promise<Person[]> {
    const response = await axios.get(`${this.apiUrl}/getPersons`);
    return response.data.persons
  }
  async addPerson(person: Person): Promise<any>{
    const response = await axios.post(`${this.apiUrl}/addUser`, person);
    return response.data;
  }
  async deletePerson(id: string): Promise<any> {
    const response = await axios.delete(`${this.apiUrl}/deleteUser/${id}`);
    return response.data;
  }
  async editPerson(id: string, person: Person): Promise<any> {
    const response = await axios.put(`${this.apiUrl}/editUser/${id}`, person);
    return response.data;
  }
}
