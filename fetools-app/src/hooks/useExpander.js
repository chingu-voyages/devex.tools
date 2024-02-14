import { useState } from 'react';

export default function useExpander() {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleIsExpanded() {
    setIsExpanded(prev => !prev);
  }

  return [isExpanded, toggleIsExpanded];
}
