import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../app-services/localStorage';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId :any;
  cart_length!:number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private localStorageService: LocalStorageService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   const userId = params['userId'];
    //   console.log("incart", userId);
    //   this.getCartData(userId);
    // });

    // this.userId = this.localStorageService.getItem("userId");
    // console.log("zcxczxc", this.userId);
    // setTimeout(() => {
    //   this.getCartData(this.userId);
    // }, 1000); // 1000 milliseconds = 1 second
    this.getCartData();
    }

  getCartData() {
        this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("incart", this.userId);
    });
    // console.log("triggeredddd", userId);

    // const test = Number(userId);

    
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }
    console.log("AZx");

    this.http.post<any[]>('http://localhost:3000/api/getCart', { "userId" : this.userId })
      .subscribe(
        (data) => {
          console.log("AZasdasx");
          this.cartItems = data;
          console.log('Cart data:', this.cartItems);
          this.cart_length=this.cartItems[0].length
        },
        (error) => {
          console.error('Error fetching cart data:', error);
          console.log("AZasasdasddasx");
        }
      );
      console.log("AZasx");
  }

deleteCart(cart_id: number) {
  console.log("id?", cart_id);
    this.http.post('http://localhost:3000/api/deleteCart', { cart_id })
      .subscribe(
        (response) => {
                    // Display the snackbar message
                    const snackBarRef = this.snackBar.open('Advertisement deleted from cart Successfully', 'OK', {
                      duration: 7000,
                      verticalPosition: 'top',
                      panelClass: ['customSnackbar1']
                    });

          console.log('Ad deleted:', response);
          // Refresh the cart data after deletion
          this.getCartData();
        },
        (error) => {
          console.error('Error deleting ad:', error);
                    // Display the snackbar message
                    this.snackBar.open('Error deleting advertisement, Try again', 'OK', {
                      duration: 7000,
                      verticalPosition: 'top',
                      panelClass:['customSnackbar2'] 
                    });
        }
      );
  }
}
