import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {

    errorClient(message:string) {
        throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: message,
  },     HttpStatus.FORBIDDEN);
    }
}
