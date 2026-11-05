import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$app/env/private';

/** @typedef {import('#lib/types.js').Movie} Movie */
const client = new MongoClient(DB_URI, { serverSelectionTimeoutMS: 10000 });
const database = client.db('ScreenStackDB');
const movies = database.collection('movies');
// Netlify liefert static/ über sein CDN aus. Das Verzeichnis ist nicht im
// Dateisystem der Serverless Function vorhanden; deshalb beim Build erfassen.
const posterFiles = Object.keys(import.meta.glob('/static/images/*')).map(
  (path) => path.slice('/static/images/'.length)
);

// Erst bei einer Datenbankabfrage verbinden, nicht bereits beim Build.
async function getCollection() {
  await client.connect();
  return movies;
}

/** @param {string | undefined} poster */
function resolvePoster(poster) {
  if (!poster) return '/images/placeholder.jpg';
  if (poster.startsWith('/images/')) {
    const filename = poster.slice('/images/'.length);
    const existing = posterFiles.find((file) => file.toLowerCase() === filename.toLowerCase());
    return existing ? `/images/${existing}` : '/images/placeholder.jpg';
  }
  return /^https?:\/\//i.test(poster) ? poster : '/images/placeholder.jpg';
}

/**
 * MongoDB-IDs müssen als Strings an die Svelte-Seiten übergeben werden.
 * @param {import('mongodb').WithId<import('mongodb').Document>} movie
 * @returns {Movie}
 */
function serializeMovie(movie) {
  return {
    _id: movie._id.toString(),
    title: movie.title,
    year: movie.year,
    length: movie.length,
    poster: resolvePoster(movie.poster),
    actors: movie.actors ?? [],
    watchlist: movie.watchlist ?? false
  };
}

async function getMovies() {
  const collection = await getCollection();
  return (await collection.find({}).toArray()).map(serializeMovie);
}

/** @param {string} id */
async function getMovie(id) {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null;
  const collection = await getCollection();
  const movie = await collection.findOne({ _id: new ObjectId(id) });
  return movie ? serializeMovie(movie) : null;
}

/** @param {import('#lib/types.js').NewMovie} movie */
async function createMovie(movie) {
  const collection = await getCollection();
  const result = await collection.insertOne({
    title: movie.title,
    year: movie.year,
    length: movie.length,
    poster: movie.poster || '/images/placeholder.jpg',
    actors: [],
    watchlist: false
  });
  return result.insertedId.toString();
}

/** @param {Movie} movie */
async function updateMovie(movie) {
  if (!/^[a-f0-9]{24}$/i.test(movie._id)) return null;
  const { _id, ...fields } = movie;
  const collection = await getCollection();
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: fields });
  return result.matchedCount ? _id : null;
}

/** @param {string} id */
async function deleteMovie(id) {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null;
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount ? id : null;
}

export default { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
