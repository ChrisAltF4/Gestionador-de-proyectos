# GestorPro


A **project tracking** web application for companies and corporations. It shows the budget, the amount spent and the remaining balance of each project, item by item, and lets you record expenses that update the totals instantly.

**Live demo:** [https://gestorpro.page](https://gestorpro.page)

---

## Screenshots

### Dashboard

Overview with cards for total budget, amount spent, balance and active or at-risk projects, a budget vs. spent chart per project, and an alerts panel.

![Dashboard](public/Screenshots/dashboard.png)

### Projects list

Table with search, a status filter, execution progress, and actions to view, edit and delete projects.

![Projects list](public/Screenshots/proyectos.png)

---

## Current status

| Part | Status |
|---|---|
| Dashboard (KPIs, bar chart and alerts) | Working, reads the shared data |
| Projects list (search, filter, create, edit and delete) | Working, changes are reflected on the dashboard |
| Project detail (`/proyectos/[id]`) | **Prototype**: uses fixed sample data, not yet connected to the shared data |
| Expense logging | **Prototype**: only works inside the detail page and does not affect the dashboard or the list |

### What it does today

- **Dashboard** with cards for total budget, amount spent, balance and active or at-risk projects, a budget vs. spent chart per project, and an alerts panel with the budget items that are at 85% or more.
- **Project management**: table with search by name or manager, a status filter, execution progress, and create, edit and delete through a modal form (including the budget of each item).
- **Simulated data** generated with Faker, in Colombian pesos (COP).

The budget items of each project are: Personal (staff), Equipos (equipment), Software/Licencias (software and licenses), Servicios externos (external services), Viáticos (travel expenses), Capacitación (training) and Imprevistos (contingencies).

### Pending

- Connect the project detail to the shared data, so it shows the real budget items of the selected project (today it always shows the same sample project).
- Make logging an expense update the spent amount, the balance, the alerts and the dashboard.
- Per-item charts and monthly execution in the detail view.

## Tech stack

| Tool | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework and routing |
| [React](https://react.dev/) + TypeScript | UI and typing |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Recharts](https://recharts.org/) | Charts |
| [Zustand](https://zustand-demo.pmnd.rs/) | State shared between pages |
| [@faker-js/faker](https://fakerjs.dev/) | Simulated data |
| [lucide-react](https://lucide.dev/) | Icons |
| [Vercel](https://vercel.com/) | Deployment |

## Routes

| Route | Description |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Overview, chart and alerts |
| `/proyectos` | Projects list with search, filter and CRUD |
| `/proyectos/[id]` | Project detail (prototype with sample data) |

## Running locally

Requirements: [Node.js](https://nodejs.org/) 20 or higher and Git.

```bash
# 1. Clone the repository
git clone https://github.com/ChrisAltF4/Gestionador-de-proyectos.git
cd Gestionador-de-proyectos

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```bash
npm run build
npm start
```

## Project structure

```
.
├── app/
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Redirects to /dashboard
│   └── (dashboard)/
│       ├── layout.tsx               # Sidebar + content
│       ├── dashboard/page.tsx       # Dashboard
│       └── proyectos/
│           ├── page.tsx             # Projects list
│           └── [id]/page.tsx        # Project detail (prototype)
├── components/
│   ├── sidebar.tsx                  # Side menu
│   ├── kpiCard.tsx                  # KPI card
│   ├── statusBadge.tsx              # Status chip (not used yet)
│   ├── progressBar.tsx              # Progress bar (not used yet)
│   ├── projectform.tsx              # Project form
│   └── expenseForm.tsx              # Expense form (used in the detail page)
├── lib/
│   ├── types.ts                     # Types (Project, Expense, budget items)
│   ├── faker-data.ts                # Data generation with Faker
│   ├── store.ts                     # Global state (Zustand)
│   └── utils.ts                     # COP formatting and calculations
└── public/
    └── Screenshots/                 # README screenshots
```

## How the data works

- Projects are generated with **Faker** using a fixed seed (`faker.seed(123)`), so everyone sees the same data when opening the app.
- The **spent amount** and the **balance** are not stored, they are calculated:
  - Spent amount of an item = sum of the expenses of that item.
  - Balance = item budget − spent amount.
- Amounts are displayed in Colombian pesos using `Intl.NumberFormat("es-CO")`.
- Alert levels are: **normal** (under 85%), **warning** (85% or more) and **overspent** (over 100%).

> **Note:** the project has no backend or database. Changes (creating, editing and deleting projects) live in the browser and are lost when the page is reloaded, which returns to the initial Faker data.

## Team workflow

- `main`: stable, deployed version.
- `develop`: integration branch where the work is merged.
- `feature/...`: one branch per feature, merged into `develop` through a Pull Request.
- `fix/...`: bug fixes.

Commit messages follow the `type: description` format (`feat`, `fix`, `style`, `chore`, `docs`, `refactor`).

Every push to `main` is automatically deployed on Vercel.

## Team

| Member | Responsibility |
|---|---|
| _Christian_ | Data and logic (`lib/`) |
| _Fiorella_ | Layout, sidebar and shared components |
| _Luis_ | Projects list |
| _Alejandro_ | Project detail and expense logging |
| _Christian_ | Dashboard |

---

Academic project built with Next.js.
