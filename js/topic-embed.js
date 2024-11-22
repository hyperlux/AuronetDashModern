class TopicEmbed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const category = this.getAttribute('category');
    const perPage = this.getAttribute('per-page');
    const template = this.getAttribute('template');
    
    this.render({ category, perPage, template });
  }

  async render(options) {
    const discourseAPI = new DiscourseAPI();
    const topics = await discourseAPI.getEmbeddedTopics(options);
    
    this.shadowRoot.innerHTML = `
      <style>
        .topics-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .topic-item {
          border: 1px solid #e0e0e0;
          padding: 1rem;
          border-radius: 4px;
        }
      </style>
      <div class="topics-list">
        ${topics.map(topic => `
          <div class="topic-item">
            <h3>${topic.title}</h3>
            <div class="meta">
              <span>Posted: ${new Date(topic.created_at).toLocaleDateString()}</span>
              <span>Replies: ${topic.reply_count}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('d-topics-list', TopicEmbed);
