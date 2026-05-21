// Local storage keys
const DECISIONS_KEY = 'dh_decisions';
const LLM_CONFIG_KEY = 'dh_llm_config';

function loadDecisions() {
    try {
        return JSON.parse(localStorage.getItem(DECISIONS_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveDecisions(decisions) {
    localStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
}

function uuid() {
    return crypto.randomUUID();
}

export function GetDecisions() {
    return Promise.resolve(loadDecisions());
}

export function GetDecision(id) {
    const d = loadDecisions().find(d => d.id === id);
    if (!d) return Promise.reject(`decision not found: ${id}`);
    return Promise.resolve(d);
}

export function CreateDecision(title) {
    const decisions = loadDecisions();
    const d = {
        id: uuid(),
        title,
        created_at: new Date().toISOString().slice(0, 19),
        options: [],
        criteria: [],
        scores: [],
    };
    decisions.push(d);
    saveDecisions(decisions);
    return Promise.resolve(d);
}

export function DeleteDecision(id) {
    saveDecisions(loadDecisions().filter(d => d.id !== id));
    return Promise.resolve();
}

export function UpdateDecisionTitle(id, title) {
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === id);
    if (!d) return Promise.reject(`decision not found: ${id}`);
    d.title = title;
    saveDecisions(decisions);
    return Promise.resolve();
}

export function AddOption(decisionID, option) {
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);
    if (d.options.includes(option)) return Promise.reject(`option already exists: ${option}`);
    d.options.push(option);
    saveDecisions(decisions);
    return Promise.resolve();
}

export function RemoveOption(decisionID, option) {
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);
    d.options = d.options.filter(o => o !== option);
    d.scores = d.scores.filter(s => s.option !== option);
    saveDecisions(decisions);
    return Promise.resolve();
}

export function AddCriterion(decisionID, name, weight) {
    if (weight < 1 || weight > 5) return Promise.reject('weight must be between 1 and 5');
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);
    const c = { id: uuid(), name, weight };
    d.criteria.push(c);
    saveDecisions(decisions);
    return Promise.resolve(c);
}

export function UpdateCriterion(decisionID, criterionID, name, weight) {
    if (weight < 1 || weight > 5) return Promise.reject('weight must be between 1 and 5');
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);
    const c = d.criteria.find(c => c.id === criterionID);
    if (!c) return Promise.reject(`criterion not found: ${criterionID}`);
    c.name = name;
    c.weight = weight;
    saveDecisions(decisions);
    return Promise.resolve();
}

export function RemoveCriterion(decisionID, criterionID) {
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);
    d.criteria = d.criteria.filter(c => c.id !== criterionID);
    d.scores = d.scores.filter(s => s.criterion_id !== criterionID);
    saveDecisions(decisions);
    return Promise.resolve();
}

export function SetScore(decisionID, option, criterionID, value) {
    if (value < 1 || value > 5) return Promise.reject('score must be between 1 and 5');
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);
    const existing = d.scores.find(s => s.option === option && s.criterion_id === criterionID);
    if (existing) {
        existing.value = value;
    } else {
        d.scores.push({ option, criterion_id: criterionID, value });
    }
    saveDecisions(decisions);
    return Promise.resolve();
}

export function GetResults(decisionID) {
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) return Promise.reject(`decision not found: ${decisionID}`);

    const totalWeight = d.criteria.reduce((s, c) => s + c.weight, 0);
    const results = d.options.map(option => {
        if (totalWeight === 0) return { option, score: 0 };
        let weightedSum = 0;
        for (const c of d.criteria) {
            const s = d.scores.find(s => s.option === option && s.criterion_id === c.id);
            if (s) weightedSum += s.value * c.weight;
        }
        return { option, score: weightedSum / totalWeight };
    });

    results.sort((a, b) => b.score - a.score);
    results.forEach((r, i) => r.rank = i + 1);
    return Promise.resolve(results);
}

