## Description
- I always wanted a tool where I am able to track all of my stocks and dividends that they yield but modern day tools doesn't allow me to log informations, I don't like tracking data on excel either. Created this web app which allows users to enter their own data like average pricing, yield and the stock itself which then allows the users the chart a portfolio. Calculator is created because I like to crunch numbers when doing things related to stocks

## Technology utilized

### Core Framework & Language

-Next.js 15+ (App Router): The React framework used for structure, routing, and optimization.\
-React 19: The latest version of the UI library for building component-based interfaces.\
-TypeScript: Ensures type safety and cleaner code with interfaces for Stocks and Dividends.

### Styling & Design
-Vanilla CSS & CSS Modules: Custom-written CSS for granular control over the design without external utility libraries like Tailwind.\
-Glassmorphism: A premium design aesthetic using backdrop-filter, semi-transparent backgrounds, and subtle borders.\
-CSS Animations: Custom keyframe animations for the "Aurora" background (@keyframes aurora) and list entry effects (@keyframes enter).\
-Google Fonts (Next/Font): Using "Outfit" for a modern, clean typography.

### Features & Libraries
-Recharts: A composable charting library used for the Portfolio Allocation Pie Chart.\
-Lucide-React: A lightweight, consistent icon library used for UI elements (Trash, Edit, Plus, Calculator icons).\
-Local Storage: Browser-based persistence to save your portfolio and dividend data between sessions without a backend database.\
-Math: Custom logic for the Compound Interest Calculator and Basic Calculator widget.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<img width="1782" height="1301" alt="image" src="https://github.com/user-attachments/assets/21880e34-8746-405c-a8cc-1f4bc790e1a6" />



