Vue.component('add-task', {
    props: ['taskId'],
    data() {
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
        addTask: function () {

            if (!this.user) {
                // We are anonymous, can't add a task.
                // VueJS won't let us. FireStore won't let you either.
                return;
            }

            firebase.firestore().collection('users').doc(this.user.uid).collection("tasks").add({
                    title: this.task.title,
                    owner: this.$store.getters.user.uid,
                    complete: false
                })
                .then(docRef => {
                    console.log("Document written with ID: ", docRef.id);
                    // docRef is not the actual document.
                    // I can now fetch it with get, and shove it into the store. :poop:
                    docRef.get().then(doc => {
                        this.$store.commit('setTask', doc);
                    })
                    this.task.title = '';
                })
                .catch(error => {
                    console.error("Error adding document: ", error);
                    this.task.title = '';
                });
        }
    },
    template: `
        <form class="grid-container full small-12">
                <div class="grid-x grid-padding-x">
                    <div class="small-12 cell">
                        <div class="input-group">
                            <span class="input-group-label">New Task</span>
                            <input v-model="task.title" class="input-group-field" type="text">
                            <div class="input-group-button">
                                <input v-on:click="addTask" type="submit" class="button" value="Create">
                            </div>
                        </div>
                    </div>
                </div>
        </form>`
})