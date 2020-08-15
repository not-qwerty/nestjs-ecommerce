import { IUser } from 'src/types/user';
export interface CreateProductDTO {
    title: string;
    image: string;
    description: string;
    price: string;
    owner: IUser;
    created: Date;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;