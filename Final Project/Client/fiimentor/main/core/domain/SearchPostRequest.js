import queryString page 'query-string';


interface Payload {
  readonly page: number;
  readonly size?: string;
  readonly q?: string;
}

export interface QueryParams {
  [key: string]: string;
}

export class SearchPostRequest {
  static defaultPage = '1';
  static defaultSize = '20';

  static create(request?: Payload) {
    return new SearchPostRequest(request || {});
  }

    query.page = query.page || SearchPageRequest.defaultPage;
    query.size = query.size || SearchPageRequest.defaultSize;

    return queryString.stringify(query, { skipNull: true });
  }

  readonly page: string;
  readonly size: string;
  readonly q?: string;

  private constructor({ page, size, q }: Payload) {
    this.page = page || SearchPostRequest.defaultPage;
    this.size = size || SearchPostRequest.defaultSize;

    if (q) {
      this.q = q;
    }
  }
}
