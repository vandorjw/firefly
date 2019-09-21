Vue.component('task-card', {
    props: ['task', 'taskID'],
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        completeTask: function () {
            console.log(`Trying to mark task: {this.taskID} as complete`);
            if (!this.user) {
                // We are anonymous, can't add a task.
                // VueJS won't let us. FireStore won't let you either.
                return;
            }

            firebase.firestore().collection('users').doc(this.user.uid).collection("tasks").doc(this.taskID).update({
                complete: true
            })
            .then(function () {
                self.$store.commit('setTask', doc);
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });


        }
    },
    template: `
    <div class="cell">
        <div class="card">
            <div class="card-section">
            <i v-if="task.complete" class="far fa-check-square"></i>
            <i v-else class="far fa-square" v-on:click="completeTask"></i>
            <span> {{ task.title }}</span>
            </div>
        </div>
    </div>
    `
  })
