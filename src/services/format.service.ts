import { Injectable } from '@nestjs/common';
import { Donation, People } from 'src/interface/donation.interface';

@Injectable()
export class FormatService {
    creatobjectboleto(date: People): Donation {
        const boleto: Donation = {
            anonymousCustomerData: {
                cellPhone: date.serve.phone.number,
                email: date.serve.email,
                shippingAddress: {
                    complement: date.serve.shippingAddress.complement,
                    streetNumber: date.serve.shippingAddress.streetNumber,
                    zipCode: date.serve.shippingAddress.zipCode
                },
                taxDocument: {
                    type: date.serve.taxDocument.type,
                    number: date.serve.taxDocument.number,
                },
            },
            _paymentMethod: "5dcc450f31625a04e6214568",
            amount: date.money,
            expirationDate: date.date
        }
        return boleto
    }
}
