import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/context/code-review/eak', (req, res) => {
  const rules = fs.readFileSync(path.resolve('./data/eak-rules.md'), 'utf-8');
  const feedback = JSON.parse(fs.readFileSync(path.resolve('./data/eak-feedback.json'), 'utf-8'));
  res.json({ rules, feedback });
});

app.listen(PORT, () => {
  console.log(`MCP server is running on http://localhost:${PORT}`);
});

// MCP - récupère le contexte dynamique pour une PR donnée
app.get('/context/code-review/github/:prId', async (req, res) => {
  const rules = fs.readFileSync('./data/eak-rules.md', 'utf-8');
  const feedback = JSON.parse(fs.readFileSync('./data/eak-feedback.json', 'utf-8'));

  // Tu pourrais ici appeler l’API GitHub pour enrichir
  const prId = req.params.prId;

  res.json({
    prId,
    rules,
    feedback,
    updatedAt: new Date().toISOString()
  });
});