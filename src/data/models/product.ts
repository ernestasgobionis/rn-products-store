interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

type ProductListItem = Pick<Product, 'id' | 'name' | 'image' | 'price'>;
