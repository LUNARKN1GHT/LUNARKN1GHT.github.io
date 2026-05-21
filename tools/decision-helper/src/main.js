


import {
    GetDecisions, CreateDecision, DeleteDecision, UpdateDecisionTitle,
    GetDecision,
    AddOption, RemoveOption,
    AddCriterion, UpdateCriterion, RemoveCriterion,
    SetScore,
    GetResults,
    GetLLMConfig, SaveLLMConfig, TestLLMConfig,
    SuggestCriteria, SuggestScores, AnalyzeResults,
} from './backend.js';

// ── State ──────────────────────────────────────────────────────────────────
let currentDecisionID = null;

// ── DOM refs ───────────────────────────────────────────────────────────────
const views = {
    list:    document.getElementById('view-list'),
    edit:    document.getElementById('view-edit'),
    score:   document.getElementById('view-score'),
    results: document.getElementById('view-results'),
};

function showView(name) {
    Object.entries(views).forEach(([k, el]) => {
        el.classList.toggle('hidden', k !== name);
    });
}

// ── Helpers ────────────────────────────────────────────────────────────────
async function withErrorHandling(fn) {
    try {
        await fn();
    } catch (e) {
        console.error(String(e));
    }
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function setLoading(el, text = '正在请求 AI…') {
    el.classList.remove('hidden');
    el.innerHTML = `<div class="ai-loading"><div class="spinner"></div>${text}</div>`;
}

function setAIError(el, msg) {
    el.innerHTML = `<div class="ai-loading" style="color:var(--danger)">${escHtml(String(msg))}</div>`;
}

// ── Decision List View ─────────────────────────────────────────────────────
const decisionList   = document.getElementById('decision-list');
const emptyState     = document.getElementById('empty-state');
const btnNewDecision = document.getElementById('btn-new-decision');

async function renderList() {
    const decisions = await GetDecisions();
    decisionList.innerHTML = '';

    if (!decisions || decisions.length === 0) {
        decisionList.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    decisionList.classList.remove('hidden');
    emptyState.classList.add('hidden');

    decisions.slice().reverse().forEach(d => {
        const card = document.createElement('div');
        card.className = 'decision-card';
        card.innerHTML = `
            <div class="decision-card-info">
                <div class="decision-card-title">${escHtml(d.title)}</div>
                <div class="decision-card-meta">
                    ${d.options.length} 个选项 · ${d.criteria.length} 个标准 · ${d.created_at.slice(0,10)}
                </div>
            </div>
            <div class="decision-card-actions">
                <button class="btn btn-danger btn-del" data-id="${d.id}">删除</button>
            </div>
        `;
        card.querySelector('.decision-card-info').addEventListener('click', () => openEdit(d.id));
        let delTimer = null;
        card.querySelector('.btn-del').addEventListener('click', async (e) => {
            e.stopPropagation();
            const btn = e.currentTarget;
            if (!btn.dataset.confirming) {
                btn.dataset.confirming = '1';
                btn.textContent = '确认删除？';
                btn.style.background = 'rgba(239,68,68,.2)';
                delTimer = setTimeout(() => {
                    btn.dataset.confirming = '';
                    btn.textContent = '删除';
                    btn.style.background = '';
                }, 3000);
                return;
            }
            clearTimeout(delTimer);
            await withErrorHandling(async () => {
                await DeleteDecision(d.id);
                await renderList();
            });
        });
        decisionList.appendChild(card);
    });
}

// ── New Decision Modal ─────────────────────────────────────────────────────
const modalOverlay = document.getElementById('modal-overlay');
const modalInput   = document.getElementById('modal-input');
const modalCancel  = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

btnNewDecision.addEventListener('click', () => {
    modalInput.value = '';
    modalOverlay.classList.remove('hidden');
    setTimeout(() => modalInput.focus(), 50);
});

modalCancel.addEventListener('click', () => modalOverlay.classList.add('hidden'));
modalInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') modalConfirm.click();
    if (e.key === 'Escape') modalCancel.click();
});

modalConfirm.addEventListener('click', async () => {
    const title = modalInput.value.trim();
    if (!title) return;
    await withErrorHandling(async () => {
        const d = await CreateDecision(title);
        modalOverlay.classList.add('hidden');
        await openEdit(d.id);
    });
});

// ── Settings Modal ─────────────────────────────────────────────────────────
const settingsOverlay    = document.getElementById('settings-overlay');
const settingsBaseURL    = document.getElementById('settings-base-url');
const settingsAPIKey     = document.getElementById('settings-api-key');
const settingsModel      = document.getElementById('settings-model');
const settingsCancel     = document.getElementById('settings-cancel');
const settingsSave       = document.getElementById('settings-save');
const settingsTest       = document.getElementById('settings-test');
const settingsTestResult = document.getElementById('settings-test-result');

