import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table'; // Import MatTableDataSource from '@angular/material/table'

export interface userdata {
  id: number;
  name: string;
  email: string;
  location: string;
}

const DATA: userdata[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userArray : any[] = [];// Define userArray to store fetched user data
  isResultLoaded = false;// Define a boolean flag to indicate whether the data is loaded

  constructor(private http: HttpClient ) 
  {
    this.getAllUsers();// Call getAllUsers() method to fetch user data when the component is instantiated
  }

  ngOnInit(): void {
  }

  // Define columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'email', 'location'];
    // Create a MatTableDataSource instance and bind it to DATA (initial data)
  dataSource = new MatTableDataSource<userdata>(DATA);

  // Method to fetch all users from the API endpoint
  getAllUsers(){
    try {
      this.http.get("http://localhost:3000/createUser").subscribe((resultData:any)=>
    {
      this.isResultLoaded=true;// Set isResultLoaded to true when data is fetched
      console.log(resultData.data);
      this.userArray = resultData.data;// Assign fetched data to userArray
    });
    } catch (error) {
      console.log(error);
    }
    
  }
}
