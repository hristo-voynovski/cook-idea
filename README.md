# CookIdea 

**CookIdea** is a smart recipe recommendation app designed to inspire home cooks with personalized meal ideas. Using the Spoonacular API and AI-powered recipe generation, CookIdea helps users discover and create recipes based on their available ingredients, dietary preferences, or cravings. The app features an intuitive interface where users can browse, save, and revisit their favorite recipes. With seamless navigation, recipe details open in a dedicated view for easy reading. CookIdea is perfect for anyone looking to simplify meal planning while exploring new and unique culinary ideas.

## [Check it out here!](https://cook-idea.vercel.app/) 
*(It may take up to a minute for the backend on Render to spin up. Please be patient.)*

## Getting Started  

### Installation  

1. Clone the repository:  
   ```
   git clone https://github.com/yourusername/CookIdea.git
   cd CookIdea
   ```
2. Install dependencies:
    ```
    npm install
    ```

### API Keys Setup
To use CookIdea, you need to provide API keys for the required services.

**Spoonacular API Key** – Used for fetching recipes and ingredient data.

**AI API Key – Required** for AI-powered recipe generation (e.g., GROQ API or another provider).

Create a .env file in the frontend folder of the project and add:

```
REACT_APP_SPOONACULAR_API_KEY = your_spoonacular_api_key
REACT_APP_GROQ_API_KEY = your_ai_api_key
```
*Replace your_spoonacular_api_key and your_ai_api_key with your actual API keys.*

Create a .env file in the backend folder of the project and add:

```
SUPABASE_URL= your_supabase_url
SUPABASE_KEY= your_supabase_key
SPOONACULAR_API_KEY= your_spoonacular_api_key
```
*Replace the values with your own*

## Running app

### `npm run dev`

Runs the app in the development mode.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run dev:frontend`

Runs frontend only.

### `npm run dev:backend`

Runs backend only.
