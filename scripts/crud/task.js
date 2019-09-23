/**
 *  Permision is enforced on the database level.
 *  Executing parts of this file should not result in the modification of any documents.
 *  
 * */ 

function Task() {
    this.data = null;
    this.user = null;
    this.db = firebase.firestore().collection('users').doc(this.user.uid).collection("tasks");
};

Task.prototype.create = function (dataObj) {
    this.db.add({
        dataObj
    })
    .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
        console.error("Error adding Document: ", error);
    });
};

Task.prototype.get = function (id) {
    this.db.doc(id).get().then(doc => {
        this.data = doc.data();
        return this.data;
    }).catch(error => {
        console.error("Error fetching Document: ", error);
    });
};

Task.prototype.update = function (id) {

};

Task.prototype.delete = function (id) {
    this.db.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing Document: ", error);
    });

};