import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Trash2, Plus, ExternalLink, Calendar, RotateCcw } from 'lucide-react';

const TodoList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('customChromeTodos');
        return saved ? JSON.parse(saved) : [];
    });

    const [isAdding, setIsAdding] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', link: '', isDaily: false });

    // Handle daily task reset logic on load
    useEffect(() => {
        const lastLogin = localStorage.getItem('customChromeLastLoginDate');
        const today = new Date().toDateString();

        if (lastLogin !== today) {
            // It's a new day! Reset all 'isDaily' tasks to incomplete.
            const updatedTasks = tasks.map(t => t.isDaily ? { ...t, isCompleted: false } : t);
            setTasks(updatedTasks);
            localStorage.setItem('customChromeLastLoginDate', today);
        }
    }, []);

    // Save tasks on every change
    useEffect(() => {
        localStorage.setItem('customChromeTodos', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        let formattedLink = newTask.link.trim();
        if (formattedLink && !formattedLink.startsWith('http')) {
            formattedLink = `https://${formattedLink}`;
        }

        const taskObj = {
            id: Date.now().toString(),
            title: newTask.title.trim(),
            link: formattedLink,
            isCompleted: false,
            isDaily: newTask.isDaily,
            createdAt: new Date().toISOString()
        };

        setTasks([...tasks, taskObj]);
        setIsAdding(false);
        setNewTask({ title: '', link: '', isDaily: false });
    };

    const toggleCompletion = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const progress = tasks.length > 0 ? Math.round((tasks.filter(t => t.isCompleted).length / tasks.length) * 100) : 0;

    return (
        <div className="absolute bottom-28 right-8 flex flex-col-reverse items-end gap-4 z-40 pointer-events-none">
            {/* Visibility Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 liquid-glass !rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-xl pointer-events-auto group relative ${isOpen ? 'ring-2 ring-white/30 bg-white/10' : ''}`}
                title="To-Do List"
            >
                <CheckSquare className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />

                {/* Notification dot if there are incomplete tasks */}
                {tasks.filter(t => !t.isCompleted).length > 0 && !isOpen && (
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-transparent"></div>
                )}
            </button>

            {/* Todo List Panel Container */}
            <div
                className={`w-80 liquid-glass p-0 flex flex-col transition-all duration-400 origin-bottom-right shadow-2xl pointer-events-auto overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8 pointer-events-none'
                    }`}
            >
                {/* Header Area */}
                <div className="p-4 border-b border-white/10 flex flex-col gap-2 bg-white/5">
                    <div className="flex items-center justify-between text-white/90">
                        <h2 className="font-semibold text-lg flex items-center gap-2">
                            <CheckSquare className="w-5 h-5 text-white/70" />
                            Daily Tasks
                        </h2>
                        <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md">
                            {progress}% Done
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Tasks List Area */}
                <div className="p-2 flex flex-col gap-1 max-h-[200px] overflow-y-auto min-h-[100px] custom-scrollbar">
                    {tasks.length === 0 && !isAdding && (
                        <div className="flex flex-col items-center justify-center py-8 text-white/40 text-sm gap-2">
                            <CheckSquare className="w-8 h-8 mb-1 opacity-50" />
                            <p>No tasks yet.</p>
                            <p>Add one to stay consistent!</p>
                        </div>
                    )}

                    {tasks.map(task => (
                        <div
                            key={task.id}
                            className={`flex items-center gap-3 p-2.5 rounded-xl transition-all group ${task.isCompleted ? 'bg-white/5 opacity-60' : 'hover:bg-white/10'}`}
                        >
                            <button
                                onClick={() => toggleCompletion(task.id)}
                                className="shrink-0 pt-0.5 text-white/70 hover:text-white transition-colors"
                            >
                                {task.isCompleted ? (
                                    <CheckSquare className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Square className="w-5 h-5" />
                                )}
                            </button>

                            <div className="flex flex-col flex-1 min-w-0">
                                <span className={`text-sm font-medium truncate text-white/90 transition-all ${task.isCompleted ? 'line-through decoration-white/30' : ''}`}>
                                    {task.title}
                                </span>
                                <div className="flex items-center gap-3 mt-1">
                                    {task.isDaily ? (
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 flex items-center gap-1">
                                            <RotateCcw className="w-3 h-3" />
                                            Daily
                                        </span>
                                    ) : (
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Once
                                        </span>
                                    )}
                                    {task.link && (
                                        <a
                                            href={task.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] uppercase font-bold tracking-wider text-green-300 flex items-center gap-1 hover:text-green-200 hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            Open Link
                                        </a>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => deleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-red-400 transition-all shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Task Form Area */}
                {isAdding ? (
                    <form onSubmit={handleAddTask} className="p-3 border-t border-white/10 bg-white/5 flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Task (e.g., Read documentation)"
                            className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 placeholder:text-white/40"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            autoFocus
                            required
                        />
                        <input
                            type="text"
                            placeholder="Link (optional, e.g., github.com)"
                            className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 placeholder:text-white/40"
                            value={newTask.link}
                            onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
                        />

                        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer px-1">
                            <input
                                type="checkbox"
                                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-0 cursor-pointer"
                                checked={newTask.isDaily}
                                onChange={(e) => setNewTask({ ...newTask, isDaily: e.target.checked })}
                            />
                            Repeat this every day
                        </label>

                        <div className="flex gap-2 justify-end mt-1">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-3 py-1.5 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors shadow-sm"
                                disabled={!newTask.title.trim()}
                            >
                                Save Task
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-2 border-t border-white/10 bg-white/5">
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add new task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
