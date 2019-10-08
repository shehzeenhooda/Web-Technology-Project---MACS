import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {  FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { OrdermanagmentService } from '../ordermanagment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.sevice';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductmanagementService } from '../productmanagement.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-particular-order-manage',
  templateUrl: './particular-order-manage.component.html',
  styleUrls: ['./particular-order-manage.component.scss'] 
}) 
export class ParticularOrderManageComponent implements OnInit {
  
  currentList : any;
  dataFin: any;
  //0 - pet profiles, 1 - shop items, 2 - blog posts
  tabSelected = 0;
  currentUserId : any;
  currentUser : any;
  order_data :any;
  productData :any;
  selectedOrder: any;
  checker :any;
  loop : any;
  loading : any;
  showCancel: any;

  constructor(
    private orders: OrdermanagmentService,
    private productService: ProductmanagementService,
    private toastr: ToastrService,
    private titleService: Title,
    private authService: AuthService,
    private router: Router
  ) { 
  
  }

  ngOnInit() {
     this.currentList = [{}];
     this.dataFin = [];
     this.loading = "indeterminate";
     var that = this;
     this.loop = false;
     try {
       this.currentUserId=this.authService.getUserId();
       this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
         this.currentUser=currentUserData;
         console.log("Logged in user details:",this.currentUser);
  
        
           this.orders.getOrders().subscribe ( function(data) {
             that.loop = true;
             this.loading = "determinate";
       
       for(var i = 0 ; i < Object.keys(data).length ; i++){
         var item = data[i];
        if(item["orderUploader"]["uId"] == that.currentUserId){
          item.showCancel = true;
          
          }
          else{
           item.products.forEach(element => { 
                  if(element["uploader_id"] == that.currentUserId ){ 
                    item.checker = true;
                   item.showCancel = true;
                  }
                  
                });
          }

          if(!!item.checker || !!item.showCancel){
            that.dataFin.push(item);
          }

      }
      
     
      that.currentList =  that.dataFin;
           
           },error=>{
             this.router.navigate(['/server-cannot-process-the-request.']);
             });
      
        
      
       },error=>{
         this.router.navigate(['/server-cannot-process-the-request.']);
         });
     }
     catch(e){
       
       this.router.navigate(['/server-cannot-process-the-request.']);

     }
    

 


  }

  onUpdateOrder(event){
    console.log(this.selectedOrder);
  //  
   /* this.selectedOrder.products.forEach(item => {
      
    });*/
    window.location.href = "";

  }
  open(){
  
   
  }

  /*
  if(that.currentList.checker != true ){
  d
}
*/

  onCancel(event){
    //
    var test = "";

   /* if(event.srcElement.firstElementChild.firstElementChild == null){
      test = event.srcElement.firstElementChild.value;
    }
    else{
      test = event.srcElement.firstElementChild.firstElementChild.value;
    }*/

    this.orders.cancelOrder(this.selectedOrder._id).subscribe ( data => {
     
      this.toastr.success('Order Canceled!', 'SUCCESS!', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
    },
    error=>{
      this.router.navigate(['/server-cannot-process-the-request.']);

      });



  }
 
}