import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { newOrder } from './newOrder.dto';

@Controller()
export class AppController {
  private readonly bookings: newOrder[] = [];

  @Get()
  @Render('index')
  orderForm() {
    return {
      errors: [],
      data: {},
    };
  }

  @Post()
  createOrder(@Body() bookingData: newOrder, @Res() response: Response) {
    const errors: string[] = [];

    if (!bookingData.name) {
      errors.push('A név megadása kötelező!');
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      errors.push('Az email cím formátuma helytelen!');
    }
    
    if (new Date(bookingData.datum) < new Date) {
      errors.push('A dátum nem lehet régebbi mint a mai nap!');
    }

    if (bookingData.nezok < 1 || bookingData.nezok > 10) {
      errors.push('A vendégek száma minimum 1 és maximum 10 lehet!');
    }

    if (errors.length > 0) {
      return response.render('index', {
        errors,
        data: bookingData,
      });
    }

    this.bookings.push(bookingData);
    return response.redirect(303, '/success');
  }
  
  @Get('success')
  @Render('success')
  success() {
    return {
      message: 'Siker!',
    };
  }
}
