import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const rules = fs.readFileSync(path.join(process.cwd(), 'data/eak-rules.md'), 'utf-8');
    const feedback = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/eak-feedback.json'), 'utf-8'));

    res.status(200).json({
      rules,
      feedback,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
