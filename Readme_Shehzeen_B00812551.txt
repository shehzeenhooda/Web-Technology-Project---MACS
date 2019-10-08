ASSIGNMENT 2
Name: Shehzeen
Student Number: B00812551
________________________________________________________
I along with my other group members are working on stray spirit project [1]. This project was done by Team 9[1] last semester. Team 9[1] has already implemented various functionalities which includes the design layout and its backend. and we are working on further features of this project. The feature which I implemented for assignment 4 is as follows:
________________________________________________________
#Product Review: 
A registered user will be able to give the review on the product present on the stray spirit website. Apart from that, all the reviews which are related to a product are visible to all the users (registered and unregistered) who visit the website so that they can easily buy the product by looking at the review which are given by the registered users.
________________________________________________________
#Working Of the feature:
1)For unregistered user: 
A user visits the shop page for the stray spirit website and the click on the particular product. On the details page of the product the unregistered user will only be able to see the review. He won’t be able to give the review for the product until he logs in to the website.

2)For Registered user: 
A registered user will visit the shop page of the stray spirit website and then click on the particular product in which he is interested. On the details page of the product he will be able to do the following functionalities:
a) A registered user will be able to add the new review which must be valid having words and numbers.
b) A registered user will be able to edit the review which he has added previously.
c) A registered user will be able to delete the review which he has given previously.
d) A registered user will be able to see the review given by other users for the product he is currently viewing.
________________________________________________________
#Working link for the feature for a Particular Product
http://129.173.22.35:14785/product/5c96bfe1990f134b98fe83a1
http://129.173.22.35:14785/product/5cf1b7fb74ad9b20a8a58f17

________________________________________________________
#Installation guide
If you are running the project locally then follow the bellow mentioned steps
1)Take the clone of Shehzeen_backend branch or master branch from the git hub repository.
2)Install angular and node[2] on your system.
3) cd  ./strayspirit/frontend and then run the command npm install. After that run ng serve command for running the frontend of the website.
4) cd to ./strayspirit/backend and then run the command npm install. After that run npm start command for running the backend of the website.
________________________________________________________
#Backend Technologies
The technology used on backend are node js[2].
________________________________________________________
#Modified Code
1)mat-divider: Mat divider[4] is used to divide sections in the page.
2)mat- card : Mat card[3] is used to display the details of the product. 
3) The GET call for the current User Id, current User detail and product detail is reused which was made by the team 9 [1]. However, the code is modified in a way that the successor function on the completion of each call is written by me. Below mentioned is the code.
  this.currentUserId = this.authService.getUserId();
      console.log("This id has logged in: ", this.currentUserId);
      //Fetching the user details by the help of user id from the database.
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData => {
          this.currentUser = currentUserData;
          console.log("Logged in user details:", this.currentUser);
      }, error => {});
      this.sub = this.route.params.subscribe(params => {
          this.productIdLocal = params['id'];
      });
      //Fetching the product details from the databse so that the details along with the reviews can be displayed on the screen.
      this.productService.getProductsById(this.productIdLocal).subscribe(product => {
          this.productDataLocal = product;
          this.productDataLocal.productReview.forEach(function(element, i) {
              if (element.productUploaderId == that.currentUserId) {
                  element.editShow = true;
              } else {
                  element.editShow = false;
              }
          });
          this.productReviewLocal = this.productDataLocal.productReview;
          //this.productDataLocal.productReview = [];
      });

4) The code for the focusing the review box when a user clicks on the edit button is taken from a website[5]. The code used is shown below:
@ViewChild('review') inputEl: ElementRef;
this.inputEl.nativeElement.focus();
________________________________________________________
#Files created, modified or used for product details and review are as follows:
1)	product-review-shehzeen.component.ts (Frontend controller for the page) - frontend\src\app\product-review-shehzeen\product-review-shehzeen.component.ts
2)	product-review-shehzeen.component.scss (Styling for the page) - frontend\src\app\product-review-shehzeen\product-review-shehzeen.component.scss
3)	product-review-shehzeen.component.html (Design for the page) - frontend\src\app\product-review-shehzeen\product-review-shehzeen.component.html
4)	productmanagement.service.ts (service) - frontend\src\app\productmanagement.service.ts
5)	products.js (Route) - backend\api\routes\products.js
6)	products.js(model) - backend\api\models\products.js
________________________________________________________
#Git Repository Link:
https://git.cs.dal.ca/akshah/strayspirit
https://git.cs.dal.ca/akshah/strayspirit/tree/master
The changes for the above feature are reflected in the branch Shehzeen_backend and master.

________________________________________________________
References:
[1]  “StraySpirit (An application for Pet Adoption and Rescue)”, work done by Group 9 - by members “Aadesh Shah - B00802629, Aditya Gadhvi - B00809664, Aparna Sridhar- B00799570 and Dheeraj Varshney - B00808467”, CSCI 5709, Winter 2019 "
[2]  N. Foundation, "Node.js", Node.js, 2019. [Online]. Available: https://nodejs.org/en/. [Accessed: 18- Jul- 2019]. 
[3]  "Angular Material", Material.angular.io, 2019. [Online]. Available: https://material.angular.io/components/card/overview. [Accessed: 18- Jul- 2019]. 
[4] "Angular Material", Material.angular.io, 2019. [Online]. Available: https://material.angular.io/components/divider/overview. [Accessed: 18- Jul- 2019].
[5] "How to programmatically manage focus in an Angular 2 app? (HTML Pages with CSS and JavaScript forum at Coderanch)", Coderanch.com, 2019. [Online]. Available: https://coderanch.com/t/675897/languages/programmatically-manage-focus-Angular-app. [Accessed: 18- Jul- 2019].
[6] "Angular", Angular.io, 2019. [Online]. Available: https://angular.io/. [Accessed: 18- Jul- 2019].
