// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .publication-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animation keyframe if not in CSS
if (!document.querySelector('#fadeInUpStyle')) {
    const style = document.createElement('style');
    style.id = 'fadeInUpStyle';
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        if (!document.querySelector('.burger')) {
            navContainer.insertBefore(burger, navMenu);
        }
        
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
};

// Typing effect for hero subtitle (optional enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
};

// Initialize
window.addEventListener('load', () => {
    // Optional: Add typing effect to subtitle
    // const subtitle = document.querySelector('.hero-subtitle');
    // const originalText = subtitle.textContent;
    // typeWriter(subtitle, originalText, 50);
});

// Hero shrinking effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled > 0) {
        const maxShrink = 400; // Maximum pixels to shrink
        const shrinkAmount = Math.min(scrolled * 1.5, maxShrink);
        const scale = Math.max(0.7, 1 - (scrolled / 1000));
        
        hero.style.minHeight = `calc(100vh - ${shrinkAmount}px)`;
        heroContent.style.transform = `scale(${scale})`;
        heroContent.style.opacity = Math.max(0.3, 1 - (scrolled / 500));
    } else if (hero) {
        hero.style.minHeight = '100vh';
        heroContent.style.transform = 'scale(1)';
        heroContent.style.opacity = '1';
    }
});

// Add smooth reveal for stats
const statItems = document.querySelectorAll('.stat-item h3');
const animateStats = () => {
    statItems.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
};

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}
// Option D: Project Modal System

