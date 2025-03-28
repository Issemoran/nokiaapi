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

const port = process.env.PORT;
if (!port) {
  console.error("❌ Error: PORT is not set!");
  process.exit(1);
}

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running on Railway!' });
});

// Example route to verify deployment
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong!' });
});

// Routes
app.get('/search', async (req, res) => {
  try {
    const { keyw, page } = req.query;
    const data = await scrapeSearch({ keyw, page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getRecentlyAdded', async (req, res) => {
  try {
    const { page } = req.query;
    const data = await scrapeRecentlyAdded({ page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getOngoingSeries', async (req, res) => {
  try {
    const { page } = req.query;
    const data = await scrapeOngoingSeries({ page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/animeList', async (req, res) => {
  try {
    const { page } = req.query;
    const data = await scrapeAnimeList({ page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/animeListAZ', async (req, res) => {
  try {
    const { aph, page } = req.query;
    const data = await scrapeAnimeAZ({ aph, page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/popular', async (req, res) => {
  try {
    const { page } = req.query;
    const data = await scrapePopularAnime({ page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/anime-movies', async (req, res) => {
  try {
    const { page, aph } = req.query;
    const data = await scrapeAnimeMovies({ page, aph });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/top-airing', async (req, res) => {
  try {
    const { page } = req.query;
    const data = await scrapeTopAiringAnime({ page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/season/:season', async (req, res) => {
  try {
    const { page } = req.query;
    const { season } = req.params;
    const data = await scrapeSeason({ page, season });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/genre/:genre', async (req, res) => {
  try {
    const { page } = req.query;
    const { genre } = req.params;
    const data = await scrapeGenre({ genre, page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAnime/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await scrapeAnimeDetails({ id });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getEpisode/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await scrapeWatchAnime({ id });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/streamsb/watch/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await scrapeStreamSB({ id });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/thread/:episodeId', async (req, res) => {
  try {
    const { episodeId } = req.params;
    const { page } = req.query;
    const data = await scrapeThread({ episodeId, page });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
