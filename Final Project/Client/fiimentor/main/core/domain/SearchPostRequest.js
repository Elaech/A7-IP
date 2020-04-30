interface Payload {
  page: number;
  size?: string;
  q?: string;
}

export class SearchPostRequest {
  static defaultPage = '1';
  static defaultSize = '20';

  static create(request?: Payload) {
    return new SearchPostRequest(request || {});
  }

   constructor({ page, size, q }) {
    this.page = page || SearchPostRequest.defaultPage;
    this.size = size || SearchPostRequest.defaultSize;

    if (q) {
      this.q = q;
    }
  }
}
