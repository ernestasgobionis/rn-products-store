import { Converter } from 'app/services/converter/converter';

class CartItemConverter implements Converter<SimpleObject, CartItem> {
    convert(data: SimpleObject): CartItem {
        return {
            itemId: data.item_id,
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            image: data.image,
        };
    }
}

export const cartItemConverter = new CartItemConverter();