// ── LLM Config ────────────────────────────────────────────────────────────

export function GetLLMConfig() {
    try {
        return Promise.resolve(JSON.parse(localStorage.getItem(LLM_CONFIG_KEY) || '{}'));
    } catch {
        return Promise.resolve({});
    }
}

export function SaveLLMConfig(cfg) {
    localStorage.setItem(LLM_CONFIG_KEY, JSON.stringify(cfg));
    return Promise.resolve();
}

async function callLLM(cfg, systemPrompt, userPrompt) {
    const url = (cfg.base_url || 'https://api.deepseek.com').replace(/\/$/, '') + '/chat/completions';
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.api_key}` },
        body: JSON.stringify({
            model: cfg.model || 'deepseek-chat',
            messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
            temperature: 0.7,
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data.choices[0].message.content;
}

export async function TestLLMConfig(cfg) {
    if (!cfg.api_key) throw new Error('API Key 不能为空');
    await callLLM(cfg, 'You are a test assistant.', 'Reply with the single word: ok');
}

export async function SuggestCriteria(decisionID) {
    const cfg = JSON.parse(localStorage.getItem(LLM_CONFIG_KEY) || '{}');
    if (!cfg.api_key) throw new Error('请先在设置中配置 API Key');
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) throw new Error(`decision not found: ${decisionID}`);

    const prompt = `决策主题：${d.title}\n已有选项：${d.options.join('、') || '（暂无）'}\n\n请推荐 3-5 个适合该决策的评价标准，以 JSON 数组返回，格式：\n[{"name":"标准名","weight":3,"reason":"推荐理由"}]\n只返回 JSON，不要其他内容。`;
    const text = await callLLM(cfg, '你是一个决策分析专家，帮助用户设计决策评分矩阵。', prompt);
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('AI 返回格式异常');
    return JSON.parse(match[0]);
}

export async function SuggestScores(decisionID) {
    const cfg = JSON.parse(localStorage.getItem(LLM_CONFIG_KEY) || '{}');
    if (!cfg.api_key) throw new Error('请先在设置中配置 API Key');
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) throw new Error(`decision not found: ${decisionID}`);
    if (!d.options.length || !d.criteria.length) throw new Error('请先添加选项和标准');

    const matrix = d.options.map(o => `选项「${o}」`).join('、');
    const criteria = d.criteria.map(c => `「${c.name}」(权重${c.weight})`).join('、');
    const prompt = `决策主题：${d.title}\n选项：${matrix}\n评价标准：${criteria}\n\n请对每个「选项×标准」组合给出 1-5 分的建议分值和理由，以 JSON 数组返回，格式：\n[{"option":"选项名","criterion":"标准名","value":4,"reason":"理由"}]\n只返回 JSON，不要其他内容。`;
    const text = await callLLM(cfg, '你是一个决策分析专家，帮助用户进行评分。', prompt);
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('AI 返回格式异常');
    return JSON.parse(match[0]);
}

export async function AnalyzeResults(decisionID) {
    const cfg = JSON.parse(localStorage.getItem(LLM_CONFIG_KEY) || '{}');
    if (!cfg.api_key) throw new Error('请先在设置中配置 API Key');
    const decisions = loadDecisions();
    const d = decisions.find(d => d.id === decisionID);
    if (!d) throw new Error(`decision not found: ${decisionID}`);

    const results = await GetResults(decisionID);
    if (!results.length) throw new Error('没有可分析的结果，请先完成评分');

    const ranking = results.map(r => `第${r.rank}名：${r.option}（${r.score.toFixed(2)}分）`).join('\n');
    const prompt = `决策主题：${d.title}\n\n加权评分排名：\n${ranking}\n\n请基于以上评分结果，给出一段客观、简洁的决策分析建议（200字以内），指出得分差异的意义，并提示用户结合主观感受做最终决定。`;
    return callLLM(cfg, '你是一个决策分析专家。', prompt);
}
