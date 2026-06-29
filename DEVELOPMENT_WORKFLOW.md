# Kinga Resorts Development & Deployment Guide

This workspace uses a dual-application architecture consisting of a standalone React SPA (`hotel-react-app`) and a Laravel backend rendering React via Inertia (`hotel-app`). Any change must be applied and compiled across both projects.

---

## 1. Local Development Setup

To test changes locally, you must run both Vite development servers and the Laravel backend server.

### Start the Standalone React SPA
```bash
cd hotel-react-app
npm run dev
```
*Runs by default on [http://localhost:5173](http://localhost:5173) (or `5174` if `5173` is occupied).*

### Start the Laravel Application
You must run both the PHP web server and the Vite asset server:

**PHP Web Server:**
```bash
cd hotel-app
php artisan serve
```
*Runs by default on [http://127.0.0.1:8000](http://127.0.0.1:8000).*

**Vite Asset Compiler (HMR):**
```bash
cd hotel-app
npm run dev
```

---

## 2. Synchronization Rule (Crucial)

Since the frontend is shared, **always copy and sync edits** between both folders:

| Component Type | Standalone React SPA Path | Laravel Inertia Path |
| :--- | :--- | :--- |
| **Page Component** | `hotel-react-app/src/pages/` | `hotel-app/resources/js/Pages/` |
| **Layout Component** | `hotel-react-app/src/components/MainLayout.jsx` | `hotel-app/resources/js/Layouts/MainLayout.jsx` |
| **Global CSS** | `hotel-react-app/src/index.css` | `hotel-app/resources/css/style.css` |
| **Room Data/JSON** | `hotel-react-app/src/data/rooms.js` | `hotel-app/database/seeders/RoomSeeder.php` (DB) |
| **Static Images** | `hotel-react-app/public/image assets/` | `hotel-app/public/image assets/` |

---

## 3. Production Build Compilation

Before staging and pushing your files, compile the production bundles to confirm that there are zero Javascript syntax, asset, or styling build errors.

### Build Standalone React SPA
```bash
cd hotel-react-app
npm run build
```
*This compiles output files into `hotel-react-app/dist/`.*

### Build Laravel Inertia Assets
```bash
cd hotel-app
npm run build
```
*This compiles assets through Vite into `hotel-app/public/build/`.*

---

## 4. Git Version Control Workflow

Follow these command-line steps to track changes, commit them, and push them to GitHub.

### Step 4.1: Check Status and Differences
Check what files you have modified, added, or deleted:
```bash
git status
```
To view the line-by-line diff of modifications:
```bash
git diff
```

### Step 4.2: Create and Switch to a Feature Branch
Do not commit changes directly to `main`. Create a descriptive feature branch instead:
```bash
git checkout -b feature/your-feature-name
```
*Example:* `git checkout -b feature/mobile-responsiveness-fix`

### Step 4.3: Stage Your Changes
To add all modified, deleted, and newly created files to the commit staging area:
```bash
git add .
```
Verify they are staged (they will show up green in git status):
```bash
git status
```

### Step 4.4: Commit the Changes
Write a clear, descriptive message summarizing what work was completed:
```bash
git commit -m "Implement mobile layout fixes, update navbar styling, and sync assets"
```

### Step 4.5: Push the Branch to GitHub
Push the branch to the remote repository. The `-u` flag sets the remote tracking branch:
```bash
git push -u origin feature/your-feature-name
```

---

## 5. Merging Changes (Pull Requests)

Once pushed, visit your repository on GitHub:
`https://github.com/Spraybery/kinga-`

1. Open the **Pull Requests** tab.
2. Click **New Pull Request** and select your branch (e.g., `feature/your-feature-name`) to merge into `main`.
3. Fill in the description, inspect the changes, and click **Create pull request**.
4. Once reviewed and verified, click **Merge pull request** to integrate changes into `main`.
