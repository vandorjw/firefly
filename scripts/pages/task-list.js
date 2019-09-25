const TaskList = Vue.component('TaskList', {
    computed: {
        tasks: function () {
            return this.$store.getters.tasks
        },
        user: function () {
            return this.$store.getters.user
        }
    },
    updated() {
        dragula([document.getElementById('taskList')]);
    },
    template: `
    <div class="grid-x grid-margin-x">
        <add-task v-if="user"></add-task>
        <p v-else>You must login to keep track of your tasks.<p> 
        <div id="taskList" class="grid-container full small-12">
            <task-card v-for="(task, index) in tasks" v-bind:key="index" :task='task' :taskID='index' ></task-card>
        </div>
    </div>`
})