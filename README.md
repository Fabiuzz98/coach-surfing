# coach-surfing

BUILT WITH: <br>
This application is fully responsive and has been made with Vue-js, HTML, SCSS and Firebase for the backend.

<br>

TRY THIS APP HERE: <br>
https://coach-surfing-fabio.netlify.app

<br>

DESCRIPTION OF THE APP: <br>
This app is for both students that want to learn how to code thus is possible for them to contact a teacher and for coaches that can register and create their coach profile to get contacted. <br>
Everyone accessing the app that is not authenticated can view the list of registered coaches, click on one and take a look at all their info in details, prices, description, profile image and the fields they are mostly specialized in.
It's also possible to filter coaches based on what the coach teaches and after viewing their details and info, you can contact them through the website. <br>
Everyone that instead feels brave enough to coach 😜, can register on the app and later on create their coach profile so that they can be contacted on their profile. <br>
At this point a coach can log in whenever they want to check if someone wrote them. It's possible to click on the message and automatically get redirected on their default email handler or click on the delete icon to get rid of the message from your profile.

<br>

MORE ABOUT THE APP:<br>
The app is FULLY RESPONSIVE, it uses flexbox, css grid, keyframes and is provided with error handling and functions as the one that will auto-logout after a given time from the authentication.<br>
Thanks to Vue js, the app uses components, routing, vuex and many fetch API to interact with Firebase. It also has features as redirecting a user to different URLs if trying to access pages which is not allowed to visit and keeps you logged in if you refresh the page (and the auto logout timer hasn't expired of course).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
