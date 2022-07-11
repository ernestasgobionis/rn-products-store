import { EndpointDictionary } from 'app/services/http/contracts/endpoint-dictionary';

export interface Configuration {
    baseUrl: string;
    endpoints: EndpointDictionary;
}
