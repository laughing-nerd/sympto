import React from 'react';
import { Star as StarIcon } from 'lucide-react';

const Star = ({ fill }: {
  fill: number
}) => {
  // fill is a value between 0 and 1
  return (
    <div style={{ position: 'relative', width: '24px', height: '24px' }}>
      <StarIcon color="#e4e5e9" />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${fill * 100}%`,
          height: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <StarIcon color="#ffc107" />
      </div>
    </div>
  );
};

export const Rating = ({ rating }: {
  rating: number
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} fill={1} />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<Star key={i} fill={rating % 1} />);
    } else {
      stars.push(<Star key={i} fill={0} />);
    }
  }

  return <div style={{ display: 'flex', gap: '4px' }}>{stars}</div>;
};
