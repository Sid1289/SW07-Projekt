<script>
  import MoviePoster from '#lib/components/MoviePoster.svelte';

  /** @type {{ movie: import('#lib/types.js').Movie }} */
  let { movie } = $props();
</script>

<article class="card h-100 shadow-sm">
  <a href="/movies/{movie._id}" aria-label="Details zu {movie.title}">
    <MoviePoster poster={movie.poster} title={movie.title} />
  </a>
  <div class="card-body">
    <h2 class="h5 card-title"><a href="/movies/{movie._id}">{movie.title}</a></h2>
    <p class="mb-1">Jahr: {movie.year}</p>
    <p class="mb-0">Dauer: {movie.length}</p>
  </div>
</article>