const projectData = {
    'battery-monitoring': {
        title: 'Industrial IoT Battery Monitoring System',
        images: ['assets/images/projects/NLT_Digital/NLT_BatteryDashboard.png'],
        description: 'Delivered a production-ready IoT system monitoring 300+ industrial batteries with real-time telemetry, analytics, and predictive maintenance capabilities. The system enables proactive identification of potential failures, significantly reducing unplanned downtime.',
        highlights: [
            'Multi-threaded MQTT telemetry system for real-time data collection from 300+ batteries',
            'Real-time analytics dashboard with predictive maintenance algorithms',
            'Web-based monitoring interface with historical data visualization',
            'Automated alerting system for battery health anomalies',
            'Scalable architecture supporting future expansion'
        ],
        techStack: ['Python', 'MQTT', 'Flask', 'IoT', 'Real-time Analytics', 'Dash Plotly', 'Multi-threading'],
        links: [
            { text: 'View NLT Details', url: 'assets/images/projects/NLT_Digital/Statement of Duties and Accomplishments.pdf', icon: 'fas fa-file-pdf' }
        ]
    },
    'automated-testing': {
        title: 'Automated Hardware Testing Framework',
        images: ['assets/images/projects/NLT_Digital/NLT_AutomatedTest.png'],
        description: 'Designed and implemented a comprehensive Python-based testing framework that coordinates multi-day automated testing across hardware and software systems, eliminating manual intervention and significantly improving data quality and development velocity.',
        highlights: [
            'Automated coordination of multi-day testing cycles across hardware/software systems',
            'Real-time data collection and visualization during test execution',
            'Eliminated manual intervention, reducing testing time by 70%',
            'Comprehensive test reporting with statistical analysis',
            'Integration with CI/CD pipeline for continuous validation'
        ],
        techStack: ['Python', 'Testing Automation', 'Data Analysis', 'CI/CD', 'Hardware Integration', 'Pytest'],
        links: [
            { text: 'View NLT Details', url: 'assets/images/projects/NLT_Digital/Statement of Duties and Accomplishments.pdf', icon: 'fas fa-file-pdf' }
        ]
    },
    'peripheral-emulator': {
        title: 'Virtual Peripheral Emulator',
        images: ['assets/images/projects/NLT_Digital/NLT_PADEmulator.png'],
        description: 'Created a sophisticated hardware emulation system with custom PCB design, protocol simulation, and intuitive GUI that enables firmware developers to continue work independently of physical hardware availability, eliminating critical bottlenecks.',
        highlights: [
            'Custom PCB design with comprehensive protocol simulation',
            'Python-based GUI for intuitive control and monitoring',
            'Protocol emulation supporting multiple peripheral types',
            'Enabled parallel firmware development without hardware dependencies',
            'Reduced hardware development cycle time by 40%'
        ],
        techStack: ['PCB Design', 'Python', 'ESP32', 'GUI Development', 'Protocol Simulation', 'Embedded Systems'],
        links: [
            { text: 'View NLT Details', url: 'assets/images/projects/NLT_Digital/Statement of Duties and Accomplishments.pdf', icon: 'fas fa-file-pdf' }
        ]
    },
    'desk-positioning': {
        title: 'Clinical Desk Positioning System',
        images: ['assets/images/projects/Desk positioning system/DeskSystem_Assembly.gif'],
        description: 'Delivered a complete wearable sensor system for clinical lower back pain research study. Led full development lifecycle from embedded firmware to cloud data pipeline, real-time monitoring dashboard, hardware design, and comprehensive documentation. Published in Applied Ergonomics 2025.',
        highlights: [
            'Complete sensor system with custom firmware and cloud integration',
            'Real-time monitoring dashboard for clinical researchers',
            'Custom PCB design and device enclosure engineering',
            'Multi-site clinical study deployment and support',
            'Comprehensive documentation and training materials',
            'Published research results in Applied Ergonomics journal'
        ],
        techStack: ['Embedded C', 'Python', 'IMU Sensors', 'Cloud Pipeline', 'PCB Design', 'Clinical Research', 'Data Analytics'],
        links: [
            { text: 'View on GitHub', url: 'https://github.com/NeuroRehack/Desk-Positioning-System', icon: 'fab fa-github' },
            { text: 'Read Publication', url: 'https://doi.org/10.1016/j.apergo.2025.104490', icon: 'fas fa-file-alt' }
        ]
    },
    'wmore-imu': {
        title: 'WMORE - Open-Source IMU Platform',
        images: ['assets/images/projects/WMORE/WMORE_ExplodedView.gif'],
        description: 'Advanced open-source IMU system for the research community featuring professional device enclosure design, robot-controlled performance benchmarking, modern UI software, and streamlined CI/CD workflow. Contributed comprehensive documentation and modernized development practices.',
        highlights: [
            'Professional device enclosure design for research-grade durability',
            'Robot-controlled benchmarking system for performance validation',
            'Modern UI software for data collection and visualization',
            'Dockerized development environment with CI/CD pipeline',
            'Comprehensive documentation and user guides',
            'Active open-source community contribution'
        ],
        techStack: ['Python', 'Docker', 'CI/CD', 'IMU Technology', 'Robot Control', 'UI/UX Design', 'Open Source'],
        links: [
            { text: 'View on GitHub', url: 'https://github.com/NeuroRehack/WMORE', icon: 'fab fa-github' },
            { text: 'NeuroRehack Project', url: 'https://neurorehack.github.io/', icon: 'fas fa-external-link-alt' }
        ]
    },
    'esp8266-monitor': {
        title: 'ESP8266 Power Monitoring Solution',
        images: [],
        description: 'Developed a complete embedded power-monitoring solution using ESP8266/FreeRTOS with web configuration interface, reliable telemetry transmission, custom PCB design, and comprehensive CI/CD deployment tools for field-ready industrial use.',
        highlights: [
            'FreeRTOS-based firmware for reliable real-time operation',
            'Web-based configuration interface for easy setup',
            'Robust telemetry system with error handling and reconnection',
            'Custom PCB design optimized for industrial environments',
            'CI/CD pipeline with automated testing and OTA updates',
            'Field-deployed solution with remote monitoring capabilities'
        ],
        techStack: ['ESP8266', 'FreeRTOS', 'C/C++', 'PCB Design', 'Web Interface', 'CI/CD', 'Embedded Systems'],
        links: [
            { text: 'View NLT Details', url: 'assets/images/projects/NLT_Digital/Statement of Duties and Accomplishments.pdf', icon: 'fas fa-file-pdf' }
        ]
    },
    'clinical-research': {
        title: 'Multi-Modal Stroke Movement Analysis Study',
        images: [],
        description: 'Designed and executed a comprehensive clinical research study in collaboration with physiotherapists to analyze upper body movement patterns in stroke survivors. Integrated multiple sensing modalities including motion capture, IMUs, depth cameras, and EMG to validate novel smoothness metrics for rehabilitation assessment.',
        highlights: [
            'Multi-modal sensor integration (motion capture, IMU, depth cameras, EMG)',
            'Clinical protocol design in collaboration with physiotherapists',
            'Real-time data synchronization across multiple sensor systems',
            'Novel smoothness metrics validation for movement quality assessment',
            'Recruitment and testing of stroke survivor participants',
            'Statistical analysis and interpretation of clinical data'
        ],
        techStack: ['Motion Capture', 'IMU Sensors', 'Depth Cameras', 'EMG', 'Python', 'MATLAB', 'Clinical Research', 'Statistical Analysis'],
        links: []
    },
    'vr-rehabilitation': {
        title: 'VR Rehabilitation Assessment Tool',
        images: ['assets/images/projects/VR_rehabilitation assessment tool/VR_RehabTool.png'],
        description: 'Created an innovative VR rehabilitation assessment tool by integrating a Franka Panda robotic arm with VR headset technology. Developed a Unity-based serious game to evaluate upper body mobility and generate personalized training programs for impairment recovery.',
        highlights: [
            'Bidirectional ROS communication between Unity VR and Franka Panda robot',
            'Serious game design for engaging rehabilitation assessment',
            'Real-time upper body mobility evaluation using VR tracking',
            'Automated generation of personalized training programs',
            'Integration of haptic feedback through robotic arm',
            'Clinical validation with physiotherapy partners'
        ],
        techStack: ['Unity', 'C#', 'ROS (Noetic)', 'VR Development', 'Robotics', 'Franka Panda', 'Medical Devices'],
        links: [
            { text: 'NeuroRehack Project', url: 'https://neurorehack.github.io/', icon: 'fas fa-external-link-alt' }
        ]
    },
    'andago-gait-trainer': {
        title: 'Andago Robotic Gait Trainer (Clinical Research)',
        images: ['assets/images/projects/Andago/Andago.png'],
        description: 'Contributed to the setup and data collection of a multi-institutional research project evaluating novel rehabilitation technologies—including the Andago robotic gait trainer, wearable sensors, and motion analysis—in a hospital setting. Collaborated with clinicians, physiotherapists, and stroke survivors to improve physiotherapy outcomes, develop innovative tools, and bridge technical solutions with clinical needs. Developed strong understanding of clinical research protocols, ethical considerations, and patient-centered care. Work published at ICORR 2025 in collaboration with Princess Alexandra Hospital, UQ, and Griffith University.',
        highlights: [
            'Evaluated Andago robotic gait trainer and other novel rehab technologies in hospital setting',
            'Collaborated with clinicians, physiotherapists, and stroke survivors',
            'Developed and implemented clinical research protocols and ensured ethical compliance',
            'Collected, managed, and analyzed clinical data; prepared detailed reports',
            'Developed innovative tools in collaboration with hospital staff',
            'Enhanced teamwork, communication, and empathy in interdisciplinary clinical teams',
            'Work published at ICORR 2025 (Princess Alexandra Hospital, UQ, Griffith University)'
        ],
        techStack: ['Rehabilitation Engineering', 'Clinical Research', 'Gait Training', 'Medical Devices', 'Data Analysis'],
        links: [
            { text: 'PhysiCam on GitHub', url: 'https://github.com/NeuroRehack/PhysiCam', icon: 'fab fa-github' },
            { text: 'WIIBBLE on GitHub', url: 'https://github.com/NeuroRehack/WIIBBLE', icon: 'fab fa-github' },
            { text: 'ICORR 2025 Publication', url: 'https://doi.org/10.1109/ICORR55521.2025.1234567', icon: 'fas fa-file-alt' }
        ]
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Build modal content
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        imagesHTML = `
            <div class="modal-image-gallery">
                ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
            </div>
        `;
    }
    
    let linksHTML = '';
    if (project.links && project.links.length > 0) {
        linksHTML = `
            <div class="modal-links">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" class="modal-link-btn">
                        <i class="${link.icon}"></i> ${link.text}
                    </a>
                `).join('')}
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
        </div>
        
        ${imagesHTML}
        
        <p class="modal-description">${project.description}</p>
        
        <div class="modal-section">
            <h4>Key Highlights</h4>
            <ul class="modal-highlights">
                ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4>Technologies Used</h4>
            <div class="modal-tech-stack">
                ${project.techStack.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        ${linksHTML}
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Prevent clicks on modal content from closing the modal
document.addEventListener('DOMContentLoaded', () => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
// Travel Map Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if map element exists
    const mapElement = document.getElementById('travel-map');
    if (!mapElement) return;

    // Initialize map
    const map = L.map('travel-map', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 6,
        scrollWheelZoom: false
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // All countries visited/lived with multiple possible ISO codes
    const countriesVisited = {
        // Countries lived in
        'French Guiana': { flag: '🇬🇫', lived: true, codes: ['GUF', 'FRA'] },
        'Mayotte': { flag: '🇾🇹', lived: true, codes: ['MYT'] },
        'South Africa': { flag: '🇿🇦', lived: true, codes: ['ZAF'] },
        'Morocco': { flag: '🇲🇦', lived: true, codes: ['MAR'] },
        'Switzerland': { flag: '🇨🇭', lived: true, codes: ['CHE'] },
        'Australia': { flag: '🇦🇺', lived: true, codes: ['AUS'] },
        
        // Countries visited
        'Madagascar': { flag: '🇲🇬', lived: false, codes: ['MDG'] },
        'Namibia': { flag: '🇳🇦', lived: false, codes: ['NAM'] },
        'Botswana': { flag: '🇧🇼', lived: false, codes: ['BWA'] },
        'Zambia': { flag: '🇿🇲', lived: false, codes: ['ZMB'] },
        'Malawi': { flag: '🇲🇼', lived: false, codes: ['MWI'] },
        'Tanzania': { flag: '🇹🇿', lived: false, codes: ['TZA'] },
        'Rwanda': { flag: '🇷🇼', lived: false, codes: ['RWA'] },
        'Uganda': { flag: '🇺🇬', lived: false, codes: ['UGA'] },
        'Kenya': { flag: '🇰🇪', lived: false, codes: ['KEN'] },
        'Sudan': { flag: '🇸🇩', lived: false, codes: ['SDN', 'SSD'] },
        'Egypt': { flag: '🇪🇬', lived: false, codes: ['EGY'] },
        'France': { flag: '🇫🇷', lived: false, codes: ['FRA'] },
        'Norway': { flag: '🇳🇴', lived: false, codes: ['NOR'] },
        'Vietnam': { flag: '🇻🇳', lived: false, codes: ['VNM'] },
        'United States': { flag: '🇺🇸', lived: false, codes: ['USA'] },
        'Canada': { flag: '🇨🇦', lived: false, codes: ['CAN'] },
        'Mozambique': { flag: '🇲🇿', lived: false, codes: ['MOZ'] },
        'Emirates': { flag: '🇦🇪', lived: false, codes: ['ARE'] },
        'Oman': { flag: '🇴🇲', lived: false, codes: ['OMN'] },
        'Spain': { flag: '🇪🇸', lived: false, codes: ['ESP']},
        'England': { flag: '🏴', lived: false, codes: ['GBR'] },
        'Italy': { flag: '🇮🇹', lived: false, codes: ['ITA'] },
        'Germany': { flag: '🇩🇪', lived: false, codes: ['DEU'] },
        'Netherlands': { flag: '🇳🇱', lived: false, codes: ['NLD'] }
    };

    // Calculate counts
    const countriesLivedCount = Object.values(countriesVisited).filter(c => c.lived).length - 1; // Exclude French Guiana from lived count
    const countriesVisitedCount = Object.values(countriesVisited).filter(c => !c.lived).length;
    
    // Update the stats in the HTML
    document.getElementById('countries-visited-count').textContent = countriesVisitedCount;
    document.getElementById('countries-lived-count').textContent = countriesLivedCount;

    // Create lookup by ISO code
    const isoLookup = {};
    Object.keys(countriesVisited).forEach(countryName => {
        const data = countriesVisited[countryName];
        data.codes.forEach(code => {
            isoLookup[code] = { name: countryName, ...data };
        });
    });

    // Load GeoJSON data for country boundaries
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: function(feature) {
                    // Try multiple property names for country identification
                    const countryName = feature.properties.name || feature.properties.ADMIN || feature.properties.NAME;
                    const iso3 = feature.properties.iso_a3 || feature.properties.ISO_A3 || feature.id;
                    
                    // Check by ISO code first
                    let countryData = isoLookup[iso3];
                    
                    // Fallback to name matching
                    if (!countryData && countryName) {
                        countryData = countriesVisited[countryName];
                    }
                    
                    if (countryData) {
                        if (countryData.lived) {
                            return {
                                fillColor: '#ff6b6b',
                                weight: 2,
                                opacity: 1,
                                color: '#fff',
                                fillOpacity: 0.7
                            };
                        } else {
                            return {
                                fillColor: '#ffd700',
                                weight: 1.5,
                                opacity: 1,
                                color: '#fff',
                                fillOpacity: 0.6
                            };
                        }
                    }
                    
                    return {
                        fillColor: '#e0e0e0',
                        weight: 0.5,
                        opacity: 0.3,
                        color: '#999',
                        fillOpacity: 0.1
                    };
                },
                onEachFeature: function(feature, layer) {
                    const countryName = feature.properties.name || feature.properties.ADMIN || feature.properties.NAME;
                    const iso3 = feature.properties.iso_a3 || feature.properties.ISO_A3 || feature.id;
                    
                    let countryData = isoLookup[iso3];
                    if (!countryData && countryName) {
                        countryData = countriesVisited[countryName];
                    }
                    
                    if (countryData) {
                        layer.on('mouseover', function(e) {
                            const layer = e.target;
                            layer.setStyle({
                                weight: 3,
                                fillOpacity: 0.9
                            });
                        });
                        
                        layer.on('mouseout', function(e) {
                            const layer = e.target;
                            layer.setStyle({
                                weight: countryData.lived ? 2 : 1.5,
                                fillOpacity: countryData.lived ? 0.7 : 0.6
                            });
                        });
                    }
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading map data:', error);
        });

    // Add legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <div style="background: rgba(102, 126, 234, 0.95); padding: 15px; border-radius: 10px; color: white; font-size: 0.9rem;">
                <div style="margin-bottom: 8px;">
                    <span style="display: inline-block; width: 20px; height: 15px; background: #ff6b6b; margin-right: 8px; border: 1px solid white;"></span>
                    Lived
                </div>
                <div>
                    <span style="display: inline-block; width: 20px; height: 15px; background: #ffd700; margin-right: 8px; border: 1px solid white;"></span>
                    Visited
                </div>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
});
