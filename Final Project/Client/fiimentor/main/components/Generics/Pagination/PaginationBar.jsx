import React from 'react';
import { Pagination, PaginationItem } from 'reactstrap';

import { Paginator, PaginatorOptions } from './Paginator';


import {
    PaginationEllipsis,
    PaginationInformation,
    PaginationNext,
    PaginationNumber,
} from './PaginationBarStyles';

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
            <Pagination>
                {pages.length > 1 && (
                    <>
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
                            <PaginationItem>
                                <PaginationNext onClick={onNextLinkClick}>Next</PaginationNext>
                            </PaginationItem>
                        )}
                    </>
                )}
                <PaginationInformation>
                    Afisam de la {options.total ? options.from + 1 : 0} pana la{' '}
                    {options.total < options.size
                        ? options.total
                        : options.from + options.size || 0}{' '}
                    din {options.total || 0} intrari
                </PaginationInformation>
            </Pagination>
        </>
    );
};
