import db from '#lib/db.js';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    return { movies: await db.getMovies() };
  } catch {
    error(503, 'Die Filme konnten nicht geladen werden. Bitte prüfe die MongoDB-Verbindung.');
  }
}
