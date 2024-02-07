import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import GoogleFontButton from '../FontPreviewComponenets/GoogleFontButton';

const Option = props => (
  <components.Option {...props} data-url={props.data.url} />
);

const FontNameInput = ({ font, handleFontChange }) => {
  const [useGoogleFont, setUseGoogleFont] = useState(false);
  const [googleFonts, setGoogleFonts] = useState([]);

  const loadFont = (name, url) => {
    const font = new FontFace(name, `url(${url})`, {
      style: 'normal',
      weight: '400',
    });
    font.load().then(loadedFace => {
      document.fonts.add(loadedFace);
    });
  };

  const fontFamilies = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Sans-serif', label: 'Sans-serif' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Brush Script MT', label: 'Brush Script MT' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  ];

  const fetchGoogleFonts = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBqgqqCwtuUfe308aXdbkr1gOA9hw9__RM'
      );
      const data = await response.json();
      const fonts = data.items.map(item => ({
        value: item.family,
        label: item.family,
        url: item.files.regular,
      }));
      console.log(fonts);
      setGoogleFonts(fonts);
    } catch (error) {
      console.error('Error fetching Google Fonts:', error);
    }
  };

  useEffect(() => {
    if (useGoogleFont) {
      fetchGoogleFonts();
    } else {
      setGoogleFonts([]);
    }
  }, [useGoogleFont]);

  return (
    <div className="flex items-center space-x-4 gap-4 w-full">
      <div className="text-base font-bold">Font</div>
      <div className="flex mt-1 p-1 items-center  w-full">
        <Select
          value={{ value: font.name, label: font.name }}
          onChange={selectedOption => {
            handleFontChange('name', selectedOption.value);
            useGoogleFont && loadFont(selectedOption.value, selectedOption.url);
          }}
          options={useGoogleFont ? googleFonts : fontFamilies}
          className="mt-1 p-2"
          styles={{ control: provided => ({ ...provided, width: '200px' }) }}
          components={{ Option }}
        />
        <GoogleFontButton onClick={() => setUseGoogleFont(!useGoogleFont)} />
      </div>
    </div>
  );
};

export default FontNameInput;
