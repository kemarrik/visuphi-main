const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(window.innerWidth < 768 ? 15 : 25, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x0057B7, wireframe: true, transparent: true, opacity: 0.6 });
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

camera.position.z = window.innerWidth < 768 ? 40 : 60;

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.05;
    const scale = 1 + 0.4 * Math.sin(time * 0.5);
    icosahedron.scale.set(scale, scale, scale);
    icosahedron.rotation.x += 0.008;
    icosahedron.rotation.y += 0.01;
    material.opacity = 0.4 + 0.3 * Math.sin(time * 0.4);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    icosahedron.rotation.x = mouseY * 0.5;
    icosahedron.rotation.y = mouseX * 0.5;
});

const subjectsData = {
    "math_analysis": [
        { name: "Тейлор и Маклорен", url: "math_analysis/taylor-maclaurin" },
        { name: "Лагранж, Коши и Ролль", url: "math_analysis/lagrange-cauchy-rolle" },
        { name: "Модуль колебаний", url: "math_analysis/module" }
    ],
    "analytical_geometry": [
        { name: "Поверхности второго порядка", url: "analytical_geometry/surfaces" }
    ]
};

const subjects = document.querySelectorAll('.subject-card');
const topicsModal = document.getElementById('topicsModal');
const topicsContent = document.getElementById('topicsContent');

subjects.forEach(subject => {
    subject.addEventListener('click', () => {
        const subjectKey = subject.getAttribute('data-subject');
        const topics = subjectsData[subjectKey];
        
        topicsContent.innerHTML = '';
        topics.forEach((topic, index) => {
            const topicDiv = document.createElement('div');
            topicDiv.classList.add('topic');
            topicDiv.textContent = topic.name;
            topicDiv.style.animationDelay = `${index * 0.1}s`;
            topicDiv.addEventListener('click', () => {
                // Переход по ссылке в текущем окне
                window.location.href = topic.url;
            });
            topicsContent.appendChild(topicDiv);
        });
        
        topicsModal.style.display = 'flex';
    });
});

document.addEventListener('click', (e) => {
    if (!topicsContent.contains(e.target) && !Array.from(subjects).includes(e.target)) {
        topicsModal.style.display = 'none';
    }
});