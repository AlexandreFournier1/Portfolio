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

            card.querySelector('.project-view-details-link').addEventListener('click', () => {
                populateProjectModal(project);
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

async function loadBackground(type) {
    const container = document.getElementById(type + '-background-container');
    const template = document.getElementById(type + '-background-template');

    try {
        const response = await fetch('./json/data.json');
        const json = await response.json();

        const items = getBackgroundItems(type, json.background);

        if (items === null) throw new Error("Invalid type");

        Array.from(container.children).forEach(child => {
            if (child !== template) container.removeChild(child);
        });

        items.forEach(item => {
            const timelineItem = template.content.cloneNode(true);

            timelineItem.querySelector('.timeline-item-title-container__title').textContent = item.title;
            timelineItem.querySelector('.timeline-item-title-container__years').textContent = item.years;
            timelineItem.querySelector('.timeline-item__subtitle').textContent = item.subtitle;

            const tagsContainer = timelineItem.querySelector('.timeline-item_tags');
            if (tagsContainer) {
                (item.tags || []).forEach(tag => {
                    const tagElement = document.createElement('div');
                    tagElement.classList.add('timeline-item_tag');
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
            }

            const descriptionContainer = timelineItem.querySelector('.timeline-item__description');
            if (Array.isArray(item.description)) {
                const list = document.createElement('ul');
                list.classList.add('timeline-item__description-list');
                item.description.forEach(line => {
                    const listItem = document.createElement('li');
                    listItem.textContent = line;
                    list.appendChild(listItem);
                });
                descriptionContainer.appendChild(list);
            } else {
                descriptionContainer.textContent = item.description;
            }

            container.appendChild(timelineItem);
        });
    } catch (erreur) {
        console.error("Loading Error :", erreur);
    }
}

function populateProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const sectionTemplate = document.getElementById('project-modal-section-template');
    const sectionsContainer = modal.querySelector('.modal-content-sections');
    const modalData = project.modal || {};

    modal.querySelector('.project-title').textContent = project.title;

    const githubLink = modal.querySelector('.modal-content-header-link');
    if (modalData.githubLink) {
        githubLink.href = modalData.githubLink;
        githubLink.classList.remove('hidden');
    } else {
        githubLink.classList.add('hidden');
    }

    sectionsContainer.innerHTML = '';

    (modalData.sections || []).forEach(section => {
        const sectionNode = sectionTemplate.content.cloneNode(true);

        sectionNode.querySelector('.project-subtitle-icon').src = section.icon;
        sectionNode.querySelector('.project-subtitle-text').textContent = section.title;

        const detailsElement = sectionNode.querySelector('.project-subtitle-details');
        if (section.details) {
            detailsElement.textContent = section.details;
        } else {
            detailsElement.remove();
        }

        const textContainer = sectionNode.querySelector('.project-text-container');
        if (Array.isArray(section.content)) {
            const list = document.createElement('ul');
            list.classList.add('project-key-features');
            section.content.forEach(line => {
                const listItem = document.createElement('li');
                listItem.textContent = line;
                list.appendChild(listItem);
            });
            textContainer.appendChild(list);
        } else {
            const text = document.createElement('p');
            text.classList.add('project-text');
            text.textContent = section.content;
            textContainer.appendChild(text);
        }

        sectionsContainer.appendChild(sectionNode);
    });
}

function getBackgroundItems(type, json) {
    return type === 'educational' ? json.educational : type === 'experience' ? json.experience : null;
}

loadSkills();
loadProjects();