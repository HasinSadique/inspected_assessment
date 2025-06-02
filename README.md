# Video Picker & Player

A simple Expo + TypeScript app that allows users to pick a video, preview it with controls, see metadata, and store a title/description locally using AsyncStorage.

## Features

- Pick a video from device gallery using `expo-image-picker`
- Show a placeholder before video selection
- Play video using `expo-av` with native controls
- Display metadata: filename, duration (mm:ss), size (MB)
- Input and submit a title & description
- Store data in AsyncStorage
- Persistent video on app restart
- File size validation (max 50MB)
- Custom screen for permission denial
- Tailwind CSS styling via `nativewind`
- Unit test using `jest` for duration formatting utility

## Setup Instructions

```bash
git clone <your-repo-url>
cd video-picker-player
npm install
npx expo start
```
