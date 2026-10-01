"use client";

import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Domain-warped fbm "satin": long diagonal folds, lit with a soft key + specular sheen.
// uReveal > 0 burns an organic, rim-lit hole outward from uOrigin (the intro "tear").
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform float uReveal;
uniform vec2 uOrigin;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uScale;
uniform float uBright;

// Sine-free hash (Hoskins) — stable across GPUs and precisions.
vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return -1.0 + 2.0 * fract((p3.xx + p3.yz) * p3.zy);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash2(i), f), dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}
float silk(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, 0.07 * t)), fbm(p + vec2(5.2, -0.05 * t)));
  vec2 r = p + 1.7 * q;
  float folds = sin(r.x * 2.3 + r.y * 0.9 + t * 0.22);
  return folds * 0.55 + fbm(r * 1.35 + vec2(0.04 * t, 0.0)) * 0.9;
}
void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5) * uScale;
  float t = uTime;
  float h = silk(p, t);
  float e = 0.012;
  float hx = silk(p + vec2(e, 0.0), t) - h;
  float hy = silk(p + vec2(0.0, e), t) - h;
  vec3 n = normalize(vec3(-hx / e, -hy / e, 2.4));
  vec3 L = normalize(vec3(-0.45, 0.65, 0.9));
  float diff = clamp(dot(n, L), 0.0, 1.0);
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(clamp(dot(n, H), 0.0, 1.0), 26.0);

  float k = clamp(0.5 + 0.42 * h + 0.16 * sin(p.x * 0.8 - t * 0.12), 0.0, 1.0);
  vec3 col = mix(uC0, uC1, smoothstep(0.08, 0.42, k));
  col = mix(col, uC2, smoothstep(0.42, 0.72, k));
  col = mix(col, uC3, smoothstep(0.74, 0.98, k));
  col *= 0.42 + 0.78 * diff;
  col += spec * 0.42 * uBright;

  float alpha = 1.0;
  if (uReveal > 0.0) {
    vec2 d = vUv - uOrigin;
    d.x *= aspect;
    float edge = length(d) + fbm(p * 1.6 + 7.3) * 0.6 + fbm(p * 5.5 - 3.1) * 0.08;
    float T = uReveal * (2.2 + aspect * 0.5) - 0.35;
    alpha = smoothstep(T, T + 0.015, edge);
    float rim = smoothstep(T + 0.1, T + 0.015, edge) * alpha;
    col = mix(col, vec3(1.0, 0.95, 0.86), rim * 0.6);
    col *= 1.0 - 0.3 * smoothstep(T + 0.3, T + 0.02, edge) * (1.0 - rim);
  }
  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col * alpha, alpha);
}`;

function hexToVec(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
}

type Props = {
  palette: [string, string, string, string];
  className?: string;
  speed?: number;
  scale?: number;
  brightness?: number;
  /** Render scale relative to CSS pixels (the silk is soft, so < 1 is plenty). */
  resolution?: number;
  /** 0 → 1 tear-away progress, read every frame. */
  reveal?: RefObject<number>;
  origin?: [number, number];
  onFallback?: () => void;
};

/** A living WebGL silk sheet. Falls back (via onFallback) when WebGL is missing or renders blank. */
export function SilkCanvas({ palette, className, speed = 1, scale = 2.2, brightness = 1, resolution = 0.6, reveal, origin = [0.86, 0.12], onFallback }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef(onFallback);
  const paletteKey = palette.join(",");
  const [ox, oy] = origin;

  useEffect(() => {
    fallbackRef.current = onFallback;
  }, [onFallback]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true, depth: false, stencil: false, powerPreference: "high-performance" });
    const fail = () => {
      canvas.style.visibility = "hidden";
      fallbackRef.current?.();
    };
    if (!gl || gl.isContextLost()) {
      fail();
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh));
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(prog));
      fail();
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uReveal = u("uReveal");
    const colors = paletteKey.split(",");
    ["uC0", "uC1", "uC2", "uC3"].forEach((name, i) => gl.uniform3fv(u(name), hexToVec(colors[i])));
    gl.uniform2f(u("uOrigin"), ox, oy);
    gl.uniform1f(u("uScale"), scale);
    gl.uniform1f(u("uBright"), brightness);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * resolution;
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    // Some software renderers return blank-white frames; if every probe is near-white
    // (impossible for our palettes), bail out to the CSS fallback underneath.
    let checked = false;
    const looksBroken = () => {
      const px = new Uint8Array(4);
      const probes = [
        [0.25, 0.3],
        [0.5, 0.5],
        [0.75, 0.7],
      ];
      return probes.every(([fx, fy]) => {
        gl.readPixels(Math.floor(canvas.width * fx), Math.floor(canvas.height * fy), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        return px[0] > 248 && px[1] > 248 && px[2] > 248;
      });
    };

    let raf = 0;
    let last = performance.now();
    let t = 7.0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!visible || document.hidden) return;
      t += dt * speed;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uReveal, reveal?.current ?? 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!checked) {
        checked = true;
        if (looksBroken()) {
          cancelAnimationFrame(raf);
          fail();
        }
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // Free our GL objects but keep the context alive: React may remount onto this same canvas.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [paletteKey, speed, scale, brightness, resolution, reveal, ox, oy]);

  return <canvas ref={ref} aria-hidden className={cn("block size-full", className)} />;
}
