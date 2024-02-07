export default function ColorPickerInterface({ className }) {
  return (
    <>
      <div id="color-picker-interface" className={className}>
        <ul className="flex flex-col mt-2 gap-y-7 w-fit">
          <li className="flex flex-col">
            <span className="block font-bold">HEX</span>
            <input type="text" maxLength={7}
            className="border-2 h-10 rounded outline-none text-center font-medium text-gray-700 text-sm"></input>
          </li>
          <li className="flex flex-col w-[540px]">
            <span className="block font-bold">RGB</span>
            <div className="flex flex-1">
                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">R</span>
                    <input type="text" 
                    className="
                    border-y-2 border-l-2 border-r-2 
                    h-10 rounded-l outline-none text-center w-full 
                    font-medium text-gray-500 text-sm">
                    </input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">G</span>
                    <input type="text" 
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">B</span>
                    <input type="text" 
                    className="border-y-2 border-r-2 h-10 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

                <div className="relative w-1/4">
                    <span className="block absolute left-5 top-2 w-fit font-bold">A</span>
                    <input type="text" 
                    className="border-y-2 border-r-2 h-10 rounded-r 
                    outline-none text-center w-full
                    font-medium text-gray-500 text-sm"></input>
                </div>

            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
