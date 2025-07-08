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

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- A Google Cloud account with a project created.
- A GitHub account.
- [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) (only for Firebase deployment)

### Google Cloud Setup (for Genkit AI)

Whether you run the project locally or deploy it, you need to set up Google Cloud for the AI features to work.

1.  **Create a Google Cloud Project:** If you don't have one already, create a new project in the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Enable APIs:** In your Google Cloud project, enable the **Vertex AI API**. This is required for Genkit to function.
3.  **Set Up Local Authentication:**
    *   Install the Google Cloud CLI ([gcloud CLI](https://cloud.google.com/sdk/docs/install)).
    *   Log in with your Google account:
        ```bash
        gcloud auth login
        ```
    *   Set your project context:
        ```bash
        gcloud config set project YOUR_PROJECT_ID
        ```
    *   Generate application default credentials. This allows Genkit to authenticate with Google Cloud services when running locally.
        ```bash
        gcloud auth application-default login
        ```

### Option 1: Running Locally (Without Firebase)

Follow these steps to run the project on your local machine for development and testing.

1.  **Clone the Repository:**
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
    *   Create a `.env` file in the root of your project. It can remain empty if you have completed the Google Cloud Setup above.

4.  **Run the Application:**
    *   **Run the Frontend (Next.js):** Open a terminal and run the following command to start the web application.
        ```bash
        npm run dev
        ```
        The application will be available at `http://localhost:9002`.

    *   **Run the AI Flows (Genkit):** For debugging the AI functionality, open a *second* terminal and run:
        ```bash
        npm run genkit:dev
        ```
        This starts the Genkit developer UI at `http://localhost:4000`, where you can inspect and test your AI flows.

### Option 2: Deploying to Firebase App Hosting

Follow these steps to deploy the ClaritySat project from GitHub to Firebase App Hosting.

1.  **Set Up Firebase:**
    *   If you haven't already, install the Firebase CLI:
        ```bash
        npm install -g firebase-tools
        ```
    *   Log in to Firebase:
        ```bash
        firebase login
        ```
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new Firebase project. Link it to your existing Google Cloud project.

2.  **Initialize App Hosting:**
    *   In your project's root directory, run the initialization command:
        ```bash
        firebase init apphosting
        ```
    *   Follow the prompts:
        *   Select the Firebase project you just created.
        *   Choose your desired region.
        *   When asked for the backend's public repository, provide the URL of your forked GitHub repository (e.g., `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME`).
    *   This will create `firebase.json` and `.firebaserc` files.

3.  **Deploy:**
    *   Commit and push the new Firebase config files to your repository.
        ```bash
        git add firebase.json .firebaserc
        git commit -m "feat: Add Firebase App Hosting config"
        git push origin main
        ```
    *   Start the deployment from the Firebase CLI:
        ```bash
        firebase apphosting:backends:deploy
        ```
    *   Select the backend to deploy. Firebase App Hosting will then pull the code from GitHub, build it, and deploy it.

4.  **Access Your App:**
    *   Once the deployment is complete, the CLI will provide you with the URL to your live application.
