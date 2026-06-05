/**
 * Screenshot Capture Button
 * 
 * A header icon button that captures the current screen.
 * Use this in screen headers for easy screenshot capture.
 */

interface ScreenshotCaptureButtonProps {
  screenName?: string;
}

export default function ScreenshotCaptureButton({ screenName }: ScreenshotCaptureButtonProps) {
  void screenName;

  return null;

  // const { captureCurrentScreen, isCapturing } = useScreenshot();
  // const theme = useTheme();
  //
  // const handleCapture = () => {
  //   captureCurrentScreen(screenName);
  // };
  //
  // if (isCapturing) {
  //   return (
  //     <ActivityIndicator
  //       size="small"
  //       color={theme.colors.primary}
  //       style={{ marginRight: 8 }}
  //     />
  //   );
  // }
  //
  // return (
  //   <IconButton
  //     icon="camera"
  //     size={24}
  //     onPress={handleCapture}
  //     iconColor={theme.colors.primary}
  //   />
  // );
}
