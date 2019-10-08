ASSIGNMENT 4
Name: Sravan Sajeev
B00825856
________________________________________________________

##Installation Instructions (Running locally if you are cloning from Gitlab)

1) Go on to the directory /strayspirit.
2) Run "npm install"
3) cd to ./strayspiti/frontend 
4) run "ng serve" (make sure that Angular is installed on your system) - This will run frontend on your system
5) cd to ./strayspirit/backend
6) Run 'npm install' to install the dependencies.
7) Run 'npm start' to run the backend

## HOSTED LINK

GITHUB link - https://git.cs.dal.ca/akshah/strayspirit

Hosted on bluenose - http://129.173.22.35:14785/ 

Link to my feature - http://129.173.22.35:14785/faq
			
		   - http://localhost:3000/feedback

## FILES MODIFIIED

1) /strayspirit/backend/api/routes/feedback.js       -   Feedback controller
2) /strayspirit/backend/api/models/faq.js            -	 FAQ model schema
3) /strayspirit/frontend/src/app/f-aq.service.ts.    -	 Angular service for connecting frontend and backend
4) /strayspirit/frontend/src/app/sravan-feedback.    -   Angular component for feedback submission
5) /strayspirit/frontend/src/app/faq-sravan 	     -   Angular component for FAQ page


## FEATURE DEVELOPED

I developed the help section for the application. Help section includes an FAQ page which serves as a common portal for all common queries related to the application. FAQ questions and answers are loaded dynamically from the backend MongoDB database making it flexible for website administrators to change the contents of FAQ page later. In addition to the FAQ page, help section includes a submit feedback 
option for the users to submit their valuable feedback about the website. This sends an automated email containing the user feedback to the site administrator/ support personnel. For now, this mail is my personal email 'sravans578@gmail.com' and will be changed later with the support email of Stray spirit. 

Note:- I have noticed that upon hosting on bluenose, gmail sometimes blocks the IP address of bluenose resulting in mails not sent to the target mail address.

Note:- FAQ questions and answers are not written professionally for now. This will be updated later when all the other features are working and are stable. FAQ can be easily edited from MongoDB cloud atlas dashboard.


## CREDITS TO THE ORIGINAL WORK DONE BY STUDENTS FROM [(CSCI 5709)- WINTER 2019] [1]

The layout of the application was already set up by students from CSCI 5709 Winter batch [1]. This included a MongoDB cloud database on MongoDB Atlas, a folder structure with distinct routes for distinct features.


## TECHNOLOGIES USED FOR BACKEND

As mentioned earlier, students from Winter 2019 had already laid out the foundation for us to work on this project.

The backend server is a node server [2]. It is an open source engine which is capable of running Javascript code outside browser environment.
Express is used on top of node of make tasks such as routing simpler and to make the code more readable.



## Modified Code (Referenced code)


    1) Material card [3]
    Material cards are used in submit feedback page and FAQ page.

    2) Material form field [4]
	
	"<div class="example-container">
 	 <mat-form-field hintLabel="Max 10 characters">
   	 <input matInput #input maxlength="10" placeholder="Enter some input">
    	 <mat-hint align="end">{{input.value?.length || 0}}/10</mat-hint>
 	 </mat-form-field> "
	
	The above shown code is an example listed on Angular material forms [4]. This code has been edited to increase number of characters allowed in feedback submission which is being used in submit 	feedback page.
	
    3) Adding a delay for refreshing the page after feedback submission using Typescript
	
	Referred link:- https://stackoverflow.com/questions/37764665/typescript-sleep (Adding a delay for refreshing the page after success message)

	Modified code snippet : 
	
	
	" this.delay(1000).then(any=>{
   	 this.refresh();
   	 });
  
	}

	//https://stackoverflow.com/questions/37764665/typescript-sleep (Adding a delay for refreshing the page after success message)
 	 async delay(ms: number) {
 	 await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Delay added"));
	 }

	refresh(): void {
  	window.location.reload();
	} "

	Path to file :- (/strayspirit/frontend/src/app/sravan-feedback/sravan-feedback.component.ts )

	
    4) Sending a mail using node mailer[5]
	
	I used help from [5] and learned how to work with node mailer. 
	
	Path to file:- (/strayspirit/backend/api/routes/feedback.js)
	
	
	
	

## REFERENCES:

[1]   “StraySpirit (An application for Pet Adoption and Rescue)”, work done by Group 9 - by members “Aadesh Shah - B00802629, Aditya Gadhvi - B00809664, Aparna Sridhar- B00799570 and Dheeraj Varshney -	B00808467”, CSCI 5709, Winter 2019 "
[2]  https://nodejs.org/en/
[3]  https://material.angular.io/components/card/overview
[4]  https://material.angular.io/components/form-field/examples
[5]  https://nodemailer.com/about/
