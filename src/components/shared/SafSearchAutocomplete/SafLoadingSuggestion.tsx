import dynamic from "next/dynamic";

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

interface SafLoadingSuggestionProps {
  isLoading: boolean;
  message?: string;
}

export function SafLoadingSuggestion({
  isLoading,
  message = "loading...",
}: SafLoadingSuggestionProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <SafListbox density="inherit" aria-label="listbox">
      <SafListboxOption value="loading" disabled>
        {message}
      </SafListboxOption>
    </SafListbox>
  );
}
