import { FILTER_CATEGORIES } from "app/shared/const";
import { useQueryFilters } from "app/shared/hooks/useQueryFilters";
import dynamic from "next/dynamic";

const SafChip = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafChip),
  { ssr: false }
);

interface FilterChipProps {
  filterId: string;
}

export function FilterChip({ filterId }: FilterChipProps) {
    const { deleteFilter } = useQueryFilters();

  const category = FILTER_CATEGORIES.find(cat =>
    cat.filters.some(filter => filter.id === filterId)
  );
  const filter = category?.filters.find(f => f.id === filterId);

  const onClose = () => {
    if (category && filter) {
        deleteFilter(category.id, filter.id);
    }
  };

  return (
    <SafChip closeable onClose={onClose}>
      {filter?.name}
    </SafChip>
  );
}
