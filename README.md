# TaskFlow - Premium Task Management Workspace

A modern, elegant, and interactive task management workspace built with **React**, **Redux**, **Material UI (MUI)**, and **Tailwind CSS**.

Developed by: **Javeria**

---

## 🎨 Key Features

* **Dialog Modal Task Creation:** Creating tasks is triggered via a beautiful Dialog modal popup, leaving your main dashboard workspace clean and uncluttered.
* **Locked Premium Dark Theme:** Customized deep slate background (`#0b0f19`) featuring subtle blue/purple radial glows, modern fonts (Outfit & Plus Jakarta Sans), and elegant container overlays.
* **Unified Control Bar:** Search bar, create button, and dynamic filter tags ("All", "Active", "Completed") with active count badges are grouped on a single top row.
* **Flexible Deadlines & Due Statuses:** Tasks display relative, color-coded status badges:
  * **Overdue:** Pulsing red badge showing exactly how many days ago it was due.
  * **Due Today:** Warning amber badge.
  * **Due Tomorrow:** Info blue badge.
  * **Future/Completed:** Standard slate badge.
* **Inline Task Updates:** Modify task descriptions, change priority (Low, Medium, High), and adjust due dates dynamically without leaving the main page.
* **Local Storage Persistence:** Todos are fully persisted in `localStorage`. Task status and filter presets will remain intact on page refreshes.

---

## 🛠️ State Management Architecture

The project is structured around a centralized Redux store using standard action-reducer architectures:

* **Actions (`src/redux/todoActions.js`):** Actions for `ADD_TODO` (passing text, priority, and due dates), `DELET_TODO`, `TOGGLE_TODO`, and `EDIT_TODO`.
* **Reducer (`src/redux/todoReducer.js`):** Handles task mutations, initial state hydration, and seeds your workspace with default tasks:
  1. *Data Structures assignment* (High Priority)
  2. *Walk* (Medium Priority)
  3. *Drink Water* (Low Priority)
* **Store Subscriber (`src/redux/store.js`):** Listens to actions and automatically serializes active todos to `localStorage`.

---

## 🚀 Setup & Run Instructions

Follow these commands in your powershell terminal to set up and launch TaskFlow locally:

### 1. Navigate to the project directory
```powershell
cd c:\Work\todo-app
```

### 2. Install dependencies
```powershell
npm install
```

### 3. Run the development server
```powershell
npm run dev
```

### 4. Build for production (Optional)
To verify everything compiles and bundles efficiently:
```powershell
npm run build
```

---

## 💡 Notes for Testing
* **Browser address:** After starting the development server, open **`http://localhost:5173/`** in your browser.
* **Clearing Cache:** If you have run a previous version of the app in your browser, the store will read your old cache first. Clear your browser's local storage for `localhost:5173` or delete the previous tasks via the interface to see the new default tasks preloaded!
