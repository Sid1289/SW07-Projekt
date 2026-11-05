<script>
  import MoviePoster from '#lib/components/MoviePoster.svelte';

  /** @type {{ data: { movie: import('#lib/types.js').Movie }, form?: { message: string } | null }} */
  let { data, form } = $props();
</script>

<svelte:head>
  <title>{data.movie.title} | Movie Watchlist</title>
</svelte:head>

<div class="container my-4">
  <a href="/movies" class="d-inline-block mb-3">← Zurück zu meinen Filmen</a>
  <h1 class="mb-4">{data.movie.title}</h1>

  {#if form?.message}
    <div class="alert alert-danger" role="alert">{form.message}</div>
  {/if}

  <div class="row g-4">
    <div class="col-12 col-sm-5 col-md-4 col-lg-3">
      <MoviePoster poster={data.movie.poster} title={data.movie.title} />
    </div>
    <div class="col-12 col-sm-7 col-md-8 col-lg-9">
      <dl class="row">
        <dt class="col-4 col-md-3">Jahr</dt>
        <dd class="col-8 col-md-9">{data.movie.year}</dd>
        <dt class="col-4 col-md-3">Dauer</dt>
        <dd class="col-8 col-md-9">{data.movie.length}</dd>
      </dl>

      <h2 class="h5">Besetzung</h2>
      {#if data.movie.actors.length}
        <ul>
          {#each data.movie.actors as actor}
            <li>{actor}</li>
          {/each}
        </ul>
      {:else}
        <p class="text-secondary">Noch keine Besetzung erfasst.</p>
      {/if}

      <details class="mt-4">
        <summary class="text-danger">Film löschen</summary>
        <p class="mt-2">Möchtest du «{data.movie.title}» endgültig aus der Sammlung löschen?</p>
        <form method="POST" action="?/delete">
          <button class="btn btn-danger" type="submit">Ja, Film endgültig löschen</button>
        </form>
      </details>
    </div>
  </div>
</div>
