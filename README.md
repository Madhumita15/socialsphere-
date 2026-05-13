🌐 SocialSphere

SocialSphere is a modern full-stack social media platform inspired by applications like Instagram.
The platform allows users to share posts and reels, interact with creators, explore trending content, and experience a real-time social networking environment.
This project was developed as a final project using modern web technologies with a focus on scalable frontend architecture, real-time user interaction, moderation systems, analytics dashboards, and role-based access control.

The platform includes three major roles:

User
Moderator
Admin

Each role has dedicated functionalities and dashboards to manage different parts of the application.

🚀 Live Demo
🔗 https://socialsphere-alpha.vercel.app/



📸 Project Overview

SocialSphere is designed to simulate a production-level social media application.

The application provides:

Authentication system
Post and reels sharing
Infinite scrolling feeds
User interaction system
Role-based moderation
Admin analytics dashboard
Trending hashtag engine
Report management system
Flagged content moderation

The project architecture focuses on performance optimization, scalable state management, and clean UI/UX design.


✨ Core Features
👤 User Features
🔐 Authentication System

Users can:

Sign up with email and password
Login securely
Complete onboarding flow
Maintain authenticated sessions

Supabase Authentication is used for secure user management.


📝 Create Posts & Reels

Users can:

Upload images and videos
Create posts with captions
Add hashtags
Add location details
Share reels content


❤️ Social Interaction Features

Users can interact with content through:

Likes
Saves / Bookmarks
Following other users
Viewing followers & following lists


🎞️ Reels System

The application includes a reels page with:

Infinite scrolling
Smooth content loading
Short video browsing experience


🔍 Discovery Page

The discovery page allows users to:

Explore trending posts
Discover reels
Interact with content globally


👤 Profile Management

Each user profile displays:

Profile information
Total posts
Followers count
Following count
Saved posts
Uploaded content


🚨 Moderation System

One of the major highlights of SocialSphere is its multi-layer moderation architecture.


1️⃣ Individual Report Moderation

Users can report inappropriate posts.

When a user reports a post:

The report is stored in the reports table
The content can be hidden only for the reporting user
Other users can still access the post

Moderators can then:

Resolve the report
Remove the content if necessary

If resolved:

The reporting user can view the post again.


2️⃣ Global Flagged Moderation

If multiple users report the same post:

The report count increases
Once the threshold is exceeded, the post becomes globally flagged

Flagged posts are visible to users with a warning indicator.

Moderators can:

Approve the post
Remove the post globally
If Approved
The flagged state is removed
The post becomes publicly visible again
If Removed
The post becomes hidden globally
No users can access the content.


🛡️ Moderator Dashboard

The moderator dashboard includes:

Pending reports management
Flagged content management
Report analytics
Category-based report tracking
Monthly moderation analytics using Recharts

Moderators help maintain platform safety and content quality.


⚙️ Admin Dashboard

The admin dashboard provides complete platform management tools.

📊 Analytics Features

Admins can monitor:

Total active users
Total active posts
Total engagement metrics
User growth rate
Monthly user growth
Trending hashtags
Platform analytics



👥 User Management

Admins can:

Block users
Unblock users
Monitor platform activity


📌 Post Management

Admins can:

Pin posts to top feeds
Increase trending scores
Control content visibility

Pinned posts appear at the top of feed and reels pages.


📈 Trending Hashtag System

Trending hashtags are generated dynamically by:

Counting hashtag occurrences
Filtering only active and visible posts
Ranking hashtags based on frequency

This creates a real-time trending engine similar to modern social platforms.


🧠 Technical Architecture

The project follows a scalable frontend architecture using reusable components, optimized state management, and modular service layers.

🛠️ Tech Stack
Frontend
Next.js
React.js
TypeScript
Tailwind CSS
Shadcn UI


State Management & Data Fetching
TanStack Query (React Query)

Used for:

Caching
API synchronization
Mutation handling
Optimistic UI updates
Real-time state management
Backend & Database
Supabase
PostgreSQL
Supabase Authentication
Supabase Storage
Supabase RPC Functions


Charts & Analytics
Recharts

Used for:

User growth analytics
Report category analytics
Platform engagement statistics

⚡ Performance Optimizations

The project includes several optimization techniques:

Infinite scrolling
Query caching
Lazy loading
Optimistic updates
Efficient API refetching
Role-based route protection
