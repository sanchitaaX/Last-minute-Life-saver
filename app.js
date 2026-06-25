// The Last-Minute Life Saver - Main Application Logic

// --- STATE MANAGEMENT ---
let state = {
    user: {
        name: "Aryan",
        peakHoursStart: 9, // 9 AM
        peakHoursEnd: 11,  // 11 AM
        completionRateLastWeek: 70
    },
    tasks: [],
    calendarEvents: [],
    habits: [],
    goals: []
};

// Initial mockup data to seed LocalStorage if empty
const initialSeedData = {
    tasks: [
        {
            id: "task-1",
            title: "Finalize Tax Filings 2023",
            category: "Finance",
            urgency: 9,
            impact: 9,
            effort: 3,
            dependencies: 1,
            status: "due_today", // todo, in_progress, due_today, done
            dueDate: "Today, 10:00 AM",
            isOverdue: true,
            overdueHours: 14,
            estimatedHours: 2,
            assignedTo: "JD",
            procrastinationCount: 3 // flagged for coaching
        },
        {
            id: "task-2",
            title: "Q4 Product Roadmap Review",
            category: "Product",
            urgency: 8,
            impact: 9,
            effort: 4,
            dependencies: 1,
            status: "in_progress",
            dueDate: "Today, 2:00 PM",
            estimatedHours: 1.5,
            assignedTo: "Sarah", // avatar loaded from CDN
            scheduledTime: "14:00 - 15:30",
            procrastinationCount: 0
        },
        {
            id: "task-3",
            title: "Draft Investor Update",
            category: "Corporate",
            urgency: 7,
            impact: 8,
            effort: 3,
            dependencies: 2,
            status: "todo",
            dueDate: "Today, 5:30 PM",
            estimatedHours: 2,
            assignedTo: "Self",
            procrastinationCount: 1
        },
        {
            id: "task-4",
            title: "Client Deliverable: Site Audit",
            category: "Urgent",
            urgency: 9,
            impact: 9,
            effort: 4,
            dependencies: 1,
            status: "due_today",
            dueDate: "Today, 4:30 PM (in 2h)",
            estimatedHours: 4,
            assignedTo: "Maria",
            procrastinationCount: 0
        },
        {
            id: "task-5",
            title: "Grocery list preparation",
            category: "Personal",
            urgency: 3,
            impact: 2,
            effort: 1,
            dependencies: 1,
            status: "todo",
            dueDate: "Tomorrow",
            estimatedHours: 0.5,
            assignedTo: "Self",
            procrastinationCount: 0
        },
        {
            id: "task-6",
            title: "Review Q4 Revenue Report",
            category: "Finance",
            urgency: 8,
            impact: 8,
            effort: 3,
            dependencies: 2,
            status: "todo",
            dueDate: "Today",
            estimatedHours: 0.75, // 45m
            assignedTo: "Self",
            procrastinationCount: 0,
            isUnscheduled: true
        },
        {
            id: "task-7",
            title: "Update Node dependencies",
            category: "Engineering",
            urgency: 5,
            impact: 4,
            effort: 2,
            dependencies: 1,
            status: "todo",
            dueDate: "Tomorrow",
            estimatedHours: 0.33, // 20m
            assignedTo: "Self",
            procrastinationCount: 0,
            isUnscheduled: true
        },
        {
            id: "task-8",
            title: "Team Outing Coordination",
            category: "Planning",
            urgency: 4,
            impact: 3,
            effort: 2,
            dependencies: 1,
            status: "todo",
            dueDate: "Friday",
            estimatedHours: 1,
            assignedTo: "Self",
            procrastinationCount: 0,
            isUnscheduled: true
        },
        {
            id: "task-9",
            title: "Investor Deck Final Polish",
            category: "Strategic",
            urgency: 8,
            impact: 8,
            effort: 4,
            dependencies: 1,
            status: "todo",
            dueDate: "Tonight",
            estimatedHours: 2,
            assignedTo: "Self",
            procrastinationCount: 2,
            isUnscheduled: true
        },
        {
            id: "task-10",
            title: "Weekly Team Sync",
            category: "Completed",
            urgency: 5,
            impact: 5,
            effort: 2,
            dependencies: 1,
            status: "done",
            dueDate: "Completed Today",
            estimatedHours: 1,
            assignedTo: "Self",
            procrastinationCount: 0
        },
        {
            id: "task-11",
            title: "Onboard New Designer",
            category: "Completed",
            urgency: 6,
            impact: 6,
            effort: 3,
            dependencies: 1,
            status: "done",
            dueDate: "Yesterday",
            estimatedHours: 2,
            assignedTo: "Self",
            procrastinationCount: 0
        }
    ],
    calendarEvents: [
        {
            id: "evt-1",
            title: "Sync with Engineering",
            type: "meeting", // meeting, deadline, focus
            timeLabel: "10:00 AM - 11:00 AM",
            startHour: 10,
            durationHours: 1,
            day: "Mon",
            colorClass: "bg-blue-500/20 border-blue-500 text-blue-200"
        },
        {
            id: "evt-2",
            title: "Deep Work: UI System",
            type: "focus",
            timeLabel: "11:00 AM - 1:00 PM",
            startHour: 11,
            durationHours: 2,
            day: "Wed",
            colorClass: "bg-primary-container/20 border-primary/40 text-primary ai-sparkle-glow"
        },
        {
            id: "evt-3",
            title: "Project Alpha Launch",
            type: "deadline",
            timeLabel: "2:00 PM - 3:30 PM",
            startHour: 14,
            durationHours: 1.5,
            day: "Mon",
            colorClass: "bg-tertiary-container/20 border-tertiary text-tertiary-fixed"
        },
        {
            id: "evt-4",
            title: "Client Presentation",
            type: "meeting",
            timeLabel: "2:00 PM - 3:00 PM",
            startHour: 14,
            durationHours: 1,
            day: "Thu",
            colorClass: "bg-error-container/10 border-error border-2 border-dashed text-error"
        },
        {
            id: "evt-5",
            title: "Internal Strategy",
            type: "meeting",
            timeLabel: "2:00 PM - 3:00 PM",
            startHour: 14,
            durationHours: 1,
            day: "Thu",
            colorClass: "bg-error-container/10 border-error border-2 border-dashed text-error"
        }
    ],
    habits: [
        {
            id: "habit-1",
            name: "Deep Work Session (2h)",
            category: "psychology",
            streak: 12,
            history: [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false],
            usualTime: "11:00", // alert triggers if not checked by 11:30
            checkedToday: true
        },
        {
            id: "habit-2",
            name: "Hydration",
            category: "water_drop",
            streak: 5,
            history: [true, true, true, true, true, false, false, false, false, false, false, false, false, false, false],
            usualTime: "14:00",
            checkedToday: false
        },
        {
            id: "habit-3",
            name: "Exercise",
            category: "fitness_center",
            streak: 2,
            history: [true, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
            usualTime: "18:00",
            checkedToday: false
        }
    ],
    goals: [
        {
            id: "goal-1",
            title: "Product Launch V2",
            category: "Strategic",
            deadline: "Oct 24",
            icon: "rocket_launch",
            color: "primary",
            progress: 75,
            subtasks: [
                { id: "sb-1-1", title: "UI Components Finalized", completed: true },
                { id: "sb-1-2", title: "Beta User Feedback", completed: true },
                { id: "sb-1-3", title: "Global CDN Deployment", completed: false }
            ],
            aiCoaching: "On track to exceed target date."
        },
        {
            id: "goal-2",
            title: "Marathon Ready",
            category: "Health",
            deadline: "Nov 15",
            icon: "fitness_center",
            color: "error",
            progress: 33,
            subtasks: [
                { id: "sb-2-1", title: "10km Baseline Run", completed: true },
                { id: "sb-2-2", title: "Weekly Average 25km", completed: false },
                { id: "sb-2-3", title: "Nutrition Plan Phase 1", completed: false }
            ],
            aiCoaching: "At risk due to low activity streak."
        },
        {
            id: "goal-3",
            title: "Speak Mandarin",
            category: "Learning",
            deadline: "Dec 31",
            icon: "menu_book",
            color: "tertiary",
            progress: 66,
            subtasks: [
                { id: "sb-3-1", title: "HSK 1 Vocabulary", completed: true },
                { id: "sb-3-2", title: "Tone Masterclass", completed: true },
                { id: "sb-3-3", title: "Basic Conversations", completed: false }
            ],
            aiCoaching: "Consistent progress. Keep it up!"
        }
    ]
};

// State Loading & Saving
function loadState() {
    const saved = localStorage.getItem("last_minute_lifesaver_state");
    if (saved) {
        state = JSON.parse(saved);
    } else {
        state = {
            user: initialSeedData.tasks ? initialSeedData : seedEmptyState()
        };
        // Flatten the seed data directly into state
        state.tasks = initialSeedData.tasks;
        state.calendarEvents = initialSeedData.calendarEvents;
        state.habits = initialSeedData.habits;
        state.goals = initialSeedData.goals;
        state.user = {
            name: "Aryan",
            peakHoursStart: 9,
            peakHoursEnd: 11,
            completionRateLastWeek: 70
        };
        saveState();
    }
}

function saveState() {
    localStorage.setItem("last_minute_lifesaver_state", JSON.stringify(state));
}

function seedEmptyState() {
    return {
        name: "Aryan",
        peakHoursStart: 9,
        peakHoursEnd: 11,
        completionRateLastWeek: 70
    };
}

// --- PRIORITIZATION LOGIC ---
// urgency (1-10) * impact (1-10) * effort (1-5) / dependencies (1-5)
function getPriorityScore(task) {
    const u = Number(task.urgency) || 5;
    const i = Number(task.impact) || 5;
    const e = Number(task.effort) || 2;
    const d = Number(task.dependencies) || 1;
    return Math.round((u * i * e) / d);
}

// Color scale for priority score
function getPriorityColor(score) {
    if (score >= 75) return "#ef4444"; // red
    if (score >= 40) return "#f59e0b"; // amber
    return "#10b981"; // green
}

function getPriorityClass(score) {
    if (score >= 75) return "text-error bg-error/10 border-error/20";
    if (score >= 40) return "text-tertiary bg-tertiary/10 border-tertiary/20";
    return "text-green-400 bg-green-500/10 border-green-500/20";
}

// Sort tasks dynamically based on score
function getSortedTasks() {
    return [...state.tasks]
        .map(t => ({ ...t, score: getPriorityScore(t) }))
        .sort((a, b) => b.score - a.score);
}

// --- AI AUTO-SCHEDULING ASSISTANT ---
// Scans standard working hours (9 AM - 6 PM) for open blocks on 'Mon' (Today)
// and maps unscheduled tasks there.
function autoScheduleAllTasks() {
    const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // hours (9 AM to 6 PM)
    const today = "Mon";
    
    // Find occupied slots for today
    const todayEvents = state.calendarEvents.filter(e => e.day === today);
    const occupiedHours = new Set();
    
    todayEvents.forEach(evt => {
        const start = evt.startHour;
        const duration = evt.durationHours;
        const startInt = Math.floor(start);
        const endInt = Math.ceil(start + duration);
        for (let h = startInt; h < endInt; h++) {
            occupiedHours.add(h);
        }
    });

    // Get unscheduled tasks (ordered by priority score)
    const unscheduledTasks = state.tasks
        .filter(t => t.isUnscheduled && t.status !== "done")
        .map(t => ({ ...t, score: getPriorityScore(t) }))
        .sort((a, b) => b.score - a.score);

    if (unscheduledTasks.length === 0) {
        showNotification("All tasks are already scheduled!", "info");
        return;
    }

    let scheduledCount = 0;
    
    // Attempt to schedule each task
    unscheduledTasks.forEach(task => {
        const taskDuration = Math.ceil(task.estimatedHours || 1);
        let foundStartHour = -1;
        
        // Scan for a consecutive block of empty hours
        for (let i = 0; i <= workingHours.length - taskDuration; i++) {
            let blockFree = true;
            for (let offset = 0; offset < taskDuration; offset++) {
                const checkHour = workingHours[i] + offset;
                if (occupiedHours.has(checkHour) || checkHour >= 18) {
                    blockFree = false;
                    break;
                }
            }
            if (blockFree) {
                foundStartHour = workingHours[i];
                break;
            }
        }

        // Schedule it if slot found
        if (foundStartHour !== -1) {
            // Mark task as scheduled
            const taskIndex = state.tasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].isUnscheduled = false;
                state.tasks[taskIndex].status = "in_progress";
                state.tasks[taskIndex].dueDate = `Today, ${formatHour(foundStartHour)}`;
                state.tasks[taskIndex].scheduledTime = `${formatHour(foundStartHour)} - ${formatHour(foundStartHour + taskDuration)}`;
            }

            // Create calendar event
            const newEvent = {
                id: `evt-auto-${Date.now()}-${scheduledCount}`,
                title: `Focus: ${task.title}`,
                type: "focus",
                timeLabel: `${formatHour(foundStartHour)} - ${formatHour(foundStartHour + taskDuration)}`,
                startHour: foundStartHour,
                durationHours: taskDuration,
                day: today,
                colorClass: "bg-primary-container/20 border-primary/40 text-primary ai-sparkle-glow",
                taskId: task.id
            };
            
            state.calendarEvents.push(newEvent);

            // Inject 15-minute break/buffer (0.25h duration) immediately after
            const breakStartHour = foundStartHour + taskDuration;
            const breakDuration = 0.25;
            const breakEvent = {
                id: `evt-break-${Date.now()}-${scheduledCount}`,
                title: `Coffee Break / Buffer`,
                type: "break",
                timeLabel: `${formatHour(breakStartHour)} - ${formatHour(breakStartHour + breakDuration)}`,
                startHour: breakStartHour,
                durationHours: breakDuration,
                day: today,
                colorClass: "bg-surface-container border border-dashed border-outline-variant text-on-surface-variant/75",
                taskId: null
            };
            
            state.calendarEvents.push(breakEvent);
            
            // Mark those hours as occupied
            for (let h = foundStartHour; h < breakStartHour; h++) {
                occupiedHours.add(h);
            }
            occupiedHours.add(Math.floor(breakStartHour));
            
            scheduledCount++;
        }
    });

    if (scheduledCount > 0) {
        saveState();
        showNotification(`AI Assistant scheduled ${scheduledCount} tasks into focus blocks with breaks!`, "success");
        // Speak completion briefing
        speakAI(`I have auto-scheduled ${scheduledCount} tasks into your open slots today, prioritizing your Q4 Revenue report and your investor deck polish, with 15-minute buffer breaks.`);
    } else {
        showNotification("No available calendar gaps found for unscheduled tasks. Try resolving double bookings first.", "warning");
    }
}