document.getElementById('btn-settings').addEventListener('click', async () => {
    const cfg = await GetLLMConfig();
    settingsBaseURL.value = cfg.base_url || 'https://api.deepseek.com';
    settingsAPIKey.value  = cfg.api_key  || '';
    settingsModel.value   = cfg.model    || 'deepseek-chat';
    settingsTestResult.className = 'settings-test-result hidden';
    settingsTestResult.textContent = '';
    settingsOverlay.classList.remove('hidden');
    setTimeout(() => settingsAPIKey.focus(), 50);
});

settingsCancel.addEventListener('click', () => settingsOverlay.classList.add('hidden'));

settingsTest.addEventListener('click', async () => {
    settingsTest.disabled = true;
    settingsTestResult.className = 'settings-test-result';
    settingsTestResult.textContent = '测试中…';
    try {
        await TestLLMConfig({
            base_url: settingsBaseURL.value.trim(),
            api_key:  settingsAPIKey.value.trim(),
            model:    settingsModel.value.trim() || 'deepseek-chat',
        });
        settingsTestResult.classList.add('success');
        settingsTestResult.textContent = '✓ 连接成功，API Key 有效';
    } catch (err) {
        settingsTestResult.classList.add('error');
        settingsTestResult.textContent = '✕ ' + String(err);
    } finally {
        settingsTest.disabled = false;
    }
});

settingsSave.addEventListener('click', async () => {
    await withErrorHandling(async () => {
        await SaveLLMConfig({
            base_url: settingsBaseURL.value.trim(),
            api_key:  settingsAPIKey.value.trim(),
            model:    settingsModel.value.trim() || 'deepseek-chat',
        });
    });
    settingsOverlay.classList.add('hidden');
});

// ── Edit View ──────────────────────────────────────────────────────────────
const editTitleEl         = document.getElementById('edit-title');
const optionsList         = document.getElementById('options-list');
const criteriaList        = document.getElementById('criteria-list');
const inputOption         = document.getElementById('input-option');
const btnAddOption        = document.getElementById('btn-add-option');
const inputCriterionName  = document.getElementById('input-criterion-name');
const inputCriterionWeight = document.getElementById('input-criterion-weight');
const btnAddCriterion     = document.getElementById('btn-add-criterion');
const aiCriteriaPanel     = document.getElementById('ai-criteria-panel');

async function openEdit(id) {
    currentDecisionID = id;
    aiCriteriaPanel.classList.add('hidden');
    await renderEdit();
    showView('edit');
}

async function renderEdit() {
    const d = await GetDecision(currentDecisionID);
    editTitleEl.textContent = d.title;

    // options
    optionsList.innerHTML = '';
    (d.options || []).forEach(opt => {
        const item = document.createElement('div');
        item.className = 'tag-item';
        item.innerHTML = `<span>${escHtml(opt)}</span><button class="btn btn-danger">×</button>`;
        item.querySelector('button').addEventListener('click', async () => {
            await withErrorHandling(async () => { await RemoveOption(currentDecisionID, opt); await renderEdit(); });
        });
        optionsList.appendChild(item);
    });

    // criteria
    criteriaList.innerHTML = '';
    (d.criteria || []).forEach(c => {
        const item = document.createElement('div');
        item.className = 'criterion-item';
        item.innerHTML = `
            <div class="criterion-item-left">
                <span class="criterion-item-weight">×${c.weight}</span>
                <span class="criterion-item-name" contenteditable="true" spellcheck="false">${escHtml(c.name)}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
                <select class="select weight-sel">
                    ${[1,2,3,4,5].map(w=>`<option value="${w}"${w===c.weight?' selected':''}>${w}</option>`).join('')}
                </select>
                <button class="btn btn-danger">×</button>
            </div>`;
        const nameEl = item.querySelector('.criterion-item-name');
        nameEl.addEventListener('blur', async () => {
            const n = nameEl.textContent.trim();
            if (!n || n === c.name) return;
            await withErrorHandling(async () => { await UpdateCriterion(currentDecisionID, c.id, n, c.weight); await renderEdit(); });
        });
        nameEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); } });
        item.querySelector('.weight-sel').addEventListener('change', async (e) => {
            await withErrorHandling(async () => { await UpdateCriterion(currentDecisionID, c.id, c.name, parseInt(e.target.value)); await renderEdit(); });
        });
        item.querySelector('.btn-danger').addEventListener('click', async () => {
            await withErrorHandling(async () => { await RemoveCriterion(currentDecisionID, c.id); await renderEdit(); });
        });
        criteriaList.appendChild(item);
    });
}

