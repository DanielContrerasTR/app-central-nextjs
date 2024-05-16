import "./SafHighlightedSuggestion.scss";

interface SafHighlightedSuggestionProps {
  suggestion: string;
  inputValue: string;
}

// TODO: Is there a better way to do this?
export function SafHighlightedSuggestion({
  suggestion,
  inputValue,
}: SafHighlightedSuggestionProps) {
  const startIndex = suggestion.toLowerCase().indexOf(inputValue.toLowerCase());

  if (startIndex === -1) {
    return <span>{suggestion}</span>;
  }

  const endIndex = startIndex + inputValue.length;

  return (
    <div className="saf-highlighted-suggestion">
      {startIndex !== 0 && <span>{suggestion.substring(0, startIndex)}</span>}
      <span className="bold-span">
        {suggestion.substring(startIndex, endIndex)}
      </span>
      {endIndex !== suggestion.length && (
        <span>{suggestion.substring(endIndex, suggestion.length)}</span>
      )}
    </div>
  );
}
