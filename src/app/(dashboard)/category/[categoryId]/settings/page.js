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
