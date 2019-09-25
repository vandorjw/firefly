const BlogList = Vue.component('BlogList', {
    computed: {
        user: function () {
            return this.$store.getters.user
        },
        blogs: function () {
            return this.$store.getters.blogs
        }
    },
    methods: {
        getBlogs: function () {
            let self = this;
            let B = new Blog();
            B.db.get()
            .then(querySnapshot => {
                querySnapshot.forEach(function (doc){
                    self.$store.commit('getBlog', doc.id);
                })
            })
        }
    },
    created() {
        this.getBlogs();
    },
    template: `
    <div class="grid-x grid-margin-x" id="content">
        <div class="medium-9 cell">
            <blog-post v-for="(blog, index) in blogs" v-bind:key="index" :blog='blog' :blogID='index'></blog-post>
        </div>
        <sticky-container></sticky-container>
        <pagination-ui></pagination-ui>
    </div>`
  })
