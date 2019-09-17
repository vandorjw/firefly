var uiConfig = {

    autoUpgradeAnonymousUsers: true,

    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;

        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        },
        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function (error) {
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
            }
            // The credential the user tried to sign in with.
            var cred = error.credential;
            // Copy data from anonymous user to permanent user and delete anonymous
            // user.
            // ...
            // Finish sign-in after data is copied.
            return firebase.auth().signInWithCredential(cred);
        }

    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '#terms-of-service',
    // Privacy policy url.
    privacyPolicyUrl: '#privacy-policy'
};


// Define a new component firebase-auth-ui
Vue.component('firebase-auth-ui', {
    data: function () {
        return {
            // Hold a reference to the current user.
            user: {
                displayName: null,
                email: null,
                emailVerified: null,
                photoURL: null,
                isAnonymous: null,
                uid: null,
                providerData: null
            },
            ui: null
        }
    },
    methods: {
        signOut() {
            firebase.auth().signOut().then(function () {
                console.log("User sign out successfull");
            }).catch(function (error) {
                // An error happened.
            });
        }
    },
    created: function () {
        var self = this;
        
        if (self.ui) {
            self.ui.reset();
        } else {
            self.ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        self.ui.start('#firebaseui-auth-container', uiConfig);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('User is signed in');
                self.user.displayName = user.displayName;
                self.user.email = user.email;
                self.user.emailVerified = user.emailVerified;
                self.user.photoURL = user.photoURL;
                self.user.isAnonymous = user.isAnonymous;
                self.user.uid = user.uid;
                self.user.providerData = user.providerData;

            } else {
                console.log("User is not signed in");
                self.user.displayName = null;
                self.user.email = null;
                self.user.emailVerified = null;
                self.user.photoURL = null;
                self.user.isAnonymous = null;
                self.user.uid = null;
                self.user.providerData = null;
            }
        });
    },
    updated: function () {
        var self = this;
        if (self.ui) {
            self.ui.reset();
        } else {
            self.ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        self.ui.start('#firebaseui-auth-container', uiConfig);
    },
    template: `<div>
        <div v-if="user.email">
            <p> you are signed in: {{this.user.email}}</p>
            <button v-on:click="signOut"> sign out </button>
        </div>
        <div v-else>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </div>
    </div>`
})