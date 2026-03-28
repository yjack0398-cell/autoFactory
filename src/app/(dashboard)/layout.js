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
