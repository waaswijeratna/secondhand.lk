import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../app-services/app-service-categories';
import { Category, Subcategory } from '../../app-services/app-service-categories';
import { AdvertisementService } from '../../app-services/app-service-getAdvertisementData';


@Component({
  selector: 'app-forum-unique-details',
  templateUrl: './forum-unique-details.component.html',
  styleUrls: ['./forum-unique-details.component.scss']
})
export class ForumUniqueDetailsComponent implements OnChanges {

  @Input() selectedSubcategory: string = ''; 
  @Input() selectedCategory: string = '';
  @Input() submitForms: boolean = false;
  @Input() isUpdate: boolean = true;

  @Output() form2ValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() form2: EventEmitter<FormData> = new EventEmitter<FormData>();

  selectedSubcategoryName: string = '';
  selectedCategoryName: string = '';

  // Declare properties for form groups
  vehiclesForm: FormGroup;
  propertyForm: FormGroup;
  electronicsForm: FormGroup;
  fashionForm: FormGroup;
  HomeApplicancesForm: FormGroup;
  furnitureHomedecorsForm: FormGroup;
  sportAndFitnessForm: FormGroup;
  musicalInstrumentForm: FormGroup;
  animalsForm: FormGroup;
  toolsAndEquipmentForm: FormGroup;
  educationForm: FormGroup;
  otherForm: FormGroup;
  retrievedForm: any;
  firstTry = false;
  secondTry = false;

  selectedform!: FormGroup;
  formData = new FormData();//formdata that appended.

