# Portfolio — Alexandre Fournier

A personal portfolio website showcasing my projects, technical skills, and educational/professional background.

🔗 Live site: [alexandrefournier1.github.io/Portfolio](https://alexandrefournier1.github.io/Portfolio/)

Single-page site with sections for About, Skills, Projects, Background (educational/experience), and Contact. Hosted via GitHub Pages, deployed directly from this repository.

## Tech Stack

- HTML5 / CSS3 (vanilla, no framework)
- Vanilla JavaScript (no build step, no dependencies)
- Data-driven content loaded at runtime from a local JSON file

## Project Structure

```
├── index.html              # Page markup and section layout
├── css/
│   ├── style.css           # Site styling
│   └── variable.css        # CSS custom properties (theme values)
├── js/
│   ├── script.js           # Carousel behavior, background section toggling
│   └── json_data_loading.js# Fetches data.json and renders skills/projects/background
├── json/
│   └── data.json           # Content: projects, skills, educational & experience background
└── img/                    # Images, icons, skill logos, star ratings
```

## How it works

`json_data_loading.js` fetches [json/data.json](json/data.json) and dynamically populates the page using `<template>` elements defined in [index.html](index.html):

- **Skills** and **Projects** are rendered as cards inside auto-scrolling carousels (`initCarousel` in [script.js](js/script.js)).
- **Background** (educational/experience) is rendered as a timeline, toggled via the "Educational Background" / "Experience Background" buttons.

To update the site's content (add a project, adjust skills, edit background entries), edit [json/data.json](json/data.json) — no HTML/JS changes needed.

## Contact

- LinkedIn: [alexandre-fournier-55b805296](https://www.linkedin.com/in/alexandre-fournier-55b805296)
- GitHub: [AlexandreFournier1](https://github.com/AlexandreFournier1)
