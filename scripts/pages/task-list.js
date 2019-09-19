const TaskList = Vue.component('TaskList', {
    data () {
        return {
            taskIds: [] 
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        getTaskIds: function() {
            var self = this;
            firebase.firestore().collection('users').doc(this.user.uid).collection("tasks").get().then(querySnapshot => {
                querySnapshot.forEach(function(doc) {
                    self.taskIds.push(doc.id);
                });
            })
        }
    },
    created() {
        if(this.user){
            this.getTaskIds();
        }
        
    },
    updated() {
        dragula([document.querySelector('#taskList')]);
    },
    template: `
    <div class="grid-x grid-margin-x small-up-2 medium-up-3">
        <div class="small-6" id="taskList">
            <add-task></add-task>
            <task-card v-for="id in taskIds" v-bind:key="id" :taskId='id'></task-card>
        </div>
    </div>`
  })
