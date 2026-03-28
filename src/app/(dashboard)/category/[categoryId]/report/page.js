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
            <div className={styles.reportDate}>ANALYSIS_REPORT_D:{report.date}</div>
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
        <div className={styles.blackboardTitle}>
          TOPIC_BLACKBOARD:0.8
        </div>
        <p style={{color: "var(--text-muted)", fontSize: "0.7rem", marginBottom: "1rem"}}>过去 7 天高频命中的热搜关键词和选题方向：</p>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.4rem'}}>
          <span className={styles.tag}>#AI助手</span>
          <span className={styles.tag}>#Cursor变现</span>
          <span className={styles.tag}>#独立开发者</span>
          <span className={styles.tag}>#Vibe_Failure</span>
          <span className={styles.tag}>#LLM_CTX</span>
          <span className={styles.tag}>#GLOBAL_AI</span>
          <span className={styles.tag}>#OPENSOURCE</span>
        </div>
      </aside>
    </div>
  );
}
