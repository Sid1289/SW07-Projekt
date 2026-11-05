
<script>
  import favicon from '#lib/assets/favicon.svg';
  import 'bootstrap/dist/css/bootstrap.min.css';

  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">

    <a class="navbar-brand" href="/">
      Movie Watchlist
    </a>

    <div class="navbar-nav">
      <a class="nav-link" href="/">Startseite</a>
      <a class="nav-link" href="/movies">Meine Filme</a>
    </div>

  </div>
</nav>

<main>{@render children()}</main>
