## What does your app do?
#### Mobile App:
Allows user to login and out using firebase user name and password authentication.  Footer navigation tabs for navigating to list view that displays all data points, camera view and settings view.  Settings view demonstrates GPS and Gyroscope access and allows for user sign out.
#### Backend:
It sets up the API flow that will allow the app to authenticate with the server, post location messages to save in database, and retrieve messages in a 200 meter radius.  It is deployed on Heroku, uses MongoDB for the database, and JWT for authentication.

## Who worked on it?
- Jessica Vega
- Ernesto L Cortez
- Tomas Hernandez
- Michael Fernandez

## What were you able to complete for this handin?
#### Mobile App:
- List view to demonstrate API route access.
- Deployment to Play store alpha branch.
- Motion Manager implemented for Gyroscope access.
- Persistent authentication implemented.

#### Backend:
- Authentication route setup that verifies Firebase token and issues JWT token.
- Middleware for authentication check implemented to protect API routes.
- Database model was updated to use GeoJSON for the posts which include a name, latitude, longitude, altitude and content of the message.
- API route added that allows client to request all data points within 200 meters of current location.

## What are known problems, if any, with your project?
#### Mobile App:
- Camera view stretches beyond header and footer and is scrollable.  This is undesired behavior.
- Have authentication but need to implement user account creation.
- Code coverage in Jest is not robust.

#### Backend:
- Code coverage in Jest is not robust.
- JWT is unencrypted.

## How would you improve it if you had more time?
#### Mobile App:
- For this milestone we would have liked to render data points over layed in the camera view.  This has been moved to Milestone 3.

#### Backend:
- Make more security considerations as far as encryption is concerned.  This will be considered in Milestone 3.
