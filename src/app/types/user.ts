export type User = {
    id: number;
    name: string;
    email: string;
    skills?: string[];
    address: Address;
};

type Address = {
    id: string;
    st: string;
    city: string;
    country: string;
}