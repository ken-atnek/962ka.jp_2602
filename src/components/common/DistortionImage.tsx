/* =======================================
 * クロジカ WebGL ディストーションイメージ
 * URL: /src/components/common/DistortionImage.tsx
 * Referenced in: /src/components/greetings/GreetingGalleryBlock.tsx
 * Created: 2026-06-19
 * Last updated: 2026-06-19
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './DistortionImage.module.scss';

interface Props {
  src: string;
  alt: string;
  cameraFar?: number;
  cameraNear?: number;
  firstDistortion?: number;
  className?: string;
}

const VERTEX_SHADER = `
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float distortionLevel;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  float n = (sin(uv.x * 5.0 + time) + cos(uv.y * 1.5 + time)) * distortionLevel;
  float x = position.x;
  float y = position.y;
  float z = position.z + n;
  vec3 result = vec3(x, y, z);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(result, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D map;
varying vec2 vUv;
uniform float masterOpacity;

void main() {
  vec4 color = texture2D(map, vUv);
  gl_FragColor = vec4(color.rgb, color.a * masterOpacity);
}
`;

export default function DistortionImage({
  src,
  alt,
  cameraFar = 2,
  cameraNear = 0.94,
  firstDistortion = 200,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const stageWidth = rect.width * 1.1;
    const stageHeight = rect.height * 1.1;

    const fovRad = (45 * Math.PI) / 180;
    const exactFitZ = stageHeight / (2 * Math.tan(fovRad / 2));
    const farZ = exactFitZ * cameraFar;
    const nearZ = exactFitZ * cameraNear;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(stageWidth, stageHeight);
    el.appendChild(renderer.domElement);

    // camera
    const camera = new THREE.PerspectiveCamera(
      45,
      stageWidth / stageHeight,
      0.1,
      farZ
    );
    camera.position.set(0, 0, farZ);

    // scene
    const scene = new THREE.Scene();

    // mesh with custom shader
    const geometry = new THREE.PlaneGeometry(stageWidth, stageHeight, 25, 25);
    const material = new THREE.RawShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      uniforms: {
        map: { value: null },
        time: { value: 0 },
        distortionLevel: { value: firstDistortion },
        masterOpacity: { value: 1 },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(0.8 * Math.PI, 0.3 * Math.PI, 0);
    scene.add(mesh);

    // RAF loop
    let rafId: number;
    let frameCount = 0;
    let frameCountRatio = 10;
    let timeVal = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      frameCount++;
      if (frameCount % frameCountRatio === 0) {
        renderer.render(scene, camera);
      }
      timeVal += 0.01;
      material.uniforms.time.value = timeVal;
    };
    animate();

    // IntersectionObserver
    let oneShot = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          frameCountRatio = 2;
          setTimeout(() => {
            gsap.to(material.uniforms.distortionLevel, {
              duration: 1.2,
              ease: 'power2.inOut',
              value: 0,
            });
            gsap.to(mesh.rotation, {
              duration: 1.2,
              ease: 'power2.out',
              x: 0,
              y: 0,
            });
            gsap.to(camera.position, {
              duration: 1.5,
              ease: 'power2.out',
              z: nearZ,
            });
          }, 200);

          if (!oneShot) {
            const loader = new THREE.TextureLoader();
            const texture = loader.load(src);
            texture.minFilter = THREE.LinearFilter;
            material.uniforms.map.value = texture;
            oneShot = true;
          }
        } else {
          frameCountRatio = 10;
          gsap.to(material.uniforms.distortionLevel, {
            duration: 1.2,
            ease: 'power2.out',
            value: firstDistortion,
          });
          gsap.to(camera.position, {
            duration: 1.2,
            ease: 'power2.out',
            z: farZ,
          });
          gsap.to(mesh.rotation, {
            duration: 1.2,
            ease: 'power2.out',
            x: 0.8 * Math.PI,
            y: 0.3 * Math.PI,
          });
        }
      });
    });
    observer.observe(el);

    // hover
    const onEnter = () => {
      gsap.to(material.uniforms.distortionLevel, {
        duration: 1.2,
        ease: 'power2.out',
        value: 20,
      });
    };
    const onLeave = () => {
      gsap.to(material.uniforms.distortionLevel, {
        duration: 1.2,
        ease: 'power2.out',
        value: 0,
      });
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      renderer.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [src, cameraFar, cameraNear, firstDistortion]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className ?? ''}`}
      role="img"
      aria-label={alt}
    />
  );
}
