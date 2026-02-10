
import renderer from 'react-test-renderer';
import TaskCard from '../../components/TaskCard';

jest.mock('react-native-paper', () => {
    const react = require('react');
    const mockTheme = {
        colors: {
            primary: "rgb(120, 69, 172)",
            onPrimary: "rgb(255, 255, 255)",
            primaryContainer: "rgb(240, 219, 255)",
            onPrimaryContainer: "rgb(44, 0, 81)",
            secondary: "rgb(102, 90, 111)",
            onSecondary: "rgb(255, 255, 255)",
            secondaryContainer: "rgb(237, 221, 246)",
            onSecondaryContainer: "rgb(33, 24, 42)",
            tertiary: "rgb(128, 81, 88)",
            onTertiary: "rgb(255, 255, 255)",
            tertiaryContainer: "rgb(255, 217, 221)",
            onTertiaryContainer: "rgb(50, 16, 23)",
            error: "rgb(186, 26, 26)",
            onError: "rgb(255, 255, 255)",
            errorContainer: "rgb(255, 218, 214)",
            onErrorContainer: "rgb(65, 0, 2)",
            background: "rgb(255, 251, 255)",
            onBackground: "rgb(29, 27, 30)",
            surface: "rgb(255, 251, 255)",
            onSurface: "rgb(29, 27, 30)",
            surfaceVariant: "rgb(233, 223, 235)",
            onSurfaceVariant: "rgb(74, 69, 78)",
            outline: "rgb(124, 117, 126)",
            outlineVariant: "rgb(204, 196, 206)",
            shadow: "rgb(0, 0, 0)",
            scrim: "rgb(0, 0, 0)",
            inverseSurface: "rgb(50, 47, 51)",
            inverseOnSurface: "rgb(245, 239, 244)",
            inversePrimary: "rgb(220, 184, 255)",
            elevation: {
                level0: "transparent",
                level1: "rgb(248, 242, 251)",
                level2: "rgb(244, 236, 248)",
                level3: "rgb(240, 231, 246)",
                level4: "rgb(239, 229, 245)",
                level5: "rgb(236, 226, 243)"
            },
            surfaceDisabled: "rgba(29, 27, 30, 0.12)",
            onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
            backdrop: "rgba(51, 47, 55, 0.4)"
        }
    };

    return {
        MD3LightTheme: mockTheme,
        MD3DarkTheme: mockTheme,
        Card: Object.assign(
            ({ children, onPress, style }) => react.createElement('View', { onPress, style, testID: 'card' }, children), 
            {
                Content: ({ children, style }) => react.createElement('View', { style, testID: 'card-content' }, children)
            }
        ),
        Chip: ({ children, style, textStyle }) => react.createElement('View', { style, testID: 'chip' }, 
            react.createElement('Text', { style: textStyle }, children)
        ),
        Text: ({ children, style }) => react.createElement('Text', { style }, children),
        useTheme: () => mockTheme,
    };
});

jest.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.mock('../../lib/taskUtils', () => ({
  isTaskOverdue: jest.fn(() => false),
}));

jest.mock('../../utils/dateFormatter', () => ({
  formatDateTime: jest.fn((date) => `Formatted ${date}`),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('TaskCard', () => {
    const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        completed: false,
        createdAt: '2023-01-01',
        dueDate: '2023-01-10',
    };

    it('renders correctly', () => {
        const tree = renderer.create(
            <TaskCard task={mockTask} onPress={() => {}} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders completed state correctly', () => {
        const completedTask = { ...mockTask, completed: true };
        const tree = renderer.create(
            <TaskCard task={completedTask} onPress={() => {}} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