// Convert 24h to 12h format (supporting fractional hours)
function formatHour(h) {
    const hours = Math.floor(h);
    const minutes = Math.round((h - hours) * 60);
    const mStr = minutes.toString().padStart(2, '0');
    
    if (hours < 12) {
        const displayHour = hours === 0 ? 12 : hours;
        return `${displayHour}:${mStr} AM`;
    } else if (hours === 12) {
        return `12:${mStr} PM`;
    } else {
        const displayHour = hours === 24 ? 12 : hours - 12;
        return `${displayHour}:${mStr} PM`;
    }
}

// --- VOICE ENABLED ASSISTANCE (Web Speech API) ---
let speechRecognition = null;
let isListening = false;

function initVoiceRecognition(onResultCallback, onStateChangeCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition not supported in this browser.");
        return false;
    }
    
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.lang = 'en-US';
    speechRecognition.interimResults = false;
    
    speechRecognition.onstart = () => {
        isListening = true;
        onStateChangeCallback(true);
    };
    
    speechRecognition.onend = () => {
        isListening = false;
        onStateChangeCallback(false);
    };
    
    speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResultCallback(transcript);
        processVoiceCommand(transcript);
    };

    speechRecognition.onerror = (err) => {
        console.error("Speech recognition error", err);
        isListening = false;
        onStateChangeCallback(false);
    };
    
    return true;
}

