import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdvertisementService {
  private apiUrl = 'http://localhost:3000/api/advertisementData';

  ad: any;
  categoryFormData: any;
  telephoneNumbers!: string[];
  images!: string[];
  promotions!: any[];

  constructor(private http: HttpClient) { }

  getAdvertisement(adId: number): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/${adId}`).pipe(
      tap(data => {
        this.ad = data.ad;
        this.categoryFormData = data.formData;
        this.telephoneNumbers = data.telephoneNumbers;
        this.images = data.images;
        this.promotions = data.promotions;
      })
    );
  }

  getForm1Data() {
    return { adType: this.ad.adType, category_id: this.ad.category_id, subcategory_id: this.ad.subcategory_id };
  }

  getForm2Data() {
    return this.categoryFormData;
  }

  getForm3Data() {
    return {
      title: this.ad.title, description: this.ad.description, price: this.ad.price, location_id: this.ad.location_id, sublocation_id: this.ad.sublocation_id,
      telephoneNumbers: this.telephoneNumbers, images: this.images
    }
  }

  getForm4Data() {
    return this.promotions;
  }
}
