// components/HighlightText.jsx
import Highlighter from "react-highlight-words";

export default function HighlightText({ text, search }) {
  return (
    <Highlighter
      highlightClassName="bg-green-300  rounded"
      searchWords={search ? search.split(" ") : []} 
      autoEscape={true}
      textToHighlight={text || ""}
    />
  );
}
