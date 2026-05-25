# radarAI

## Local Development

### Prerequisites

- **Node.js** 20.19+ or 22.12+ (required by Vite)
- **npm** (Node Package Manager)

### Installation & Setup

1. **Install Node.js** (if not already installed)
   - If you have Homebrew: `brew install node@22`
   - Otherwise, download from [nodejs.org](https://nodejs.org/)
   
   **Note:** npm is bundled with Node.js and not installed separately.

2. **Verify installation:**
   ```bash
   node --version  # Should be v20.19+ or v22.12+
   npm --version   # Should be v10+
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start dev server:**
   ```bash
   npm run dev
   ```
   
   Server will be available at: **http://localhost:8080/**

### Available Scripts

- `npm run dev` — Start dev server with hot reload
- `npm run build` — Build for production
- `npm run build:dev` — Build for development
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

### Tech Stack

- **Framework:** React 19 + TanStack Start
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Radix UI
- **Router:** TanStack Router
- **Forms:** React Hook Form
- **State:** TanStack Query
