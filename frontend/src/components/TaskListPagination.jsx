import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

function TaskListPagination({ handleNextPage, handlePreviousPage, handlePageChange, page, totalPages }) {
    const generatePages = () => {
        const pages = [];
        // nếu số trang ít hơn 4 thì hiện hết
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 2) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (page >= totalPages - 1) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page, '...', totalPages);
            }
        }

        return pages;
    };

    const pagesToShow = generatePages();

    return (
        <div className="flex justify-center mt-4">
            <Pagination>
                <PaginationContent>
                    {/* chuyển về trang trước */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePreviousPage}
                            className={cn('cursor-pointer', page === 1 && 'pointer-events-none opacity-50')}
                        />
                    </PaginationItem>

                    {/* số trang */}
                    {/* dấu ba chấm */}
                    {pagesToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => {
                                        if (p !== page) handlePageChange(p);
                                    }}
                                    className="cursor-pointer"
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* chuyển đến trang sau */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={page === totalPages ? undefined : handleNextPage}
                            className={cn('cursor-pointer', page === totalPages && 'pointer-events-none opacity-50')}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default TaskListPagination;
