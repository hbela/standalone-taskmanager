import { CreateTaskInput, Task, TasksResponse, UpdateTaskInput } from '@/types/task';
import * as tasksDb from '../db/tasksDb';

/**
 * Task API methods - now using local SQLite database
 */
export const tasksApi = {
  /**
   * Get all tasks with optional filtering
   */
  getAll: async (params?: { status?: string }): Promise<TasksResponse> => {
    let completed: boolean | undefined;
    
    if (params?.status === 'completed') {
      completed = true;
    } else if (params?.status === 'pending') {
      completed = false;
    }
    
    const tasks = await tasksDb.getAllTasks({ completed });
    
    return {
      tasks,
      total: tasks.length,
      page: 1,
      limit: tasks.length,
    };
  },

  /**
   * Get single task by ID
   */
  getById: async (id: number): Promise<Task> => {
    const task = await tasksDb.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  /**
   * Create a new task
   */
  create: async (data: CreateTaskInput): Promise<Task> => {
    return tasksDb.createTask(data);
  },

  /**
   * Update an existing task
   */
  update: async (id: number, data: UpdateTaskInput): Promise<Task> => {
    return tasksDb.updateTask(id, data);
  },

  /**
   * Delete a task
   */
  delete: async (id: number): Promise<void> => {
    await tasksDb.deleteTask(id);
  },

  /**
   * Toggle task completion status
   */
  toggleComplete: async (id: number, completed: boolean): Promise<Task> => {
    return tasksDb.updateTask(id, { completed });
  }
};

