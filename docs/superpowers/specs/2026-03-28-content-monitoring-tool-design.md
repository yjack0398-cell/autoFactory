# Content Monitoring Tool Frontend Prototype - Design Specification

## Overview
A lightweight Next.js frontend prototype for an AI-powered Content Monitoring Dashboard. It allows content operators to manage monitoring tasks by categories, track performance metrics across multiple platforms, and leverage AI to extract daily topic insights and recommendations.

## Core Features & Scope
The application is structured into Top-level Category Management and three sub-tabs per category:
1. **Content (Tab 1)**: Raw collected contents with horizontal date navigation.
2. **Topic Analysis (Tab 2)**: AI-generated daily reports in an infinite scrolling feed, paired with a right-aligned "Topic Blackboard" for aggregated trend insights.
3. **Settings (Tab 3)**: Management form for platforms, keywords, and benchmark accounts.

## Architecture & Technology Stack
- **Framework**: Next.js (App Router setup; `/app/(dashboard)/category/[categoryId]`)
- **Styling**: Vanilla CSS / CSS Modules (Premium aesthetics: glassmorphism, micro-animations, HSL palettes, custom sans-serif fonts like Inter). **No Tailwind**.
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`) combined with mock JSON data.
- **Icons**: Lucide-react or equivalent lightweight SVG icons.
- **Mock Data**: Realistically populated fake datasets containing titles, AI summaries, rationale, and platform tags, eliminating empty placeholder states.

## Component & Layout details

### 1. Global Navigation (Category Manager)
- Top or left-aligned Navigation bar displaying categories (e.g., "Claude Code 监控", "Vibe Coding 监控").
- "New Category" action button to trigger a modal.

### 2. Tab 1: Content View (`/content`)
- **Platform Selector**: A row of platform badge buttons (TikTok, Xiaohongshu, Bilibili, Weibo) acting as quick filters. Click to toggle active states (highlighting with subtle glow/shadow).
- **Date Scroller (Actionable Timeline)**:
  - Horizontal scrolling row of Date Cards.
  - Each card represents a day, showing the date (e.g., "Mar 28") and a visual indicator of data volume (e.g., a colored dot or mini bar chart).
- **Data Grid**: Masonry or grid layout presenting the captured content posts (thumbnail, title, platform, stats).

### 3. Tab 2: Topic Analysis & Report (`/report`)
- **Main Feed (Left, 70% width)**: 
  - An infinite-scrolling feed of Daily AI Reports.
  - Each day's block contains:
    - AI Summary Paragraph.
    - Top 3 Recommended Topics (Cards containing "Topic Title" and "Topic Rationale/Growth Potential").
- **Topic Blackboard (Right, 30% width)**:
  - Fixed aside panel aggregating the top keywords and topics over the last 7 to 30 days.
  - Clicking an item in the Blackboard acts as a quick-filter on the main feed to isolate relevance.

### 4. Tab 3: Monitoring Settings (`/settings`)
- **Form Interface**: A highly refined, clean settings form.
- **Fields**:
  - Platforms: Checkbox grid with platform logos.
  - Benchmark Keywords: A tagging input (type and press enter to create tags).
  - Benchmark Accounts: A list view with add/remove capability.
- **Interactions**: Immediate visual feedback on save or modify acts using subtle toast notifications.

## Design Aesthetic (Premium UI)
- **Palette**: Sophisticated dark-mode default or sleek light mode with carefully chosen HSL values (e.g., slate/indigo foundations).
- **Typography**: Clean, readable sans-serif (Inter/Roboto).
- **Animations**: Subtle spring or ease-in-out transitions on hover states (buttons, date cards, content cards).

## Extensibility
- Components are built independently so backend engineers can easily swap mock JSON with actual API fetch requests later.
