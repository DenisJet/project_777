import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../../components/ui/pagination";

type PaginationComponentProps = {
  activePage: number;
  setActivePage: (page: number) => void;
};

export default function PaginationComponent({
  activePage,
  setActivePage,
}: PaginationComponentProps) {
  const renderPagination = () => {
    const totalPages = 5;
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            className="cursor-pointer"
            isActive={activePage === i}
            onClick={() => setActivePage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return paginationItems;
  };

  return (
    <Pagination>
      <PaginationContent>{renderPagination()}</PaginationContent>
    </Pagination>
  );
}
