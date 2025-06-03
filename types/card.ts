
// name, price, size, color or image
export type CardType ={
    name: string;
    price: number;
    imageHeader: string;
    minSize: string;
    maxSize: string; 
    color?: string[] | null;
    image?: string[] | null;
}