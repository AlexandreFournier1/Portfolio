async function loadProjects() {
    const container = document.getElementById('project-container');
    const template = document.getElementById('project-card-template');

    try {
        const response = await fetch('./json/data.json');
        const json = await response.json();

        const projects = json.projects;

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

async function loadSkills() {
    const container = document.getElementById('skill-container');
    const template = document.getElementById('skill-card-template');

    try {
        const response = await fetch('./json/data.json');
        const json = await response.json();

        const skills = json.skills;
        
        skills.forEach(skill => {
            const card = template.content.cloneNode(true);

            card.querySelector('.skill-icon').src = skill.logo;
            card.querySelector('.skill-stars').src = skill.stars;

            container.appendChild(card);
        });

        window.initCarousel(container);
    } catch (erreur) {
        console.error("Loading Error :", erreur);
    }
}

export async function loadBackground(type) {
    const container = document.getElementById(type + '-background-container');
    const template = document.getElementById(type + '-background-template');

    try {
        const response = await fetch('./json/data.json');
        const json = await response.json();

        const backgroundContainer = json.background;
        const items = getBackgroundItems(type, backgroundContainer);

        if (items === null) throw new Error("Invalid type");

        items.forEach(item => {
            const timelineItem = template.content.cloneNode(true);

            timelineItem.querySelector('timeline-item-title-container__title').textContent = item.title;
            timelineItem.querySelector('timeline-item-title-container__years').textContent = item.years;
            timelineItem.querySelector('timeline-item__subtitle').textContent = item.subtitle;
            timelineItem.querySelector('timeline-item__description').textContent = item.description;

            container.appendChild(item);
        });
    } catch (erreur) {
        console.error("Loading Error :", erreur);
    }
}

function getBackgroundItems(type, json) {
    return type === 'educational' ? json.educational : type === 'experience' ? json.experience : null;
}

loadSkills();
loadProjects();