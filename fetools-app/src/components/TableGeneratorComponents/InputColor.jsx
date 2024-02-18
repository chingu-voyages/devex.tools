
import {hanldeColorOptions} from "./TableGeneratorFN"
const InputColor = ({labelText,prop, tableConfig, setTableConfig}) => {
  return (
    <label className="flex flex-col   w-full  ">
      <h5>{labelText}</h5>
      <div className="border border-gray-200 h-full min-h-8 min-w-8 flex items-center " >
        <input  onChange={(e)=> {hanldeColorOptions(e.target.value,tableConfig,setTableConfig, prop)}}  type="color" value={tableConfig[prop]} className="w-8 h-8" />
        <input
          type="text"
          className="order-none outline-none  w-full h-6 mx-2"
          onChange={(e)=> {hanldeColorOptions(e.target.value,tableConfig,setTableConfig, prop)}}
          placeholder={tableConfig[prop]}
        />
      </div>
    </label>
  );
};

export default InputColor;