function toggleListening() {
    if (!speechRecognition) return;
    if (isListening) {
        speechRecognition.stop();
    } else {
        speechRecognition.start();
    }
}

function speakAI(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    // Find a nice natural English voice if possible
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural"));
    if (premiumVoice) utterance.voice = premiumVoice;
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
}

// Parse voice commands
function processVoiceCommand(text) {
    const cleaned = text.toLowerCase().trim();
    console.log("Voice Command Recognized:", cleaned);
    
    // Command 1: Read priorities
    if (cleaned.includes("read priorities") || cleaned.includes("what are my priorities") || cleaned.includes("top priorities")) {
        const priorities = getSortedTasks().slice(0, 3);
        const speechText = `Your top three priorities are: First, ${priorities[0].title}. Second, ${priorities[1].title}. And third, ${priorities[2].title}.`;
        speakAI(speechText);
        addAIChatMessage(text, speechText);
        return;
    }
    
    // Command 2: Read schedule
    if (cleaned.includes("read schedule") || cleaned.includes("what is my schedule") || cleaned.includes("daily briefing")) {
        const events = state.calendarEvents.filter(e => e.day === "Mon");
        let eventDescriptions = events.map(e => `${e.title} at ${e.timeLabel.split(" - ")[0]}`).join(", ");
        if (!eventDescriptions) eventDescriptions = "You have a completely clear calendar today.";
        const speechText = `Here is your schedule for Monday: You have ${eventDescriptions}.`;
        speakAI(speechText);
        addAIChatMessage(text, speechText);
        return;
    }

    // Command 3: Auto schedule day
    if (cleaned.includes("auto schedule") || cleaned.includes("optimize schedule") || cleaned.includes("schedule my day")) {
        autoScheduleAllTasks();
        addAIChatMessage(text, "Optimizing your day. I have filled your open calendar gaps with focus blocks.");
        return;
    }

    // Command 4: Add task natural language parser
    // E.g., "remind me to submit report by Friday at 5pm" or "add task design prototype by tonight"
    if (cleaned.startsWith("remind me to") || cleaned.startsWith("add task") || cleaned.startsWith("schedule task")) {
        let taskTitle = "";
        let deadline = "Today";
        
        // Strip command prefix
        let workingText = cleaned
            .replace("remind me to", "")
            .replace("add task", "")
            .replace("schedule task", "")
            .trim();
            
        // Look for deadline markers
        const byIndex = workingText.lastIndexOf(" by ");
        const onIndex = workingText.lastIndexOf(" on ");
        const splitIndex = byIndex !== -1 ? byIndex : onIndex;
        
        if (splitIndex !== -1) {
            taskTitle = workingText.substring(0, splitIndex).trim();
            deadline = workingText.substring(splitIndex + 4).trim();
        } else {
            taskTitle = workingText;
        }

        // Capitalize first letter
        taskTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1);
        
        // Create task
        const newTask = {
            id: `task-voice-${Date.now()}`,
            title: taskTitle,
            category: "AI Voice",
            urgency: 7,
            impact: 6,
            effort: 2,
            dependencies: 1,
            status: "todo",
            dueDate: deadline.charAt(0).toUpperCase() + deadline.slice(1),
            estimatedHours: 1.5,
            assignedTo: "Self",
            procrastinationCount: 0,
            isUnscheduled: true
        };
        
        state.tasks.push(newTask);
        saveState();
        
        const responseText = `Added voice task: ${taskTitle}, due ${deadline}. I've set it to high urgency based on the timeframe.`;
        speakAI(responseText);
        addAIChatMessage(text, responseText);
        
        // Refresh pages
        if (window.renderDashboard) window.renderDashboard();
        if (window.renderTasksBoard) window.renderTasksBoard();
        if (window.renderCalendar) window.renderCalendar();
        return;
    }

    // Fallback: Default Chat response
    const defaultResponse = `I heard you say: "${text}". Try asking: "Read priorities", "What is my schedule", or "Add task finalize design by Friday at 3pm".`;
    speakAI(defaultResponse);
    addAIChatMessage(text, defaultResponse);
}

