# Content Monitoring Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend prototype for an AI-powered Content Monitoring Tool using Next.js and pure CSS.

**Architecture:** App Router with a Category Layout. Components are pure React functional components utilizing CSS Modules for scoped styling. Data is managed via a centralized mock data service simulating async fetches.

**Tech Stack:** Next.js (App Router), React, Vanilla CSS (CSS Modules), Lucide React (for icons), Vitest (for testing).

---

### Task 1: Scaffolding the Next.js Project

**Files:**
- Create: `package.json` (via npx)
- Modify: `src/app/globals.css`
- Modify: `src/app/page.js`

- [ ] **Step 1: Initialize Next.js app (No Tailwind)**
```bash
npx -y create-next-app@latest . --javascript --eslint --app --src-dir --import-alias "@/*" --no-tailwind
npm install lucide-react
```

- [ ] **Step 2: Define global CSS Theme (globals.css)**
```css
/* src/app/globals.css */
:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --surface: #ffffff;
  --border: #e2e8f0;
  --text-muted: #64748b;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --radius-md: 8px;
  --radius-lg: 12px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --foreground: #f8fafc;
    --surface: #1e293b;
    --border: #334155;
    --text-muted: #94a3b8;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 3: Setup Index Page Redirect**
```javascript
// src/app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/category/claude/content");
}
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: scaffold Next.js app with global themes"
```

---

### Task 2: Mock Data Service

**Files:**
- Create: `src/lib/mockData.js`

- [ ] **Step 1: Write Mock Data Service**
```javascript
// src/lib/mockData.js
export const CATEGORIES = [
  { id: "claude", name: "Claude Code 监控" },
  { id: "vibe", name: "Vibe Coding 监控" }
];

export const MOCK_REPORTS = [
  {
    id: "r1",
    date: "2026-03-28",
    summary: "今日 AI 开发助手讨论热度持续上升，核心痛点集中在上下文遗忘与多智能体协作冲突。",
    topics: [
      { 
        title: "如何打破 AI 编程助手的上下文长度魔咒？", 
        rationale: "用户对多文件大型项目的重构需求强烈，此选题极具爆点，可以结合实例进行对比测试。"
      },
      {
        title: "Vibe Coding 失败指南：新手常踩的5个坑",
        rationale: "反向操作，利用用户的焦虑感和好奇心，干货属性强，容易获得高转发。"
      }
    ]
  },
  {
    id: "r2",
    date: "2026-03-27",
    summary: "小红书上关于独立开发者的商业化变现路径成为热议话题。",
    topics: [
      { 
        title: "月入一万的独立开发，做对了哪三件事？", 
        rationale: "变现是永恒的痛点，用真实数据背书，极度吸引流量。"
      }
    ]
  }
];

export const MOCK_POSTS = [
  { id: "p1", date: "2026-03-28", title: "Claude 3 超越 GPT-4 的几个瞬间", platform: "小红书", likes: 1205 },
  { id: "p2", date: "2026-03-28", title: "用 Cursor 半天写完一个全栈 App", platform: "B站", likes: 8900 },
  { id: "p3", date: "2026-03-27", title: "放弃 VSCode，全面拥抱 AI 编辑器", platform: "抖音", likes: 45000 }
];

export async function getCategories() {
  return CATEGORIES;
}

export async function getDailyReports(categoryId) {
  return MOCK_REPORTS; // Simple fetch simulation
}

