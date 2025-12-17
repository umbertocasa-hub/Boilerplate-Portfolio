# Portfolio Boilerplate

A modern, high-performance portfolio template built with Next.js 14, Tailwind CSS, and WebAuthn for biometric authentication.

## Features

-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS + Framer Motion
-   **Authentication**:
    -   WebAuthn (TouchID / FaceID)
    -   Two-Factor Authentication (TOTP/Google Authenticator)
    -   Secure Admin Panel
-   **Database**: JSON-based (adapter included, easily switchable to Postgres/Neon)
-   **PWA**: Progressive Web App support

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://gitlab.com/kiwiprise/boilerplate-portfolio.git
    cd boilerplate-portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **First Login**:
    -   Navigate to `/login`.
    -   Since no users exist, you will be prompted to create the **Admin Account**.
    -   Set your Email, Password, and PIN.

## Configuration

-   **Environment Variables**: see `.env.example` (add your own secrets).
-   **Database**: default uses `data/db.json` for simplicity. Check `lib/db.ts` to switch adapters.

## License

MIT
