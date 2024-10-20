import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private firestore: Firestore) {}

  addEmployee(employee: Employee) {
    const employeesRef = collection(this.firestore, 'employees');
    const plainEmployee = {
      name: employee.name,
      dateOfBirth: Timestamp.fromDate(employee.dateOfBirth),
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender,
      email: employee.email,
    };
    return addDoc(employeesRef, plainEmployee);
  }

  getEmployees(): Observable<Employee[]> {
    const employeesRef = collection(this.firestore, 'employees');
    return collectionData(employeesRef, { idField: 'id' }).pipe(
      map(
        (employees) =>
          employees.map((emp) => ({
            ...emp,
            dateOfBirth:
              emp['dateOfBirth'] instanceof Timestamp
                ? emp['dateOfBirth'].toDate()
                : new Date(emp['dateOfBirth']),
          })) as Employee[]
      )
    );
  }
}
