"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  Star,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw
} from "lucide-react";

export default function ProductGallery({ product }) {
  // States untuk berbagai mode zoom
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isHighResLoaded, setIsHighResLoaded] = useState({});

  // Refs untuk DOM manipulation
  const imageContainerRef = useRef(null);
  const lightboxImageRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef({ distance: 0, scale: 1 });

  // Mock data untuk gambar laptop ultra thin yang berbeda
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&crop=center",
  ];

  // High-res images untuk lightbox
  const highResImages = productImages.map(img => `${img}&quality=100&width=1200`);

  const imageLabels = [
    "",
    "Samping",
    "Belakang",
    "Detail",
    "Lifestyle"
  ];

  // Format zoom level untuk display
  const formatZoomPercentage = (level) => `${Math.round(level * 100)}%`;

  
  // Handle lightbox
  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';

    // Load high-res image on demand using native Image constructor
    if (!isHighResLoaded[selectedImage]) {
      const img = document.createElement('img');
      img.src = highResImages[selectedImage];
      img.onload = () => {
        setIsHighResLoaded(prev => ({ ...prev, [selectedImage]: true }));
      };
      img.onerror = () => {
        console.warn(`Failed to load high-res image: ${highResImages[selectedImage]}`);
        // Fallback: mark as loaded with low-res image
        setIsHighResLoaded(prev => ({ ...prev, [selectedImage]: true }));
      };
    }
  }, [selectedImage, isHighResLoaded, highResImages]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
    setIsDragging(false);
    document.body.style.overflow = 'unset';
  }, []);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  }, []);

  
  // Image navigation
  const navigateImage = useCallback((direction) => {
    setSelectedImage(prev => {
      const newIndex = direction === 'next'
        ? (prev + 1) % productImages.length
        : (prev - 1 + productImages.length) % productImages.length;
      return newIndex;
    });

    // Reset zoom when changing images
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });

    // Pre-load next image
    const nextIndex = direction === 'next'
      ? (selectedImage + 1) % productImages.length
      : (selectedImage - 1 + productImages.length) % productImages.length;

    if (!isHighResLoaded[nextIndex]) {
      const img = document.createElement('img');
      img.src = highResImages[nextIndex];
      img.onload = () => {
        setIsHighResLoaded(prev => ({ ...prev, [nextIndex]: true }));
      };
      img.onerror = () => {
        console.warn(`Failed to pre-load image: ${highResImages[nextIndex]}`);
      };
    }
  }, [selectedImage, productImages.length, isHighResLoaded, highResImages]);

  // Drag functionality untuk lightbox
  const handleDragStart = useCallback((e) => {
    if (zoomLevel <= 1) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y
    };
  }, [zoomLevel, dragPosition]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging || zoomLevel <= 1) return;

    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    setDragPosition({ x: newX, y: newY });
  }, [isDragging, zoomLevel]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events untuk mobile
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { distance, scale: zoomLevel };
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      // Single touch for panning
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - dragPosition.x,
        y: e.touches[0].clientY - dragPosition.y
      };
    }
  }, [zoomLevel, dragPosition]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();

    if (e.touches.length === 2) {
      // Pinch to zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = (distance / touchStartRef.current.distance) * touchStartRef.current.scale;
      setZoomLevel(Math.min(Math.max(scale, 1), 5));
    } else if (e.touches.length === 1 && isDragging) {
      // Panning
      const newX = e.touches[0].clientX - dragStartRef.current.x;
      const newY = e.touches[0].clientY - dragStartRef.current.y;
      setDragPosition({ x: newX, y: newY });
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case '0':
          handleZoomReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, navigateImage, handleZoomIn, handleZoomOut, handleZoomReset]);

  // Global mouse/touch events untuk dragging
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Pre-load first high-res image for better UX
  useEffect(() => {
    const firstImage = document.createElement('img');
    firstImage.src = highResImages[0];
    firstImage.onload = () => {
      setIsHighResLoaded(prev => ({ ...prev, 0: true }));
    };
    firstImage.onerror = () => {
      console.warn(`Failed to pre-load first image: ${highResImages[0]}`);
    };
  }, [highResImages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'HOT':
        return 'bg-red-500';
      case 'DISKON':
        return 'bg-green-500';
      case 'BARU':
        return 'bg-blue-500';
      case 'BESTSELLER':
        return 'bg-purple-500';
      case 'TRENDING':
        return 'bg-orange-500';
      case 'LIMITED':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        ref={imageContainerRef}
        className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-zoom-in select-none"
        onClick={openLightbox}
      >
        <Image
          src={productImages[selectedImage]}
          alt={`${product.name} - ${imageLabels[selectedImage]}`}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedImage === 0}
        />

        {/* Product Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 ${getBadgeColor(product.badge)} text-white text-xs font-bold px-3 py-1 rounded-full z-10`}>
            {product.badge}
          </div>
        )}

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Maximize2 className="w-5 h-5" />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200
              ${selectedImage === index
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <Image
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />

            {/* Thumbnail Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-1">
              <span className="text-xs text-white font-medium">
                {imageLabels[index]}
              </span>
            </div>

            {/* Active Indicator */}
            {selectedImage === index && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Product Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>{product.rating}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>•</span>
          <span>{product.reviews} ulasan</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>•</span>
          <span>900+ terjual</span>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className={`
            fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center
            lightbox-enter
          `}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-[90vw] max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={lightboxImageRef}
              className={`
                relative cursor-move zoom-transition gpu-accelerated touch-optimized
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                ${zoomLevel > 1 ? '' : 'cursor-zoom-in'}
              `}
              style={{
                transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
                transformOrigin: 'center'
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {isHighResLoaded[selectedImage] ? (
                <img
                  src={highResImages[selectedImage]}
                  alt={`${product.name} - ${imageLabels[selectedImage]} - Enlarged view`}
                  className="max-w-full max-h-[80vh] object-contain"
                  draggable={false}
                />
              ) : (
                <div className="flex items-center justify-center w-[80vw] h-[60vh]">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading high resolution image...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zoom Controls */}
          <div className={`
            absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3
            flex items-center space-x-4 text-white z-10 slide-up zoom-controls
          `}>
            <button
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoomLevel <= 1}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium min-w-[50px] text-center">
              {formatZoomPercentage(zoomLevel)}
            </span>

            <button
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoomLevel >= 5}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-white/30" />

            <button
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomReset();
              }}
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 z-10 slide-up" style={{ animationDelay: '0.2s' }}>
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`
                  relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                  ${selectedImage === index
                    ? 'border-white scale-110'
                    : 'border-white/30 hover:border-white/60'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                  setZoomLevel(1);
                  setDragPosition({ x: 0, y: 0 });
                }}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm z-10 slide-down">
            {selectedImage + 1} / {productImages.length}
          </div>
        </div>
      )}
    </div>
  );
}