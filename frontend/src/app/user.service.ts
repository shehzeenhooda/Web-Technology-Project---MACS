// Author: Marlee Donnelly (B00710138)
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPersonalUsers(){
    //return all users who don't have an organization account
    return this.http.get('api/user');
  }
  getOrganizationUsers(){
    //return all users who have an organization account
    return this.http.get('api/user/org');
  }
    //validates user
  //Developed by RichaKhatri(B00792218)
  vaildatedUser(emailId:any){
    return this.http.put('api/user/forgotpassword',{emailId:emailId});
   }
   //changePassword
   //Developed by RichaKhatri(B00792218)
   changePassword(userid:any,password:any)
   {
     return this.http.put('api/user/changePassword',{userid:userid,password:password});
     // .subscribe(responseData => {
     //   if(responseData)
     //   {
     //     console.log("responseData........................"+responseData);
     //     alert("In.........."+responseData);
     //     return responseData;
     //   }
     // });
   }
}
