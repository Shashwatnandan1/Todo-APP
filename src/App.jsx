import React, { useState, useEffect, useRef } from 'react';
// Using lucide-react for icons - a lightweight and beautiful icon library
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';

// Main App Component
function App() {
  // --- STATE MANAGEMENT ---
  // State for the list of todos. It tries to load from localStorage on initial render.
  const [todos, setTodos] = useState(() => {
    try {
      const localValue = window.localStorage.getItem("TODOS");
      return localValue ? JSON.parse(localValue) : [];
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
      return [];
    }
  });

  // State for the new todo input value
  const [inputValue, setInputValue] = useState("");
  
  // State to track which todo is currently being edited
  const [editingId, setEditingId] = useState(null);
  
  // State for the text of the todo being edited
  const [editText, setEditText] = useState("");
  
  // State for the current filter ('all', 'active', 'completed')
  const [filter, setFilter] = useState('all');

  // Ref for the main input to focus it on load
  const inputRef = useRef(null);

  // --- EFFECTS ---
  // Effect to focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Effect to save todos to localStorage whenever the todos array changes
  useEffect(() => {
    try {
      window.localStorage.setItem("TODOS", JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage", e);
    }
  }, [todos]);

  // --- HANDLER FUNCTIONS ---
  /**
   * Handles form submission to add a new todo.
   * @param {React.FormEvent} e - The form event.
   */
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return; // Don't add empty todos

    const newTodo = {
      id: crypto.randomUUID(), // Use crypto.randomUUID for more unique IDs
      text: inputValue,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue(""); // Clear the input field
  };

  /**
   * Toggles the 'completed' status of a specific todo.
   * @param {string} id - The ID of the todo to toggle.
   */
  const handleToggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Deletes a todo from the list.
   * @param {string} id - The ID of the todo to delete.
   */
  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  /**
   * Sets the state to start editing a todo.
   * @param {object} todo - The todo object to edit.
   */
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  /**
   * Handles the submission of an edited todo.
   * @param {React.FormEvent} e - The form event.
   * @param {string} id - The ID of the todo being saved.
   */
  const handleSaveEdit = (e, id) => {
      e.preventDefault();
      if (editText.trim() === "") {
          handleDeleteTodo(id); // If edited to be empty, delete it
      } else {
          setTodos(prevTodos => 
              prevTodos.map(todo => 
                  todo.id === id ? {...todo, text: editText} : todo
              )
          );
      }
      setEditingId(null);
      setEditText("");
  }
  
  /**
   * Cancels the editing mode.
   */
  const handleCancelEdit = () => {
      setEditingId(null);
      setEditText("");
  }
  
  /**
   * Clears all completed todos from the list.
   */
  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };


  // --- DERIVED STATE ---
  // Filter the todos based on the current filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });
  
  // Count of remaining active todos
  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-start justify-center p-4">
      <div className="w-full max-w-2xl mx-auto mt-8">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            TodoZen
          </h1>
          <p className="text-slate-400 mt-2">Your focus, your flow.</p>
        </header>

        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 w-full border border-slate-700">
          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="flex items-center gap-3 mb-6">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
            />
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900 disabled:cursor-not-allowed text-white font-bold p-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-violet-500/50"
              disabled={!inputValue.trim()}
            >
              <Plus size={24} />
            </button>
          </form>

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between transition-all duration-300 animate-fade-in group"
                >
                  {editingId === todo.id ? (
                    // Edit mode view
                    <form onSubmit={(e) => handleSaveEdit(e, todo.id)} className="flex-grow flex items-center gap-2">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-grow bg-slate-800 border border-slate-600 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            autoFocus
                        />
                        <button type="submit" className="text-green-400 hover:text-green-300"><Check size={20}/></button>
                        <button type="button" onClick={handleCancelEdit} className="text-red-400 hover:text-red-300"><X size={20}/></button>
                    </form>
                  ) : (
                    // Normal view
                    <>
                      <div className="flex items-center gap-4 flex-grow cursor-pointer" onClick={() => handleToggleComplete(todo.id)}>
                        <div className={`w-6 h-6 rounded-full border-2 ${todo.completed ? 'border-violet-500 bg-violet-500' : 'border-slate-500'} flex items-center justify-center transition-all duration-300`}>
                          {todo.completed && <Check size={16} className="text-white" />}
                        </div>
                        <span className={`text-lg ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'} transition-all duration-300`}>
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => handleStartEdit(todo)} className="text-slate-400 hover:text-cyan-400 p-2 rounded-full">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)} className="text-slate-400 hover:text-red-500 p-2 rounded-full">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">
                {todos.length === 0 ? "You have no tasks. Add one to get started!" : "No tasks in this view. Great job!"}
              </p>
            )}
          </div>

          {/* Footer & Filters */}
          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
              <span>{activeTodoCount} {activeTodoCount === 1 ? 'item' : 'items'} left</span>
              <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg">
                <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-violet-600 text-white' : 'hover:bg-slate-700'}`}>All</button>
                <button onClick={() => setFilter('active')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'active' ? 'bg-violet-600 text-white' : 'hover:bg-slate-700'}`}>Active</button>
                <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'completed' ? 'bg-violet-600 text-white' : 'hover:bg-slate-700'}`}>Completed</button>
              </div>
              <button onClick={handleClearCompleted} className="text-sm hover:text-red-500 transition-colors">
                Clear Completed
              </button>
            </div>
          )}
        </div>
        <footer className="text-center mt-8 text-slate-600 text-sm">
            <p>Double-click to edit a todo. Built with React & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;