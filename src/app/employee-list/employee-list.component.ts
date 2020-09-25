import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../_services/employee.service';
import { Employee} from '../model/employee';
import { LOCALE_ID, Inject } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'fr' },
    { code: 'es', label: 'Espanol' }
  ];
  employees: Employee[];
  page= 0;
  size= 10;
  totalItems=100;

  constructor(private employeeService: EmployeeService,
    private router: Router, @Inject(LOCALE_ID) protected localeId: string ) { }

  ngOnInit(): void {
    this.getEmployees();

  }

  private getEmployees(){
    this.employeeService.getEmployeesList(this.page, this.size).subscribe(data => {
      console.log(data);
      this.employees = data.employee;
      this.totalItems = data.totalItems;

    });
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
 Onpage(event): void {
   this.size = event.rows;
   this.page = event.first / event.rows;
   this.getEmployees();

 }


}