export async function getPostsByDate(categoryId, date) {
  return MOCK_POSTS.filter(p => p.date === date);
}
```

- [ ] **Step 2: Commit**
```bash
git add src/lib/mockData.js
git commit -m "feat: add mock data service"
```

---

### Task 3: Layout & Navigation Shell

**Files:**
- Create: `src/app/(dashboard)/layout.js`
- Create: `src/app/(dashboard)/layout.module.css`

- [ ] **Step 1: Write Layout Styles**
```css
/* src/app/(dashboard)/layout.module.css */
.container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 1.5rem;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.navItem {
  display: block;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.2s;
}
.navItem:hover, .navItemActive {
  background: var(--primary);
  color: white;
}
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  padding: 0 2rem;
}
.tab {
  padding: 1rem 1.5rem;
  color: var(--text-muted);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.tabActive {
  color: var(--primary);
  border-bottom-color: var(--primary);
  font-weight: 600;
}
.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
```

- [ ] **Step 2: Write Layout Component**
```javascript
// src/app/(dashboard)/layout.js
"use client";
import React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { CATEGORIES } from '@/lib/mockData';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  // Extract category id from path /category/[id]/...
  const pathParts = pathname.split('/');
  const currentCategoryId = pathParts[2] || 'claude';
  const currentTab = pathParts[3] || 'content';

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 style={{fontSize: '1.2rem', marginBottom: '2rem'}}>监控控制台</h2>
        <nav>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.id}/content`}
              className={`${styles.navItem} ${currentCategoryId === cat.id ? styles.navItemActive : ''}`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.tabs}>
          <Link href={`/category/${currentCategoryId}/content`} className={`${styles.tab} ${currentTab === 'content' ? styles.tabActive : ''}`}>内容</Link>
          <Link href={`/category/${currentCategoryId}/report`} className={`${styles.tab} ${currentTab === 'report' ? styles.tabActive : ''}`}>选题分析与报告</Link>
          <Link href={`/category/${currentCategoryId}/settings`} className={`${styles.tab} ${currentTab === 'settings' ? styles.tabActive : ''}`}>监控设置</Link>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/(dashboard)/layout.js src/app/(dashboard)/layout.module.css
git commit -m "feat: add global dashboard layout and tab navigation"
```

---

### Task 4: Tab 1 - Content View (Date Cards)

**Files:**
- Create: `src/app/(dashboard)/category/[categoryId]/content/page.js`
- Create: `src/app/(dashboard)/category/[categoryId]/content/content.module.css`

- [ ] **Step 1: Write View Styles**
```css
/* src/app/(dashboard)/category/[categoryId]/content/content.module.css */
.dateScroller {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
.dateCard {
  min-width: 120px;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dateCardActive {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow-md);
}
.dateLabel {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.volumeIndicator {
  width: 100%;
  border-radius: 99px;
  height: 6px;
  background: var(--border);
  overflow: hidden;
}
.volumeFill {
  height: 100%;
  background: #10b981;
}
.dateCardActive .volumeIndicator {
  background: rgba(255,255,255,0.3);
}
.dateCardActive .volumeFill {
  background: white;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.postCard {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.platform {
  font-size: 0.8rem;
  color: var(--primary);
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 99px;
}
.title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}
.meta {
  color: var(--text-muted);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
```

- [ ] **Step 2: Write Page Component**
```javascript
// src/app/(dashboard)/category/[categoryId]/content/page.js
"use client";
import React, { useState } from 'react';
import { MOCK_POSTS } from '@/lib/mockData';
import styles from './content.module.css';
import { Heart } from 'lucide-react';

const DATES = [
  { date: '2026-03-24', volume: 40 },
  { date: '2026-03-25', volume: 60 },
  { date: '2026-03-26', volume: 30 },
  { date: '2026-03-27', volume: 90 },
  { date: '2026-03-28', volume: 100 },
];

export default function ContentPage() {
  const [selectedDate, setSelectedDate] = useState('2026-03-28');
  
  const posts = MOCK_POSTS.filter(p => p.date === selectedDate);

  return (
    <div>
      <h1 style={{marginBottom: "2rem"}}>内容监控</h1>
      
      <div className={styles.dateScroller}>
        {DATES.map(d => (
          <div 
            key={d.date} 
            className={`${styles.dateCard} ${selectedDate === d.date ? styles.dateCardActive : ''}`}
            onClick={() => setSelectedDate(d.date)}
          >
            <span className={styles.dateLabel}>{d.date.substring(5)}</span>
            <div className={styles.volumeIndicator}>
              <div className={styles.volumeFill} style={{width: `${d.volume}%`}}></div>
            </div>
            <span style={{fontSize: "0.8rem", marginTop: "0.5rem", opacity: 0.8}}>{d.volume * 12} 篇</span>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {posts.length > 0 ? posts.map(post => (
          <div key={post.id} className={styles.postCard}>
            <span className={styles.platform}>{post.platform}</span>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.meta}>
              <Heart size={16} /> {post.likes} 赞
            </div>
          </div>
        )) : (
          <p style={{color: "var(--text-muted)"}}>该日期暂无数据</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/(dashboard)/category/*/content
git commit -m "feat: add content view with date scroller"
```

---

### Task 5: Tab 2 - Topic Analysis (Infinite Feed & Blackboard)

**Files:**
- Create: `src/app/(dashboard)/category/[categoryId]/report/page.js`
- Create: `src/app/(dashboard)/category/[categoryId]/report/report.module.css`

