import CodeBlock from '../CodeBlock';
import TabSwitcher from '../TabSwitcher';

const CodeGenerator = ({
  generateCssCode,
  generateHtmlCode,
  generateTailwindCode,
  toastState
}) => {
  return (
    <TabSwitcher buttons={['CSS', 'Tailwind']}>
      {[
        <div key="tab-css">
          <div className="flex gap-8">
            <div className="w-1/2">
              <CodeBlock title="HTML" lang="html" code={generateHtmlCode()} toastState={toastState}/>
            </div>
            <div className="w-1/2">
              <CodeBlock title="CSS" lang="css" code={generateCssCode()} toastState={toastState}/>
            </div>
          </div>
        </div>,
        <div key="tab-tailwind">
          <CodeBlock
            title="Tailwind"
            lang="tailwind"
            code={generateTailwindCode()}
            toastState={toastState}
          />
        </div>,
      ]}
    </TabSwitcher>
  );
};

export default CodeGenerator;
