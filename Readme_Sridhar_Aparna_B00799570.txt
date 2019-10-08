StraySpirit: 
Strayspirit is an application aimed at providing a digital infrastructure for the pet lovers to adopt and post a pet animal for adoption. In addition, it provides an additional feature of purchasing the pet products such as toys, pet food, etc and posting and registering to the events posted by any organisation.
Event Management is one of the features that our application provides that allows the organisation to post an event on Strayspirit. Any user can enroll to the event by clicking the Register button and share the event by hitting the share button. As far as assignment 4 is concerned, a toast message is used to alert successful registration with the event and sharing of event even for unregistered users. For our final project, we will collect the email ID and Name of the unregistered users and intimate their event-registration by sending them an email. 
Top three events are filtered out and listed on the home page which can be reached with the following path:
Path to Home Page: http://localhost:4200
Events List Page: 
All of the events are visible to both registered and unregistered users. To view all the events, the user should click on the “Click for more events” link to get redirected to the page that lists all the events that are available for registration and sharing. This Event listing page can be located at the path: http://localhost:4200/event-list
Events Detail Page: 
On each of the events that are listed, a “more” hyperlink is set to redirect the users to the Events Detail page. 
Events Detail Page provides a detailed view of the events selected including the name of the event, a brief description about the event, the Location or venue Information, Date when the event was created and the host of the event. From this page, the user can make a more informed decision before registering for the events. This Events Detail page can be located at the path: http://localhost:4200/event-detail/ +id
My Events Page: http://localhost:4200/profile/my-events
The organiser of the event can post an event from the My Events section of the Profile page using the above-mentioned URL. Once the events are added to the database, the events will be simultaneously fetched from the database to display them in the events section on the home page and in the Events. 
Note: 
The organisation part of registration is programmed only to create a registration and log-in. However, adding events and access other benefits of all the application is not added as of yet. If a user posts an event from the My Events section of My Profile page, the Registration button will be disabled considering the user as the host of the event. Nonetheless, a new user who have not posted any event or an unregistered user can still Register to the event by clicking on the Register button. When all the benefits are added to the Organisation log-in, the event posting option will be restricted only for the organisation and not any regular user. 

Git Repository Link: https://git.cs.dal.ca/akshah/strayspirit
Problems faced: 
As we are using Angular7 and material bootstrap design for Angular, W3C Validator will not recognise the selectors and dependencies added to the HTML file.
Therefore, pasting the HTML and CSS code to the W3C validator will not identify the classes, selectors, and tags provided by bootstrap and angular and hence will identify those as errors. 





















References: 
[1]"AltexSoft - Technology & Solution Consulting Company", Altexsoft.com, 2019. [Online]. Available: https://www.altexsoft.com. [Accessed: 10- Feb- 2019].
[2]Loremipsum.io, 2019. [Online]. Available: https://loremipsum.io/generator/?n=2&t=p. [Accessed: 10- Feb- 2019].
[3]"Material Design for Bootstrap 4 - the most popular & free UI KIT", Material Design for Bootstrap, 2019. [Online]. Available: https://mdbootstrap.com. [Accessed: 10- Feb- 2019].
[4]N. Foundation, "Download | Node.js", Node.js, 2019. [Online]. Available: https://nodejs.org/en/download/. [Accessed: 10- Feb- 2019].
[5]"Angular Docs", Angular.io, 2019. [Online]. Available: https://angular.io/. [Accessed: 10- Feb- 2019].
[6]C. Cesar, "Top 10 dog-friendly events in Halifax", The Coast Halifax, 2019. [Online]. Available: https://www.thecoast.ca/halifax/top-10-dog-friendly-events-in-halifax/Content?oid=8482627. [Accessed: 24- Mar- 2019].
[7]"Mongoose ODM v5.4.19", Mongoosejs.com, 2019. [Online]. Available: https://mongoosejs.com/. 
[8]"Fully Managed MongoDB, hosted on AWS, Azure, and GCP", MongoDB, 2019. [Online]. Available: https://www.mongodb.com/cloud/atlas.



