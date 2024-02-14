import { useState } from 'react';

export default function TabSwitcher({ buttons = [], children }) {
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  const [displayedContent, setDisplayedContent] = useState(0);

  const radioButtons = array =>
    array.map((btn, idx) => (
      <label
        key={`radioBtn-${idx}`}
        id={btn}
        name="tab-switcher-buttons"
        className="text-sm font-bold leading-none"
      >
        <input
          type="radio"
          value={btn}
          checked={selectedButton === btn}
          onChange={evt => (handleOptionChange(evt), setDisplayedContent(idx))}
          className="inline-block mr-1 align-middle"
        />
        <p className="inline-block leading-none">{btn}</p>
      </label>
    ));

  return (
    <div id="tab-switcher" className="flex flex-col flex-1 p-3 mb-2 lg:-mt-12">
      <div className="flex justify-end flex-1 mb-2 lg:mb-8">
        <fieldset className="flex flex-wrap items-center mb-3 gap-x-8">
          {radioButtons(buttons)}
        </fieldset>
      </div>

      <div className="flex-col flex-1">
        {children[displayedContent] || children}
      </div>
    </div>
  );

  function handleOptionChange(evt) {
    setSelectedButton(evt.target.value);
  }
}
