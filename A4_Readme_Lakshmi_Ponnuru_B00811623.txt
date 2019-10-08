Name : Lakshmi Ponnuru
Banner ID : B00811623
Email ID : lk641235@dal.ca

About StraySpirit:
------------------
‘StraySpirit’ is a project intended to provide an online platform for animal rescuers to put up rescued animals up for adoption.

Git Repository: https://git.cs.dal.ca/akshah/strayspirit
--------------

Bluenose server URL for Project: http://129.173.22.35:14785/
-------------------------------

Bluenose server URL for my Feature: http://129.173.22.35:14785/donate
----------------------------------

Application Frameworks:
-----------------------
We are using MEAN stack setup for our application where M stands for MongoDB, which is the database used on the backend.
We are using MongoDB Atlas (MongoDB on the cloud). E stands for Express which provides the controller logic. 
A stands for Angular, which is the frontend framework. N stands for Node.js, which acts as the server for connecting the backend with the frontend.
So overall, the application follows the MVC architecture.

Features to be developed by me in this project:
----------------------------------------------
	Feature 1 - Donation
	Feature 2 - Event Management

As a part of assignment 4, I developed the Donation Feature.

How to test this feature?
-------------------------
-> Go to the home page of the website
-> On the navigation bar, click on the Donate link  (shown at the top of the page)
-> The system prompts to the donation page, which has a form.
-> Fill the form and click on the Donate Now button.
-> Then, the system prompts to the payment gateway
	
	Note: We are not developing the payment gateway feature as it has to be linked with banks.
	      So, the payment gateway page is just a static page

-> On successful donation, an email is sent on the Donor's emailID.
-> This can be checked by checking the mail.

Form Validations:
-----------------
-> Validators.required is applied on all the fields
-> Validators.required, Validators.email, and pattern-check validation is applied on the EmailID Field.
-> The pattern used for email is - ^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$ - this will only allow valid email ids like abc.def@ijk.com 
   	 
Changes made compared to Assignment 3:
-------------------------------------
Changes in the UI of the page. 
-> Did not use different tabs for one-time donation and recurring-donations.
-> Instead, used a drop-down to select the frequency of donations (one-time, monthly, quarterly and yearly).  
-> Changed the clickable image (Donate) to a button (Donate Now) 
-> Added few more fields - Last Name, First Name and EmailID

Changes in the functionality.
-> Implemented additional functionality of sending a Thank You mail from the StraySpirit to acknowledge the donor. 


Previous Code:
--------------
 
                     <mat-tab-group>
                        <mat-tab label="ONE-TIME DONATION">
                           <br>
                           <form class="donateForm" [formGroup]="donateForm" name="donateForm"  (submit)="ondonateOneTime()">
                           <div class="fields-container">
                              <mat-form-field>
                                 <input matInput (keypress)="numberOnly($event)" placeholder="Amount*" class="form-control" name="amountOneTime"
                                    formControlName="amountOneTime">
                                 <mat-error *ngIf="f.amountOneTime.errors?.required">Amount is required</mat-error>
                              </mat-form-field>
                           </div>
                           <input title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" name="submitOneTime" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" type="image">
                           </form>
                        </mat-tab>
                        <mat-tab label="RECURRING DONATION">
                           <form [formGroup]="donateFormRecurring"  name="donateFormRecurring" class="donateFormRecurring" (submit)="onSubmitRecurring()">
                           <div class="fields-container">
                              <mat-form-field>
                                 <input matInput matInput (keypress)="numberOnly($event)" placeholder="Amount*" class="form-control" name="amountRecurring"
                                    formControlName="amountRecurring">
                                 <mat-error *ngIf="fr.amountRecurring.errors?.required">Amount is required</mat-error>
                              </mat-form-field>
                           </div>
                           <input title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" name="submitOneTime" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" type="image">
                           </form>
                        </mat-tab>
                     </mat-tab-group>

Changed Code:
-------------

	      <mat-tab label="DONATION">
                <form [formGroup]="donateForm" name="donateForm" class="donateForm"
                  (ngSubmit)="onDonation()">
                  <div class="fields-container">
                    <mat-form-field>
                      <input matInput placeholder="First Name*" class="form-control" name="donorFirstName"
                        formControlName="donorFirstName">
                      <mat-error *ngIf="fr.donorFirstName.errors?.required">First Name is Required</mat-error>
                    </mat-form-field>
                  </div>
                  <div class="fields-container">
                    <mat-form-field>
                      <mat-label>Select Frequency*</mat-label>
                      <mat-select type="frequency" placeholder="Frequency*" name="frequency"
                        formControlName="frequency">
                        <mat-option>None</mat-option>
                        <mat-option value="one-Time">One-Time</mat-option>
                        <mat-option value="Monthly">Monthly</mat-option>
                        <mat-option value="Quaterly">Quarterly</mat-option>
                        <mat-option value="Yearly">Yearly</mat-option>
                      </mat-select>
                      <mat-error *ngIf="fr.frequency.errors?.required">Frequency of subscription is required
                      </mat-error>
                    </mat-form-field>
                  </div>
                  <br>
                  <button type="submit" style="margin-bottom: 5%;" mat-raised-button (click)=toggle() routerLinkActive="router-link-active" color="accent">Donate Now</button>
                </form>
              </mat-tab>

