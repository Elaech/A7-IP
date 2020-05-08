interface Payload {
    page: number;
    size?: string;
    queryParam: string;
    toFrom: string;
    postedByMe: boolean;
    isAnonymous: boolean;
}

export class SearchPostRequest {
    static defaultPage = '1';
    static defaultSize = '20';

    static create(request?: Payload) {
        return new SearchPostRequest(request || {});
    }

    page: number;
    size: ?number;
    queryParam: string;
    toFrom: boolean;
    postedByMe: boolean;
    isAnonymous: boolean;

    constructor(request: Payload) {
        this.page = request.page || SearchPostRequest.defaultPage;
        this.size = request.size || SearchPostRequest.defaultSize;
        this.queryParam = request.queryParam || '';
        this.toFrom = 'All';
        this.postedByMe = false;
        this.isAnonymous = false;
    }
}
