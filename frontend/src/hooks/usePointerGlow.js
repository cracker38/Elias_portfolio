import { useEffect } from 'react';

export function usePointerGlow(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    function onMove(event) {
      const box = node.getBoundingClientRect();
      node.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
      node.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
    }

    function onLeave() {
      node.style.setProperty('--spot-x', '50%');
      node.style.setProperty('--spot-y', '40%');
    }

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
