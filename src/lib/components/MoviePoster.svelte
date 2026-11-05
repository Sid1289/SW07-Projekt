<script>
  /** @type {{ poster: string, title: string }} */
  let { poster, title } = $props();
</script>

<img
  src={poster}
  alt="Filmplakat: {title}"
  loading="lazy"
  onerror={(event) => {
    const image = event.currentTarget;
    if (image instanceof HTMLImageElement && !image.src.endsWith('/images/placeholder.jpg')) {
      image.src = '/images/placeholder.jpg';
    }
  }}
/>

<style>
  img {
    display: block;
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 0.375rem;
    background: #e9ecef;
  }
</style>
