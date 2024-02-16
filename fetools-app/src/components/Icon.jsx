export default function Icon({
  name = 'stat',
  size = '24',
  className = '',
  onClick = () => {},
}) {
  return (
    <span
      className={`material-symbols-rounded icon block ${className}`}
      style={{ fontSize: `${size}px`, height: `${size}px`, width: `${size}px` }}
      onClick={onClick}
    >
      {name}
    </span>
  );
}
