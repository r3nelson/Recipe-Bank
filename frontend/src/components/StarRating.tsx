import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  rating?: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  // add function to make sure star rating only shows values between 0-5 by increments of .5.

  if (!rating) {
    return;
  }

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }
  return (
    <div className="absolute top-3 left-3 flex items-center space-x-1 text-lg font-semibold">
      Rating:&nbsp; {stars}
    </div>
  );
}
