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
  { id: "p1", date: "2026-03-28", title: "Claude 3.5 Sonnet: The end of manual coding?", platform: "Twitter", likes: 25400 },
  { id: "p2", date: "2026-03-28", title: "The rise of 'Vibe Coding' in 2026", platform: "Reddit", likes: 12800 },
  { id: "p3", date: "2026-03-28", title: "Claude 3 超越 GPT-4 的几个瞬间", platform: "小红书", likes: 1205 },
  { id: "p4", date: "2026-03-28", title: "用 Cursor 半天写完一个全栈 App", platform: "B站", likes: 8900 },
  { id: "p5", date: "2026-03-27", title: "Is Devin actually overhyped? A deep dive.", platform: "Twitter", likes: 18200 },
  { id: "p6", date: "2026-03-27", title: "New open source model beats Llama-3 in coding", platform: "Reddit", likes: 34500 },
  { id: "p7", date: "2026-03-27", title: "放弃 VSCode，全面拥抱 AI 编辑器", platform: "抖音", likes: 45000 }
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
