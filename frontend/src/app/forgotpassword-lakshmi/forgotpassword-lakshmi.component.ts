//Developed by - Richa Khatri (B00792218)
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClient , HttpParams } from '@angular/common/http';
import { UserService } from '../user.service';
import { Title } from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgotpassword-lakshmi',
  templateUrl: './forgotpassword-lakshmi.component.html',
  styleUrls: ['./forgotpassword-lakshmi.component.scss']
})

export class ForgotpasswordLakshmiComponent implements OnInit {
  email: string;
  // ForgotPasswordForm: FormGroup;
  submitted = false;
  responseDetails:any;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private titleService: Title,private userService:UserService, private toastr: ToastrService) {  
    this.titleService.setTitle("Forgot Password - StraySpirit");
  }

  ngOnInit() {
   }
   ForgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
   });

onSubmit()
{
      this.userService.vaildatedUser(this.ForgotPasswordForm.get('email').value)
      .subscribe(responseData =>{
           //if(responseData!=null){
            //this.userService.sendMail(this.ForgotPasswordForm.get('email').value);
            
         //}
        })
        this.showSuccess();
        this.ForgotPasswordForm.reset();
      }
//}
showSuccess() {
  this.toastr.success('An activation link is sent to the Email Id. If you dont recieve a mail than try with a registered email address\n\n', 'SUCCESS!', {
    timeOut: 3500,
    closeButton: true,
    progressBar: true
  });
}
    //}
    //    this.http.post('api/forgotpassword/',this.ForgotPasswordForm.get('email').value)
    //  .subscribe(responseData => {
    //    if(responseData)
    //    {
    //     alert(responseData);
    //      alert('An activation link is sent to the Email Id\n\n');
    //    }
    //  });
//}
}


