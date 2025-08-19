# Mementoria Project Setup Guide

## 🎯 Project Overview

Mementoria is a full-stack web application built with:
- **Frontend**: React + TypeScript + Vite + TanStack Router + Tailwind CSS
- **Backend**: Fastify + TypeScript + Prisma + PostgreSQL
- **Architecture**: Monorepo using Turborepo + pnpm

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v10.10.0 or higher)
- PostgreSQL (v15 or higher)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Database Setup
```bash
# Start PostgreSQL (if not already running)
brew services start postgresql@15

# Create database and user (if not exists)
psql -U postgres
CREATE USER peilutu WITH ENCRYPTED PASSWORD '1990';
CREATE DATABASE memento_db OWNER peilutu;
ALTER ROLE peilutu CREATEDB;
\q
```

### 3. Environment Configuration

#### Server (.env)
Create `apps/server/.env`:
```env
PORT=3001
BETTER_AUTH_SECRET=your-secret-key-here-change-this-in-production
BETTER_AUTH_URL=http://localhost:3001
DATABASE_URL=postgresql://peilutu:1990@localhost:5432/memento_db?schema=public
CLIENT_ORIGIN=http://localhost:3000
```

#### Client (.env)
Create `apps/client/.env`:
```env
VITE_SERVER_URL=http://localhost:3001
```

### 4. Database Migration
```bash
cd apps/server
pnpm prisma generate
pnpm prisma migrate dev --name init
```

### 5. Start Development Servers

#### Terminal 1 - Backend
```bash
cd apps/server
pnpm dev
```
Server will run on: http://localhost:3001

#### Terminal 2 - Frontend
```bash
cd apps/client
pnpm dev
```
Client will run on: http://localhost:3000

## 🏗️ Project Structure

```
mementoria/
├── apps/
│   ├── client/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/     # UI components
│   │   │   ├── routes/         # TanStack Router routes
│   │   │   ├── lib/           # Utilities and auth
│   │   │   └── main.tsx       # Entry point
│   │   └── package.json
│   └── server/                 # Fastify backend
│       ├── src/
│       │   ├── main/          # Server entry point
│       │   │   ├── routes/    # API routes
│       │   │   └── lib/       # Server utilities
│       │   └── generated/     # Prisma client
│       ├── prisma/            # Database schema
│       └── package.json
├── package.json               # Root package.json
├── turbo.json                 # Turborepo config
└── pnpm-workspace.yaml       # pnpm workspace config
```

## 🛣️ Available Routes

### Frontend Routes
- `/` - Landing page
- `/auth` - Authentication (login/signup)
- `/app` - Main application dashboard
- `/app/scrapebooks` - Scrapebook collection
- `/app/settings` - User settings

### Backend API Routes
- `/api/health` - Health check endpoint
- `/api/auth/*` - Authentication endpoints

## 🧪 Testing

### Run All Checks
```bash
pnpm run check          # Lint and type check
pnpm run check-fix      # Auto-fix issues
pnpm run test           # Run tests
```

### Individual Package Commands
```bash
# Frontend
cd apps/client
pnpm run dev            # Start dev server
pnpm run build          # Build for production
pnpm run check          # Run Biome checks

# Backend
cd apps/server
pnpm run dev            # Start dev server with nodemon
pnpm run build          # Build TypeScript
pnpm run start          # Start production server
```

## 🔧 Development Workflow

### 1. Start Development Environment
```bash
# Terminal 1: Backend
cd apps/server
pnpm dev

# Terminal 2: Frontend  
cd apps/client
pnpm dev
```

### 2. Database Changes
```bash
cd apps/server
# Edit prisma/schema.prisma
pnpm prisma migrate dev --name your-change-name
pnpm prisma generate
```

### 3. Code Quality
```bash
# Format code
pnpm run format

# Lint and fix
pnpm run check-fix
```

## 🚨 Common Issues & Solutions

### PostgreSQL Connection Issues
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql@15

# Check port usage
lsof -i :5432
```

### Port Already in Use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

### Prisma Issues
```bash
cd apps/server
pnpm prisma generate    # Regenerate client
pnpm prisma migrate dev # Reset migrations
```

## 📱 Accessing Your Application

1. **Frontend**: Open http://localhost:3000 in your browser
2. **Backend API**: http://localhost:3001
3. **Health Check**: http://localhost:3001/api/health
4. **Database**: Use pgAdmin or psql to connect to `memento_db`

## 🎨 UI Components

The project uses Shadcn UI components. To add new components:
```bash
cd apps/client
npx shadcn@latest add [component-name]
```

## 🔐 Authentication

The project uses Better Auth for authentication. Configuration is in:
- `apps/server/src/main/lib/auth.ts`
- `apps/client/src/lib/auth-client.ts`

## 📊 Database Management

### Prisma Studio (Visual Database Browser)
```bash
cd apps/server
pnpm dlx prisma studio
```

### Manual Database Access
```bash
psql -U peilutu -d memento_db -h localhost
```

## 🚀 Production Build

```bash
# Build all packages
pnpm run build

# Start production servers
cd apps/server && pnpm start
cd apps/client && pnpm serve
```

## 📚 Additional Resources

- [TanStack Router Documentation](https://tanstack.com/router)
- [Fastify Documentation](https://www.fastify.io/)
- [Prisma Documentation](https://www.prisma.io/)
- [Turborepo Documentation](https://turbo.build/repo)

## 🆘 Getting Help

If you encounter issues:
1. Check the logs in your terminal
2. Verify environment variables are set correctly
3. Ensure PostgreSQL is running
4. Check if ports 3000 and 3001 are available
5. Run `pnpm run check` to identify code issues 