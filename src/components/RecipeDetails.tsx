import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [analyzedInstructions, setAnalyzedInstructions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAnalyzedInstructions = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        const data = await response.json();
        setAnalyzedInstructions(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchRecipe();
      fetchAnalyzedInstructions();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!recipe || !analyzedInstructions) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      <h2>Instructions</h2>
      <ul>
        {analyzedInstructions.map((instruction: any) => (
          <li key={instruction.name}>
            <h3>{instruction.name}</h3>
            {instruction.steps.map((step: any) => (
              <p key={step.number}>{step.step}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default RecipeDetails;

