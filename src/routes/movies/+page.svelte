<script>
  import MovieCard from '#lib/components/MovieCard.svelte';

  /** @type {{ data: { movies: import('#lib/types.js').Movie[] } }} */
  let { data } = $props();
</script>

<svelte:head>
  <title>Meine Filme | Movie Watchlist</title>
</svelte:head>

<div class="container my-4">
  <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
    <div>
      <h1>Meine Filme</h1>
      <p class="text-secondary mb-0">{data.movies.length} Filme in deiner Sammlung</p>
    </div>
    <a href="/movies/create" class="btn btn-primary">Neuen Film erfassen</a>
  </div>

  <div class="row g-4">
    {#each data.movies as movie (movie._id)}
      <div class="col-12 col-sm-6 col-lg-3">
        <MovieCard {movie} />
      </div>
    {:else}
      <p>Noch keine Filme vorhanden. Erfasse deinen ersten Film.</p>
    {/each}
  </div>
</div>
