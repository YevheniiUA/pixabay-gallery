const lazyLoad = targets => {
  const options = {
    rootMargin: '50px',
    threshold: 0.01,
  };
  targets.forEach(target => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const imageUrl = img.dataset.lazy;

          img.setAttribute('src', imageUrl);

          observer.disconnect();
        }
      });
    }, options);

    io.observe(target);
  });
};
export { lazyLoad };
