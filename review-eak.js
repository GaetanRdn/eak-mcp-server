import fetch from 'node-fetch';
import OpenAI from 'openai';
import { execSync } from 'child_process';
import 'dotenv/config';
const prId = process.env.PR_NUMBER || 'local';
const togetherApiKey = process.env.TOGETHER_API_KEY;
const mcpUrl = 'https://eak-mcp-server.vercel.app/api/context';
if (!togetherApiKey) {
    console.error('TOGETHER_API_KEY is missing.');
    process.exit(1);
}
const openai = new OpenAI({
    apiKey: togetherApiKey,
    baseURL: 'https://api.together.xyz/v1',
});
async function run() {
    const context = await fetch(mcpUrl).then(res => res.json());
    const diff = execSync('git diff origin/main...HEAD', { encoding: 'utf-8' });
    const prompt = `
Tu es un agent de code review pour le projet EasyAngularKit.

Voici les règles internes :
${context.rules}

Voici les retours d'expérience utilisateur précédents :
${JSON.stringify(context.feedback, null, 2)}

Voici un diff de PR :
${diff}

Fais une revue intelligente :
1. Liste les problèmes ou violations de règles
2. Donne des suggestions concrètes
3. Prends en compte les retours d’expérience utilisateur dans tes recommandations
`;
    const response = await openai.chat.completions.create({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
    });
    console.log("=== Résultat IA ===");
    console.log(response.choices[0].message.content);
}
run().catch(console.error);
