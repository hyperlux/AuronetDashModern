class DiscourseApi {
    constructor() {
        this.baseUrl = 'https://aurovillenetwork.org';
    }

    async getLatestTopics() {
        try {
            // Use the server as a proxy instead of direct fetch
            const response = await fetch('/api/latest');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    }
}

// Make it available both as a module and global
export { DiscourseApi };
window.DiscourseApi = DiscourseApi;
