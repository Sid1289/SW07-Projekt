/**
 * @typedef {Object} Movie
 * @property {string} _id
 * @property {string} title
 * @property {number} year
 * @property {string} length
 * @property {string} poster
 * @property {string[]} actors
 * @property {boolean} watchlist
 */

/** @typedef {Pick<Movie, 'title' | 'year' | 'length'> & { poster?: string }} NewMovie */

export {};
