import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const rules = fs.readFileSync(path.join(__dirname, '../data/eak-rules.md'), 'utf-8');
  const feedback = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/eak-feedback.json'), 'utf-8'));

  res.status(200).json({
    rules,
    feedback,
    updatedAt: new Date().toISOString(),
  });
}
