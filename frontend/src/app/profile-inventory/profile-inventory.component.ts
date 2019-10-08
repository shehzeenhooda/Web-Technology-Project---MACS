import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ProductmanagementService } from '../productmanagement.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.sevice';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {ContentApprovalService} from "../content-approval.service";

@Component({
  selector: 'app-profile-inventory',
  templateUrl: './profile-inventory.component.html',
  styleUrls: ['./profile-inventory.component.scss']
})
export class ProfileInventoryComponent implements OnInit {
  imagePreview: any;
  namePattern: string = '^([a-zA-Z_\-]*)$';

  public productData: any = {}
  product_newData: any;
  current_User: any;
  currentUserType: string;
  productFind: boolean= true;
  productListing:any;
  currentUserId: any;


    addProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    productQuantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    productPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    productDescription: new FormControl('', Validators.required),
    productCategory:new FormControl('', Validators.required),
    productPic: new FormControl('')
  })


  constructor(

    private products: ProductmanagementService,
    private toastr: ToastrService,
    private titleService: Title,
    private authService: AuthService,
    private contentApprovalService: ContentApprovalService,
    private router: Router

  ) {
    this.titleService.setTitle("My Inventory - StraySpirit");
  }

  ngOnInit() {

    // Get current logged in user
    this.currentUserId=this.authService.getUserId();
    console.log("This id has logged in: ",this.currentUserId);
    this.currentUserType = this.authService.getUserType();
    if(this.currentUserType==='personal'){
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
        this.current_User=currentUserData;
        console.log("Logged in user details:",this.current_User);
      })
    }
    else{
      this.authService.getOrgById(this.currentUserId).subscribe(currentUserData =>{
        this.current_User=currentUserData;
        console.log("Logged in user details:",this.current_User);
      })
    }

    this.products.getproductsUser(this.currentUserId).subscribe(productData =>{
      console.log(productData);
      this.productListing= productData;
      console.log("Products for this user: ",this.productListing);
      if(this.productListing.length===0){
        this.productFind=false;
      }
    },error =>{
      console.log("Uploader not found!");
      this.productFind=false;
    })

           this.products.getproductsUser(this.currentUserId).subscribe(currentProductUser=>
            {
              this.product_newData = currentProductUser;

            })
    this.products.getproductsUser(this.currentUserId).subscribe(currentProductUser => {
      this.product_newData = currentProductUser;
    })
    this.products.getproductsUser(this.currentUserId).subscribe(productData => {

      this.productListing = productData;

      if (this.productListing.length === 0) {
        this.productFind = false;
      }
    }, error => {

      this.productFind = false;
    })

  }




  private imageSrc: string = '';
  //Image conversion to base64:  https://stackoverflow.com/questions/48216410/angular-4-base64-upload-component--this is used to convert image to base 64 which is the format
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;

  }
  addProduct() {
    let uploader = this.current_User;
    console.log(uploader);
    if(this.current_User['user_type'] === "Organization"){
      this.productData = {
        productName: this.addProductForm.get('productName').value,
        productPrice: this.addProductForm.get('productPrice').value,
        productQuantity: this.addProductForm.get('productQuantity').value,
        productDescription: this.addProductForm.get('productDescription').value,
        productCategory:this.addProductForm.get('productCategory').value,
        productPic: this.imageSrc,
        productUploader: {
          uId: this.currentUserId,
          firstName: this.current_User["organizationtName"],
          lastName: this.current_User["organizationtName"]
        }
      };
    }
    else{
      this.productData = {
        productName: this.addProductForm.get('productName').value,
        productPrice: this.addProductForm.get('productPrice').value,
        productQuantity: this.addProductForm.get('productQuantity').value,
        productDescription: this.addProductForm.get('productDescription').value,
        productCategory:this.addProductForm.get('productCategory').value,
        productPic: this.imageSrc,
        productUploader: {
          uId: this.currentUserId,
          firstName: this.current_User["firstName"],
          lastName: this.current_User["lastName"]
        }
      };
    }
    this.contentApprovalService.addPendingProduct(this.productData).subscribe(result => {
      console.log(result);
    })
    this.showSuccess();
  }

  deleteProduct(delete_id:any){
    console.log(delete_id);
    this.products.deleteProduct(delete_id);
    this.toastr.warning('Product has been deleted from database ', 'Product Deleted', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
    setTimeout(()=>{
      window.location.reload();
       }, 2000);
  }

  showSuccess() {
    this.toastr.success('Product can be viewed on Shop page', 'Product is added', {
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    });
    setTimeout(()=>{
      window.location.reload();
       }, 2000);
  }

  editInventory(p_id:String) {
   this.router.navigate(['/profile/edit-inventory/'+p_id]);
  }

}
