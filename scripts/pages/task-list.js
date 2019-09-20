const TaskList = Vue.component('TaskList', {
    computed: {
        tasks: function () {
            return this.$store.getters.tasks
        }
    },
    updated() {
        dragula([document.getElementById('taskList')]);
    },
    template: `
    <div class="grid-x grid-margin-x small-up-2 medium-up-3">
        <div class="small-6" id="taskList">
            <add-task></add-task>
            <task-card v-for="(task, index) in tasks" v-bind:key="index" :task='task'></task-card>
        </div>
    </div>`
})