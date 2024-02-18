import tinycolor from 'tinycolor2';
import { ShadowInput } from './ShadowInput';

import {
  colorChanger,
  shadowPropertyValue,
  newShadow,
  switchShadow,
  removeShadow,
} from './ShadowCreatorFN';
import { ToolPane } from '../ToolsLayout/Sections';
import Icon from '../Icon';

const OptionsBox = ({
  ShadowsStyles,
  setShadowsStyles,
  numOfShadows,
  setNumOfShadows,
  setActiveShadow,
  ActiveShadow,
  setRemoveShadow,
}) => {
  // debugger
  let color = tinycolor(ShadowsStyles[ActiveShadow].shadowColor).toHexString();

  return (
    <ToolPane title="Options" isPrimary={true} icon="tune">
      <div className="flex flex-wrap justify-between gap-y-6 [&>*]:w-[48%] mb-6">
        <div className="control color shadow-color flex items-center">
          <div className="flex items-center border h-[43px] rounded-[.25rem] w-full">
            <input
              type="color"
              value={color}
              onChange={e => {
                colorChanger(
                  e,
                  setShadowsStyles,
                  ShadowsStyles,
                  ActiveShadow,
                  false
                );
              }}
            />
            <input
              type="text"
              className="mx-2 border-none outline-none text-start flex-1"
              placeholder={color}
              onChange={e => {
                colorChanger(e, setShadowsStyles, ShadowsStyles, ActiveShadow);
              }}
            />
          </div>
        </div>

        <ShadowInput
          label="Opacity"
          icon="opacity"
          prop="opacity"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          unitOptions={['%']}
          range={{ min: 0, max: 100 }}
        />

        <ShadowInput
          label="Horizontal Offset"
          icon="width"
          prop="horizontalOffset"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: -50, max: 50 }}
        />

        <ShadowInput
          label="Vertical Offset"
          icon="height"
          prop="verticalOffset"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: -50, max: 50 }}
        />

        <ShadowInput
          label="Spread"
          icon="pan_zoom"
          prop="spread"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          range={{ min: -100, max: 100 }}
        />

        <ShadowInput
          label="Blur"
          icon="lens_blur"
          prop="blur"
          ShadowsStyles={ShadowsStyles}
          setShadowsStyles={setShadowsStyles}
          ActiveShadow={ActiveShadow}
          onChange={shadowPropertyValue}
          inset={true}
          negativeRange={false}
          range={{ min: 0, max: 100 }}
        />

        <div className="flex min-w-full justify-end">
          <span className="flex gap-2">
            Inset
            <input
              type="checkbox"
              className="w-6 h-6 border-[#f5f5f5] accent-accent"
              onChange={e => {
                shadowPropertyValue(
                  e,
                  setShadowsStyles,
                  ShadowsStyles,
                  'inset',
                  ActiveShadow
                );
              }}
            />
          </span>
        </div>
      </div>
      <div className="boxAdd flex gap-4 justify-between text-3">
        <div className="flex gap-4">
          <div className="flex gap-2">
            {ShadowsStyles.map((current, idx) => {
              return (
                <div
                  id={idx}
                  key={idx}
                  onClick={e => {
                    switchShadow(e, setActiveShadow, idx, ActiveShadow);
                  }}
                  className={` ${
                    ActiveShadow === idx ? 'bg-accent text-white' : ''
                  } flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-[.25rem] border border-solid border-[#999999)]`}
                >
                  <span> {idx + 1} </span>
                </div>
              );
            })}
          </div>

          <button
            className="add-shadow flex max-w-[130px] flex-1 cursor-pointer select-none items-center justify-center gap-1 text-sm font-semibold"
            onClick={() => {
              newShadow(
                setNumOfShadows,
                numOfShadows,
                setShadowsStyles,
                ShadowsStyles,
                setActiveShadow,
                ActiveShadow
              );
            }}
          >
            <Icon name="ev_shadow_add" /> Add
          </button>
        </div>

        {numOfShadows > 1 && (
          <button
            className="remove-shadow flex select-none items-center gap-2 text-sm font-semibold hover:text-accent"
            onClick={() =>
              removeShadow(
                setShadowsStyles,
                ShadowsStyles,
                ActiveShadow,
                setActiveShadow,
                numOfShadows,
                setNumOfShadows,
                setRemoveShadow
              )
            }
          >
            <Icon name="ev_shadow_minus" /> Remove
          </button>
        )}
      </div>
    </ToolPane>
  );
};

export default OptionsBox;
