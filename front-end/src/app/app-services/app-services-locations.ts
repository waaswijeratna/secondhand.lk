import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Location {
  location_id: string;
  location: string;
}

export interface Sublocation {
  sublocation_id: string;
  sublocation: string;
}

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private locationsUrl = 'http://localhost:3000/api/locations';
  private sublocationsUrl = 'http://localhost:3000/api/sublocations';

  locations: Location[] = [];
  allSublocations: Sublocation[] = [];
  sublocations: { [key: string]: Sublocation[] } = {};

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {

    this.http.get<Location[]>(this.locationsUrl)
      .subscribe(
        (data: Location[]) => {
          this.locations = data;
        },
        error => {
          console.log('Error fetching categories:', error);
          window.location.reload;
        }
      );

    this.http.get<Sublocation[]>(this.sublocationsUrl)
      .subscribe(
        (data: Sublocation[]) => {
          this.allSublocations = data;
          this.initializeSublocations();
        },
        error => {
          console.log('Error fetching subcategories:', error);
          window.location.reload;
        }
      );

  }

  initializeSublocations() {
    // Initialize subcategories object
    this.sublocations = {};

    // Define the number of subcategories for each category
    const sublocationCounts = [
      5, 6, 5, 2, 6, 6, 6, 6, 4, 6, 6, 6, 2, 6, 2, 6, 6, 5, 2, 5, 5, 6, 6, 3, 2
    ];

    // Iterate over categories and assign subcategories
    this.locations.forEach((location, index) => {
      const count = sublocationCounts[index];
      this.sublocations[location.location_id] = this.allSublocations.slice(0, count);
      this.allSublocations = this.allSublocations.slice(count);
    });
  }

}
