import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Category {
  category_id: string;
  category: string;
}

export interface Subcategory {
  subcategory_id: string;
  subcategory: string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private categoriesUrl = 'http://localhost:3000/api/categories';
  private subcategoriesUrl = 'http://localhost:3000/api/subcategories';

  categories: Category[] = [];
  allSubcategories: Subcategory[] = [];
  subcategories: { [key: string]: Subcategory[] } = {};

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {

    this.http.get<Category[]>(this.categoriesUrl)
      .subscribe(
        (data: Category[]) => {
          this.categories = data;
        },
        error => {
          console.log('Error fetching categories:', error);
          window.location.reload;
        }
      );

    this.http.get<Subcategory[]>(this.subcategoriesUrl)
      .subscribe(
        (data: Subcategory[]) => {
          this.allSubcategories = data;
          this.initializeSubcategories();
        },
        error => {
          console.log('Error fetching subcategories:', error);
          window.location.reload;
        }
      );

  }

  initializeSubcategories() {
    // Initialize subcategories object
    this.subcategories = {};

    // Define the number of subcategories for each category
    const subcategoryCounts = [
      9, 4, 7, 8, 4, 6, 5, 6, 4, 4, 3, 1
    ];

    // Iterate over categories and assign subcategories
    this.categories.forEach((category, index) => {
      const count = subcategoryCounts[index];
      this.subcategories[category.category] = this.allSubcategories.slice(0, count);
      this.allSubcategories = this.allSubcategories.slice(count);
    });

  }



}