editTitleEl.addEventListener('blur', async () => {
    const t = editTitleEl.textContent.trim();
    if (!t || !currentDecisionID) return;
    await withErrorHandling(() => UpdateDecisionTitle(currentDecisionID, t));
});
editTitleEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); editTitleEl.blur(); } });

btnAddOption.addEventListener('click', async () => {
    const val = inputOption.value.trim();
    if (!val) return;
    await withErrorHandling(async () => { await AddOption(currentDecisionID, val); inputOption.value = ''; await renderEdit(); });
});
inputOption.addEventListener('keydown', e => { if (e.key === 'Enter') btnAddOption.click(); });

btnAddCriterion.addEventListener('click', async () => {
    const name = inputCriterionName.value.trim();
    if (!name) return;
    await withErrorHandling(async () => {
        await AddCriterion(currentDecisionID, name, parseInt(inputCriterionWeight.value));
        inputCriterionName.value = '';
        await renderEdit();
    });
});
inputCriterionName.addEventListener('keydown', e => { if (e.key === 'Enter') btnAddCriterion.click(); });

// ── AI 建议标准 ────────────────────────────────────────────────────────────
document.getElementById('btn-ai-criteria').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (btn.disabled) return;
    btn.disabled = true;
    setLoading(aiCriteriaPanel, '正在请求 AI 建议标准…');

    try {
        const suggestions = await SuggestCriteria(currentDecisionID);
        aiCriteriaPanel.innerHTML = `
            <div class="ai-panel-header">
                <span>✦ AI 建议（点击「采用」可单条添加）</span>
                <button class="ai-apply-all" id="btn-apply-all-criteria">全部采用</button>
            </div>
        `;
        suggestions.forEach(s => {
            const card = document.createElement('div');
            card.className = 'ai-suggestion-card';
            card.innerHTML = `
                <div class="ai-suggestion-info">
                    <div class="ai-suggestion-name">${escHtml(s.name)} <span class="criterion-item-weight">×${s.weight}</span></div>
                    <div class="ai-suggestion-reason">${escHtml(s.reason)}</div>
                </div>
                <button class="btn btn-primary" style="font-size:12px;padding:4px 10px">采用</button>
            `;
            card.querySelector('button').addEventListener('click', async () => {
                await withErrorHandling(async () => { await AddCriterion(currentDecisionID, s.name, s.weight); await renderEdit(); });
                card.style.opacity = '0.4';
                card.querySelector('button').disabled = true;
            });
            aiCriteriaPanel.appendChild(card);
        });

        document.getElementById('btn-apply-all-criteria').addEventListener('click', async () => {
            for (const s of suggestions) {
                await withErrorHandling(() => AddCriterion(currentDecisionID, s.name, s.weight));
            }
            await renderEdit();
            aiCriteriaPanel.classList.add('hidden');
        });
    } catch (err) {
        setAIError(aiCriteriaPanel, err);
    } finally {
        btn.disabled = false;
    }
});

document.getElementById('btn-back-list').addEventListener('click', async () => { await renderList(); showView('list'); });
document.getElementById('btn-go-score').addEventListener('click', () => openScore());
document.getElementById('btn-go-results').addEventListener('click', () => openResults());

// ── Score View ─────────────────────────────────────────────────────────────
const scoreTitleEl  = document.getElementById('score-title');
const scoreTable    = document.getElementById('score-table');
const aiScoresPanel = document.getElementById('ai-scores-panel');

// 存储当前矩阵的 select 引用，供 AI 填分使用
let scoreSelects = {};

async function openScore() {
    aiScoresPanel.classList.add('hidden');
    await renderScore();
    showView('score');
}

