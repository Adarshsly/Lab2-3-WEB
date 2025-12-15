// ============ ДАННЫЕ ПРОЕКТОВ ============
const projects = [
    {
        id: 1,
        title: "Corporate Website",
        year: "2023",
        type: "web",
        status: "completed",
        description: "A modern website for a finance company",
        image: "img/projects/project1.jpg"
    },
    {
        id: 2,
        title: "Fitness Mobile App",
        year: "2024",
        type: "mobile",
        status: "in-progress",
        description: "Workout tracking application",
        image: "img/projects/project2.jpg"
    },
    {
        id: 3,
        title: "Brand Identity",
        year: "2022",
        type: "design",
        status: "completed",
        description: "Logo and branding for startup",
        image: "img/projects/project3.jpg"
    },
    {
        id: 4,
        title: "E-commerce Platform",
        year: "2023",
        type: "web",
        status: "completed",
        description: "Online store with payment system",
        image: "img/projects/project4.jpg"
    },
    {
        id: 5,
        title: "Travel App UI",
        year: "2024",
        type: "design",
        status: "in-progress",
        description: "User interface for travel application",
        image: "img/projects/project5.jpg"
    },
    {
        id: 6,
        title: "Social Network App",
        year: "2024",
        type: "mobile",
        status: "in-progress",
        description: "Mobile application for social network",
        image: "img/projects/project6.jpg"
    },
    {
        id: 7,
        title: "Portfolio Website",
        year: "2022",
        type: "web",
        status: "completed",
        description: "Personal portfolio for designer",
        image: "img/projects/project7.jpg"
    },
    {
        id: 8,
        title: "Health Tracking App",
        year: "2023",
        type: "mobile",
        status: "completed",
        description: "Mobile app for health monitoring",
        image: "img/projects/project8.jpg"
    }
];

// ============ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ============
let activeFilters = {
    type: [],
    year: [],
    status: []
};

// ============ ОТОБРАЖЕНИЕ ПРОЕКТОВ ============
function renderProjects(projectsToShow) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projectsToShow.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = project.id;
        card.dataset.type = project.type;
        card.dataset.year = project.year;
        card.dataset.status = project.status;
        
        const imageUrl = project.image || `https://placehold.co/400x200/888/fff?text=${project.title}`;
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${imageUrl}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Year:</strong> ${project.year}</p>
                <div>
                    <span class="project-tag">${project.type}</span>
                    <span class="project-tag">${project.status}</span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ============ СБОР АКТИВНЫХ ФИЛЬТРОВ ============
function updateActiveFilters() {
    activeFilters = {
        type: [],
        year: [],
        status: []
    };
    
    document.querySelectorAll('#filters-container input:checked').forEach(checkbox => {
        const filterName = checkbox.name;
        const value = checkbox.value;
        if (activeFilters[filterName]) {
            activeFilters[filterName].push(value);
        }
    });
}

// ============ ПРИМЕНЕНИЕ ФИЛЬТРОВ ============
function applyFilters() {
    updateActiveFilters();
    
    const filteredProjects = projects.filter(project => {
        // Проверка по типу
        if (activeFilters.type.length > 0 && !activeFilters.type.includes(project.type)) {
            return false;
        }
        
        // Проверка по году
        if (activeFilters.year.length > 0 && !activeFilters.year.includes(project.year)) {
            return false;
        }
        
        // Проверка по статусу
        if (activeFilters.status.length > 0 && !activeFilters.status.includes(project.status)) {
            return false;
        }
        
        return true;
    });
    
    renderProjects(filteredProjects);
    updateFilterAvailability();
}

// ============ ОБНОВЛЕНИЕ ДОСТУПНОСТИ ФИЛЬТРОВ (УМНЫЙ ФИЛЬТР) ============
function updateFilterAvailability() {
    updateActiveFilters();
    
    // Получаем все возможные значения фильтров
    const allTypes = [...new Set(projects.map(p => p.type))];
    const allYears = [...new Set(projects.map(p => p.year))];
    const allStatuses = [...new Set(projects.map(p => p.status))];
    
    // Для каждого чекбокса проверяем, есть ли хоть один проект с такой комбинацией
    document.querySelectorAll('#filters-container input[type="checkbox"]').forEach(checkbox => {
        const filterName = checkbox.name;
        const value = checkbox.value;
        let isPossible = false;
        
        // Создаем тестовый набор фильтров
        const testFilters = JSON.parse(JSON.stringify(activeFilters));
        
        // Если этот чекбокс уже выбран, он всегда доступен
        if (checkbox.checked) {
            isPossible = true;
        } else {
            // Добавляем это значение к текущим фильтрам
            testFilters[filterName] = [...testFilters[filterName], value];
            
            // Проверяем, есть ли хоть один проект, удовлетворяющий этим фильтрам
            isPossible = projects.some(project => {
                if (testFilters.type.length > 0 && !testFilters.type.includes(project.type)) return false;
                if (testFilters.year.length > 0 && !testFilters.year.includes(project.year)) return false;
                if (testFilters.status.length > 0 && !testFilters.status.includes(project.status)) return false;
                return true;
            });
        }
        
        checkbox.disabled = !isPossible;
        // Меняем стиль label
        const label = checkbox.parentElement;
        if (isPossible) {
            label.style.opacity = "1";
            label.style.cursor = "pointer";
        } else {
            label.style.opacity = "0.5";
            label.style.cursor = "not-allowed";
        }
    });
}

// ============ СБРОС ФИЛЬТРОВ ============
function resetFilters() {
    document.querySelectorAll('#filters-container input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
    
    activeFilters = {
        type: [],
        year: [],
        status: []
    };
    
    renderProjects(projects);
    
    // Сбрасываем стили labels
    document.querySelectorAll('#filters-container label').forEach(label => {
        label.style.opacity = "1";
        label.style.cursor = "pointer";
    });
}

// ============ ПЕЧАТНАЯ ВЕРСИЯ ============
function togglePrintMode() {
    const printBtn = document.getElementById('print-mode-toggle');
    const isPrintMode = document.body.classList.toggle('print-mode');
    
    if (isPrintMode) {
        // Включаем печатные стили
        const printStyle = document.createElement('style');
        printStyle.id = 'print-style';
        printStyle.textContent = `
            @media screen {
                .print-mode .header,
                .print-mode .print-toggle,
                .print-mode .filters-container,
                .print-mode .services-button,
                .print-mode .footer,
                .print-mode .skewed-img,
                .print-mode .calendar-img,
                .print-mode .team-line-top,
                .print-mode .team-line-bottom {
                    display: none !important;
                }
                
                .print-mode body {
                    background: white !important;
                    color: black !important;
                }
                
                .print-mode .project-card {
                    break-inside: avoid;
                    box-shadow: none !important;
                    border: 1px solid #ddd !important;
                }
            }
        `;
        document.head.appendChild(printStyle);
        printBtn.textContent = 'Normal Mode';
        
         window.print();
    } else {
        // Отключаем печатные стили
        const printStyle = document.getElementById('print-style');
        if (printStyle) printStyle.remove();
        printBtn.textContent = 'Print Mode';
    }
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
document.addEventListener('DOMContentLoaded', function() {
    renderProjects(projects);
    
    document.querySelectorAll('#filters-container input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    const printBtn = document.getElementById('print-mode-toggle');
    if (printBtn) {
        printBtn.addEventListener('click', togglePrintMode);
    }
    
    updateFilterAvailability();
});