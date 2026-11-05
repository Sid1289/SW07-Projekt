import { fail, redirect } from '@sveltejs/kit';
import db from '#lib/db.js';

export const actions = {
  /** @param {{ request: Request }} event */
  default: async ({ request }) => {
    const data = await request.formData();
    const values = {
      title: String(data.get('title') ?? '').trim(),
      year: String(data.get('year') ?? '').trim(),
      length: String(data.get('length') ?? '').trim(),
      poster: String(data.get('poster') ?? '').trim()
    };
    /** @type {Record<string, string>} */
    const errors = {};

    if (!values.title || values.title.length > 150) {
      errors.title = 'Bitte gib einen Filmtitel mit höchstens 150 Zeichen ein.';
    }
    const year = Number(values.year);
    if (!/^\d{4}$/.test(values.year) || year < 1888 || year > 9999) {
      errors.year = 'Bitte gib ein gültiges Erscheinungsjahr von 1888 bis 9999 ein.';
    }
    if (!values.length || values.length.length > 80) {
      errors.length = 'Bitte gib die Dauer an, zum Beispiel 114 Minuten (höchstens 80 Zeichen).';
    }
    if (values.poster) {
      let validPoster = /^\/images\/[a-zA-Z0-9._-]+$/.test(values.poster);
      try {
        const url = new URL(values.poster);
        validPoster = ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
      } catch {
        // Lokale Bilder dürfen als /images/dateiname.jpg angegeben werden.
      }
      if (!validPoster || values.poster.length > 2000) {
        errors.poster = 'Bitte gib eine HTTP(S)-Bildadresse oder einen Pfad wie /images/altura.png ein.';
      }
    }
    if (Object.keys(errors).length) return fail(400, { values, errors, message: '' });

    let id;
    try {
      id = await db.createMovie({ ...values, year });
    } catch {
      return fail(503, {
        values,
        errors,
        message: 'Der Film konnte nicht gespeichert werden. Bitte prüfe die MongoDB-Verbindung.'
      });
    }
    redirect(303, `/movies/${id}`);
  }
};
