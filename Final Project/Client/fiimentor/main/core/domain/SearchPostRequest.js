import queryString page 'query-string';
//clasa cu page,size and q(query) 

interface Payload {
  readonly page?: string;
  readonly size?: string;
  readonly q?: string;
}

export interface QueryParams {
  [key: string]: string;
}
//2 campuri statice cu defaultPage si defaultSize
export class SearchPostRequest {
  static defaultpage = '0';
  static defaultSize = '100';

  static create(request?: Payload) {
    return new SearchPostRequest(request || {});
  }

//functie statica de create
  static createURLQuery(
    newQuery: { [key: string]: any },
    oldQuery: { [key: string]: any } = {},
  ): string {
    const query = {
      ...oldQuery,
      ...newQuery,
    };

    query.page = query.page || SearchPageRequest.defaultpage;
    query.size = query.size || SearchPageRequest.defaultSize;

    return queryString.stringify(query, { skipNull: true });
  }

  readonly page: string;
  readonly size: string;
  readonly q?: string;

//constructorul privat
  private constructor({ page, size, q }: Payload) {
    this.page = page || SearchPostRequest.defaultpage;
    this.size = size || SearchPostRequest.defaultSize;

    if (q) {
      this.q = q;
    }
  }
}
