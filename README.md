# E-commerce App FrontEnd (React TypeScript)

This project is a simple E-commerce App that allows users to sign up, sign in, view products, add products to the cart, and make purchases.

The backend of this project, built with Spring Boot, is available [here](https://github.com/arunnarasimha5/Ecommerce-App-BE-SpringBoot).

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Spring Tool Suite (STS)](https://spring.io/tools)
- [VS Code](https://code.visualstudio.com/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

### Backend Setup

1. Clone the Backend Spring Boot repository:
   ```sh
   git clone https://github.com/arunnarasimha5/Ecommerce-App-BE-SpringBoot.git
2. Open the project in STS.
3. Run the Spring Boot application on localhost:8080.
   * If you need to run it on a different port, update the *.env.development*  file in the Frontend project accordingly.

### Frontend Setup

1. Clone the Frontend React TypeScript repository:
   ```sh
   git clone https://github.com/arunnarasimha5/Ecommerce-App-FE-React
2. Open the project in VS Code.
3. Navigate to the project root directory and install the dependencies:
   ```
   yarn install
4. Start the Frontend server:
   ```
   yarn start   
  * Ensure it runs on localhost:3000 to match the CORS configuration in the Spring Boot application. If you want to use a different port, update the CORS configuration in the Spring Boot app accordingly.

## *Now, your E-commerce App is up and running!*

## Packages Used
 * Axios - For API Calls
 * MUI - For styling and UI components
 * Emotion Styled - For Styled components

## Topics Covered 
 * Axios API data fetch
 * MUI styling and UI components usage
 * Dividing the screens and UI components
 * Creating common components
 * React Router for navigation
 * CSS and Emotion for styling
 * Usage of hooks

## Usage Instructions
1. Sign Up: Create a new account using the sign-up page.
2. Sign In: Log in using your credentials.
3. View Products: Browse products listed on the product page.
4. Add to Cart: Add desired products to your cart.
5. Purchase: Complete the purchase of the items in your cart.
