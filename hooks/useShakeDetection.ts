'use client';

import { useEffect, useRef, useState } from 'react';
import { SHAKE_THRESHOLD, SHAKE_TIMEOUT } from '@/lib/constants';

export function useShakeDetection(onShake: () => void, enabled: boolean = true) {
  const [isShaking, setIsShaking] = useState(false);
  const lastShakeTime = useRef(0);
  const shakeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const { accelerationIncludingGravity } = event;
      
      if (!accelerationIncludingGravity) return;

      const { x, y, z } = accelerationIncludingGravity;
      const acceleration = Math.sqrt(x! * x! + y! * y! + z! * z!);
      
      const now = Date.now();
      
      if (acceleration > SHAKE_THRESHOLD && now - lastShakeTime.current > SHAKE_TIMEOUT) {
        lastShakeTime.current = now;
        setIsShaking(true);
        onShake();
        
        // Clear existing timeout
        if (shakeTimeoutRef.current) {
          clearTimeout(shakeTimeoutRef.current);
        }
        
        // Reset shake state after animation
        shakeTimeoutRef.current = setTimeout(() => {
          setIsShaking(false);
        }, 500);
      }
    };

    // Request permission for iOS devices
    const requestPermission = async () => {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        } catch (error) {
          console.error('Error requesting device motion permission:', error);
        }
      } else {
        // For non-iOS devices
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, [onShake, enabled]);

  return { isShaking };
}