// --- AUTONOMOUS GOAL DECOMPOSER ---
// Decomposes high-level goals into subtasks
function decomposeHighLevelGoal(goalString) {
    const cleaned = goalString.toLowerCase();
    let title = goalString;
    let category = "General";
    let subtasks = [];
    
    if (cleaned.includes("interview") || cleaned.includes("job")) {
        title = "Prepare for Job Interview";
        category = "Career";
        subtasks = [
            { id: `sb-dec-${Date.now()}-1`, title: "Research company culture and tech stack", completed: false, estimate: "1.5h" },
            { id: `sb-dec-${Date.now()}-2`, title: "Review resume and draft project stories", completed: false, estimate: "1h" },
            { id: `sb-dec-${Date.now()}-3`, title: "Practice coding and behavioral questions", completed: false, estimate: "2h" },
            { id: `sb-dec-${Date.now()}-4`, title: "Prepare clothing and check interview links", completed: false, estimate: "30m" }
        ];
    } else if (cleaned.includes("tax") || cleaned.includes("filing") || cleaned.includes("irs")) {
        title = "Submit Annual Tax Filings";
        category = "Finance";
        subtasks = [
            { id: `sb-dec-${Date.now()}-1`, title: "Gather W2s, 1099s, and write-off receipts", completed: false, estimate: "2h" },
            { id: `sb-dec-${Date.now()}-2`, title: "Import documents to tax software", completed: false, estimate: "1h" },
            { id: `sb-dec-${Date.now()}-3`, title: "Review filings for deductions and errors", completed: false, estimate: "1.5h" },
            { id: `sb-dec-${Date.now()}-4`, title: "Submit and arrange payment schedule", completed: false, estimate: "30m" }
        ];
    } else if (cleaned.includes("exam") || cleaned.includes("study") || cleaned.includes("test")) {
        title = "Prepare for Examination";
        category = "Academic";
        subtasks = [
            { id: `sb-dec-${Date.now()}-1`, title: "Organize lecture notes and reading materials", completed: false, estimate: "1h" },
            { id: `sb-dec-${Date.now()}-2`, title: "Create flashcards for core definitions", completed: false, estimate: "2h" },
            { id: `sb-dec-${Date.now()}-3`, title: "Solve previous year's sample questions", completed: false, estimate: "3h" },
            { id: `sb-dec-${Date.now()}-4`, title: "Run study review group summary", completed: false, estimate: "1.5h" }
        ];
    } else {
        // Generic Decomposer
        title = goalString.charAt(0).toUpperCase() + goalString.slice(1);
        category = "AI Generated";
        subtasks = [
            { id: `sb-dec-${Date.now()}-1`, title: "Phase 1: Research and structural outlining", completed: false, estimate: "1h" },
            { id: `sb-dec-${Date.now()}-2`, title: "Phase 2: Draft core components and execute logic", completed: false, estimate: "3h" },
            { id: `sb-dec-${Date.now()}-3`, title: "Phase 3: Refine, inspect, and perform audits", completed: false, estimate: "1.5h" }
        ];
    }

    // Add goal
    const newGoal = {
        id: `goal-dec-${Date.now()}`,
        title: title,
        category: category,
        deadline: "7 Days",
        icon: "smart_toy",
        color: "primary",
        progress: 0,
        subtasks: subtasks.map(s => ({ id: s.id, title: s.title, completed: false })),
        aiCoaching: "Auto-decomposed by AI co-pilot. Start with item 1 today."
    };
    
    state.goals.push(newGoal);

    // Create tasks for each subtask
    subtasks.forEach((st, idx) => {
        const estH = parseFloat(st.estimate) || 1;
        const task = {
            id: `task-dec-${Date.now()}-${idx}`,
            title: `${title}: ${st.title}`,
            category: category,
            urgency: 8 - idx, // Decelerating urgency for subtasks
            impact: 7,
            effort: estH * 2, // Map effort
            dependencies: idx > 0 ? 2 : 1, // Subtasks depend on previous ones
            status: "todo",
            dueDate: `In ${idx + 1} days`,
            estimatedHours: estH,
            assignedTo: "Self",
            procrastinationCount: 0,
            isUnscheduled: true
        };
        state.tasks.push(task);
    });

    saveState();
    
    // Refresh pages
    if (window.renderDashboard) window.renderDashboard();
    if (window.renderTasksBoard) window.renderTasksBoard();
    if (window.renderGoals) window.renderGoals();
    
    return newGoal;
}

