export default function ColorPickerInterface({ className }) {
  return (
    <>
      <div id="color-picker-interface" className={className}>
        <ul>
          <li className="flex flex-col">
            <span className="block font-bold">HEX</span>
            <input type="text" className="border-2 h-10 rounded outline-none text-center"></input>
          </li>
        </ul>
      </div>
    </>
  );
}
