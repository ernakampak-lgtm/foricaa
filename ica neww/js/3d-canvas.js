/* ==========================================================================
   THREE.JS 3D CANVAS & INTERACTIVE WEBGL MESH ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Three.js 3D Background Particles Mesh Animation
    (function init3DBackground() {
        const container = document.getElementById('canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create 3D Nodes Particle Network
        const particleCount = 180;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 800;
            positions[i + 1] = (Math.random() - 0.5) * 800;
            positions[i + 2] = (Math.random() - 0.5) * 800;

            velocities.push({
                x: (Math.random() - 0.5) * 0.4,
                y: (Math.random() - 0.5) * 0.4,
                z: (Math.random() - 0.5) * 0.4
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x3b82f6,
            size: 3.5,
            transparent: true,
            opacity: 0.8
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        // Connect lines between close particles (Cyber Network Effect)
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0x1d4ed8,
            transparent: true,
            opacity: 0.25
        });

        const linesGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(particleCount * particleCount * 6);
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(lineMesh);

        function animate() {
            requestAnimationFrame(animate);

            const pos = particleSystem.geometry.attributes.position.array;
            let lineIndex = 0;
            const linePos = lineMesh.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                pos[i * 3] += velocities[i].x;
                pos[i * 3 + 1] += velocities[i].y;
                pos[i * 3 + 2] += velocities[i].z;

                if (pos[i * 3] < -400 || pos[i * 3] > 400) velocities[i].x *= -1;
                if (pos[i * 3 + 1] < -400 || pos[i * 3 + 1] > 400) velocities[i].y *= -1;
                if (pos[i * 3 + 2] < -400 || pos[i * 3 + 2] > 400) velocities[i].z *= -1;

                for (let j = i + 1; j < particleCount; j++) {
                    const dx = pos[i * 3] - pos[j * 3];
                    const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                    const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < 110) {
                        linePos[lineIndex++] = pos[i * 3];
                        linePos[lineIndex++] = pos[i * 3 + 1];
                        linePos[lineIndex++] = pos[i * 3 + 2];
                        linePos[lineIndex++] = pos[j * 3];
                        linePos[lineIndex++] = pos[j * 3 + 1];
                        linePos[lineIndex++] = pos[j * 3 + 2];
                    }
                }
            }

            linesGeometry.setDrawRange(0, lineIndex / 3);
            linesGeometry.attributes.position.needsUpdate = true;
            particleSystem.geometry.attributes.position.needsUpdate = true;

            particleSystem.rotation.y += 0.0005;
            lineMesh.rotation.y += 0.0005;

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    })();

    // 2. Interactive 3D Object inside Terminal Box
    (function initHero3DObject() {
        const container = document.getElementById('hero-3d-object');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 6.2;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting setup for realistic 3D shading
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const blueLight = new THREE.PointLight(0x3b82f6, 1.5, 50);
        blueLight.position.set(-5, -5, -5);
        scene.add(blueLight);

        // Group container for all 3D components
        const coreGroup = new THREE.Group();
        scene.add(coreGroup);

        // Inner Core Globe (Smooth Icosahedron)
        const innerGeo = new THREE.IcosahedronGeometry(1.3, 2);
        const innerMat = new THREE.MeshPhongMaterial({
            color: 0x0284c7,
            emissive: 0x0369a1,
            wireframe: true,
            transparent: true,
            opacity: 0.75,
            shininess: 100
        });
        const innerCore = new THREE.Mesh(innerGeo, innerMat);
        coreGroup.add(innerCore);

        // Glowing Inner Particle Node Center
        const centerGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const centerMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: false,
            transparent: true,
            opacity: 0.9
        });
        const centerNode = new THREE.Mesh(centerGeo, centerMat);
        coreGroup.add(centerNode);

        // Dual Glowing Orbit Rings
        const ring1Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
        const ring1Mat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.85
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 3;
        coreGroup.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(2.4, 0.018, 16, 100);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.6
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 4;
        ring2.rotation.x = -Math.PI / 6;
        coreGroup.add(ring2);

        // Satellite Dot Nodes on Orbit Ring
        const dotGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);
        dotMesh.position.set(2.1, 0, 0);
        ring1.add(dotMesh);

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };

            coreGroup.rotation.y += deltaMove.x * 0.008;
            coreGroup.rotation.x += deltaMove.y * 0.008;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        // Smooth Auto Rotation & Animation Loop
        function render() {
            requestAnimationFrame(render);
            if (!isDragging) {
                coreGroup.rotation.y += 0.005;
                coreGroup.rotation.x += 0.002;
                ring1.rotation.z += 0.008;
                ring2.rotation.z -= 0.006;
                centerNode.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.08);
            }
            renderer.render(scene, camera);
        }
        render();

        window.addEventListener('resize', () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    })();

    // 3. Interactive 3D Flying Object Mesh Following Scroll Curve
    (function initScroll3DMotion() {
        const container = document.getElementById('motion-canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Group containing modern glowing 3D cyber satellite/gem shape
        const group = new THREE.Group();

        const coreGeo = new THREE.OctahedronGeometry(2.2, 2);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            wireframe: true,
            emissive: 0x1d4ed8,
            emissiveIntensity: 0.6
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        group.add(coreMesh);

        const ring1Geo = new THREE.TorusGeometry(3.6, 0.05, 16, 100);
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 3;
        group.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(4.4, 0.03, 16, 100);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 4;
        group.add(ring2);

        scene.add(group);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x38bdf8, 3, 50);
        pointLight.position.set(5, 5, 10);
        scene.add(pointLight);

        // Smooth Scroll Track with Continuous Animation
        let scrollY = 0;

        function animateMotion() {
            requestAnimationFrame(animateMotion);

            const targetScrollY = window.scrollY;
            scrollY += (targetScrollY - scrollY) * 0.1;
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = scrollY / maxScroll;

            // Move 3D Object along a smooth S-curve dynamic path across sections
            const pathX = Math.sin(progress * Math.PI * 2.5) * 16;
            const pathY = 12 - progress * 20; // Constrain Y movement so object stays neatly above footer
            const pathZ = Math.cos(progress * Math.PI * 2) * 6;

            group.position.x = pathX;
            group.position.y = pathY;
            group.position.z = pathZ;

            // Always keep rotating for visual continuity
            group.rotation.x += 0.008;
            group.rotation.y += 0.012;
            ring1.rotation.z += 0.015;
            ring2.rotation.z -= 0.012;

            renderer.render(scene, camera);
        }
        animateMotion();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    })();
});
