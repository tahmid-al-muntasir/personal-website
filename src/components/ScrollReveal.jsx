'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Reveal elements already in the viewport immediately (e.g. hero)
    const revealNow = (node) => {
      const delay = node.dataset.revealDelay ? parseFloat(node.dataset.revealDelay) * 80 : 0;
      setTimeout(() => node.classList.add('is-revealed'), delay);
    };

    const scrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    const observeElements = () => {
      const nodes = Array.from(document.querySelectorAll('[data-reveal]:not(.is-revealed)'));
      nodes.forEach(node => scrollObserver.observe(node));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    return () => {
      scrollObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
