# Sanghefte.no

This is a NTNU bachelors project built for a real customer. 

The project uses React as a front end framework and Firebase, and specifically Firestore and hosting
as its backend.

All the communication with Firebase is separated out in to its own module: `src/util`.

The project is set up with CI/CD pipeline through Github actions. The scripts for these actions can be found in the 
`.github` folder on the root level. Here you will find two files, one for the deployment and another for the integration 
part of the workflow.

## Available Scripts to start the app or format the code:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs the Prettier formatting check without changing any files and 
outputs the result to the console.

### `npm run format`

Runs the same check as above, but will over write the files to adhere to the Prettier rules.
