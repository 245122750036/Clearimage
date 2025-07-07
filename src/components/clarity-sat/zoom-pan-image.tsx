'use client';

import React, { useState, useRef, WheelEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ZoomPanImageProps {
  src: string;
  alt: string;
}

export function ZoomPanImage({ src, alt }: ZoomPanImageProps) {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const scaleAmount = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(1, transform.scale + scaleAmount), 5);

    if (newScale === 1) {
      setTransform({ scale: 1, x: 0, y: 0 });
      return;
    }
    
    setTransform(prev => ({
      ...prev,
      scale: newScale,
    }));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (transform.scale > 1) {
      setIsPanning(true);
      setStartPos({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !containerRef.current) return;
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    setTransform(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseLeave = () => {
    setIsPanning(false);
  };
  
  const resetTransform = () => {
    setTransform({ scale: 1, x: 0, y: 0 });
  };
  
  const zoom = (direction: 'in' | 'out') => {
    const scaleAmount = direction === 'in' ? 0.2 : -0.2;
    const newScale = Math.min(Math.max(1, transform.scale + scaleAmount), 5);
    
    if (newScale === 1) {
      resetTransform();
    } else {
      setTransform(prev => ({ ...prev, scale: newScale}));
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab relative touch-none bg-card animate-fade-in"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          cursor: isPanning ? 'grabbing' : transform.scale > 1 ? 'grab' : 'default'
        }}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={2048}
          height={2048}
          className="object-contain w-full h-full pointer-events-none"
          draggable={false}
          data-ai-hint="high-resolution satellite"
        />
      </div>
       <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => zoom('out')} aria-label="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => zoom('in')} aria-label="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={resetTransform} aria-label="Reset view">
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
