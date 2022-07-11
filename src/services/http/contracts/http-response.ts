export interface HttpResponse {
    data: SimpleObject;
    status: number;
    statusText: string;
    fatalError?: boolean;
    formErrors?: SimpleObject;
}
