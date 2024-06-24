'use client';

import { useState } from 'react';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submitted');
    // Implement your logic to submit the form data
  };

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="p-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={3}
            required
          />
        </div>
        <div className="p-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="priority"
                value="High"
                checked={priority === 'High'}
                onChange={() => setPriority('High')}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900">High</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="priority"
                value="Medium"
                checked={priority === 'Medium'}
                onChange={() => setPriority('Medium')}
                className="form-radio h-4 w-4 text-yellow-500"
              />
              <span className="ml-2 text-sm text-gray-900">Medium</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="priority"
                value="Low"
                checked={priority === 'Low'}
                onChange={() => setPriority('Low')}
                className="form-radio h-4 w-4 text-green-500"
              />
              <span className="ml-2 text-sm text-gray-900">Low</span>
            </label>
          </div>
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="To Do"
                checked={status === 'To Do'}
                onChange={() => setStatus('To Do')}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900">To Do</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="In Progress"
                checked={status === 'In Progress'}
                onChange={() => setStatus('In Progress')}
                className="form-radio h-4 w-4 text-yellow-500"
              />
              <span className="ml-2 text-sm text-gray-900">In Progress</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="Completed"
                checked={status === 'Completed'}
                onChange={() => setStatus('Completed')}
                className="form-radio h-4 w-4 text-green-500"
              />
              <span className="ml-2 text-sm text-gray-900">Completed</span>
            </label>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddTask;
