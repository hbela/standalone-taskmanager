Adding a **"Open in Google Maps"** button next to an address is a standard and highly useful feature that greatly improves the user experience. It's definitely a logical next step for your contact management app.

### 🗺️ Implementation Approach

The most reliable way to achieve this in React Native (Expo) is to use the **`expo-linking`** API to open the device's default map application with a pre-filled address. This approach is preferable to embedding a full map view because it's simpler, leverages the user's preferred map app (Google Maps, Apple Maps, etc.), and doesn't require heavy libraries or additional permissions.

Here’s a practical implementation:

**1. Install the Package (if not already)**
```bash
npx expo install expo-linking
```
It's likely already included in your SDK 54 project, but running this command confirms it.

**2. Create a Map Button Component**
Here is a reusable component you can place next to your displayed address:

```javascript
import { Linking, Alert, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or any icon library you use

const OpenMapButton = ({ address }) => {
  const openAddressInMaps = async () => {
    // Format the address for a maps URL
    // Replace spaces with '+' and remove special characters for a clean URL
    const formattedAddress = encodeURIComponent(address.trim());

    // Create the universal URL. This will open the user's default map app.
    const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

    // Check if the device can open the URL, then open it
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open maps on this device.');
    }
  };

  return (
    <TouchableOpacity onPress={openAddressInMaps} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="map-outline" size={20} color="blue" />
      <Text style={{ marginLeft: 5, color: 'blue' }}>Open in Maps</Text>
    </TouchableOpacity>
  );
};

export default OpenMapButton;
```

**3. Use the Component in Your Contact Screen**
Integrate it where you display the contact's address:
```javascript
import OpenMapButton from './OpenMapButton'; // Adjust the import path

// Inside your contact detail component...
<View>
  <Text>Address: {contact.address}</Text>
  {/* Render the button only if an address exists */}
  {contact.address && <OpenMapButton address={contact.address} />}
</View>
```

### 📱 How It Works & Best Practices

*   **Cross-Platform**: The `https://www.google.com/maps/search/...` URL scheme is very reliable. On iOS, if the user has Google Maps installed, it will open there; otherwise, it will open in Safari or offer to open in Apple Maps. The `Linking` API handles this system interaction.
*   **Address Formatting**: The `encodeURIComponent` function is crucial. It ensures addresses with spaces, commas (`,`), hashtags (`#`), etc., are correctly formatted for a URL (e.g., `"123 Main St, City"` becomes `"123+Main+St%2C+City"`).
*   **Error Handling**: Using `Linking.canOpenURL()` is a good practice to avoid crashes if, for some reason, no map app can handle the request.
*   **User Experience**: Consider adding a small visual indicator (like the icon in the example) to make the button's purpose instantly clear.

### ⚠️ Important Note for Android

For the `Linking.openURL` to work with `https://` URLs on **Android**, you must configure the `android.intent.category.BROWSABLE` intent. In Expo, this is typically handled automatically. However, if you face issues, you might need to add a specific configuration.

You can verify and add it in your **`app.json`** under the Android `intentFilters`:
```json
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "https"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```
After modifying `app.json`, you will need to **rebuild your development client APK** with `eas build`.

### 🧪 Testing the Feature

1.  Add the button to your UI.
2.  Run your development build (`npx expo start --dev-client`) and test with a real address.
3.  When you tap the button, your phone should show an app chooser (if you have multiple map apps) or open the address directly in your default map application.

This feature adds a ton of practical value with relatively little code.