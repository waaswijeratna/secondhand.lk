import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BannerService } from '../../app-services/banner-service.service';

@Component({
  selector: 'app-banner-ad',
  templateUrl: './banner-ad.component.html',
  styleUrls: ['./banner-ad.component.css']
})
export class BannerAdComponent implements OnInit, OnChanges {

  @Input() formPayload: any;
  @Input() banner_type_id: any;
  // filters:any;
  images: any;
  image:any;

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formPayload']) {
      this.fetchImages();
    }
  }

  fetchImages(): void {
    console.log("filterss", this.formPayload);
    console.log("idddd", this.banner_type_id);
    const payloadWithId = { ...this.formPayload, banner_type_id: this.banner_type_id };
    console.log("after", payloadWithId);

    this.bannerService.getFilteredImages(payloadWithId).subscribe(images => {
      const img = images;
      this.images = img[0];
      this.image = this.images.imagePath
      console.log("images", this.images)
    });
  }
}
