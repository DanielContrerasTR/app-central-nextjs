// import { useCustomNavigate } from "../../shared/hooks/useCustomNavigate";
import dynamic from "next/dynamic";

import { FILTER_CATEGORIES } from "app/shared/const";

const SafChip = dynamic(
  () => import("@saffron/core-components/react").then(module => module.SafChip),
  { ssr: false }
);

interface TopCategoryProps {
  categoryId: string;
  filterId: string;
}

export function TopCategory({ categoryId, filterId }: TopCategoryProps) {
  //   const { navigate } = useCustomNavigate();

  const category = FILTER_CATEGORIES.find(cat => cat.id === categoryId);
  const filterName = category?.filters.find(f => f.id === filterId)?.name;

  return (
    <SafChip
      clickable
      onClick={() => {
        // navigate(`/en-us/apps?${categoryId}=${filterId}`);
      }}
    >
      {filterName}
    </SafChip>
  );
}
