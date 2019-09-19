const BlogList = Vue.component('BlogList', {
    data () {
        return {
            blogIds: [] 
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        getBlogIds: function() {
            var self = this;
            firebase.firestore().collection('blogposts').get().then(querySnapshot => {
                querySnapshot.forEach(function(doc) {
                    self.blogIds.push(doc.id);
                });
            })
        }
    },
    created() {
        this.getBlogIds();
    },
    template: `
    <div class="grid-x grid-margin-x" id="content">
        <create-post v-if="user"></create-post>
        <div class="medium-9 cell">
            <blog-post v-for="id in blogIds" :blogId='id'></blog-post>
        </div>
        <sticky-container></sticky-container>
        <pagination-ui></pagination-ui>
    </div>`
  })
