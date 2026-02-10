
import { formatDate, formatDateTime } from '../../utils/dateFormatter';

// Mock i18n
jest.mock('../../i18n', () => ({
  locale: 'en-US',
  t: (key) => {
    const translations = {
      'date.today': 'Today',
      'date.tomorrow': 'Tomorrow',
      'date.yesterday': 'Yesterday',
    };
    return translations[key] || key;
  },
}));

describe('dateFormatter', () => {
    const testDate = new Date('2023-01-15T10:30:00Z'); // January 15, 2023 10:30 UTC

    beforeAll(() => {
        // Set a fixed timezone if possible or test assuming local time
        // Alternatively, we can use a library like mockdate, but for now we'll write loose tests 
        // or check parts of the string.
    });

    describe('formatDate', () => {
        it('should format date correctly', () => {
            // Because timezone depends on the machine running the test, checking exact string can be tricky.
            // We can check if it contains the month and year.
            const result = formatDate(testDate);
            expect(result).toContain('January');
            expect(result).toContain('15');
            expect(result).toContain('2023');
        });

        it('should accept custom options', () => {
             const result = formatDate(testDate, { month: 'short' });
             expect(result).toContain('Jan');
        });
    });

    describe('formatDateTime', () => {
        it('should include time', () => {
            const result = formatDateTime(testDate);
            // Time depends on local test runner timezone
            expect(result).toContain('2023');
        });
    });
});
