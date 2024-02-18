import Icon from '../Icon';
import { shadowPropertyValue, unitChanger } from './ShadowCreatorFN';
import { useState } from 'react';

export const ShadowInput = ({
  label,
  icon,
  prop,
  setShadowsStyles,
  ShadowsStyles,
  ActiveShadow,
  negativeRange = true,
  unitOptions = ['px', 'em', 'rem'],
}) => {
  let unit =
    ShadowsStyles[ActiveShadow][prop] + ShadowsStyles[ActiveShadow].units[prop];
  const [activeUnit, setActiveUnit] = useState('px');

  return (
    <label className="flex flex-col gap-1 font-semibold lg:mx-w-[242px] max-h-[51px] h-full w-full my-1 text-sm">
      {label}
      <div className="flex gap-x-2">
        <Icon name={icon} />
        <span>{unit} </span>
        <input
          type="range"
          step={activeUnit === 'px' || activeUnit === '%' ? 1 : 0.1}
          min={
            negativeRange
              ? activeUnit === 'px'
                ? -48
                : activeUnit === 'rem' || activeUnit === 'em'
                ? -3
                : 0
              : 0
          }
          max={
            activeUnit === 'px'
              ? 48
              : activeUnit === 'rem' || activeUnit === 'em'
              ? 3
              : 100
          }
          value={ShadowsStyles[ActiveShadow][prop]}
          className="lg:min-w-[10px] w-full accent-accent"
          onChange={e => {
            shadowPropertyValue(
              e,
              setShadowsStyles,
              ShadowsStyles,
              prop,
              ActiveShadow
            );
          }}
        />
        {unitOptions?.length > 1 && (
          <select
            className="outline-none active:outline-none accent-accent"
            onChange={e => {
              unitChanger(
                e,
                prop,
                setShadowsStyles,
                ShadowsStyles,
                ActiveShadow,
                activeUnit,
                setActiveUnit
              );
            }}
          >
            {unitOptions.map((current, idx) => {
              return (
                <option key={idx} value={current}>
                  {' '}
                  {current}{' '}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </label>
  );
};
