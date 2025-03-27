import { useEffect, useState } from 'react';

interface SliderFormProps {
  value: number;
  setValue: (count: number) => void;
  max: number;
}

export const InputForm = ({ value, setValue, max }: SliderFormProps) => {
  const [inputValue, setInputValue] = useState(value.toFixed(2));

  const handleCoinCountChange = (_value: string) => {
    if (!_value) {
      setValue(0);
      setInputValue('');
      return;
    }

    if (_value.endsWith('.')) {
      setInputValue(_value);
      return;
    }

    let value = parseFloat(parseFloat(_value).toFixed(2));

    if (value > max) {
      value = max;
    }

    setValue(value);
    setInputValue(value.toString());
  };

  useEffect(() => {
    handleCoinCountChange(value.toString());
  }, [value]);

  return (
    <div className="flex items-center bg-[#1A1832] px-3 rounded-tl-lg rounded-br-lg shadow-lg w-[120px]">
      <div className="w-3 mr-[5px] text-white text-[9px]">$</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleCoinCountChange(e.target.value)}
        className="w-[90px] h-8 appearance-none bg-transparent cursor-pointer
                    text-[9px]
                    bg-contain text-white text-xs
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:bg-[url('/images/middle/slidebar/btn_controller_active.png')] 
                    [&::-webkit-slider-thumb]:bg-contain
                    [&::-webkit-slider-thumb]:bg-no-repeat
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:h-6
                    [&::-moz-range-thumb]:w-6
                    [&::-moz-range-thumb]:border-none
                    [&::-moz-range-thumb]:bg-[url('/images/middle/slidebar/btn_controller_active.png')] 
                    [&::-moz-range-thumb]:bg-contain
                    [&::-moz-range-thumb]:bg-no-repeat
                    [&::-moz-range-thumb]:cursor-pointer
                    "
      />
      <div className="flex flex-row absolute gap-1 right-[20px]">
        <button
          onClick={() => handleCoinCountChange((value / 2).toString())}
          className="w-[16px] h-[14px] text-white 
                    bg-[url('/images/middle/buttons/btn_1_2.png')] 
                    bg-cover bg-center bg-no-repeat
                    hover:opacity-90 active:opacity-70 transition-opacity"
        ></button>
        <button
          onClick={() => handleCoinCountChange((value * 2).toString())}
          className="w-[16px] h-[14px] text-white 
                    bg-[url('/images/middle/buttons/btn_x2.png')] 
                    bg-cover bg-center bg-no-repeat
                    hover:opacity-90 active:opacity-70 transition-opacity"
        ></button>
      </div>
    </div>
  );
};
