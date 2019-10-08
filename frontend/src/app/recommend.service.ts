import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {

  constructor(private http:HttpClient,private router: Router) { }

   // Method for passing feedback entered by a user
   getRecPets (userID :any){
    return this.http.get('api/recommendation/' + userID);
  }
}
