import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * InteractivePlanet
 * Drag to rotate.
 *
 * npm install three
 *
 * Usage:
 *   <div style={{ width: "100%", height: "500px" }}>
 *     <InteractivePlanet />
 *   </div>
 *
 * The component sizes itself to its parent container, so wrap it
 * in an element with an explicit height.
 */
export default function InteractivePlanet() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // ---------- Renderer / Scene / Camera ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = "grab";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 6.5);

    // ---------- Procedural cratered surface texture ----------
    function buildSurfaceTextures(size) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not create 2D canvas context");
      }

      // Brand color: #C9960C
      ctx.fillStyle = "#C9960C";
      ctx.fillRect(0, 0, size, size);

      // Subtle surface grain
      for (let i = 0; i < 22000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * 1.4 + 0.2;

        const variation = Math.random();

        // Stay within the #C9960C family
        let alpha;
        let color;

        if (variation > 0.5) {
          color = "255, 220, 120";
          alpha = Math.random() * 0.18;
        } else {
          color = "80, 55, 0";
          alpha = Math.random() * 0.12;
        }

        ctx.fillStyle = `rgba(${color}, ${alpha})`;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle craters
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * size * 0.05 + size * 0.01;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);

        g.addColorStop(0, "rgba(80, 55, 0, 0.16)");
        g.addColorStop(0.6, "rgba(100, 70, 0, 0.08)");
        g.addColorStop(1, "rgba(201, 150, 12, 0)");

        ctx.fillStyle = g;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 220, 120, 0.08)";
        ctx.lineWidth = r * 0.06;

        ctx.beginPath();
        ctx.arc(x, y, r * 0.92, 0, Math.PI * 2);
        ctx.stroke();
      }

      const colorMap = new THREE.CanvasTexture(canvas);
      colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;

      // Bump texture
      const bumpCanvas = document.createElement("canvas");
      bumpCanvas.width = bumpCanvas.height = size;

      const bctx = bumpCanvas.getContext("2d");

      if (!bctx) {
        throw new Error("Could not create bump canvas context");
      }

      bctx.drawImage(canvas, 0, 0);

      const bumpMap = new THREE.CanvasTexture(bumpCanvas);

      return {
        colorMap,
        bumpMap,
      };
    }

    const { colorMap, bumpMap } = buildSurfaceTextures(1024);

    // ---------- Planet ----------
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    const planetGeo = new THREE.SphereGeometry(1.5, 128, 128);
    const planetMat = new THREE.MeshStandardMaterial({
      map: colorMap,
      bumpMap: bumpMap,
      bumpScale: 0.075,
      roughness: 0.9,
      metalness: 0,
      color: 0x111fff,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planet);

    // Fresnel-style rim glow
    const rimMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xc9960c) },
        lightDir: { value: new THREE.Vector3(1.4, 0.6, 0.9).normalize() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform vec3 lightDir;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
          float lightFacing = max(dot(vNormal, normalize(lightDir)), 0.0);
          float intensity = pow(rim, 2.4) * pow(lightFacing, 0.6);
          gl_FragColor = vec4(glowColor, intensity * 1.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rimMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.53, 128, 128),
      rimMat,
    );
    planetGroup.add(rimMesh);

    const sun = new THREE.DirectionalLight(0xffdca8, 1.6);
    sun.position.set(4, 2, 3);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x101018, 1));

    // ---------- Orbit ring + traveling glow point ----------
    const ringGroup = new THREE.Group();
    ringGroup.rotation.set(0.35, 0, 0.55);
    scene.add(ringGroup);

    const ringRadius = 2.55;
    const ringGeo = new THREE.RingGeometry(
      ringRadius - 0.004,
      ringRadius + 0.004,
      256,
    );
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc9960c,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringGroup.add(ringMesh);

    function glowSprite(color, size) {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      g.addColorStop(0, `rgba(${color},1)`);
      g.addColorStop(0.25, `rgba(${color},0.9)`);
      g.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }

    const dotTexture = glowSprite("201,150,12", 256);
    const dotMat = new THREE.SpriteMaterial({
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dot = new THREE.Sprite(dotMat);
    dot.scale.set(0.32, 0.32, 1);
    ringGroup.add(dot);

    const coreDotGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const coreDotMat = new THREE.MeshBasicMaterial({ color: 0xe0b23a });
    const coreDot = new THREE.Mesh(coreDotGeo, coreDotMat);
    ringGroup.add(coreDot);

    // ---------- Interaction ----------
    let dragging = false;
    let lastX = 0,
      lastY = 0;
    let rotY = 0.5,
      rotX = 0.15;

    const onPointerDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.005;
      rotX += dy * 0.004;
      rotX = Math.max(-1.1, Math.min(1.1, rotX));
    };
    const el = renderer.domElement;
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // ---------- Resize (tracks the container, not the window) ----------
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // ---------- Animate ----------
    let orbitAngle = 0;
    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);

      planetGroup.rotation.y += 0.0015;
      scene.rotation.y += (rotY - scene.rotation.y) * 0.08;
      scene.rotation.x += (rotX - scene.rotation.x) * 0.08;

      orbitAngle += 0.006;
      dot.position.set(
        Math.cos(orbitAngle) * ringRadius,
        0,
        Math.sin(orbitAngle) * ringRadius,
      );
      coreDot.position.copy(dot.position);

      renderer.render(scene, camera);
    }
    animate();

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);

      planetGeo.dispose();
      planetMat.dispose();
      rimMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      coreDotGeo.dispose();
      coreDotMat.dispose();
      colorMap.dispose();
      bumpMap.dispose();
      dotTexture.dispose();
      renderer.dispose();

      if (container.contains(el)) {
        container.removeChild(el);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
