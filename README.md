This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Android App

MOVO also ships as an Android app (`android/` folder). It's a Capacitor WebView wrapper that loads the live deployment at https://movo-kappa.vercel.app, so it always shows the latest released web version. App ID: `com.movo.app`.

### Requirements

- Android Studio (latest stable) with Android SDK
- JDK 17 (bundled with Android Studio)
- Node.js 18+

### Build and run

```bash
npm install
npx cap sync android
Then open the android/ folder in Android Studio, wait for Gradle sync, and press Run on an emulator or USB-connected device.
Build the APK
bashcd android
./gradlew assembleDebug
Output: android/app/build/outputs/apk/debug/movo-<version>.apk — or use Build → Build APK(s) in Android Studio.
Notes

The app URL is set in capacitor.config.ts (server.url); run npx cap sync android after any config change
Location permissions are required for the store map
Android integration by Bhuvanesh Mehta
