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
