# DevRooms

DevRooms enables developers to collaborate in real-time through shared coding environments with integrated video conferencing. Create rooms, pair program, and debug together – all within a single platform.

## 📺 Demo Video

[![DevRooms Demo](https://img.youtube.com/vi/REN1kfR9sdg/0.jpg)](https://youtu.be/REN1kfR9sdg)


## ✨ Features

### Core Functionality
- **Real-time Code Collaboration**
  - Shared code editor with syntax highlighting
  - Live cursor positions and code changes
- **Video Conferencing**
  - Integrated video/audio calls with screen sharing
  - Powered by GetStream.io 
- **Room Management**
  - Create/update/delete coding rooms
  - Set primary programming languages
  - GitHub repository integration

### Developer Experience
- **Authentication**
  - Google OAuth via NextAuth
  - Session management with JWT
- **Search & Discovery**
  - Filter rooms by programming language
  - Tag-based search system
- **Responsive Design**
  - Fully responsive UI for all devices
  - Dark/light mode toggle

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animation**: Framer Motion
- **State Management**: Zustand

### Backend
- **Database**: PostgreSQL (NeonDB)
- **ORM**: Prisma
- **Auth**: NextAuth
- **Video**: GetStream SDK

### Infrastructure
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Database Hosting**: Neon.tech

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (NeonDB recommended)
- Google OAuth credentials
- GetStream account

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/devrooms.git
cd devrooms

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