async function renderScore() {
    const d = await GetDecision(currentDecisionID);
    scoreTitleEl.textContent = d.title;
    scoreTable.innerHTML = '';
    scoreSelects = {};

    if (!d.options.length || !d.criteria.length) {
        scoreTable.innerHTML = '<tr><td style="color:var(--text-muted);padding:20px">请先在编辑页添加选项和标准</td></tr>';
        return;
    }

    const scoreMap = {};
    (d.scores || []).forEach(s => { scoreMap[`${s.option}::${s.criterion_id}`] = s.value; });

    const thead = document.createElement('thead');
    const hRow  = document.createElement('tr');
    const emptyTh = document.createElement('th');
    emptyTh.textContent = '选项 / 标准';
    hRow.appendChild(emptyTh);
    d.criteria.forEach(c => {
        const th = document.createElement('th');
        th.textContent = `${c.name} (×${c.weight})`;
        hRow.appendChild(th);
    });
    thead.appendChild(hRow);
    scoreTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    d.options.forEach(opt => {
        const row = document.createElement('tr');
        const nameTd = document.createElement('td');
        nameTd.textContent = opt;
        row.appendChild(nameTd);

        d.criteria.forEach(c => {
            const td  = document.createElement('td');
            const key = `${opt}::${c.id}`;
            const curVal = scoreMap[key] || 0;
            const sel = document.createElement('select');
            sel.className = 'score-select';
            sel.innerHTML = `<option value="0" ${!curVal ? 'selected' : ''}>—</option>` +
                [1,2,3,4,5].map(v => `<option value="${v}" ${v===curVal?'selected':''}>${v}</option>`).join('');
            sel.addEventListener('change', async () => {
                const val = parseInt(sel.value);
                if (val === 0) return;
                await withErrorHandling(() => SetScore(currentDecisionID, opt, c.id, val));
            });
            scoreSelects[key] = { sel, opt, criterionID: c.id, criterionName: c.name };
            td.appendChild(sel);
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    scoreTable.appendChild(tbody);
}

// ── AI 辅助评分 ────────────────────────────────────────────────────────────
document.getElementById('btn-ai-scores').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (btn.disabled) return;
    btn.disabled = true;
    setLoading(aiScoresPanel, '正在请求 AI 评分建议…');

    try {
        const suggestions = await SuggestScores(currentDecisionID);
        const d = await GetDecision(currentDecisionID);

        // 构建 criterionName → criterionID 映射
        const nameToID = {};
        d.criteria.forEach(c => { nameToID[c.name] = c.id; });

        aiScoresPanel.innerHTML = '<div class="ai-panel-header"><span>✦ AI 评分建议（已自动填入，可手动调整）</span></div>';

        for (const s of suggestions) {
            const cid = nameToID[s.criterion];
            if (!cid) continue;
            const key  = `${s.option}::${cid}`;
            const ref  = scoreSelects[key];
            if (ref) {
                ref.sel.value = String(s.value);
                await withErrorHandling(() => SetScore(currentDecisionID, s.option, cid, s.value));
            }
            const row = document.createElement('div');
            row.className = 'ai-score-row';
            row.innerHTML = `<div class="ai-score-header">${escHtml(s.option)} × ${escHtml(s.criterion)}：${s.value} 分</div>
                             <div class="ai-score-reason">${escHtml(s.reason)}</div>`;
            aiScoresPanel.appendChild(row);
        }
    } catch (err) {
        setAIError(aiScoresPanel, err);
    } finally {
        btn.disabled = false;
    }
});

document.getElementById('btn-back-edit').addEventListener('click', async () => { await renderEdit(); showView('edit'); });
document.getElementById('btn-score-results').addEventListener('click', () => openResults());

// ── Results View ───────────────────────────────────────────────────────────
const resultsTitleEl   = document.getElementById('results-title');
const resultsList      = document.getElementById('results-list');
const aiAnalysisPanel  = document.getElementById('ai-analysis-panel');

async function openResults() {
    aiAnalysisPanel.classList.add('hidden');
    await renderResults();
    showView('results');
}

async function renderResults() {
    const d       = await GetDecision(currentDecisionID);
    const results = await GetResults(currentDecisionID);
    resultsTitleEl.textContent = d.title;
    resultsList.innerHTML = '';

    if (!results || results.length === 0) {
        resultsList.innerHTML = '<p style="color:var(--text-muted);padding:20px">没有数据，请先添加选项、标准并评分</p>';
        return;
    }

    const maxScore = Math.max(...results.map(r => r.score), 1);
    results.forEach(r => {
        const card = document.createElement('div');
        card.className = 'result-card';
        const pct = maxScore > 0 ? (r.score / maxScore * 100).toFixed(1) : 0;
        const rankClass = r.rank <= 3 ? `rank-${r.rank}` : '';
        card.innerHTML = `
            <div class="result-rank ${rankClass}">${r.rank}</div>
            <div class="result-info">
                <div class="result-option">${escHtml(r.option)}</div>
                <div class="result-bar-bg"><div class="result-bar-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="result-score">${r.score.toFixed(2)}</div>
        `;
        resultsList.appendChild(card);
    });
}

// ── AI 分析结果 ────────────────────────────────────────────────────────────
document.getElementById('btn-ai-analyze').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    if (btn.disabled) return;
    btn.disabled = true;
    aiAnalysisPanel.classList.remove('hidden');
    aiAnalysisPanel.textContent = '正在生成分析…';

    try {
        const text = await AnalyzeResults(currentDecisionID);
        aiAnalysisPanel.textContent = text;
    } catch (err) {
        aiAnalysisPanel.style.color = 'var(--danger)';
        aiAnalysisPanel.textContent = String(err);
    } finally {
        btn.disabled = false;
    }
});

document.getElementById('btn-back-score').addEventListener('click', async () => { await renderScore(); showView('score'); });

// ── Init ───────────────────────────────────────────────────────────────────
renderList();
