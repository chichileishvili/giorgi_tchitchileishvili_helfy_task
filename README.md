# Task Manager App

This is a simple task manager app I built with React on the frontend and Express.js on the backend. Tasks are stored in memory on the server, no database needed.

---

## How to run it

You need Node.js installed. Open two terminals and run each part separately.

**Backend** (runs on port 4000):

```bash
cd backend
npm install
npm start
```

**Frontend** (runs on port 3000):

```bash
cd frontend
npm install
npm start
```

Once both are running, open http://localhost:3000 in your browser.

---

## What it does

The main feature is the endless animated carousel at the top that scrolls through all your tasks. Below that is a full task grid where you can filter, search, and sort.

You can create tasks with a title, description, priority, and due date. Each task can be edited, deleted, or marked as complete. If a due date has passed, it shows up in red on the card.

There are also a few bonus things I added:

- Sorting by title, priority, or date
- Dark/light theme toggle in the navbar
- Tasks and theme are saved to localStorage so nothing disappears on refresh
- Drag and drop to reorder tasks in the grid (turns off automatically when a sort is active)
- Search activates after you type 3 letters to avoid unnecessary filtering while typing

---

## API

The backend exposes these endpoints under `/api/tasks`:

- `GET /api/tasks` � returns all tasks
- `POST /api/tasks` � creates a new task, expects `title` (required), `description`, `priority`, and `dueDate` in the body
- `PUT /api/tasks/:id` � updates an existing task
- `DELETE /api/tasks/:id` � deletes a task
- `PATCH /api/tasks/:id/toggle` � flips the completed status

Validation runs on both sides � the frontend checks before sending and the backend middleware checks again just to be safe.

---

## Project layout

```
task-manager/
+-- backend/
�   +-- server.js
�   +-- routes/tasks.js
�   +-- middleware/validation.js
+-- frontend/
�   +-- src/
�       +-- App.js
�       +-- components/
�       +-- hooks/useTasks.js
�       +-- services/taskServices.js
�       +-- styles/
+-- .gitignore
+-- README.md
```

---

## A few notes on decisions I made

I had a similar project at a previous job so I drew design and UX references from that, especially the drag and drop behavior � it inserts the dragged card at the target position rather than swapping the two cards.

I put all the state logic (filter, sort, search, tasks) into a single `useTasks` hook so `App.js` stays clean and readable. The service layer (`taskServices.js`) is a separate hook so the fetch functions could be reused somewhere else if needed.

The dark theme is done entirely with CSS custom properties, so switching themes is just one attribute change on the `<html>` element.

Tasks reset when the backend restarts since there is no database, but localStorage on the frontend keeps them visible until the next server fetch.

---

## Time spent

Backend took around - 1hour
Frontend and It's readable code refactor - 1hour
Bonus tasks - 50min
Testing + Debuging - 40min
