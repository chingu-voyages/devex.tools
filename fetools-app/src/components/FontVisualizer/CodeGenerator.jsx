import CodeBlock from '../CodeBlock';
import TabSwitcher from '../TabSwitcher';

const CodeGenerator = ({
  generateCssCode,
  generateHtmlCode,
  generateTailwindCode,
}) => {
  return (
    <TabSwitcher buttons={['CSS', 'Tailwind']}>
      {[
        <div key="tab-css">
          <div className="flex gap-8">
            <div className="w-1/2">
              <CodeBlock title="HTML" lang="html" code={generateHtmlCode()} />
            </div>
            <div className="w-1/2">
              <CodeBlock title="CSS" lang="css" code={generateCssCode()} />
            </div>
          </div>
        </div>,
        <div key="tab-tailwind">
          <CodeBlock
            title="Tailwind"
            lang="tailwind"
            code={generateTailwindCode()}
          />
        </div>,
      ]}
    </TabSwitcher>
  );
};

export default CodeGenerator;