// --- CONTEXT-AWARE REMINDERS SIMULATOR ---
// Slides in action notifications from the side
function triggerMockContextReminder(type) {
    let title = "";
    let message = "";
    let actionText = "Start Timer";
    let actionCallback = () => {};
    let intensity = "gentle"; // gentle, urgent, critical

    if (type === "location") {
        title = "Location Trigger: Near FedEx Office";
        message = "Since you are near, pick up the Q4 roadmap documents.";
        actionText = "Mark Done";
        intensity = "gentle";
        actionCallback = () => {
            showNotification("Task marked as completed!", "success");
        };
    } else if (type === "idle") {
        title = "Proactive Idle Check-in";
        message = "Detected 20m of idle phone time. Ready to tackle your 2h 'Tax Filing' backlog?";
        actionText = "Start Focus (25m)";
        intensity = "urgent";
        actionCallback = () => {
            startPomodoroTimer(25 * 60, "Finalize Tax Filings");
        };
    } else if (type === "habit_failure") {
        title = "AI Habit Recovery Prompt";
        message = "You missed your usual 11 AM Deep Work habit. Recover streak with a low-effort 15m block?";
        actionText = "Accept 15m";
        intensity = "critical";
        actionCallback = () => {
            startPomodoroTimer(15 * 60, "Deep Work Recovery");
        };
    } else {
        title = "Upcoming Deadline Escalation";
        message = "Tax Filings is overdue! High risk of penalty.";
        actionText = "Start Now";
        intensity = "critical";
        actionCallback = () => {
            startPomodoroTimer(45 * 60, "Finalize Tax Filings");
        };
    }

    createReminderToast(title, message, actionText, intensity, actionCallback);
}

