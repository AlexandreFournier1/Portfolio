const container = document.getElementById('project-container');
const template = document.getElementById('project-card-template');

async function loadProjects() {
    try {
        const response = await fetch('./json/data.json');
        const projects = await response.json();

        projects.forEach(project => {
            const card = template.content.cloneNode(true);

            card.querySelector('.project-logo').src = project.logo;
            card.querySelector('.project-title').textContent = project.title;
            card.querySelector('.project-description').textContent = project.description;
            card.querySelector('.project-techno-button-link').href = project.link;

            const technoList = card.querySelector('.project-techno-list');
            project.technologies.forEach(tech => {
                const iconContainer = document.createElement('div');
                iconContainer.classList.add('project-techno-icon-container');

                const icon = document.createElement('img');
                icon.src = tech.icon;
                icon.title = tech.name;
                icon.classList.add('project-techno-icon');

                iconContainer.appendChild(icon);
                technoList.appendChild(iconContainer);
            });

            container.appendChild(card);
        });

        window.initCarousel(container);
    } catch (erreur) {
        console.error("Loading Error :", erreur);
    }
}

loadProjects();
