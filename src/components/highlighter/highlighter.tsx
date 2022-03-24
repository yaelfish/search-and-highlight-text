import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./highlighter.scss";

interface HighlighterProps {
  text: string;
  searchIsOpen: boolean;
  setSearchIsOpen: (isOpen: boolean) => void;
}

export const HighlightedText: React.FC<HighlighterProps> = ({
  text,
  searchIsOpen,
  setSearchIsOpen,
}) => {
  const [currentFocused, setCurrentFocused] = useState<string>("query1");
  const [query, setQuery] = useState("");
  const [highlightedText, setHighlighted] = useState<JSX.Element[]>();
  const [queries, setQueries] = useState<string[]>([]);

  useEffect(()=>{
    return (()=>{
      onCloseSearch();
    })()
  },[])

  const updateHighlight = useCallback(() => {

    let newQueries: string[] = [];
    let textCopy = text.slice();
    const highlightedText: JSX.Element[] = textCopy
      .split(query)
      .map((q: string, idx: number) => {
        newQueries.push(`query${idx}`);
        let isFocused = currentFocused === `query${idx}` ? "focused" : "";
        return (
          <Fragment key={`query${idx}`}>
            {idx > 0 && (
              <span id={`query${idx}`} className={`highlighted ${isFocused}`}>
                {query}
              </span>
            )}
            {q}
          </Fragment>
        );

      });
    setQueries(newQueries);
    setHighlighted(highlightedText);
    return highlightedText;
  }, [query, text, currentFocused]);

  useEffect(() => {
    if (query !== "") {
      updateHighlight();
    }
  }, [query, searchIsOpen, currentFocused, updateHighlight]);

  const onChangeFocus = (direction: string) => {
    let current = queries.indexOf(currentFocused);

    if (direction === "next") {
      let next: string;
      if (currentFocused === queries[queries.length - 1]){
        next = queries[1];
      } else {
        next = queries[current + 1];
      }
      setCurrentFocused(next);
    }

    if (direction === "prev") {
      let prev: string;
      if (currentFocused === queries[1] || current === 0) {
        prev = queries[queries.length - 1];
      } else {
        prev = queries[current - 1];
      }
      setCurrentFocused(prev);
    }
  };

  const onChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onCloseSearch = () => {
    setQuery("");
    setCurrentFocused(`query1`);
    setQueries([]);
    setSearchIsOpen(false);
  };

  return (
    <main className="container">
      {searchIsOpen && (
        <aside className="search-box">
          <input
            type="search"
            onChange={onChangeSearchQuery}
            placeholder="Search field"
            value={query}
          />

          {query && (
            <p>
              {queries.indexOf(currentFocused) === -1 ? 0 : queries.indexOf(currentFocused)}/{queries.length - 1}
            </p>
          )}

          <div className="arrows">
            <div onClick={() => onChangeFocus("prev")}>
              <div className="arrow prev" />
            </div>
            <div onClick={() => onChangeFocus("next")}>
              <div className="arrow next" />
            </div>
          </div>
          <div className="close" onClick={onCloseSearch}></div>
        </aside>
      )}
      {text && <div className="text-holder">
        {searchIsOpen && query ? highlightedText : text}
      </div>}
    </main>
  );
};
