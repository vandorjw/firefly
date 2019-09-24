/**
 *  Permision is enforced on the database level.
 *  Executing parts of this file should not result in the modification of any documents.
 *  
 * */

function Task(userID) {
    this.data = null;
    this.userID = userID;
    this.db = firebase.firestore().collection('users').doc(this.userID).collection("tasks");
};

Task.prototype.create = async function (dataObj) {
    let self = this;
    await this.db.add(dataObj)
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            return self.get(docRef.id);
        })
        .catch(error => {
            console.error("Error adding Document: ", error);
        });
    return this.data;
};

Task.prototype.get = async function (id) {
    let self = this;
    await this.db.doc(id).get()
        .then(doc => {
            self.data = doc;
        })
        .catch(error => {
            console.error("Error fetching Document: ", error);
        });
    return this.data;
};

Task.prototype.update = async function (id, payload) {
    let self = this;
    await this.db.doc(id).update(payload)
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(error => {
            console.error("Error updating Document: ", error);
        });
    return this.data;
};

Task.prototype.delete = async function (id) {
    let self = this;
    await this.db.doc(id).delete()
        .then(function () {
            console.log("Document successfully deleted!");
            self.data = null;
        })
        .catch(function (error) {
            console.error("Error removing Document: ", error);
        });
    return self.data;
};