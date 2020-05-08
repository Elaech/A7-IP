import React from 'react';
import { Pagination, PaginationItem } from 'reactstrap';

import { Paginator, PaginatorOptions } from './Paginator';
import {PaginationEllipsis, PaginationNext, PaginationNumber} from './PaginationBarStyles';

interface Props {
    options: PaginatorOptions;

    onChange(options: PaginatorOptions): void;
}

export const PaginationBar: React.FC<Props> = (props: Props) => {
    const { options, onChange } = props;

    const onPaginationLinkClick = (page: number) => () => {
        if (!Paginator.isCurrent(page, options)) {
            onChange(Paginator.nextOptions(page, options));
        }
    };

    const onNextLinkClick = () => {
        const currentPage = Paginator.currentPage(options);
        onChange(Paginator.nextOptions(currentPage + 1, options));
    };

    const pages = Paginator.paginate(options);
    const totalNumberOfPages: number = Paginator.totalNumberOfPages(options);
    return (
        <>
            {pages.length > 1 && (
                <>
                    <Pagination>
                        {pages.map((p: number, index: number) => {
                            return (
                                <>
                                    <PaginationItem
                                        active={Paginator.isCurrent(p, options)}
                                        key={index}
                                    >
                                        <PaginationNumber onClick={onPaginationLinkClick(p)}>
                                            {p}
                                        </PaginationNumber>
                                    </PaginationItem>
                                    {p === pages[pages.length - 1] && totalNumberOfPages - p > 1 && (
                                        <>
                                            <PaginationEllipsis>...</PaginationEllipsis>
                                            <PaginationItem key={index}>
                                                <PaginationNumber
                                                    onClick={onPaginationLinkClick(totalNumberOfPages)}
                                                >
                                                    {totalNumberOfPages}
                                                </PaginationNumber>
                                            </PaginationItem>
                                        </>
                                    )}
                                </>
                            );
                        })}
                        {!Paginator.isLast(options) && (
                            <PaginationItem key="final">
                                <PaginationNext onClick={onNextLinkClick}>Next</PaginationNext>
                            </PaginationItem>
                        )}
                    </Pagination>
                </>
            )}
        </>
    );
};
