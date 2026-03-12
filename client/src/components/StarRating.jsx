import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating, numReviews, showText = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) return <Star key={i} size={14} fill="currentColor" />;
          if (i === fullStars && hasHalfStar) return <StarHalf key={i} size={14} fill="currentColor" />;
          return <Star key={i} size={14} className="text-gray-300" />;
        })}
      </div>
      {showText && (
        <span className="text-gray-500 text-xs ml-1">
          {rating} ({numReviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;
