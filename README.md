# E-Commerce Checkout Project

This project is an e-commerce checkout system built using Vue 3, Vite, Pinia, and TypeScript, with Vuetify for UI components. The application allows users to select countries, ports, and products, displaying a detailed order summary and facilitating the checkout process.

## Technologies
- Vue 3
- Vite
- Pinia
- TypeScript
- Vuetify
- Axios

## Features

- Dynamic dropdowns for selecting countries, ports, and products
- Real-time updates to the order summary, including price, discount, and total amount
- Responsive design with Vuetify components
- State management with Pinia
- TypeScript support for better type safety and development experience

## Getting Started

### Prerequisites

- Node.js (v16.x or later recommended)
- npm or pnpm (preferred package manager)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/belabonga/frontend-shania-mafaza.git

    cd ecommerce
    ```

2. **Install dependencies:**

    If you are using `pnpm`:

    ```bash
    pnpm install
    ```

    Or, if you prefer `npm`:

    ```bash
    npm install
    ```

3. **Run the development server:**

    If you are using `pnpm`:

    ```bash
    pnpm dev
    ```

    Or, if you prefer `npm`:

    ```bash
    npm run dev
    ```

    This will start the development server and open the application in your default browser.

### Project Structure

- `src/` - Contains all the source code
  - `stores/` - Pinia stores for state management
  - `utils/` - Utility functions
- `public/` - Static assets
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project metadata and dependencies

### Development

- **Fetching Data:** Data for countries, ports, and products is fetched asynchronously using store actions.
- **State Management:** The application uses Pinia for managing the state across components.
- **Styling:** Vuetify is used for UI components, ensuring a consistent and responsive design.


### License
This project is Proprietary License - see the LICENSE file for details.
