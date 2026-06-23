# Implementation Plan: The Last-Minute Life Saver

We are building "The Last-Minute Life Saver" — a premium, AI-powered productivity companion designed to actively help users prioritize, plan, and execute tasks. 

To demonstrate all 8 core feature requirements, we will build a highly interactive Single-Page Application (SPA) utilizing HTML5, Tailwind CSS, custom vanilla CSS (glassmorphism/glow styles), and vanilla JavaScript. By building a client-side SPA, we can deliver a premium, high-density desktop SaaS experience that runs instantly without complex server dependencies, leveraging `localStorage` for complete data persistence across refreshes.

---

## User Review Required

> [!IMPORTANT]
> **Tailwind CSS Choice:**
> We will use Tailwind CSS loaded via CDN (matching the Stitch design system code) for component layout and styling, combined with a custom CSS sheet for premium glassmorphic cards, Electric Violet glows, and custom scrollbars. 

> [!NOTE]
> **AI Layer Simulation:**
> We will simulate the Claude/Gemini AI processing entirely in the browser using robust natural language processing (regex + keyword extraction) and deterministic heuristics for task planning, scheduling optimization, and chat feedback. This ensures the demo is fully functional, free, and runs offline without API keys.

---

## Proposed Changes

We will create the project files in the workspace: `c:\Users\Admin\Documents\Projects\Last min Life Saver`

### Core Layout and Routing

#### [NEW] [index.html](file:///c:/Users/Admin/Documents/Projects/Last min Life Saver/index.html)
The entry point of the application. It will contain:
- A unified Sidebar Navigation (Dashboard, Tasks, AI Assistant, Calendar, Goals, Analytics).
- A Top AppBar (Search bar, quick "Ask AI" voice/text trigger, Notification system, and User Profile).
- Five main view wrappers toggled via JavaScript:
  1. **Dashboard View:** Contains the AI Morning Briefing card, Dynamic Priority Tasks table (sorted by priority score), Upcoming Deadlines countdown widgets, Daily Habits checklists, Weekly Progress rings, and live AI Suggestions.
  2. **Tasks Board View:** A Kanban board (To Do, In Progress, Due Today, Done columns) with drag-and-drop feedback, task creation modals, and priority heatmaps.
  3. **Calendar View:** A weekly calendar scheduler (Mon-Fri) showing meetings, deadlines, and AI-scheduled blocks, with a right sidebar of unscheduled tasks and an "Auto-schedule All" button.
  4. **Goals & Habits View:** A progress dashboard showing long-term goals with subtask milestones, a habit streak tracker grid (bento style), and habit completion stats.
  5. **AI Assistant View:** An interactive chat hub with quick action chips ("Clear my morning", "Decompose goal") and options to resolve schedule conflicts or type commands.

#### [NEW] [styles.css](file:///c:/Users/Admin/Documents/Projects/Last min Life Saver/styles.css)
Custom stylesheet containing:
- CSS variables mapping the "Executive Kinetic" design theme.
- Glassmorphic panels (`backdrop-filter`, semi-transparent borders).
- AI violet glow effects (`box-shadow`) and priority heat map colors.
- Custom scrollbar styling to achieve a high-density professional look.
- Keyframe animations for glow pulsing and notification slide-ins.

#### [NEW] [app.js](file:///c:/Users/Admin/Documents/Projects/Last min Life Saver/app.js)
The core application controller, containing:
- **State Management:** LocalStorage-backed state for tasks, calendar events, habits, goals, and user history.
- **Task Prioritization Engine:** Calculates a dynamic score using:
  \[ \text{Priority Score} = \frac{\text{Urgency (deadline proximity)} \times \text{Impact (consequence)} \times \text{Effort (duration)}}{\text{Dependencies}} \]
- **AI Scheduling Assistant:** Implements the auto-scheduling algorithm that maps tasks into empty calendar slots matching the user's peak hours (9 AM - 11 AM) and displays conflict resolution prompts.
- **Voice Assistance Engine:** Web Speech API integration to transcribe tasks ("Add task report by Friday at 5pm"), read the schedule, and voice out the top 3 priorities.
- **Autonomous Planner:** Automatically decomposes a high-level goal into estimated subtasks (e.g. "Prepare for interview" -> "Research company (1h)", "Review resume (30m)", "Practice questions (1.5h)").
- **Context-Aware Reminders Simulator:** Periodically slides in action-oriented reminders (e.g. "Location-trigger: near grocery store") with "Start timer" or "Reschedule" actions.
- **Calendar Email Scanner:** A utility to parse pasted emails and automatically generate tasks with deadlines.

---

## Feature Implementations

| Feature | Technical Approach |
| :--- | :--- |
| **1. Prioritization** | Computes the priority score on every state update. Surfaces the single most critical task in the morning briefing card. Heatmaps task cards from Red (High) to Green (Low) based on score. |
| **2. Scheduler** | An optimization function searches for calendar gaps, schedules focus blocks, detects double-bookings, and suggests resolutions. |
| **3. Recommendations** | Identifies tasks delayed >3 times. Flags them with a warning badge and displays motivational coaching (e.g. "Procrastination warning: break this down into 15m steps"). |
| **4. Reminders** | Simulates contextual alerts (e.g., location, idle time) with a slide-in banner containing direct buttons to "Start focus timer", "Snooze 1hr", or "Mark Done". |
| **5. Two-Way Sync** | Custom email subject parsing text area on the AI page. Typing or pasting text automatically creates structured tasks and calendar items. |
| **6. Goal & Habit Tracker** | Habit checkmarks increment streaks. A "Streak Recovery Prompt" triggers if a habit is not done by a set time, offering a lower-effort alternative. |
| **7. Voice Assistant** | Web Speech API triggers on clicking the Mic icon. Transcribes text for natural language input and speaks aloud briefings. |
| **8. Autonomous Planning** | Pre-generated decomposition templates for common goals, and an algorithmic builder for custom inputs that generates multi-step plans. |

---

## Verification Plan

### Manual Verification
1. **Interactive Demo Run:** Start a development server or run `index.html` directly in the browser.
2. **Prioritization Check:** Add a task with High Impact and short deadline. Confirm it jumps to the top of the Priorities table with a high score and a red urgency badge.
3. **Auto-Scheduling Test:** Click "Auto-schedule my day". Confirm that unscheduled tasks are mapped into the calendar grid during available focus slots.
4. **Voice Assistance Test:** Click the Microphone icon in the AI Chat. Say "Read priorities". Verify speech synthesis reads the top 3 tasks aloud. Say "Remind me to submit project by Friday". Verify a task is added.
5. **Habits Streak Check:** Uncheck a habit, let a simulated "Habit Failure Alert" run, and verify the AI check-in card triggers.
6. **Goal Decomposer:** Enter a high-level goal in the AI chat (e.g., "prepare for job interview"). Verify that 3-4 subtasks with time estimates are created.
