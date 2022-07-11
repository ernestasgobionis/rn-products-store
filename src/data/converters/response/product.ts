import { Converter } from 'app/services/converter/converter';

class ProductConverter implements Converter<SimpleObject, Product> {
    convert(data: SimpleObject): Product {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image,
            description: data.description,
        };
    }
}

export const productConverter = new ProductConverter();