- [ ] **Step 1: Write CSS**
```css
/* src/app/(dashboard)/category/[categoryId]/report/report.module.css */
.container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}
.feed {
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.blackboard {
  flex: 3;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
  box-shadow: var(--shadow-sm);
}
.reportCard {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}
.reportDate {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.summary {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(79, 70, 229, 0.05);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.topicGrid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}
.topicItem {
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--background);
}
.topicTitle {
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--foreground);
}
.tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 99px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}
.tag:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
```

- [ ] **Step 2: Write Page Component**
```javascript
// src/app/(dashboard)/category/[categoryId]/report/page.js
"use client";
import React from 'react';
import { MOCK_REPORTS } from '@/lib/mockData';
import styles from './report.module.css';
import { Calendar, TrendingUp } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className={styles.container}>
      <div className={styles.feed}>
        {MOCK_REPORTS.map(report => (
          <div key={report.id} className={styles.reportCard}>
            <h2 className={styles.reportDate}><Calendar size={24} color="var(--primary)" /> {report.date} 洞察报告</h2>
            <div className={styles.summary}>{report.summary}</div>
            
            <h3 style={{marginBottom: "1rem"}}>🔥 黄金选题推荐</h3>
            <div className={styles.topicGrid}>
              {report.topics.map((topic, i) => (
                <div key={i} className={styles.topicItem}>
                  <h4 className={styles.topicTitle}>{topic.title}</h4>
                  <p style={{color: "var(--text-muted)", fontSize: "0.95rem", margin: 0, lineHeight: 1.5}}>
                    💡 <strong>切入理由：</strong>{topic.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)'}}>向下滚动加载更多...</div>
      </div>
      
      <aside className={styles.blackboard}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem'}}>
          <TrendingUp color="var(--primary)" />
          <h3 style={{margin: 0}}>本周情报黑板</h3>
        </div>
        <p style={{color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem"}}>过去 7 天高频命中的热搜关键词和选题方向：</p>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
          <span className={styles.tag}>AI 编程助手</span>
          <span className={styles.tag}>Cursor 变现</span>
          <span className={styles.tag}>独立开发者</span>
          <span className={styles.tag}>Vibe Coding 失败指南</span>
          <span className={styles.tag}>大模型上下文</span>
        </div>
      </aside>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/(dashboard)/category/*/report
git commit -m "feat: add topic analysis infinite feed and blackboard"
```

---

### Task 6: Tab 3 - Settings Platform

**Files:**
- Create: `src/app/(dashboard)/category/[categoryId]/settings/page.js`
- Create: `src/app/(dashboard)/category/[categoryId]/settings/settings.module.css`

- [ ] **Step 1: Write CSS**
```css
/* src/app/(dashboard)/category/[categoryId]/settings/settings.module.css */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 800px;
  box-shadow: var(--shadow-sm);
}
.formGroup {
  margin-bottom: 2rem;
}
.label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--background);
  color: var(--foreground);
  font-family: inherit;
}
.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
.btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover {
  background: var(--primary-hover);
}
```

- [ ] **Step 2: Write Page Component**
```javascript
// src/app/(dashboard)/category/[categoryId]/settings/page.js
"use client";
import React from 'react';
import styles from './settings.module.css';

export default function SettingsPage() {
  return (
    <div>
      <h1 style={{marginBottom: "2rem"}}>监控设置</h1>
      <div className={styles.card}>
        <div className={styles.formGroup}>
          <label className={styles.label}>监控平台</label>
          <div className={styles.desc}>选择此分类下需要爬取并分析的内容平台。</div>
          <div style={{display: 'flex', gap: '1rem'}}>
            <label><input type="checkbox" defaultChecked /> 小红书</label>
            <label><input type="checkbox" defaultChecked /> 抖音</label>
            <label><input type="checkbox" /> B站</label>
            <label><input type="checkbox" /> 微博</label>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>对标关键词</label>
          <div className={styles.desc}>输入后按回车键添加。系统将主要围绕这些词汇进行数据提取。</div>
          <input className={styles.input} type="text" placeholder="例如：Claude, Cursor, AI 编程" />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>对标账号 UID</label>
          <div className={styles.desc}>手动指定需要高频监控的特定博主账号UID。</div>
          <textarea className={styles.input} rows="3" placeholder="每行输入一个账号UID..."></textarea>
        </div>

        <button className={styles.btn} onClick={() => alert('保存成功!')}>保存并生效</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/(dashboard)/category/*/settings
git commit -m "feat: add settings form layout"
```
