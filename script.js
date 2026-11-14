const canvas = document.getElementById('star-cursor');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const particles = [];

window.addEventListener('mousemove', (e) => {
    particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: 1
    });
});

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#a29bfe";
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.025;
        p.size *= 0.95;

        if (p.opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

animate();

// Donanım ve araç verileri (Yerel klasördeki güncel görsel isimleriyle)
const hardwareData = {
    prototypes: {
        title: "Lost Lunar Rover Prototypes",
        badge: "1965 - Earth",
        image: "ondan.jpe", // Boşluksuz ve parantezsiz yeni dosya adımız!
        description: "Tested on Earth's analog sites, these early 'wheeled' designs helped develop the Apollo LRV."
    },
    ranger4: {
        title: "Ranger 4 Probe",
        badge: "1962 - Moon",
        image: "rover.jpe",
        description: "The first US spacecraft to impact another celestial body, Ranger 4's systems failed before impact, but it set the stage for future missions."
    },
    snoopy: {
        title: "Apollo 10 Lunar Module 'Snoopy'",
        badge: "1969 - Solar Orbit",
        image: "snoopy.jpe",
        description: "The only crewed spacecraft component left in heliocentric orbit after a successful test run."
    },
    prospector: {
        title: "Lunar Prospector",
        badge: "1999 - Moon",
        image: "prospector.jpe",
        description: "A historic mission that confirmed water ice evidence before intentionally crashing to study the surface."
    },
    mapp: {
        title: "MAPP & Athena Rovers",
        badge: "2025 - Moon",
        image: "mapp.jpe",
        description: "Autonomous commercial missions designed for mapping and water ice prospecting on the Lunar South Pole."
    },
    trailblazer: {
        title: "Lunar Trailblazer Orbiter",
        badge: "2025 - Lunar Orbit",
        image: "trailblazer.jpe",
        description: "A high-tech satellite mapping specific water signatures and distribution patterns on the Moon."
    }
};

function openModal(id) {
    const item = hardwareData[id];
    if (!item) return;

    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-badge').innerText = item.badge;
    document.getElementById('modal-description').innerText = item.description;
    document.getElementById('modal-img').src = item.image;

    document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('detail-modal');
    if (event.target === modal) {
        closeModal();
    }
};