  // Declare properties related to categories and subcategories
  categories: Category[] = [];
  subcategories: { [key: string]: Subcategory[] } = {};

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private advertisementService: AdvertisementService) {

    this.categories = this.categoryService.categories;
    this.subcategories = this.categoryService.subcategories;

    // Initialize form groups
    this.vehiclesForm = this.fb.group({
      brand: [''],
      model: [''],
      yearOfManufacture: [''],
      mileage: [''],
      transmission: [''],
      Part_or_Accessory: [''],
      BicycleType: ['']
    });

    this.propertyForm = this.fb.group({
      landSize: [''],
      unit: [''],
      address: [''],
      bedrooms: [''],
      bathrooms: [''],
      propertyType: ['']
    });

    this.electronicsForm = this.fb.group({
      brand: [''],
      model: [''],
      computerType: [''],
      tvType: [''],
      screenSize: [''],
      accessoryType: [''],
      electronicOtherItemType: ['']
    });

    this.fashionForm = this.fb.group({
      gender: [''],
      brand: [''],
      size: [''],
      beautyProductType: [''],
      otherFashionItem: ['']
    });

    this.HomeApplicancesForm = this.fb.group({
      brand: [''],
      kitchenItem: [''],
      laundryItem: [''],
      cleaningItems: [''],
      otherHomeAppliancesItem: ['']
    });

    this.furnitureHomedecorsForm = this.fb.group({
      material: [''],
      design: [''],
      furnitureOrHomeDecorType: ['']
    });

    this.sportAndFitnessForm = this.fb.group({
      brand: [''],
      sportAndFitnessItem: [''],
      otherSportItem: ['']
    });

    this.musicalInstrumentForm = this.fb.group({
      brand: [''],
      stringInstrumentsItem: [''],
      windInstrumentsItem: [''],
      otherInstrumentsItem: [''],
      instrumentAccessories: [''],
      recordingAndStudioEquipment: [''],
      musicalOtherItems: ['']
    });

    this.animalsForm = this.fb.group({
      domesticAnimalType: [''],
      farmAnimalType: [''],
      petSuppliesAndAccessoriesItem: [''],
      otherAnimalsItem: ['']
    });

    this.toolsAndEquipmentForm = this.fb.group({
      toolType: [''],
      toolPerformance: ['']
    });

    this.educationForm = this.fb.group({
      schoolSupplyItem: [''],
      educationalGameItem: [''],
      otherEducationalItem: ['']
    });

    this.otherForm = this.fb.group({
      otherItemName: [''],
      otherItemDescription: ['']
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUpdate'] && changes['isUpdate'].currentValue) {
      this.initializeIfUpdate();
    }
    if (changes['selectedCategory']) {
      this.selectedCategoryName = changes['selectedCategory'].currentValue;//assign changed value to selectedCategoryName
    }
    if (changes['selectedSubcategory']) {
      this.selectedSubcategoryName = changes['selectedSubcategory'].currentValue;//assign changed value to selectedsubCsategoryName
      //To prevent data binding after checked setTimeout is used.
      setTimeout(() => {
        if (!this.firstTry) {
          this.setValidations();
        }
        this.firstTry = false;
      });
    }
    if (changes['submitForms'] && changes['submitForms'].currentValue && this.submitForms === true) {
      this.submitForm();
    }
  }

  initializeIfUpdate() {
    this.firstTry = true;
    this.selectedCategoryName = this.advertisementService.getForm1Data().category_id.toString();
    const { id, ...formValues } = this.advertisementService.getForm2Data();

    const formMap = new Map<number, FormGroup>([
      [1, this.vehiclesForm],
      [2, this.propertyForm],
      [3, this.electronicsForm],
      [4, this.fashionForm],
      [5, this.HomeApplicancesForm],
      [6, this.furnitureHomedecorsForm],
      [7, this.sportAndFitnessForm],
      [8, this.musicalInstrumentForm],
      [9, this.animalsForm],
      [10, this.toolsAndEquipmentForm],
      [11, this.educationForm],
      [12, this.otherForm],
    ]);

    this.selectedform = formMap.get(this.advertisementService.getForm1Data().category_id) || new FormGroup({});
    console.log('Selected Form before patching:', this.selectedform);
    console.log('Retrieved Form before without ID:', formValues);


    setTimeout(() => {
      if (formValues) {
        Object.keys(formValues).forEach(key => {
          this.selectedform.get(key)?.patchValue(formValues[key]);
        });
        console.log('Retrieved Form Data without ID:', formValues);
      }
      console.log('Selected Form after patching:', this.selectedform);
    }, 0);
  }

  setValidations() {
    //reset fields
    if (!this.secondTry) {
      this.secondTry = true;
      return;
    } else {
      this.selectedform?.reset();
    }

    //clear validators
    for (const key in this.selectedform?.controls) {
      this.selectedform.get(key)?.clearValidators();
      this.selectedform.get(key)?.updateValueAndValidity();
    }

    if (this.selectedCategoryName === '1') {
      //setvalidators
      this.vehiclesForm.get('brand')?.setValidators([Validators.required]);
      if (this.selectedSubcategoryName !== '7' && this.selectedSubcategoryName !== '8') { this.vehiclesForm.get('yearOfManufacture')?.setValidators([Validators.required, Validators.pattern("^[0-9]{4}$")]) };
      if (this.selectedSubcategoryName !== '7' && this.selectedSubcategoryName !== '8' && this.selectedSubcategoryName !== '9') { this.vehiclesForm.get('transmission')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName !== '7' && this.selectedSubcategoryName !== '8' && this.selectedSubcategoryName !== '9') { this.vehiclesForm.get('mileage')?.setValidators([Validators.required, Validators.pattern("^[0-9]*\\.?[0-9]+$")]) };
      if (this.selectedSubcategoryName === '8') { this.vehiclesForm.get('Part_or_Accessory')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '7') { this.vehiclesForm.get('BicycleType')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.vehiclesForm.controls) {
        this.vehiclesForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '2') {
      //setvalidators
      if (this.selectedSubcategoryName !== '12' && this.selectedSubcategoryName !== '13') { this.propertyForm.get('landSize')?.setValidators([Validators.required, Validators.pattern("^[0-9]*\\.?[0-9]+$")]) };
      if (this.selectedSubcategoryName !== '12' && this.selectedSubcategoryName !== '13') { this.propertyForm.get('unit')?.setValidators([Validators.required]) };
      this.propertyForm.get('address')?.setValidators([Validators.required, Validators.pattern("^.*[0-9].*$")]);
      if (this.selectedSubcategoryName === '13') { this.propertyForm.get('propertyType')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.propertyForm.controls) {
        this.propertyForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '3') {
      //setvalidators
      this.electronicsForm.get('brand')?.setValidators([Validators.required]);
      if (this.selectedSubcategoryName === '15') { this.electronicsForm.get('computerType')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '17') { this.electronicsForm.get('tvType')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '17') { this.electronicsForm.get('screenSize')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '19') { this.electronicsForm.get('accessoryType')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '20') { this.electronicsForm.get('electronicOtherItemType')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.electronicsForm.controls) {
        this.electronicsForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '4') {
      //setvalidators
      this.fashionForm.get('gender')?.setValidators([Validators.required]);
      this.fashionForm.get('brand')?.setValidators([Validators.required]);
      if (this.selectedSubcategoryName === '27') { this.fashionForm.get('beautyProductType')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '28') { this.fashionForm.get('otherFashionItem')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.fashionForm.controls) {
        this.fashionForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '5') {
      //setvalidators
      this.HomeApplicancesForm.get('brand')?.setValidators([Validators.required]);
      if (this.selectedSubcategoryName === '29') { this.HomeApplicancesForm.get('kitchenItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '30') { this.HomeApplicancesForm.get('laundryItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '31') { this.HomeApplicancesForm.get('cleaningItems')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '32') { this.HomeApplicancesForm.get('otherHomeAppliancesItem')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.HomeApplicancesForm.controls) {
        this.HomeApplicancesForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '6') {
      //setvalidators
      this.furnitureHomedecorsForm.get('material')?.setValidators([Validators.required]);
      this.furnitureHomedecorsForm.get('design')?.setValidators([Validators.required]);
      this.furnitureHomedecorsForm.get('furnitureOrHomeDecorType')?.setValidators([Validators.required]);
      //update validators
      for (const key in this.furnitureHomedecorsForm.controls) {
        this.furnitureHomedecorsForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '7') {
      //setvalidators
      this.sportAndFitnessForm.get('brand')?.setValidators([Validators.required]);
      if (this.selectedSubcategoryName !== '42') { this.sportAndFitnessForm.get('sportAndFitnessItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '42') { this.sportAndFitnessForm.get('otherSportItem')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.sportAndFitnessForm.controls) {
        this.sportAndFitnessForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '8') {
      //setvalidators
      this.musicalInstrumentForm.get('brand')?.setValidators([Validators.required]);
      if (this.selectedSubcategoryName === '44') { this.musicalInstrumentForm.get('stringInstrumentsItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '45') { this.musicalInstrumentForm.get('windInstrumentsItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '46') { this.musicalInstrumentForm.get('otherInstrumentsItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '47') { this.musicalInstrumentForm.get('instrumentAccessories')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '48') { this.musicalInstrumentForm.get('recordingAndStudioEquipment')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '49') { this.musicalInstrumentForm.get('musicalOtherItems')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.musicalInstrumentForm.controls) {
        this.musicalInstrumentForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '9') {
      //setvalidators
      if (this.selectedSubcategoryName === '50') { this.animalsForm.get('domesticAnimalType')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '51') { this.animalsForm.get('farmAnimalType')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '52') { this.animalsForm.get('petSuppliesAndAccessoriesItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '53') { this.animalsForm.get('otherAnimalsItem')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.animalsForm.controls) {
        this.animalsForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '10') {
      //setvalidators
      this.toolsAndEquipmentForm.get('toolType')?.setValidators([Validators.required]);
      this.toolsAndEquipmentForm.get('toolPerformance')?.setValidators([Validators.required]);
      //update validators
      for (const key in this.toolsAndEquipmentForm.controls) {
        this.toolsAndEquipmentForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '11') {
      //setvalidators
      if (this.selectedSubcategoryName === '58') { this.educationForm.get('schoolSupplyItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '59') { this.educationForm.get('educationalGameItem')?.setValidators([Validators.required]) };
      if (this.selectedSubcategoryName === '60') { this.educationForm.get('otherEducationalItem')?.setValidators([Validators.required]) };
      //update validators
      for (const key in this.educationForm.controls) {
        this.educationForm.get(key)?.updateValueAndValidity();
      }
    }

    if (this.selectedCategoryName === '12') {
      //setvalidators
      this.otherForm.get('otherItemName')?.setValidators([Validators.required]);
      this.otherForm.get('otherItemDescription')?.setValidators([Validators.required]);
      //update validators
      for (const key in this.otherForm.controls) {
        this.otherForm.get(key)?.updateValueAndValidity();
      }
    }

  }

  // Listen to form validity changes of selected category form
  onFormValidityChanged(form: FormGroup) {
    this.selectedform = form;
    form.valueChanges.subscribe(() => {
      this.form2ValidityChanged.emit(form.valid);//emit form validity
    });
  }

  // Submit the form data
  submitForm() {
    console.log('Form submitted from child component');

    // Iterate over form control names
    Object.keys(this.selectedform.controls).forEach(fieldName => {
      const fieldValue = this.selectedform.get(fieldName)?.value;

      // Skip logging and appending fields with null values
      if (fieldValue !== null) {
        // Append data to formData
        this.formData.append(fieldName, fieldValue);
      }
    });

    // Emit the form data
    this.form2.emit(this.formData);
  }


}
