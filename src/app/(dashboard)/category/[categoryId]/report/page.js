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
