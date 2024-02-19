import * as icons from './index';

export default function SVGIcon({ name, color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      {...props}
      fill={color || 'currentColor'}
      {...props}
    >
      {icons[name]}
    </svg>
  );
}