Code Snippets:
--------------

Data model:

		const mongoose = require('mongoose');

		// Schema to store the data model in the database
		const donationSchema = mongoose.Schema({
		    _id: mongoose.Schema.Types.ObjectId,
		    donorFirstName: { type:String , required:true },
		    donorLastName: { type:String , required:true },
		    emailID: { type:String , required:true },
		    amount: {type:Number, required:true },
		    frequency: {type:String, required:true }
    		});
		module.exports = mongoose.model('Donation', donationSchema);

HTTP POST Request:

		router.post('/', (req, res, next) => {
		    const donations = new Donation({
		        _id: new mongoose.Types.ObjectId(),
		        donorFirstName: req.body.donorFirstNameModel,
		        donorLastName: req.body.donorLastNameModel,
		        emailID: req.body.emailIDModel,
		        amount: req.body.amountModel,
		        frequency: req.body.frequencyModel
		    });
		    donations.save().then(result =>{
		        console.log(result);
		    })
		    .catch(err => console.log(err));
		    res.status(201).json({
		        message: 'Handling POST requests to /donation',
		        createddonations: donations
		    });

To send an email to the donor: This code is same as the code used to send the registration confirmation link email. 
			       As donation feature does not requires login authentication, I did not use the session tokens as used in the other feature.

		let transporter = nodemailer.createTransport({
		        service: 'gmail',
		        auth: {
		          user: 'strayspirittest@gmail.com', // generated ethereal user
		          pass: 'Qazwsx!2' // generated ethereal password
		        },
		        tls: {
		            rejectUnauthorized: false
		        }
		      });
    		      // setup email data with unicode symbols
		      let mailOptions = {
		        from: '"Stray Spirit" <strayspirittest@gmail.com>', // sender address
		        to: req.body.emailIDModel, // list of receivers - this the emailID provided by the donor
		        subject: "Thank you for your Donation", // Subject line
		        text: "", // plain text body
		        html: "<div> We appreciate your kindness. On behalf of SraySpirit we thank you wholeheartedly for your Donation.</div>" // html body
		      };
    		      // to send a mail with defined transport object
		     transporter.sendMail(mailOptions, (error, info) => {
		         if(error) {
		             return console.log(error);
		         }
		         console.log("Message sent: %s", info.messageId);
		     });

Service File:

		export class DonationService {

		  constructor(private http: HttpClient) { }

		  // POST request to the server to store the donation details
		  newDonation(DonationModel: any) {
		    console.log(DonationModel);
		    this.http.post('http://localhost:3000/donation/', DonationModel)
		      .subscribe(responseData => {
		        console.log('Donation record added to the database and mail has been sent!');
		      });
		  }

Deficiencies:
------------
	-> Since we are using Angular 7 and Material design for it, W3 validations won't be possible by just copy-pasting the HTML and CSS source code as Angular 
	   and Material design provides a lot of different selectors and dependencies on HTML structure. We have ensured that we have followed the W3 standards for creating web pages.
	-> In the form-validations, the amount field is type="number". It should not accept alphabet and special characters. But, it accepts the character 'e' as it is considered as exponential in number.

References:
----------- 

[1] Lakshmi Ponnuru, "CSCI5709 - Assignment 3", June 2019.
[2] Team 9 , "StraySpirit Project " , Winter term 2019, Dalhousie University
[3] "Shreveport Bossier Animal Rescue 2016 Promo", Vimeo, 2019. [Online]. Available: https://vimeo.com/162920170. [Accessed: 01- Jun- 2019].
[4] "Angular 7 - Reactive Forms Validation Example | Jason Watmore's Blog", Jasonwatmore.com, 2019. [Online]. Available: https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example. [Accessed: 01- Jun- 2019].
[5] "Angular Bootstrap with Material Design - Powerful and free UI KIT", Material Design for Bootstrap, 2019. [Online]. Available: https://mdbootstrap.com/docs/angular/. [Accessed: 01- Jun- 2019]. 
[6] Loremipsum.io, 2019. [Online]. Available: https://loremipsum.io/. [Accessed: 01- Jun- 2019].
[7] Image on Donation Page - https://irp-cdn.multiscreensite.com/a1067652/dms3rep/multi/mobile/Thank+You.jpg
[8] Image on PaymentGateway Page - https://support.hashflare.io/hc/article_attachments/115009661205/Screen_Shot_2017-10-11_at_3.37.36_PM.png




