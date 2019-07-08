const lazyLoad = targets => {
  const options = {};
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
