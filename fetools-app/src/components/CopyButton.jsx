function CopyButton({ onCopy }) {
  const handleCopy = () => {
    const textToCopy = onCopy();
    if (navigator.clipboard && textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          console.log("Text copied to clipboard");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      📋
    </button>
  );
}

export default CopyButton;
