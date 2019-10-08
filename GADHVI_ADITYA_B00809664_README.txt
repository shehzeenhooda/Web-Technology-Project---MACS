Name: Aditya Gadhvi
Banner_no: B00809664
Email: ad742065@dal.ca

Note: Please review the installation guide and common_readme.pdf file, in order to run the project.
Note : As a part of my Assignment-4, I have implemented the Feature-1 : Login, Registration, Session management

Features developed by me : Feature -(1) Registration, Login, Session management
	   		   Feature- (2) Editing user-profile (Both personal and organization users)

Feature (1): Login and Logout, Registration, Session management

(1.1)	Registration
It is a feature that allows users (personal or organization) to register themselves with our website. Two tabs (Personal and Organization) will allow both individual users as well as 
organizations to register with the website. Our project includes two types of users: Personal users and Organization users. I have created the back-end process of the Registration page 
for both types users. In the registration page, there are two tabs: personal and organization. The users can select any one of the tabs and register themselves either as an individual user or as an organization user. 


How to test this feature?
-> Go to the home page of our website. On the home page click on the user-icon (shown at the top-right corner). 
After clicking on the user-icon, a dropdown menu will appear that will show two list items : Login and Register.
 
-> Now click on the register link in the opened dropdown menu to go to the register page. 

-> On the register page you can select one of the tabs to register yourself.
There are two tabs : Personal( to register as personal users) and Organization (to register as an organization).
All types of validations have been implemented in both personal registration as well as organization registration.
Until all the entered user values are valid, the user won't be able to click on the REGISTER button on the page. A seperate validation for password and confirm password has been 
implemented seperatley. To test this validation, just try to enter different passwords in the password and confirm password fields, and you will be shown an error on the screen,
indicatig passwords mismatch. If all the entered details in all of the feilds are valid, then a success pop up message would be displayed on the screen, indicating that the profile of
the user has been successfully created and the user will be redirected to login page.
I have used Bcrypt package to store passwords in an encrypted form. 

Path : http://localhost:4200/register


(1.2)  Login / Logout
-> It is a feature that allow users to log in and view their profiles. In this feature, i have implemented the login functionality for both individual users as well as organization users.
In the login page, there are two tabs: PERSONAL and ORGANIZATION. On the PERSONAL tab you can login as an individual user and on the ORGANIZATION tab, you can login as an organization.
Validations have been implemented on the login page for both types of users. If you enter wrong credentials, then an error message will be shown indicating that wrong credentials are entered.
If you enter correct credentials then you will be redirected to the profile page.

How to test this feature?
-> Go to the home page of our website. On the home page click on the user-icon (shown at the top-right corner). 
After clicking on the user-icon, a dropdown menu will appear that will show two list items : Login and Register.
 
-> Now click on the login link in the opened dropdown menu to go to the login page. 

-> On the login page you can select one of the tabs to login.
There are two tabs : Personal( login for personal users) and Organization (login for organization). Enter the credentials on any one of the tabs(Personal ororganization). If you enter wrong
credentials, you will be shown an error message (wrong credentials). If you enter correct credentials, you will be redirected to the profile page.

Here are the testing credentials if you want to test login feature or else you can first register yourself and then login.
Email : abd@gmail.com
Password: 12345678

Logout: 
After you have logged in, you will be able to see the logout link in the dropdown menu that gets appeared when you click on the user-icon (top-right corner). When the user is not logged in,
the dropdown will show Register and Login link. If the user is logged in , the dropdown will show only log out link.

path: http://localhost:4200/login

(1.3) Session management and Authentication
-> It is a feature that will establish a session if the user gets successfully logged in. If the user gets successfully logged in with the website, a unique token will be generated for that
particular user and when the user gets logged out, the user token will be removed and the session will get closed as well. 

-> I have used JSON web tokens to generate tokens and managing them.

-> I have also protected the profile route. Only the logged in users must be able to see their profile and not anyone else. If you want to test this, then just enter this link: 
"http://localhost:4200/profile" on the current browser. If you are not logged in , then you will be redirected to the login page (So my feature only allows the logged in users to
 see their profiles). Another test you can perform is that login with the website on the current browser, so you will be redirected to the profile page. Now copy the link from the current
page opened on the current browser ("http://localhost:4200/profile") and enter it on some another browser. If you enter "http://localhost:4200/profile" on another browser you will be 
redirected to login page as well. In short, only the logged in users will be able to go to the "http://localhost:4200/profile" link on any of the browsers.

On clicking on logout, you will be successfull logged out and get redirected to the home page and your session and token will get destroyed.


References :
https://jwt.io/
https://www.npmjs.com/package/bcrypt


NOTE: As a part of my assignment-4 i have only implemented the Feature-(1).  I will implement the Feature-(2) Editing user-profile later in the project.






