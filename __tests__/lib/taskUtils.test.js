
import { getStatusColor, getStatusLabel, getTaskStatus, isTaskOverdue } from '../../lib/taskUtils';

describe('taskUtils', () => {
  const now = Date.now();
  const pastDate = new Date(now - 86400000).toISOString(); // 1 day ago
  const futureDate = new Date(now + 86400000).toISOString(); // 1 day from now

  describe('isTaskOverdue', () => {
    it('should return false if task has no due date', () => {
      const task = { dueDate: null, completed: false };
      expect(isTaskOverdue(task)).toBe(false);
    });

    it('should return false if task is completed', () => {
      const task = { dueDate: pastDate, completed: true };
      expect(isTaskOverdue(task)).toBe(false);
    });

    it('should return true if task is not completed and due date is in the past', () => {
      const task = { dueDate: pastDate, completed: false };
      expect(isTaskOverdue(task)).toBe(true);
    });

    it('should return false if task is not completed and due date is in the future', () => {
      const task = { dueDate: futureDate, completed: false };
      expect(isTaskOverdue(task)).toBe(false);
    });
  });

  describe('getTaskStatus', () => {
    it('should return "completed" if task is completed', () => {
      const task = { completed: true };
      expect(getTaskStatus(task)).toBe('completed');
    });

    it('should return "overdue" if task is not completed and overdue', () => {
      const task = { completed: false, dueDate: pastDate };
      expect(getTaskStatus(task)).toBe('overdue');
    });

    it('should return "pending" if task is not completed and not overdue', () => {
      const task = { completed: false, dueDate: futureDate };
      expect(getTaskStatus(task)).toBe('pending');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for each status', () => {
      expect(getStatusColor('completed')).toBe('#34C759');
      expect(getStatusColor('overdue')).toBe('#FF3B30');
      expect(getStatusColor('pending')).toBe('#007AFF');
    });
  });

  describe('getStatusLabel', () => {
    it('should return default English labels without a translator', () => {
      expect(getStatusLabel('completed')).toBe('Completed');
      expect(getStatusLabel('overdue')).toBe('Overdue');
      expect(getStatusLabel('pending')).toBe('Pending');
    });

    it('should use provided translator function', () => {
      const mockT = jest.fn((key) => `translated_${key}`);
      expect(getStatusLabel('completed', mockT)).toBe('translated_tasks.completed');
      expect(mockT).toHaveBeenCalledWith('tasks.completed');
    });
  });
});
