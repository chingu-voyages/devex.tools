import SVGIcon from '../assets/icons/SVGIcon';

export default function Icon({
  name = 'stat',
  size = '24',
  type = 'material',
  className = '',
  onClick = () => {},
  ...props
}) {
  const classNames = `icon select-none ${className} ${
    type === 'material' ? 'material-symbols-rounded' : ''
  }`;

  return (
    <div
      className={classNames}
      style={{
        fontSize: `${size}px`,
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `1`,
      }}
      onClick={onClick}
      {...props}
    >
      {type.toLowerCase() === 'svg' ? <SVGIcon name={name} /> : name}
    </div>
  );
}
