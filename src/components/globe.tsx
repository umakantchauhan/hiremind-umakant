"use client";

import { useEffect, useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export default function World() {
  const globeEl = useRef<GlobeMethods>();

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.2;
      controls.enableZoom = false;
    }
  }, []);

  return (
    <Globe
      ref={globeEl}
      animateIn={true}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
    />
  );
}