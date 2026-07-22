const container = document.getElementById('project-container');
const template = document.getElementById('project-tempate');

async function loadData() {
    try {
        const reponse = await fetch('../json/data.json');
        const donnees = await reponse.json();

        donnees.forEach(item => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('.project-icon').src = item.icon_source;
            clone.querySelector('.project-title').textContent = item.title;
            clone.querySelector('.project-image').src = item.image_source;
            clone.querySelector('.project-description').src = item.description;

            conteneur.appendChild(clone);
        });
    } catch (erreur) {
        console.error("Loading Error :", erreur);
    }
}

loadData();