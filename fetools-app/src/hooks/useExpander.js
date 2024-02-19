import { useState } from 'react';

export default function useExpander() {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleIsExpanded(e) {
    e.preventDefault();
    console.log(e);
    setIsExpanded(prev => !prev);
  }

  return [isExpanded, toggleIsExpanded];
}
