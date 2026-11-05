<script>
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status} | Movie Watchlist</title>
</svelte:head>

<div class="container my-5">
  <h1>{page.status === 404 ? 'Film oder Seite nicht gefunden' : 'Etwas ist schiefgegangen'}</h1>
  <p>{page.error?.message}</p>
  <a href="/movies" class="btn btn-primary">Zur Filmübersicht</a>
</div>
