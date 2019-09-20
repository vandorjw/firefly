Vue.component('task-card', {
    props: ['task'],
    template: `
    <div class="cell">
        <div class="card">
            <div class="card-section">
                <h4>{{ task.title }}</h4>
            </div>
        </div>
    </div>
    `
  })
