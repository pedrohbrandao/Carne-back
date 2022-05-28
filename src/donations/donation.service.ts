import { FormatService } from './../services/format.service';
import { log } from 'console';
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import moipSdk  from 'moip-sdk-node'
import  {generatePdf}  from 'html-pdf-node-ts'
import { Donation, People } from 'src/interface/donation.interface';
import * as dayjs from 'dayjs'
import PDFMerger = require('pdf-merger-js');
import { ErrorService } from 'src/error/error.service';



@Injectable()
export class DonationService {
    moip = moipSdk({
    accessToken: 'e9d2cd1849494b5e8152b0fbe7a63ae2_v2',
    token: 'FGL7QB4WNY31UPJNOCU0TGZNI6C77OEO',
    key: 'QEGLP745XFNW0DP50JNML3ISUA7T7CN1DKBPDC1M',
    production: true
    })

    url= process.env.URLBASECS
    headers:AxiosRequestHeaders = {
        Accept: 'application/json',
        authorization:"nNeb4KXrfyWKbEOtFi8fFooTU5C0KIuIYx74HIViwKUQBxtEoVxOs3Pr8AaoU7tZ"
  }
    constructor(private http: HttpService, private error:ErrorService, private format:FormatService) { }
    
    async create(data: Donation): Promise<AxiosResponse> {
        const response = this.http.post(this.url, data, { headers: this.headers }).toPromise()
        response.catch(console.log)
        return response
    }
    
    async Moip_ordGet(idPayment: any): Promise<any> {
        const response = await this.moip.payment.getOne(idPayment.data._payment)
        const file = { url: response.body._links.payBoleto.printHref, name: 'example.pdf' };
        return generatePdf(file, { format: "a4", scale: 1.5, timeout: 0, args: ['--no-sandbox']})
    }

    async carne(donation: People): Promise<any>{
        if (donation.nboletos > 12) {
            return this.error.errorClient("Overload")
        }
        const data = this.format.creatobjectboleto(donation)
        const pdfunico = await new PDFMerger();
        const promises = []
        const pdfs = []
        for (let index = 0; index <donation.nboletos; index++) {
            const devolution = await this.create(data)
            promises.push(devolution)
            let date:any = donation.date
            date = dayjs(donation.date).add(30, 'day')
        }
        const resdevolution = await Promise.all(promises)
        resdevolution.map(ord => {
            const pdf  = this.Moip_ordGet(ord)
            pdfs.push(pdf)
        })
        const respdfs = await Promise.all(pdfs)
        await respdfs.map(pdf => {
            pdfunico.add(pdf)
        })
        const reponse  = await pdfunico.saveAsBuffer()
        return reponse
    }


}
