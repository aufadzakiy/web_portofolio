class ProjectService {
    constructor() {
        this.projects = [];
    }

    async fetchProjects() {
        try {
            const response = await fetch('data/projects.json');
            this.projects = await response.json();
            return this.projects;
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    }

    filterProjects(category) {
        if (category === 'all') return this.projects;
        return this.projects.filter(project => project.category === category);
    }
}

export default ProjectService;