# Dashboard Charts

## Library: react-native-gifted-charts

✅ **Best for Expo & React Native compatibility**
✅ Lightweight & high performance
✅ Uses `react-native-svg` and `expo-linear-gradient`

### Features Used:
- **Bar Chart**: Visualizes monthly billing totals
- **Pie Chart**: Shows billing breakdown by category (Task Title)
- **Automatic Localization**: Adapts labels to user language

### Dependencies:
- `react-native-gifted-charts`
- `react-native-svg`
- `expo-linear-gradient`

### Example Usage:
```tsx
<BarChart
  data={[{value: 50, label: 'Jan', frontColor: '#177AD5'}]}
  width={300}
  height={200}
  barWidth={22}
  spacing={20}
  roundedTop
  isAnimated
/>
```

## ⚠️ Important Setup Note

If you see an error like **"Can not find ViewManager"** or **"Gradient package was not found"**, it means the native modules (`react-native-svg`, `expo-linear-gradient`) are installed in `package.json` but **not present in your running app build**.

**Solution:**
1. Stop your development server.
2. Rebuild your development client:
   - If using EAS: `eas build --profile development --platform android` (or ios)
   - If running locally: `npx expo run:android` (or ios)
3. Restart the server with cache clear: `npx expo start --clear`