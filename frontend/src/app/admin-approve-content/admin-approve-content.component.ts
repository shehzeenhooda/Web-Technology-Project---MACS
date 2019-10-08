// Author: Marlee Donnelly (B00710138)

import {Component, OnInit, ViewChild} from '@angular/core';
import { storyManagementService } from '../storyManagement.service'
import { ContentApprovalService } from "../content-approval.service";
import { ToastrService } from 'ngx-toastr';
import { MatTable } from "@angular/material";
import { PetmanagementService } from "../petmanagement.service";
import { ProductmanagementService } from "../productmanagement.service";
import { ModalDirective } from "angular-bootstrap-md";

@Component({
  selector: 'app-admin-approve-content',
  templateUrl: './admin-approve-content.component.html',
  styleUrls: ['./admin-approve-content.component.scss']
})

export class AdminApproveContentComponent implements OnInit {
  @ViewChild('approvalTable') table: MatTable<any>;
  @ViewChild('confirmDelete') warningModal: ModalDirective;

  Stories: any = [];
  public StoryData: any = {};
  public petData: any = {};
  petProfiles: any;
  shopItems: any;
  storyPosts: any;

  currentList = this.petProfiles;
  //0 - pet profiles, 1 - shop items, 2 - blog posts
  tabSelected = 0;
  // For tracking the id to delete, if necessary
  idToDelete = "";

  //Set table columns to show for each tab
  regularCols = ['img', 'preview', 'author', 'buttons'];
  shopCols = ['img', 'preview', 'price', 'author', 'buttons'];
  colsToShow = this.regularCols;

  constructor(private toastr: ToastrService,
              private storyManagementService: storyManagementService,
              private contentApprovalService: ContentApprovalService,
              private productMgmtService: ProductmanagementService,
              private petMgmtService: PetmanagementService) { }

  ngOnInit() {
    this.storyManagementService.getStory().subscribe(storyData =>
    {
      this.Stories=storyData;
    });

    this.contentApprovalService.getPendingPets().subscribe(petList => {
      this.petProfiles = petList;
      this.currentList = this.petProfiles;
    });
  }

  showPets(){
    this.contentApprovalService.getPendingPets().subscribe(petList => {
      this.petProfiles = petList;
      this.currentList = this.petProfiles;
      this.colsToShow = this.regularCols;
      this.tabSelected = 0;
    });
  }
  showItems(){
    this.contentApprovalService.getPendingProducts().subscribe(itemList => {
      this.shopItems = itemList;
      this.currentList = this.shopItems;
      this.colsToShow = this.shopCols;
      this.tabSelected = 1;
    });
  }
  showPosts(){
    this.contentApprovalService.getPendingStories().subscribe(storyList=> {
      this.storyPosts = storyList;
      this.currentList = this.storyPosts;
      this.colsToShow = this.regularCols;
      this.tabSelected = 2;
    });
  }

  // Handle popup
  showDeletePopup(id){
    this.warningModal.show();
    this.idToDelete = id;
  }
  hideDeletePopup(){
    // Make sure there isn't a specific table entry selected anymore
    this.idToDelete = "";
    this.warningModal.hide();
  }
  deleteItem(){
    // Pet
    if(this.tabSelected == 0){
      this.deletePet(this.idToDelete);
    }
    // Shop item
    else if(this.tabSelected == 1){
      this.deleteProduct(this.idToDelete);
    }
    // Story
    else{
      this.deleteStory(this.idToDelete);
    }
    this.hideDeletePopup();
  }

  // Button functions
  approvePet(petModel){
    console.log("Approving pet named "+petModel['petName']);
    console.log(petModel);
    //Create a new pet object using the petModel and send it to the actual pet database
    this.petData = {
      petNameModel: petModel['petName'],
      petCategoryModel: petModel['petCategory'],
      petGenderModel: petModel['petGender'],
      petAgeModel: petModel['petAge'],
      petHealthModel: petModel['petHealth'],
      petLocationModel:{
        petCityModel: petModel['petLocation']['petCity'],
        petStateModel: petModel['petLocation']['petState'],
        petCountryModel: petModel['petLocation']['petCountry']
      },
      petDescriptionModel: petModel['petDescription'],
      petPicModel: petModel['petPic'],
      petUploaderModel: {
        petUploaderId: petModel['petUploader']['userId'],
        petUploaderfirstName: petModel['petUploader']['firstName'],
        petUploaderlastName: petModel['petUploader']['lastName']
      }
    }
    this.petMgmtService.newPets(this.petData).subscribe(result => {
      //If it succeeds, delete it from the pending database
      this.deletePet(petModel['_id']);
    });
  }
  deletePet(id){
    console.log("Deleting pet "+id);
    this.contentApprovalService.deletePendingPet(id).subscribe(result => {
        //reload table
        this.contentApprovalService.getPendingPets().subscribe(petList => {
          this.petProfiles = petList;
          this.currentList = this.petProfiles;
          this.table.renderRows();
        })
      });
  }

  approveProduct(productModel) {
    console.log("Approving story: " + productModel['productName']);

    let prodToAdd = {
        productName: productModel['productName'],
        productPrice: productModel['productPrice'],
        productQuantity: productModel['productQuantity'],
        productDescription: productModel['productDescription'],
        productCategory: productModel['productCategory'],
        productPic: productModel['productPic'],
        productUploader: {
          uId: productModel['productUploader']['uId'],
          firstName: productModel['productUploader']['firstName'],
          lastName: productModel['productUploader']['lastName']
        }
    };

    this.productMgmtService.newProducts(prodToAdd).subscribe(result => {
      console.log(result);
      this.deleteProduct(productModel['_id']);
    })
  }


  deleteProduct(id){
    console.log("Deleting product "+id);
    this.contentApprovalService.deletePendingProduct(id).subscribe(result => {
        //reload table
        this.contentApprovalService.getPendingProducts().subscribe(prodList => {
          this.shopItems = prodList;
          this.currentList = this.shopItems;
          this.table.renderRows();
        })
    });
  }

  approveStory(storyModel){
    console.log("Approving story: "+storyModel['storyTitle']);
    // create story object
    let storyToAdd = {
      _id: storyModel['_id'],
      storyTitle: storyModel['storyTitle'],
      storycontentModel: storyModel['storycontentModel'],
      storyPicModel: storyModel['storyPicModel'],
      storyPublisher: {
        userId: storyModel['storyPublisher']['userId'],
        firstName: storyModel['storyPublisher']['firstName'],
        lastName: storyModel['storyPublisher']['lastName']
        },
      storyCategory: storyModel['storyCategory'],
      storyPostDate: storyModel['storyPostDate']
    };
    // send it to the real story DB
    this.storyManagementService.newStory(storyToAdd).subscribe(result => {
      console.log(result);
      this.deleteStory(storyModel['_id']);
    })
  }

  deleteStory(id){
    console.log("Deleting story "+id);
    this.contentApprovalService.deletePendingStory(id).subscribe(result => {
        //reload table
        this.contentApprovalService.getPendingStories().subscribe(storyList => {
          this.storyPosts = storyList;
          this.currentList = this.storyPosts;
          this.table.renderRows();
        })
    });
  }

}
