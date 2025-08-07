import React from 'react';
import './loadingAnimation.scss';

export const LoadingAnimation = ({ icon, width }) => {
  return (
    <div className="loading-wrapper">
      <img className="loading-img" src={icon} width={width} />
    </div>
  );
};
