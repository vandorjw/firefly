Vue.component('quill-editor', {
    props: {
        value: {
            type: String,
            default: ''
        }
    }, 
    data() {
        return {
            editor: null
        }
    },
    methods: {
        update() {
            this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
        }
    },
    mounted() {
        const options = {
            theme: 'snow'
        };
        this.editor = new Quill(this.$refs.editor, options);
        this.editor.root.innerHTML = this.value;
        this.editor.on('text-change', () => this.update());
    },
    template: `<div ref="editor"></div>`
})