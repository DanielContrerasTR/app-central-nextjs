"use client"

import "./SafSearchAutocompleteBase.scss";

import { useEffect, useRef, useState } from "react";
import {
  SafListboxInstance,
  type SafSearchFieldInstance,
} from "@saffron/core-components";

import { SafHighlightedSuggestion } from "./SafHighlightedSuggestion";
import { SafLoadingSuggestion } from "./SafLoadingSuggestion";
import dynamic from "next/dynamic";
import { useOutsideClick } from "app/shared/hooks/useOutsideClick";
import { WithSafTarget } from "app/types/WithSafTarget";
import { SafListInstance } from "@saffron/core-components/umd";

const SafListbox = dynamic(
  () =>
    import("@saffron/core-components/react").then(module => module.SafListbox),
  { ssr: false }
);
const SafListboxOption = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafListboxOption
    ),
  { ssr: false }
);
const SafSearchField = dynamic(
  () =>
    import("@saffron/core-components/react").then(
      module => module.SafSearchField
    ),
  { ssr: false }
);

type SafSearchFieldEvent = React.FormEvent<SafSearchFieldInstance> &
  WithSafTarget<SafSearchFieldInstance>;

type SafSearchFieldOnKeyDownEvent =
  React.KeyboardEvent<SafSearchFieldInstance> &
    WithSafTarget<SafSearchFieldInstance>;

export interface ListBoxOption {
  label: string;
  value: string | undefined;
}

interface SafSearchAutocompleteBaseProps {
  onGlobalSearch: (query: string) => Promise<void>;
  onSelectedSuggestion: (option: ListBoxOption) => Promise<void>;
  searchAutocompleteHandler: (query: string) => Promise<ListBoxOption[]>;
  clearHandler: () => void;
  initialInputValue?: string;
}

export function SafSearchAutocompleteBase(
  props: SafSearchAutocompleteBaseProps
) {
  const {
    searchAutocompleteHandler,
    onGlobalSearch,
    clearHandler,
    onSelectedSuggestion,
    initialInputValue,
  } = props;

  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [suggestions, setSuggestions] = useState<ListBoxOption[]>([]);

  const cleanSuggestions = () => {
    setSuggestions([]);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, cleanSuggestions);

  const listBoxContainer = useRef<HTMLDivElement>(null);

  /**
   * Start the async process passed as prop.
   * This will use the query value from the input to start the search autocomplete.
   * When the search gets some results it will set those values to the suggestions list
   * @param query
   */
  const searchAutocomplete = async (query: string) => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    const response = await searchAutocompleteHandler(query);
    setSuggestions(response);
    setIsLoading(false);
  };

  /**
   *  Every time the user types something the search handler will be called
   * @param e SafSearchFieldEvent
   */
  const onInput = async (e: SafSearchFieldEvent) => {
    setInputValue(e.target.value);
    cleanSuggestions();

    await searchAutocomplete(e.target.value);

    // TODO: Define rules to start searching
    // TODO: Add debounce to input changes and searches
    // TODO: How to cancel previous requests if this component is not in charges of handling them?
  };

  /**
   * When clicking the search button this is going to start the global search based on the input value.
   *
   * @param e SafSearchFieldEvent
   */
  const onSearch = async (e: SafSearchFieldEvent) => {
    await onSearchBase(e.target.value);
  };

  const onSearchBase = async (query: string) => {
    cleanSuggestions();
    await onGlobalSearch(query);
  };

  const onClear = () => {
    setInputValue("");
    clearHandler();
    cleanSuggestions();
  };

  const onSelectSuggestion = (option: ListBoxOption) => {
    setInputValue(option.label);
    cleanSuggestions();
    void onSelectedSuggestion(option);
  };

  const isEnterKey = (e: SafSearchFieldOnKeyDownEvent) => e.key === "Enter";
  const isArrowDown = (e: SafSearchFieldOnKeyDownEvent) =>
    e.key === "ArrowDown";
  const isArrowUp = (e: SafSearchFieldOnKeyDownEvent) => e.key === "ArrowUp";

  const handleKeyDown = (e: SafSearchFieldOnKeyDownEvent) => {
    const safListboxRef = listBoxContainer?.current?.firstChild as SafListboxInstance | null;
    
    if (isEnterKey(e)) {
      // When the user is using the keyboard and a selectedIndex from the suggestion list exists
      // the search is going to be made using the label from the suggestion list.
      if (
        safListboxRef?.selectedIndex !== undefined &&
        safListboxRef?.selectedIndex > -1
      ) {
        const selectedSuggestion = suggestions.at(
          safListboxRef?.selectedIndex
        ) as ListBoxOption;
        setInputValue(selectedSuggestion.label);
        onSelectSuggestion(selectedSuggestion);
        return;
      }

      // Using the input value to make the global search
      void onSearchBase(e.target.value);
      return;
    }

    if (suggestions.length) {
      if (isArrowDown(e)) {
        safListboxRef?.selectNextOption();
        return;
      }

      if (isArrowUp(e)) {
        safListboxRef?.selectPreviousOption();
      }
    }
  };

  useEffect(() => {
    if (initialInputValue !== undefined) {
      setInputValue(initialInputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialInputValue]);

  return (
    <div className="search-autocomplete d-flex flex-row" ref={wrapperRef}>
      <div className="searcher d-flex flex-column">
        <SafSearchField
          size={550}
          value={inputValue}
          onSearch={onSearch}
          onInput={onInput}
          onClear={onClear}
          onKeyDown={handleKeyDown}
        />
        <div className="suggestions">
          <SafLoadingSuggestion isLoading={isLoading} />
          {/* TODO: Remove this trick */}
          <div ref={listBoxContainer} hidden={suggestions.length === 0}>
            {!!suggestions.length && (
                <SafListbox
                  density="inherit"
                  aria-label="listbox"
                  
                >
                  {suggestions.map(suggestion => {
                    const { value, label } = suggestion;

                    return (
                      <SafListboxOption
                        key={value}
                        value={value}
                        onClick={() => {
                          onSelectSuggestion(suggestion);
                        }}
                      >
                        <SafHighlightedSuggestion
                          suggestion={label}
                          inputValue={inputValue}
                        />
                      </SafListboxOption>
                    );
                  })}
                </SafListbox>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafSearchAutocompleteBase;