import React from 'react';
import PropTypes from 'prop-types';

const SizeRecommendation = ({ userMeasurements, productSizes }) => {
  // Algorithme simple de recommandation de taille
  const getSizeRecommendation = () => {
    if (!userMeasurements || !productSizes) return null;
    
    // Trouver la taille la plus proche des mesures de l'utilisateur
    let bestSize = null;
    let smallestDiff = Infinity;
    
    productSizes.forEach(size => {
      const chestDiff = Math.abs(size.chest - userMeasurements.chest);
      const waistDiff = Math.abs(size.waist - userMeasurements.waist);
      const hipsDiff = Math.abs(size.hips - userMeasurements.hips);
      const totalDiff = chestDiff + waistDiff + hipsDiff;
      
      if (totalDiff < smallestDiff) {
        smallestDiff = totalDiff;
        bestSize = size.brandSize;
      }
    });
    
    return bestSize;
  };
  
  const recommendedSize = getSizeRecommendation();
  
  if (!recommendedSize) return null;
  
  return (
    <div className="size-recommendation">
      <p>
        <strong>Notre recommandation:</strong> Taille {recommendedSize} basée sur vos mesures.
      </p>
      <p className="small-text">
        Cette recommandation est une estimation. Consultez toujours le guide des tailles du vendeur.
      </p>
    </div>
  );
};

SizeRecommendation.propTypes = {
  userMeasurements: PropTypes.object,
  productSizes: PropTypes.array
};

export default SizeRecommendation;