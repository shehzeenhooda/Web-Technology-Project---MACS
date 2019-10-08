// Developed by Richa Khatri B000792218
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Title } from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import { Response } from 'selenium-webdriver/http';



@Component({
  selector: 'app-sravan-changepassword',
  templateUrl: './sravan-changepassword.component.html',
  styleUrls: ['./sravan-changepassword.component.scss']
})
export class SravanChangepasswordComponent {
  n_password : string ='';
  show : boolean = false;
  token:any;
  token_id: string;
  userDetail: any;
  responseDetails:any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private titleService: Title,
    private toastr: ToastrService,
    private userService:UserService
  ) {  this.titleService.setTitle("Change Password - StraySpirit"); }

  // toggle() {
  //   this.show = true;
  // }
  changePasswordFormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
   });
  ngOnInit() { 
  //  
  this.token = this.route.params.subscribe(params => {
    this.token_id = params['token'];
    this.auth.getUserToken(this.token_id).subscribe( userToken=>{
      this.userDetail = userToken;
    })
});
}

onSubmit(){
  if(this.userDetail)
  {
    if(this.changePasswordFormGroup.get('newPassword').value==this.changePasswordFormGroup.get('confirmPassword').value)
    {
      this.userService.changePassword(this.userDetail[0]["_id"],this.changePasswordFormGroup.get('newPassword').value).subscribe(responseData =>
        {
          if(responseData){
            this.showSuccess();
            this.changePasswordFormGroup.reset();
            this.router.navigate(['/login']);
          }
        }); 
    }
    else{
      alert("Password and Confirm Password does not match.")
    }
  }
  else{
    alert("User Details Not Found.")
  }
}
showSuccess() {
  this.toastr.success('Password Changed Successfully!', 'SUCCESS!', {
    timeOut: 3500,
    closeButton: true,
    progressBar: true
  });
}

}
