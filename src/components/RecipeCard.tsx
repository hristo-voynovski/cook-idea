interface Recipe {
  id: number;
  title: string;
  image: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div key={recipe.id} className="border border-white p-2 w-52 bg-zinc-300">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-36 object-cover"
      />
      <h3 className="text-lg mt-2 text-center">{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
