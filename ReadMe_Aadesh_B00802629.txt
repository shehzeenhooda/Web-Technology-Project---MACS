Readme file for the Work done by Aadesh Shah (B00802629) for Assignment 4:

First check the common readme file and installation steps pdf files

Note: Since we are using Angular 7 and Material design for it, W3 validations won't be possible by just copy-pasting the HTML and CSS source code as Angular and Material design provides a lot of different selectors and dependencies on HTML structure. We have ensured that we have followed the W3 standards for creating web pages

Features Developed by Me -  

Pets filtering by location (Fully working)
Pet Profile Management (80% done)

Pets filtering by location:

When user routes to Find a pet page (http://localhost:4200/pets), the application will show the pets which are near to user's current location 
. If there is no pet nearby, the application will show Error for it.
User can change location for filtering the pets by searching in the search box with autocomplete functionality. If there are pets in that locality, it will show all the pets availble for adoption.
If the user clicks on any of the listed pet, it opens up the profile page for that pet.

Currently there are 6 pets added onto database with 4 in Halifax and 2 in Mumbai (type in Mumbai and hit first suggestion to filter pet in Mumbai).

Current pet data is added from https://www.petfinder.com/dog/cleo-44059085/ns/dartmouth/good-bones-dog-rescue-ns69/ , https://www.petfinder.com/dog/luna-43887750/ns/amherst/lillian-allbon-shelter-ns11/ , https://www.catcafestudio.com/adoption/

Pet Profile management:


Basic CRUD operations on pet profiles is completed.
User can add a pet by creating personal account and logging in. (Go to http://localhost:4200/profile/my-pet-ads).
While adding a pet, user's current location is added in city,state and country. If user wants to change the location for adding, city name, state name and country name should be inputted as suggested in the autocomplete search box on pet listing page (find a pet page). I will work on autcomplete for these three inputs (city, state and country) after assignment 4. Test input value - (city name - Halifax, state name - NS, country name - Canada; city name - Delhi, state name - Delhi, country name - India)
My ads shows pet profiles which are uploaded by current user and not all the pets. (Go to http://localhost:4200/profile/my-pet-ads and My Listings tab)
User can edit pet profile uploaded by him/her. 
User can delete a pet profile listed in My ads.

The part that is remaining is if someone sends a request for adoption, the pet uploader should get the request and update the adoption status accordingly.