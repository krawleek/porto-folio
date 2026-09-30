import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
  prevent: node => Boolean(node.closest?.('dialog')),
});
