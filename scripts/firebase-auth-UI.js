var uiConfig = {
    // autoUpgradeAnonymousUsers: true,
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
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
    tosUrl: '/#/terms-of-service',
    privacyPolicyUrl: '/#/privacy-policy'
};

// Define a new component firebase-auth-ui
const AuthUI = Vue.component('firebase-auth-ui', {
    mounted: function () {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);
    },
    updated: function () {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);


    },
    template: `
        <div class="medium-12 cell align-center">
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </div>`
})