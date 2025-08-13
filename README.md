# Loan Management System

## Overview

A comprehensive loan management system built with React, featuring a responsive design with light and dark theme support. The application provides functionality for loan application, approval, tracking, and repayment for both customers and administrators.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Theme Switching**: Toggle between light and dark themes
- **User Authentication**: Secure login and registration
- **Dashboard**: Personalized dashboards for customers and administrators
- **Loan Management**: Apply for loans, track status, and manage repayments
- **Admin Controls**: Approve/reject loans, manage users, and view reports

## Theme System

The application includes a comprehensive theming system that allows users to switch between light and dark modes. The theme system includes:

- **Theme Provider**: Context API-based theme management
- **Theme Switcher**: UI component for toggling themes
- **CSS Variables**: Theme-specific styling using CSS custom properties
- **System Preference Detection**: Automatically applies the user's system preference
- **Persistent Settings**: Remembers user's theme preference

## Components

The application is built with reusable components:

### UI Components
- Button
- Card
- Input
- Select
- Checkbox
- Radio
- TextArea
- Modal
- Loader
- ThemeSwitcher

### Layout Components
- Header
- Footer
- Sidebar
- Layout
- DashboardLayout

## Styling

The styling system uses SCSS with a modular approach:

- **Base**: Reset, variables, typography, and theme
- **Components**: Buttons, forms, cards, loaders
- **Layouts**: Header, footer, grid
- **Pages**: Auth, dashboard
- **Utilities**: Helper classes

## Usage

### Switching Themes

Click the theme switcher icon in the header to toggle between light and dark themes. The application will remember your preference for future visits.

### Authentication

- **Login**: Access your account through the login page
- **Register**: Create a new account through the registration page

### Customer Features

- View dashboard with loan summary
- Apply for new loans
- Track existing loan status
- Manage repayments
- Update profile information

### Admin Features

- Review and approve/reject loan applications
- Manage user accounts
- View comprehensive reports
- Configure system settings

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
