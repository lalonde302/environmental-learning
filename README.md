# Environmental Learning App

A Duolingo-style interactive environmental education app with gamification features built with Expo and React Native. This app works on iOS, Android, and web browsers.

## Features

- **Gamification**:
  - Point system for completing lessons
  - Level progression
  - Badges and achievements to unlock

- **Educational Content**:
  - Environmental lessons categorized by topic
  - Interactive quizzes to test knowledge
  - Career opportunities that unlock as you progress

- **Cross-platform**:
  - Works on iOS, Android, and web browsers
  - Same codebase for all platforms

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd environmental-learning
   npm install
   ```

### Running the App

#### Web (Browser)

To run the app in a web browser:

```
npm run web
```

This will start the Expo development server and open the app in your default web browser.

#### iOS

To run on iOS simulator (requires macOS and Xcode):

```
npm run ios
```

#### Android

To run on Android emulator (requires Android Studio):

```
npm run android
```

#### On Your Phone

1. Install the Expo Go app on your phone
2. Start the development server:
   ```
   npm start
   ```
3. Scan the QR code with Expo Go (Android) or the Camera app (iOS)

## Project Structure

- `/src/screens` - App screens
- `/src/components` - Reusable UI components
- `/src/navigation` - Navigation configuration
- `/src/context` - App state management
- `/src/types` - TypeScript type definitions
- `/src/data` - Sample data for lessons, badges, and careers

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Elements

## App Flow

1. Users start with the Home screen that shows their progress
2. They can browse available lessons by topic
3. After completing a lesson, they take a quiz
4. Points are earned for completed quizzes
5. Users level up as they earn more points
6. Badges and career paths unlock based on progress

## Environment Setup Tips

If you encounter any issues with the environment setup:

1. Make sure you have the latest version of Node.js
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
4. Restart the development server with: `npm start -- --reset-cache` 