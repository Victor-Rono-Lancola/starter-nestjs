/* eslint-disable prettier/prettier */
import { Controller, Post, Req, Res } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { InvoiceService } from '../services/invoice.service';
import { PEDEA_BASE_URL } from 'src/shared/data/api.data';
import { Readable } from 'stream';

// export interface InvoiceEmailInterface {
//     logo: string,
//     invoice: InvoiceInterface,
//     email: string,
//     userName: string,
//     cartItems: CartItemInterface[],
// }

@Controller('invoice')
export class InvoiceController {
    baseURL = PEDEA_BASE_URL;
    constructor(
        private invoiceService: InvoiceService,
    ) { }


    @Post('send')
    async generatePDF(@Req() req, @Res() res) {
        try {
            const { logo, invoice, cartItems, userName } = req.body;
            console.log(req.body);

            // Launch a headless browser using Puppeteer
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            // Generate HTML content for the PDF using a service method
            const finalHtml = this.invoiceService.generateDynamicHtml(logo, invoice, cartItems, userName);
            await page.setContent(finalHtml, { waitUntil: 'load' });

            // Generate the PDF as a Buffer
            const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

            await browser.close();

            // Set response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');

            // Stream the PDF buffer back to the client
            const pdfStream = new Readable();
            pdfStream.push(pdfBuffer);
            pdfStream.push(null); // Signal the end of the stream

            pdfStream.pipe(res);

        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    private async sendEmail(attachmentPath: string, recipientEmail: string) {
        const transporter = nodemailer.createTransport({
            service: 'your-email-service-provider', // e.g., 'gmail'
            auth: {
                user: 'your-email@example.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@example.com',
            to: recipientEmail,
            subject: 'Generated PDF',
            text: 'Please find the attached PDF.',
            attachments: [
                {
                    path: attachmentPath,
                },
            ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
}
