<script>
  /** @type {{ form?: { values: { title: string, year: string, length: string, poster: string }, errors: Record<string, string>, message: string } | null }} */
  let { form } = $props();
</script>

<svelte:head>
  <title>Neuen Film erfassen | Movie Watchlist</title>
</svelte:head>

<div class="container my-4">
  <a href="/movies" class="d-inline-block mb-3">← Zurück zu meinen Filmen</a>
  <h1>Neuen Film erfassen</h1>
  <p class="text-secondary">Titel, Erscheinungsjahr und Dauer sind Pflichtfelder.</p>

  <form method="POST" class="movie-form">
    {#if form?.message}
      <div class="alert alert-danger" role="alert">{form.message}</div>
    {/if}

    <div class="mb-3">
      <label for="title" class="form-label">Filmtitel</label>
      <input id="title" name="title" class="form-control" class:is-invalid={!!form?.errors.title}
        value={form?.values.title ?? ''} required maxlength="150" autocomplete="off"
        aria-invalid={!!form?.errors.title} aria-describedby={form?.errors.title ? 'title-error' : undefined} />
      {#if form?.errors.title}<div id="title-error" class="invalid-feedback">{form.errors.title}</div>{/if}
    </div>

    <div class="mb-3">
      <label for="year" class="form-label">Erscheinungsjahr</label>
      <input id="year" name="year" type="number" class="form-control" class:is-invalid={!!form?.errors.year}
        value={form?.values.year ?? ''} required min="1888" max="9999" step="1"
        aria-invalid={!!form?.errors.year} aria-describedby={form?.errors.year ? 'year-error' : undefined} />
      {#if form?.errors.year}<div id="year-error" class="invalid-feedback">{form.errors.year}</div>{/if}
    </div>

    <div class="mb-3">
      <label for="length" class="form-label">Dauer</label>
      <input id="length" name="length" class="form-control" class:is-invalid={!!form?.errors.length}
        value={form?.values.length ?? ''} required maxlength="80" placeholder="z. B. 114 Minuten"
        aria-invalid={!!form?.errors.length} aria-describedby={form?.errors.length ? 'length-error' : undefined} />
      {#if form?.errors.length}<div id="length-error" class="invalid-feedback">{form.errors.length}</div>{/if}
    </div>

    <div class="mb-4">
      <label for="poster" class="form-label">Poster-URL (optional)</label>
      <input id="poster" name="poster" type="text" class="form-control" class:is-invalid={!!form?.errors.poster}
        value={form?.values.poster ?? ''} maxlength="2000" placeholder="https://example.com/poster.jpg"
        aria-invalid={!!form?.errors.poster} aria-describedby="poster-help poster-error" />
      <div id="poster-help" class="form-text">Bildadresse oder /images/altura.png. Ohne Angabe wird ein Platzhalter angezeigt.</div>
      <div id="poster-error" class="invalid-feedback">{form?.errors.poster ?? ''}</div>
    </div>

    <div class="d-flex gap-2">
      <button type="submit" class="btn btn-primary">Film speichern</button>
      <a href="/movies" class="btn btn-outline-secondary">Abbrechen</a>
    </div>
  </form>
</div>

<style>
  .movie-form { max-width: 36rem; }
</style>
