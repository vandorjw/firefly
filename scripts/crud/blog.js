/**
 *  Permision is enforced on the database level.
 *  Executing parts of this file should not result in the modification of any documents.
 *  
 * */

function Blog() {
    this.data = null;
    this.db = firebase.firestore().collection('blogposts');
};

Blog.prototype.create = function (dataObj) {
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

Blog.prototype.get = function (id) {
    this.db.doc(id).get()
        .then(doc => {
            this.data = doc.data();
            return this.data;
        })
        .catch(error => {
            console.error("Error fetching Document: ", error);
        });
};

Blog.prototype.update = function (id, payload) {
    this.db.doc(id).update(payload)
        .then(function () {

        })
        .catch(error => {
            console.error("Error updating Document: ", error);
        });
};

Blog.prototype.delete = function (id) {
    this.db.doc(id).delete()
        .then(function () {
            console.log("Document successfully deleted!");
        })
        .catch(function (error) {
            console.error("Error removing Document: ", error);
        });
};