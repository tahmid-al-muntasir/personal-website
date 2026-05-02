'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    const observeElements = () => {
      const nodes = Array.from(document.querySelectorAll('[data-reveal]:not(.is-revealed)'));
      nodes.forEach(node => scrollObserver.observe(node));
    };

    // Observe initial elements
    observeElements();

    // Watch for new [data-reveal] elements added to DOM (on navigation)
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
