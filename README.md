# Library Management System UI

A modern, responsive user interface for a library management system built with React, TypeScript, and Tailwind CSS. This application provides an intuitive dashboard for managing library operations including books, users, admins, notifications, and records.

## Features

- **Dashboard**: Overview of library operations
- **Books Management**: Add, edit, and manage library books
- **User Management**: Handle library users and their accounts
- **Admin Panel**: Administrative controls and settings
- **Notifications**: System notifications and alerts
- **Records**: Track borrowing and return records
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Collapsible Sidebar**: Customizable navigation experience

## Technologies Used

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS 4.1.17 with Flowbite components
- **Build Tool**: Vite 7.1.7
- **Icons**: React Icons 5.5.0
- **State Management**: React Context API
- **Linting**: ESLint with TypeScript support

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- pnpm package manager

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LibraryManagementSystemUI
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

- **Navigation**: Use the collapsible sidebar to navigate between different sections
- **Search**: Use the search bar in the navbar to find books or users
- **Period Selection**: Choose reporting periods (6, 12, or 24 months) from the dropdown
- **Notifications**: Click the notification icon to view system alerts
- **Settings**: Access system settings through the sidebar

## Project Structure

```
src/
├── Components/
│   ├── Navbar.tsx          # Top navigation bar with search and user info
│   └── Sidebar.tsx         # Collapsible navigation sidebar
├── Contexts/
│   ├── AppContext.tsx      # Application context interface
│   └── AppProvider.tsx     # Context provider for state management
├── Pages/
│   └── Dashboard.tsx       # Main dashboard page
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
