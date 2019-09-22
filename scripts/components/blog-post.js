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
            return this.$store.getters.user;
        },
        postdate: function () {
            return moment(this.blog.created).format("dddd, MMMM Do YYYY");;
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
            <h3>{{ blog.title }} <small>{{ postdate }}</small></h3>
            <div v-html="blog.content"></div>
            <div class="callout">
                <ul class="menu simple">
                    <li><a href="#">Author: {{ blog.authorEmail }}</a></li>
                </ul>
            </div>
        </div>`
  })
