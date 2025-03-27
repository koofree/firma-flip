interface TextFormProps {
  value: number;
}

export const TextForm = ({ value }: TextFormProps) => {
  return (
    <div className="flex items-center bg-[#1A1832] px-3 py-2 rounded-tl-lg rounded-br-lg shadow-lg w-[200px]">
      <div className="w-3 text-white text-xs">$</div>
      <input
        type="text"
        disabled
        value={value}
        className="w-[140px] h-8 appearance-none bg-transparent cursor-pointer
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
    </div>
  );
};
