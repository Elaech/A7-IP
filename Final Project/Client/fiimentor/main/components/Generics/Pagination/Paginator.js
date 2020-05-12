export interface PaginatorOptions {
    from: number;
    size: number;
    total: number;
}

type Direction = 'left' | 'right';

export class Paginator {
    static currentPage(options: PaginatorOptions): number {
        return Math.floor((options.from + options.size) / options.size);
    }

    static totalNumberOfPages(options: PaginatorOptions): number {
        const { size, total } = options;

        return Math.ceil(total / size);
    }

    static isCurrent(page: number, options: PaginatorOptions): boolean {
        const currentPage = Paginator.currentPage(options);
        return page === currentPage;
    }

    static isFirst(options: PaginatorOptions): boolean {
        const currentPage = Paginator.currentPage(options);
        return currentPage === 1;
    }

    static isLast(options: PaginatorOptions): boolean {
        const currentPage = Paginator.currentPage(options);
        const totalNumberOfPages = Paginator.totalNumberOfPages(options);
        return currentPage === totalNumberOfPages;
    }

    static nextOptions(
        page: number,
        options: PaginatorOptions,
    ): PaginatorOptions {
        return {
            ...options,
            from: page * options.size - options.size,
        };
    }

    static pagesInBounds(
        currentPage: number,
        totalNumberOfPages: number,
        bounds: number,
    ): number[] {
        if (currentPage > totalNumberOfPages || currentPage < 1) {
            return [];
        }

        const left = 'left';
        const right = 'right';
        const maxVisits = bounds * 2;
        const pages: number[] = [currentPage];
        let i = 1;

        const go = (direction: Direction, currentOffset: number) => {
            if (direction === left) {
                if (currentPage - currentOffset > 0) {
                    pages.unshift(currentPage - currentOffset);
                }
            }

            if (direction === right) {
                if (currentPage + currentOffset <= totalNumberOfPages) {
                    pages.push(currentPage + currentOffset);
                }
            }
        };

        while (i <= maxVisits && pages.length < bounds) {
            go(left, i);
            go(right, i);
            i += 1;
        }

        return pages;
    }

    static paginate(options: PaginatorOptions, bounds: number = 3): number[] {
        const currentPage = Paginator.currentPage(options);
        const totalNumberOfPages = Paginator.totalNumberOfPages(options);

        return Paginator.pagesInBounds(currentPage, totalNumberOfPages, bounds);
    }
}
