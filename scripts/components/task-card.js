Vue.component('task-card', {
    props: ['task', 'taskID'],
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        completeTask: function () {
            console.log(`Trying to mark task: ${this.taskID} as complete`);
            var self = this;
            
            if (!this.user) {
                // We are anonymous, can't add a task.
                // VueJS won't let us. FireStore won't let you either.
                return;
            }

            firebase.firestore().collection('users').doc(this.user.uid).collection("tasks").doc(this.taskID).update({
                complete: true
            })
            .then(function () {
                let payload = {
                    id: self.taskID,
                    data: self.task
                }
                payload.data.complete = true;
                self.$store.commit('updateTask', payload);
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
        },
        incompleteTask: function () {
            console.log(`Trying to mark task: ${this.taskID} as incomplete`);
            var self = this;
            
            if (!this.user) {
                // We are anonymous, can't add a task.
                // VueJS won't let us. FireStore won't let you either.
                return;
            }

            firebase.firestore().collection('users').doc(this.user.uid).collection("tasks").doc(this.taskID).update({
                complete: false
            })
            .then(function () {
                let payload = {
                    id: self.taskID,
                    data: self.task
                }
                payload.data.complete = false;
                self.$store.commit('updateTask', payload);
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
        },
        deleteTask: function () {
            console.log(`Trying to delete task: ${this.taskID} `);
            var self = this;
            
            if (!this.user) {
                // We are anonymous, can't add a task.
                // VueJS won't let us. FireStore won't let you either.
                return;
            }

            firebase.firestore().collection('users').doc(this.user.uid).collection("tasks").doc(this.taskID).delete().then(function() {
                console.log("Task successfully deleted!");
                self.$store.commit('deleteTask', self.taskID);
            }).catch(function(error) {
                console.error("Error removing task: ", error);
            });
        },



    },
    template: `
    <div class="cell">
        <div class="card">
            <div class="card-section">
            <i v-if="task.complete" class="far fa-check-square" v-on:click="incompleteTask"></i>
            <i v-else class="far fa-square" v-on:click="completeTask"></i>
            <span> {{ task.title }}</span>
            <i class="far fa-trash-alt float-right" v-on:click="deleteTask"></i>
            </div>
        </div>
    </div>
    `
  })
