Vue.component('blog-post', {
    props: ['blogId'],
    data () {
        return {
            blog: {
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
        getBlog: function(blogId) {
            let docRef = firebase.firestore().collection('blogposts').doc(blogId);
            docRef.get().then(doc => {
                this.blog = doc.data();
            })
        }
    },
    created() {
        this.getBlog(this.blogId);
    },
    template: `
        <div class="blog-post">
            <h3>{{ blog.title }} <small>3/6/2016</small></h3>
            <img class="thumbnail" src="https://placehold.it/850x350">
            <p>{{ blog.content }}</p>
            <div class="callout">
                <ul class="menu simple">
                    <li><a href="#">Author: {{ blog.author }}</a></li>
                    <li><a href="#">Comments: 3</a></li>
                </ul>
            </div>
        </div>`
  })
