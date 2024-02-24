import CodeBlock from "../CodeBlock";
import TabSwitcher from "../TabSwitcher";
import EditableInput from "../EditableInput";

const CodeGenerator = ({
    generateCssCode,
    generateTailwindCode,
    toastState,
    font,
    htmlCode,
}) => {
    return (
        <TabSwitcher buttons={["CSS", "Tailwind"]}>
            {[
                <div key="tab-css">
                    <div className="flex gap-8">
                        <div className="w-1/2 flex flex-col">
                            <CodeBlock
                                title="HTML"
                                lang="html"
                                code={htmlCode}
                                toastState={toastState}
                            />
                            <EditableInput
                                label="Container"
                                onChange={() => {}}
                                value={
                                    <select>
                                        {" "}
                                        <option value="h1">H1</option>{" "}
                                        <option value="h1">H2</option>{" "}
                                    </select>
                                }
                            />
                            {/* <select onChange={(e)=> {handlehtmlCode(setHtmlCode,e.target.value)}} > 
                <option value="h1">h1</option>  
                <option value="h2">h2</option>
                <option value="h3">h3</option>
                <option value="h3">h4</option>
              </select> */}
                        </div>
                        <div className="w-1/2">
                            <CodeBlock
                                title="CSS"
                                lang="css"
                                code={generateCssCode(font)}
                                toastState={toastState}
                            />
                        </div>
                    </div>
                </div>,
                <div key="tab-tailwind">
                    <CodeBlock
                        title="Tailwind"
                        lang="tailwind"
                        code={generateTailwindCode(font)}
                        toastState={toastState}
                    />
                </div>,
            ]}
        </TabSwitcher>
    );
};

export default CodeGenerator;