function createReminderToast(title, message, actionText, intensity, actionCallback) {
    // Remove existing toast if any
    const oldToast = document.getElementById("context-reminder-toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.id = "context-reminder-toast";
    toast.className = "fixed right-6 top-24 w-80 glass-panel p-5 rounded-2xl z-[100] toast-notification ai-glow";
    
    let borderClass = "border-l-4 border-l-primary";
    let titleClass = "text-primary";
    if (intensity === "urgent") {
        borderClass = "border-l-4 border-l-tertiary";
        titleClass = "text-tertiary";
    } else if (intensity === "critical") {
        borderClass = "border-l-4 border-l-error bg-error-container/10";
        titleClass = "text-error font-extrabold";
    }
    
    toast.className += ` ${borderClass}`;

    toast.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h4 class="text-body-md font-bold ${titleClass}">${title}</h4>
            <button class="text-on-surface-variant hover:text-on-surface text-sm" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
        <p class="text-label-md text-on-surface-variant mb-4">${message}</p>
        <div class="flex gap-2">
            <button id="toast-action-btn" class="flex-1 py-2 bg-primary-container text-on-primary-container text-label-sm font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all">${actionText}</button>
            <button class="px-3 py-2 bg-surface-container-highest text-on-surface-variant text-label-sm rounded-lg hover:text-on-surface transition-colors" onclick="this.parentElement.parentElement.remove()">Dismiss</button>
        </div>
    `;

    document.body.appendChild(toast);
    
    document.getElementById("toast-action-btn").addEventListener("click", () => {
        actionCallback();
        toast.remove();
    });
}

// --- POMODORO TIMER OVERLAY ---
let timerInterval = null;
let timerSeconds = 0;
let timerTitle = "";

function startPomodoroTimer(durationSeconds, title) {
    // Clear existing
    if (timerInterval) clearInterval(timerInterval);
    
    timerSeconds = durationSeconds;
    timerTitle = title;
    
    const overlay = document.createElement("div");
    overlay.id = "pomodoro-overlay";
    overlay.className = "fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-[150]";
    
    overlay.innerHTML = `
        <div class="glass-panel p-8 rounded-3xl text-center w-96 relative ai-glow border-2 border-primary/30">
            <div class="text-primary text-[14px] font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <span class="material-symbols-outlined animate-spin text-[18px]">timer</span> AI Focus Block
            </div>
            <h3 class="font-display-md text-display-md text-on-surface mb-6">${title}</h3>
            
            <div class="relative w-48 h-48 mx-auto mb-8">
                <svg class="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" fill="transparent" r="88" stroke="rgba(255,255,255,0.05)" stroke-width="6"></circle>
                    <circle id="timer-progress-circle" cx="96" cy="96" fill="transparent" r="88" stroke="#6c47ff" stroke-dasharray="552.9" stroke-dashoffset="0" stroke-linecap="round" stroke-width="8"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                    <span id="timer-text" class="text-4xl font-extrabold tracking-tight">25:00</span>
                </div>
            </div>
            
            <div class="flex gap-4">
                <button id="timer-pause-btn" class="flex-1 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all">Pause</button>
                <button id="timer-cancel-btn" class="flex-1 py-3 bg-surface-container-highest text-on-surface-variant font-bold rounded-xl hover:text-on-surface active:scale-95 transition-all">Quit Session</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    const totalSeconds = durationSeconds;
    const progressCircle = document.getElementById("timer-progress-circle");
    const timerText = document.getElementById("timer-text");
    const pauseBtn = document.getElementById("timer-pause-btn");
    const cancelBtn = document.getElementById("timer-cancel-btn");
    
    let isPaused = false;
    
    function updateTimer() {
        if (isPaused) return;
        
        const m = Math.floor(timerSeconds / 60);
        const s = timerSeconds % 60;
        timerText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        // Progress circle offset
        const percentage = timerSeconds / totalSeconds;
        const offset = 552.9 * (1 - percentage);
        progressCircle.style.strokeDashoffset = offset;
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            overlay.remove();
            showNotification("Focus Block completed! Take a break.", "success");
            speakAI("Congratulations. Focus session complete. Take a 5-minute break.");
            
            // Mark a task completed if matched
            const matchingTask = state.tasks.find(t => t.title.toLowerCase().includes(title.toLowerCase()));
            if (matchingTask) {
                matchingTask.status = "done";
                saveState();
                if (window.renderDashboard) window.renderDashboard();
                if (window.renderTasksBoard) window.renderTasksBoard();
            }
        }
        
        timerSeconds--;
    }
    
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    
    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        pauseBtn.innerText = isPaused ? "Resume" : "Pause";
        pauseBtn.className = isPaused 
            ? "flex-1 py-3 bg-green-500 text-white font-bold rounded-xl active:scale-95 transition-all"
            : "flex-1 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl active:scale-95 transition-all";
    });
    
    cancelBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        overlay.remove();
        showNotification("Focus session canceled.", "info");
    });
}

