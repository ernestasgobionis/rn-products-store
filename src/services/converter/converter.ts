export interface Converter<I, O> {
    convert(data: I): O;
}
