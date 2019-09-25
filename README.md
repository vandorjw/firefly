# firefly

[![Netlify Status](https://api.netlify.com/api/v1/badges/9a02fef1-3e25-4371-915b-962839ea7dae/deploy-status)](https://app.netlify.com/sites/eager-roentgen-a14dbd/deploys)

## Netlify with Google Firebase

Web Projects from 10 years ago didn't need to be bundled and minified. All I needed to do was write some `html`, style it with some `css`, and add some `JavaScript`.

:sparkles: __This project uses VueJS without needing a build environment.__ :star2:

Instead of downloading 200+ Mb of node packages :poop: before I can write a single line of code, I have included only the packages I needed via `<script>` tags on `index.html`. :thumbsup:

I used the code found in https://firebase.google.com/docs/auth/web/password-auth for authentication and wrapped it up in a Vue Component. 


## Tools used

* [VueJS](https://vuejs.org/v2/guide/index.html)
* [VueX](https://vuex.vuejs.org/)
* [Firebase](https://firebase.google.com/docs/web/setup#add-sdks-initialize)
* [Foundation](https://foundation.zurb.com/)


## Firebase Auth
I created a firebase project which uses the free spark plan. 
For Auth I have allowed email and google as my sign in methods.

## Firestore Data Model
Firestore is a document store, a little different if you are used to `SQL` for keeping data organized.
I have a couple of collections, and still experimenting but I'll try and publish the data model when I am more settled.

## Firestore Rules

I watched this [video](https://www.youtube.com/watch?v=eW5MdE3ZcAw) on how to configure the rules to my firestore database. 

These are the rules I came up with so far.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users {
      match /{userID} {
        allow create: if request.auth.uid == userID;
      }
      match /{userID}/tasks/{taskID}{
        allow create, write, read: if request.auth.uid == userID;
      }
    }
    match /blogposts/{post} {
    	allow read: if true;
      allow create: if request.auth.uid != null;
      allow write: if request.auth.uid == resource.data.author;
    }
    match /{restOfPath=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```
