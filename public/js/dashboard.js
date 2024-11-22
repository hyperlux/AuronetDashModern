class Dashboard {
    constructor() {
        this.discourseApi = new DiscourseApi();
        this.init();
    }

    async init() {
        await Promise.all([
            this.loadLatestAnnouncements(),
            this.loadUpcomingEvents()
        ]);
    }

    async loadLatestAnnouncements() {
        try {
            const data = await this.discourseApi.getLatestTopics();
            const container = document.getElementById('latestAnnouncements');
            
            data.topic_list.topics.slice(0, 5).forEach(topic => {
                const div = document.createElement('div');
                div.className = 'event-item';
                div.innerHTML = `
                    <div class="event-details">
                        <h3>${topic.title}</h3>
                        <div class="event-meta">
                            Posted by ${topic.posters[0].description} • ${this.formatDate(topic.created_at)}
                        </div>
                    </div>
                `;
                container.appendChild(div);
            });
        } catch (error) {
            console.error('Error loading announcements:', error);
        }
    }

    loadUpcomingEvents() {
        const events = [
            {
                title: 'Community Clean-up Drive',
                date: 'Mar 15, 2024',
                attending: 156,
                image: '/images/cleanup.jpg'
            },
            {
                title: 'Local Business Fair',
                date: 'Mar 20, 2024',
                attending: 230,
                image: '/images/business-fair.jpg'
            },
            {
                title: 'Tech Workshop Series',
                date: 'Mar 25, 2024',
                attending: 89,
                image: '/images/workshop.jpg'
            }
        ];
        const container = document.getElementById('upcomingEvents');
        events.forEach(event => {
            const div = document.createElement('div');
            div.className = 'event-item';
            div.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        ${event.date} • ${event.attending} attending
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});
