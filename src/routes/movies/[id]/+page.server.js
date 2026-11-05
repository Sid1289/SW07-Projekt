import { error, fail, redirect } from '@sveltejs/kit';
import db from '#lib/db.js';

/** @param {{ params: { id: string } }} event */
export async function load({ params }) {
  let movie;
  try {
    movie = await db.getMovie(params.id);
  } catch {
    error(503, 'Der Film konnte nicht geladen werden. Bitte prüfe die MongoDB-Verbindung.');
  }
  if (!movie) error(404, 'Dieser Film wurde nicht gefunden.');
  return { movie };
}

export const actions = {
  /** @param {{ params: { id: string } }} event */
  delete: async ({ params }) => {
    let deletedId;
    try {
      deletedId = await db.deleteMovie(params.id);
    } catch {
      return fail(503, { message: 'Der Film konnte nicht gelöscht werden. Bitte versuche es erneut.' });
    }
    if (!deletedId) error(404, 'Dieser Film wurde nicht gefunden.');
    redirect(303, '/movies');
  }
};
