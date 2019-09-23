const BlogUpdate = Vue.component('BlogUpdate', {
    props: {
        blogId: {
            type: String,
            default: ''
        }
    }, 
    data() {
        return {
            blog: {
            }
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.user
        }
    },
    methods: {
        getBlog: function(blogID) {
            let docRef = firebase.firestore().collection('blogposts').doc(blogID);
            docRef.get().then(doc => {
                this.blog = doc.data();
            })
        },
        updateBlog: function(blogID) {
            // I should create a common file for all blog crud operations.
            // This file would look cleaner if I can use it for display only.
        }
    },
    created() {
        this.getBlog(this.$route.params.id);
    },
    template: `
    <div>
    <br />
        <form class="grid-container full">
            <div class="grid-x grid-padding-x">
                <div class="small-12 cell"> 
                    <input v-model="blog.title" class="cell" type="text" placeholder="Blog Title">
                </div>
            </div>
        </form>

        <quill-editor v-if="blog.content" v-model="blog.content"></quill-editor>

        <input type="button" value="Create">

    </div>`
})