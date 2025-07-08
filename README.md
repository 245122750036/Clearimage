# ClaritySat: AI Satellite Image Enhancer

ClaritySat is a Next.js web application that uses Generative AI to enhance low-resolution satellite images, transforming them into high-quality, 4K-resolution masterpieces.

## Features

- **Image Upload:** Upload low-resolution satellite images (PNG, JPEG, WEBP).
- **AI Enhancement:** Utilizes Google's Gemini model via Genkit to upscale and clarify images.
- **Interactive Viewer:** Zoom and pan the enhanced image to inspect details.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Framework:** Next.js (App Router)
- **AI:** Google Genkit with Gemini
- **UI:** ShadCN UI, Tailwind CSS, Lucide React Icons
- **Deployment:** Firebase App Hosting

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- A Google Cloud account with a project created.
- A GitHub account.

## Step-by-Step Deployment Guide

Follow these steps to deploy the ClaritySat project from GitHub to Firebase App Hosting.

### 1. Set Up Your Google Cloud Project

1.  **Create a Google Cloud Project:** If you don't have one already, create a new project in the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Enable APIs:** In your Google Cloud project, enable the **Vertex AI API**. This is required for Genkit to function.
3.  **Set Up Authentication:**
    *   Install the Google Cloud CLI ([gcloud CLI](https://cloud.google.com/sdk/docs/install)).
    *   Log in with your Google account:
        ```bash
        gcloud auth login
        ```
    *   Set your project context:
        ```bash
        gcloud config set project YOUR_PROJECT_ID
        ```
    *   Generate application default credentials. This will allow Genkit to authenticate with Google Cloud services when running locally.
        ```bash
        gcloud auth application-default login
        ```

### 2. Clone and Configure the Project

1.  **Fork and Clone the Repository:**
    *   Fork this repository on GitHub.
    *   Clone your forked repository to your local machine:
        ```bash
        git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
        cd YOUR_REPOSITORY_NAME
        ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File:**
    *   Create a `.env` file in the root of your project. This file is used for local development but is not required for deployment as App Hosting handles environment variables. For local development, it can remain empty if you've set up gcloud authentication.

### 3. Set Up Firebase

1.  **Install Firebase CLI:** If you haven't already, install it globally:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Log in to Firebase:**
    ```bash
    firebase login
    ```

3.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    *   Link this Firebase project to your existing Google Cloud project from Step 1.

4.  **Initialize App Hosting:**
    *   In your project's root directory, run the initialization command:
        ```bash
        firebase init apphosting
        ```
    *   Follow the prompts:
        *   Select the Firebase project you just created.
        *   Choose your desired region.
        *   When asked for the backend's public repository, provide the URL of your forked GitHub repository (e.g., `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME`).
    *   This will create `firebase.json` and `.firebaserc` files, which configure the deployment.

### 4. Deploy to Firebase App Hosting

1.  **Commit and Push Changes:**
    *   Commit the `firebase.json` and `.firebaserc` files to your repository.
        ```bash
        git add firebase.json .firebaserc
        git commit -m "feat: Add Firebase App Hosting config"
        git push origin main
        ```

2.  **Deploy:**
    *   Start the deployment from the Firebase CLI:
        ```bash
        firebase apphosting:backends:deploy
        ```
    *   Select the backend to deploy (there should only be one).
    *   Firebase App Hosting will then pull the code from your GitHub repository, build the Next.js application, and deploy it.

3.  **Access Your App:**
    *   Once the deployment is complete, the CLI will provide you with the URL to your live application.

## Running Locally

### Running the Frontend (Next.js)

To run the user interface locally for development and testing:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

### Running the AI Flows (Genkit)

To test the Genkit AI flows, run the Genkit developer UI in a separate terminal:

```bash
npm run genkit:dev
```

This will start a local server, typically at `http://localhost:4000`, where you can inspect, run, and debug your AI flows.
