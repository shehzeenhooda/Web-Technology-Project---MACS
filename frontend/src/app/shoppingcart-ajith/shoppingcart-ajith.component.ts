//  Developed by Ajith Jayanthi B00825322 aj788769@dal.ca
import { Component, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ShoppingcartService} from '../shoppingcart.service';
import {formatDate } from '@angular/common';
import { AuthService } from '../auth.sevice';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-shoppingcart-ajith',
  templateUrl: './shoppingcart-ajith.component.html',
  styleUrls: ['./shoppingcart-ajith.component.scss']
})
export class ShoppingcartAjithComponent implements OnInit {
  
  product1count:number;
  product2count:number;
  product1mobilecount:number;
  product2mobilecount:number;
  cart_items:any=[];
  initial_cart_details:any=[];
  grand_total:number=0;
  finaldata_shoppingCart={};
  current_data= new Date();
  todays_date = '';
  estimated_date_object= new Date();
  estimated_shipping_date= '';
  userId: string;
  current_User: any;
  string_phone_number:string;
  global_cart_count:string;
  
  namePattern: string = '^([a-zA-Z_\-]*)$';
  emailPattern: string = '^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$';
  phonePattern: string = '^[\(][0-9]{3}[\)][\-][\(][0-9]{3}[\)][\-][\(][0-9]{4}[\)]$|[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}';
  pincodePattern: string ="^[1-9][0-9]{5}$";
  constructor(private toastr: ToastrService,private _formBuilder: FormBuilder,private shoppingCartService: ShoppingcartService,private authService: AuthService ) { }

  adressForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]),
    lastName: new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]),
    number: new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
    addressline1: new FormControl('', [Validators.required]),
    addressline2: new FormControl('', [Validators.required]),
    pincode:new FormControl('',[Validators.required, Validators.pattern(this.pincodePattern)])
  })
  ngOnInit() {
    this.product1count=1;
    this.product2count=1;
    this.product1mobilecount=1;
    this.product2mobilecount=1;
    this.initial_cart_details=[];
    this.cart_items=[];
    this.grand_total=0;
    this.finaldata_shoppingCart={};
    this.modify_cache_details();
    //To format the date in date-month-year format ex:(17-june-2019)
    // https://stackoverflow.com/questions/51299944/get-current-date-with-yyyy-mm-dd-format-in-angular-4/51300093
    this.todays_date = formatDate(this.current_data, 'dd MMMM yyyy', 'en-US', '+0530');
    //To add 7 days to the existing date
    // https://stackoverflow.com/questions/49899212/angular-4-date-for-today-and-tomorrow
    this.estimated_date_object =  new Date(this.current_data.setDate(this.current_data.getDate() + 7));
    this.estimated_shipping_date = formatDate(this.estimated_date_object, 'dd MMMM yyyy', 'en-US', '+0530');
    this.userId = this.authService.getUserId();

    this.authService.getUserById(this.userId).subscribe(currentUser => {
      this.current_User = currentUser;
    })
    this.global_cart_count="";
    //use to share the products count with navigation bar component
    // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/#Unrelated-Components-Sharing-Data-with-a-Service
    this.shoppingCartService.existing.subscribe(shopping_count => this.global_cart_count = shopping_count)
    
  }

  modify_cache_details(){
    //used to get the shopping cart details on the page load
    this.cart_items =JSON.parse(localStorage.getItem("shopping_cart"));
    if(this.cart_items == null){
      this.cart_items=[];
    }
    this.update_grand_total();
  }
  update_grand_total(){
    //update the total price for the products in the shopping cart
    this.grand_total=0;
    for( var item in this.cart_items){
      this.grand_total = this.grand_total+(this.cart_items[item]["itemcount"] * this.cart_items[item]["productprice"]);
    }
  }
  count_items_update(productpic,productname,productcount){
    //if the item count is increased or decreased then the shopping cart will be updated accordingly
    for( var item in this.cart_items){
      if(this.cart_items[item]["productpic"] == productpic && this.cart_items[item]["productname"] == productname){
        this.cart_items[item]["itemcount"] = productcount;
        localStorage.removeItem("shopping_cart");
        localStorage.setItem("shopping_cart",JSON.stringify(this.cart_items));
        this.update_grand_total();
      }
      
    }
    
  }
  removeproduct(productpic,productname){
    //removes the item from the shopping cart
    for( var item in this.cart_items){
      if(this.cart_items[item]["productpic"] == productpic && this.cart_items[item]["productname"] == productname){
      this.cart_items.splice(item,1);
      localStorage.removeItem("shopping_cart");
      localStorage.setItem("shopping_cart",JSON.stringify(this.cart_items));
      this.shoppingCartService.updatecount(String((JSON.parse(localStorage.getItem("shopping_cart")).length)));
      this.update_grand_total();
    }
  }
  this.toastr.success('', 'Product removed successfully', {
    timeOut: 1000,
    closeButton: true,
    progressBar: true
  });
  }
  onAddressSubmit(){
      //places the order and returns the status wheather the order is places successfully or not
        this.finaldata_shoppingCart={
          products:JSON.parse(localStorage.getItem("shopping_cart")),
          firstName: this.adressForm.get('firstName').value,
          lastName:this.adressForm.get('lastName').value,
          email:this.adressForm.get('email').value,
          addressLine1:this.adressForm.get('addressline1').value,
          addressLine2:this.adressForm.get('addressline2').value,
          pincode:this.adressForm.get('pincode').value,
          phoneNumber:this.adressForm.get('number').value,
          totalPrice:this.grand_total,
          orderPlacedDate:this.todays_date,
          estimatedDeliveryDate:this.estimated_shipping_date,
          orderStatus:"pending",
          uID:this.userId
        }
        this.shoppingCartService.insertPurchaseDetails(this.finaldata_shoppingCart);
        this.cart_items=[];
        localStorage.removeItem("shopping_cart");
        this.shoppingCartService.updatecount("0");
  }
}
