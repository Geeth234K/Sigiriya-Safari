import { FaUtensils } from "react-icons/fa";
import FeaturedActivityCard from "./FeaturedActivityCard";

export default function LocalFoodCard({ activity }) {
  const title = activity?.title || "Local Food";
  const description =
    activity?.shortDescription || "Taste authentic Sri Lankan cuisine cooked fresh every day.";
  const accentColor = activity?.accentColor || "#f59e0b";
  const tag = activity?.tag || "Cuisine";

  return (
    <FeaturedActivityCard
      title={title}
      description={description}
      tag={tag}
      icon={FaUtensils}
      image="/images/activities/local-food-hero.png"
      link="/local-food"
      badge="Signature Cuisine"
      accentColor={accentColor}
    />
  );
}
