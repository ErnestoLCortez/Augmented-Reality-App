## What does your app do?
#### Mobile App:
Allows user to login and out using firebase user name and password authentication.  Footer navigation tabs for navigating to list view that displays all data points, camera view and settings view.  Settings view demonstrates GPS and Gyroscope access and allows for user sign out. Camera view displays markers of posts within a certain radius of the user. These posts are clickable and will show the full message once clicked.
#### Backend:
It sets up the API flow that will allow the app to authenticate with the server, post location messages to save in database, and retrieve messages in a 200 meter radius.  It is deployed on Heroku, uses MongoDB for the database, and JWT for authentication. The landing page is hosted at the Heroku deployment.

## Who worked on it?
- Ernesto L Cortez
- Tomas Hernandez
- Michael Fernandez
- Jessica Vega

## What were you able to complete for this handin?
#### Mobile App:
- Implemented Facebook login
- Form was created to allow user to input a message to send
- Messages sent using the app post to the database
- Posts within certain radius are represented by a marker on the camera view (not done yet, but hopefully before class)
- Message pops up when user submits a post

#### Backend:
- Various bug fixes and cleaned up code

## What are known problems, if any, with your project?
#### Mobile App:
- Camera view still stretches beyond header and footer and is scrollable.  This is undesired behavior.
-

#### Backend:
- JWT is unencrypted. (Security concerns)

## How would you improve it if you had more time?
#### Mobile App:
- For this milestone we would have liked to include picture and video messages.
- It would have been nice to implement a more clean and simplified design

#### Backend:
- Make more security considerations as far as encryption is concerned.
- Finish up the landing page with app images and team information/pictures/links
