Vue.component('add-task', {
    props: ['taskId'],
    data () {
        return {
            task: {
                title: ''
            }
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        addTask: function() {
            firebase.firestore().collection('tasks').add({
                title: this.task.title,
                owner: this.$store.getters.user.uid,
                complete: false
            })
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.error("Error adding document: ", error);

            });
        }
    },
    template: `
        <form class="grid-container full">
            <div class="grid-container full">
                <div class="grid-x grid-padding-x">
                    <div class="small-12 cell">
                        <label>Title
                            <input v-model="task.title" class="cell" type="text" placeholder="Task Title">
                        </label>
                    </div>
                </div>
            </div>
            <input v-on:click="addTask" type="button" value="Create">
        </form>`
  })
