// Author: Marlee Donnelly (B00710138)

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContentApprovalService {

  constructor(private http: HttpClient) { }

  // Pet profile related actions
  getPendingPets(){
    return this.http.get('api/pending-pet/');
  }
  addPendingPet(petModel: any){
    return this.http.post('api/pending-pet/', petModel);
  }
  deletePendingPet(petId: any){
    return this.http.delete('api/pending-pet/'+petId);
  }

  // Product related actions
  getPendingProducts(){
    return this.http.get('api/pending-products/');
  }
  addPendingProduct(productModel: any){
    return this.http.post('api/pending-products/', productModel);
  }
  deletePendingProduct(prodId: any){
    return this.http.delete('api/pending-products/'+prodId);
  }

  // Story related actions
  getPendingStories(){
    return this.http.get('api/pending-stories/');
  }
  addPendingStory(storyModel: any){
    return this.http.post('api/pending-stories/', storyModel);
  }
  deletePendingStory(storyId: any){
    return this.http.delete('api/pending-stories/'+storyId);
  }
}
