import { Component, Input, SimpleChanges, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../app-services/app-service-categories';
import { Category, Subcategory } from '../../app-services/app-service-categories';
import { AdvertisementService } from '../../app-services/app-service-getAdvertisementData';

@Component({
  selector: 'app-forum-category-selection',
  templateUrl: './forum-category-selection.component.html',
  styleUrls: ['./forum-category-selection.component.css'],
})
export class ForumCategorySelectionComponent implements OnInit, OnChanges {
  // Output events to emit data to parent component
  @Output() subcategorySelected: EventEmitter<string> = new EventEmitter<string>();//output selected subcategory to parent.
  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();//output selected category to parent.
  @Output() form1: EventEmitter<FormData> = new EventEmitter<FormData>();//output form data to parent.
  @Output() form1ValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();//output validity of the form to parent.

  // Input to trigger form submission
  @Input() submitForms: boolean = false;
  @Input() isUpdate: boolean = true;

  // Properties related to categories and subcategories
  categories: Category[] = [];
  subcategories: { [key: string]: Subcategory[] } = {};
  selectedCategory: string = '';//selected category by user.
  categorySelectionForm: FormGroup;
  formData = new FormData();//formdata that appended.

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private advertisementService: AdvertisementService) {
    this.categorySelectionForm = this.fb.group({
      adType: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // alert("fetched");
    setTimeout(() => {
      this.categories = this.categoryService.categories;
      this.subcategories = this.categoryService.subcategories;
    }, 600);
  }

  // Method called when inputs change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUpdate'] && changes['isUpdate'].currentValue) {
      this.initializeIfUpdate();
    }

    if (changes['submitForms'] && changes['submitForms'].currentValue) {
      this.submitForm();
    }
  }

  initializeIfUpdate() {
    if (this.isUpdate) {
      const { adType, category_id, subcategory_id } = this.advertisementService.getForm1Data();
      this.categorySelectionForm.patchValue({
        adType: adType,
        category: category_id,
        subcategory: subcategory_id
      });

      //Update the selected category to trigger subcategory loading
      setTimeout(() => {
        this.updateSelectedCategory(this.getCategoryNameById(category_id));
        this.onNext();
      }, 800);

    }
  }

  //Find the category name by category ID.
  getCategoryNameById(categoryId: string): string {
    const category = this.categories.find(cat => cat.category_id === categoryId);
    return category ? category.category : '';
  }


  // Update the selected category
  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
  }

  //encode category names for icon upload
  encodeCategoryName(category: string): string {
    return encodeURIComponent(category);
  }

  // Method called when moving to the next step
  onNext() {
    this.categorySelectionForm.valueChanges.subscribe(() => {
      if (this.categorySelectionForm.valid) {
        this.onNextEmmiting();
      }
    });
    if (this.isUpdate) {
      this.onNextEmmiting();
    }
  }
  onNextEmmiting() {
    this.form1ValidityChanged.emit(true);// Emit the validity status of the form.
    const selectedSubcategory = String(this.categorySelectionForm.get('subcategory')?.value);// Emit the selected subcategory
    this.subcategorySelected.emit(selectedSubcategory);// Emit the selected subcategory
    const selectedcategory = String(this.categorySelectionForm.get('category')?.value);
    this.categorySelected.emit(selectedcategory);
  }

  // Method to submit the form
  submitForm() {
    // Array of form field names and their corresponding formData keys
    const formFieldMappings = [
      { fieldName: 'adType', formDataKey: 'adType' },
      { fieldName: 'category', formDataKey: 'category_id' },
      { fieldName: 'subcategory', formDataKey: 'subcategory_id' }
    ];

    // Iterate over form field names and append data to formData
    formFieldMappings.forEach(mapping => {
      const fieldValue = this.categorySelectionForm.get(mapping.fieldName)?.value;
      this.formData.append(mapping.formDataKey, fieldValue);
    });

    // Emit the form data
    this.form1.emit(this.formData);
  }
}
