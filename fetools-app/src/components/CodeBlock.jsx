import CopyButton from "./CopyButton";

function CodeBlock({ title, code, unit }) {
  return (
    <div className="mb-4">
      <div className="mb-2 text-sm font-bold text-gray-400">{title}</div>
      <div className="p-3 bg-gray-200 rounded">
        <code>{`${code}: ${unit};`}</code>
      </div>
    </div>
  );
}

export default CodeBlock;
