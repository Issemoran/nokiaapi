import express from 'express';
import cors from 'cors';
import axios from 'axios';
import {
  scrapeGenre,
  scrapeTopAiringAnime,
  scrapeAnimeMovies,
  scrapePopularAnime,
  scrapeRecentPage,
  scrapeOngoingSeries,
  scrapeAnimeList,
  scrapeRecentlyAdded,
  scrapeAnimeAZ,
  scrapeAnimeAZPage,
  scrapeNewSeason,
  scrapeAnimeListPage,
  scrapeMoviePage,
  scrapeGenrePage,
  scrapeSubCategoryPage,
  scrapeRecentRelease,
  scrapeOngoingAnime,
  scrapeNewSeasonPage,
  scrapeSearch,
  scrapePopularPage,
  scrapeSearchPage,
  scrapeAnimeDetails,
  scrapeOngoingPage,
  scrapeCompletedPage,
  scrapeSeason,
  scrapeCompletedAnime,
  scrapeMP4,
  scrapeStreamSB,
  scrapeWatchAnime,
  scrapeThread,
} from './lib/anime_parser.js';

// Set port with default fallback
const port = process.env.PORT;
if (!port) {
  console.error("❌ Error: PORT is not set!");
  process.exit(1);
}
console.log(`🚀 Server starting on port ${port}...`);

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`📡 Request: ${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.status(200).json({ message: '✅ API is running on Railway!' });
});

// Health check
app.get('/ping', (req, res) => {
  res.status(200).json({ message: '🏓 Pong!' });
});

// Define all routes
const routes = [
  { path: '/search', handler: scrapeSearch },
  { path: '/getRecentlyAdded', handler: scrapeRecentlyAdded },
  { path: '/getOngoingSeries', handler: scrapeOngoingSeries },
  { path: '/animeList', handler: scrapeAnimeList },
  { path: '/animeListAZ', handler: scrapeAnimeAZ },
  { path: '/popular', handler: scrapePopularAnime },
  { path: '/anime-movies', handler: scrapeAnimeMovies },
  { path: '/top-airing', handler: scrapeTopAiringAnime },
  { path: '/season/:season', handler: scrapeSeason },
  { path: '/genre/:genre', handler: scrapeGenre },
  { path: '/getAnime/:id', handler: scrapeAnimeDetails },
  { path: '/getEpisode/:id', handler: scrapeWatchAnime },
  { path: '/streamsb/watch/:id', handler: scrapeStreamSB },
  { path: '/thread/:episodeId', handler: scrapeThread },
];

// Dynamically create routes
routes.forEach(({ path, handler }) => {
  app.get(path, async (req, res) => {
    try {
      const data = await handler(req.params, req.query);
      res.status(200).json(data);
    } catch (err) {
      console.error(`❌ Error on ${req.method} ${req.url}:`, err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
