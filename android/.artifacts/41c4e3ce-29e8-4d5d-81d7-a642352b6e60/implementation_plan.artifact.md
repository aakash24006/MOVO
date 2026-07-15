# Implementation Plan - App Icon Update and Bug Fixes

This plan covers two tasks:
1.  **App Icon Update**: Replacing the Android launcher icons with a new logo.
2.  **Bug Fixes**: Fixing a counter that exceeds 100% in the web loading screen.

## Proposed Changes

### 1. App Icon Update
I will generate properly sized PNG icons from the source image at `E:\Projects\Movo New\movo.png` and update the Android project resources.

#### [MODIFY] Android Resources
- **Launcher Icons**: Generate and replace `ic_launcher.png` and `ic_launcher_round.png` in all density folders:
    - `mipmap-mdpi` (48x48)
    - `mipmap-hdpi` (72x72)
    - `mipmap-xhdpi` (96x96)
    - `mipmap-xxhdpi` (144x144)
    - `mipmap-xxxhdpi` (192x192)
- **Adaptive Icon Foreground**: Generate and replace `ic_launcher_foreground.png` in the same density folders (scaled to 108x108 dp equivalent).
- **Adaptive Icon Structure**:
    - [DELETE] `drawable-v24/ic_launcher_foreground.xml` (to ensure the PNG foreground is used).
    - [MODIFY] `mipmap-anydpi-v26/ic_launcher.xml` and `ic_launcher_round.xml` to ensure they point to the correct foreground/background.

#### [NEW] [icon_generator.py](file:///E:/Projects/Movo New/movo-app/android/.artifacts/41c4e3ce-29e8-4d5d-81d7-a642352b6e60/scratch/icon_generator.py)
A temporary Python script to perform the image resizing using the `PIL` library.

---

### 2. Bug Fixes
I will fix the counter logic in the web application to stop at 100%.

#### [MODIFY] [LoadingAnalysis.js](file:///E:/Projects/Movo New/movo-app/components/LoadingAnalysis.js)
- Update the `setInterval` logic to check if `progress` has reached 100.
- Clear the interval and cap the value at 100 to prevent it from counting higher.

## Verification Plan

### Automated Tests
- I will run a build to ensure the resources are valid:
  ```powershell
  ./gradlew :app:assembleDebug
  ```

### Manual Verification
- **App Icon**: The user can verify the new icon by deploying the APK to a device or emulator.
- **Loading Bug**: The user can verify the loading screen in the web app (or via Capacitor) to ensure it stops at 100% and transitions correctly.
