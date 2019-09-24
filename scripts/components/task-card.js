Vue.component('task-card', {
    props: ['task', 'taskID'],
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        completeTask: function () {
            let payload = {
                id: this.taskID,
                data: this.task,
                delta: {
                    complete: true
                }
            };
            payload.data.complete = true;
            this.$store.commit('updateTask', payload);
        },
        incompleteTask: function () {
            let payload = {
                id: this.taskID,
                data: this.task,
                delta: {
                    complete: false
                }
            };
            payload.data.complete = false;
            this.$store.commit('updateTask', payload);
        },
        deleteTask: function () {
            this.$store.commit('deleteTask', this.taskID);
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