// Helper to add chat history messages
function addAIChatMessage(userText, botText) {
    const list = document.getElementById("ai-chat-history");
    if (!list) return;
    
    const userContainer = document.createElement("div");
    userContainer.className = "flex justify-end";
    userContainer.innerHTML = `
        <div class="max-w-[80%] bg-primary-container text-on-primary-container p-4 rounded-2xl rounded-tr-none shadow-md">
            <p class="text-body-md">${userText}</p>
        </div>
    `;
    list.appendChild(userContainer);
    
    setTimeout(() => {
        const botContainer = document.createElement("div");
        botContainer.className = "flex justify-start";
        botContainer.innerHTML = `
            <div class="flex gap-4 max-w-[90%]">
                <div class="w-8 h-8 rounded-full bg-surface-container-highest border border-outline flex-shrink-0 flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
                </div>
                <div class="space-y-4 w-full">
                    <div class="bg-surface-container p-4 rounded-2xl rounded-tl-none border-l-4 border-primary shadow-sm space-y-3">
                        <p class="text-body-md">${botText}</p>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(botContainer);
        
        // Scroll to bottom
        list.scrollTop = list.scrollHeight;
    }, 400);
}

// Toast notification helper
function showNotification(msg, type = "success") {
    const notify = document.createElement("div");
    notify.className = "fixed bottom-8 left-8 py-3 px-6 glass-panel rounded-xl text-label-md font-bold z-[200] animate-slide-in shadow-2xl flex items-center gap-2";
    
    let color = "text-primary";
    let icon = "check_circle";
    if (type === "warning") {
        color = "text-tertiary";
        icon = "warning";
    } else if (type === "error") {
        color = "text-error";
        icon = "error";
    } else if (type === "info") {
        color = "text-blue-400";
        icon = "info";
    }
    
    notify.innerHTML = `
        <span class="material-symbols-outlined ${color}">${icon}</span>
        <span class="text-on-surface">${msg}</span>
    `;
    
    document.body.appendChild(notify);
    
    setTimeout(() => {
        notify.remove();
    }, 4000);
}

// --- ANALYTICS AND CO-PILOT EXTENSIONS ---

function renderAnalytics() {
    const procList = document.getElementById("procrastination-list");
    if (!procList) return;
    
    // Filter tasks that have procrastination flags
    const delayedTasks = state.tasks.filter(t => t.procrastinationCount > 0 && t.status !== 'done');
    
    let html = "";
    delayedTasks.forEach(t => {
        html += `
            <div class="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-2 mb-2">
                <div class="flex justify-between items-start">
                    <span class="text-xs font-bold text-on-surface truncate pr-2 w-44 block">${t.title}</span>
                    <span class="text-[9px] bg-tertiary-container/20 text-tertiary px-1.5 py-0.5 rounded font-extrabold uppercase">${t.procrastinationCount}x delayed</span>
                </div>
                <div class="flex gap-2">
                    <button class="flex-1 py-1.5 bg-surface-container-highest text-primary font-bold rounded-lg text-[10px] hover:text-primary-fixed active:scale-95 transition-all" onclick="reframeTask('${t.id}')">Reframe</button>
                    <button class="flex-1 py-1.5 bg-surface-container-highest text-on-surface-variant hover:text-on-surface rounded-lg text-[10px] active:scale-95 transition-all" onclick="delegateTask('${t.id}')">Delegate</button>
                </div>
            </div>
        `;
    });
    
    procList.innerHTML = html || `<p class="text-xs text-on-surface-variant text-center py-6">All clear! No delayed tasks detected.</p>`;
}

function reframeTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    
    let motivation = "";
    if (task.category === "Finance") {
        motivation = `Instead of thinking about complex tax forms, Aryan, focus on the five hundred dollar late fee you are saving by completing this today. It only takes twenty minutes to start, and you will feel a massive weight off your shoulders!`;
    } else if (task.category === "Strategic" || task.category === "Product") {
        motivation = `You have delayed this pitch deck review because it feels huge. Let's break it down: just read the first three slides today. That takes five minutes, and you can stop immediately after. Starting is the only hard part!`;
    } else {
        motivation = `Aryan, delaying this task only prolongs the background anxiety it is causing you. Let's block a short fifteen-minute focus window right now to make a quick start. Let's do it!`;
    }
    
    speakAI(motivation);
    
    // Show alert popup
    createReminderToast("AI Co-pilot Reframing Advice", motivation, "Start 15m Focus Block", "urgent", () => {
        startPomodoroTimer(15 * 60, `Start: ${task.title}`);
    });
}

function delegateTask(id) {
    const taskIndex = state.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return;
    
    const delegatee = Math.random() > 0.5 ? "Sarah" : "JD";
    state.tasks[taskIndex].assignedTo = delegatee;
    state.tasks[taskIndex].category = "Delegated (" + state.tasks[taskIndex].category + ")";
    state.tasks[taskIndex].procrastinationCount = 0; // reset counter
    saveState();
    
    showNotification(`Task delegated to ${delegatee}!`, "success");
    speakAI(`I have successfully delegated this task to ${delegatee} to keep your schedule clear for core focus items.`);
    
    if (window.renderDashboard) window.renderDashboard();
    if (window.renderTasksBoard) window.renderTasksBoard();
    renderAnalytics();
}

function triggerTemplateAutoPrep(type) {
    let prepTasks = [];
    if (type === 'exam') {
        prepTasks = [
            { title: "Revise Syllabus notes & mark key chapters", leadDays: 5, effort: 1.5, urgency: 7 },
            { title: "Solve practice exam questions & double check answers", leadDays: 3, effort: 2, urgency: 8 },
            { title: "Read formula summary card & final cheat sheet review", leadDays: 1, effort: 1, urgency: 9 }
        ];
        speakAI("Activated University Exam Prep template. I've scheduled three preparatory tasks starting five days in advance.");
    } else if (type === 'tax') {
        prepTasks = [
            { title: "Collect all receipts, W2 statements, and ledger summaries", leadDays: 7, effort: 2.5, urgency: 6 },
            { title: "Verify transaction categories inside spreadsheet", leadDays: 4, effort: 2, urgency: 7 },
            { title: "Perform final tax document accuracy inspection", leadDays: 2, effort: 1.5, urgency: 8 }
        ];
        speakAI("Activated Corporate Tax Filing template. I've scheduled three preparatory tasks starting seven days in advance.");
    } else {
        prepTasks = [
            { title: "Verify rental funds allocation inside checking account", leadDays: 3, effort: 0.5, urgency: 7 },
            { title: "Process rent wire transfer and send receipt to landlord", leadDays: 1, effort: 0.5, urgency: 9 }
        ];
        speakAI("Activated Monthly Rent Invoice template. I've scheduled two preparatory tasks starting three days in advance.");
    }
    
    prepTasks.forEach((pt, idx) => {
        const task = {
            id: `task-prep-${Date.now()}-${idx}`,
            title: `Prep: ${pt.title}`,
            category: type.charAt(0).toUpperCase() + type.slice(1) + " Prep",
            urgency: pt.urgency,
            impact: 7,
            effort: Math.ceil(pt.effort * 2),
            dependencies: idx > 0 ? 2 : 1,
            status: "todo",
            dueDate: `In ${pt.leadDays} days`,
            estimatedHours: pt.effort,
            assignedTo: "Self",
            procrastinationCount: 0,
            isUnscheduled: true
        };
        state.tasks.push(task);
    });
    
    saveState();
    showNotification(`Added preparatory tasks for ${type}!`, "success");
    
    if (window.renderDashboard) window.renderDashboard();
    if (window.renderTasksBoard) window.renderTasksBoard();
    if (window.renderCalendar) window.renderCalendar();
}

// Initial state loading on file load
loadState();

