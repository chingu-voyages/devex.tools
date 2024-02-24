import CodeBlock from '../CodeBlock';

const HtmlCodeGenerator = ({ generateHtmlCode }) => {
  return <CodeBlock title="HTML" lang="html" code={generateHtmlCode()} />;
};

export default HtmlCodeGenerator;
