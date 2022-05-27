export interface Donation {
    
    anonymousCustomerData: {
        cellPhone: number;
        email: string;
        taxDocument: {
            type: string;
            number: string;
        },
        shippingAddress: {
            zipCode: number;
            streetNumber: any;
            complement: string;
        }
    },
    _paymentMethod: string;
    expirationDate: Date;
    amount: number;
}

export interface People {
    people: string;
    cpf: string;
    nboletos: number;
    money: number;
    date: Date;
    serve: Serve;
}

export interface Serve {
    fullname: string;
    email: string;
    createdAt: Date;
    ownId: string;
    birthDate: Date;
    birthMonth: number;
    appAccess: boolean;
    address_remessa: string;
    username: string;
    id: string;
    _campaign: string;
    phone: Phone;
    shippingAddress: ShippingAddress;
    taxDocument: TaxDocument;
}

export interface Phone {
    countryCode: number;
    areaCode: number;
    number: number;
}

export interface ShippingAddress {
    zipCode: number;
    streetNumber: string;
    complement: string;
    country: string;
    street: string;
    city: string;
    district: string;
    state: string;
}

export interface TaxDocument {
    type: string;
    number: string;
}


