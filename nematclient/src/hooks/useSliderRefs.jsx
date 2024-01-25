
import React from 'react';

export const useSliderRefs = (length) => {
  const sliderRefs = Array.from({ length }, () => React.createRef());
  return sliderRefs;
};