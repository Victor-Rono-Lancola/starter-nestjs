/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { join } from 'path';
import { displayCartItems, generateInvoiceNumber, getItemPrice, getTotalPrice, tableRows } from 'src/shared/data/invoice.data';

@Injectable()
export class InvoiceService {

    async sendEmail(attachmentPath: string, recipientEmail: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'gmail'
            auth: {
                user: 'victorrono65@gmail.com',
                pass: '*i am 7167012 rono',
            },
        });

        const mailOptions = {
            from: 'invoice@pedea.com',
            to: recipientEmail,
            subject: 'Pedea Invoice',
            text: 'Please find the attached the invoice for the .',
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

    generateDynamicHtml(logo: string,
        invoice: any,
        cartItems: any[],
        userName: string,) {
        const html = this.htmlData(logo, invoice, cartItems, userName)
        return (html)
    }

    getFile(filePath: string) {
        const fileURL = join(__dirname, '../../../../', 'uploads', filePath);
        return fileURL;
    }

    htmlData(logo, invoice, cartItems, userName) {
        console.log(logo);

        const html = `
        <head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<div style="padding-bottom:100px" class="utility-m-b mt-4">
    <section class=" flex justify-between w-full px-12 mt-4">
        <div class="pedea">
            <div class="logo">
                <img src="${logo}" width="220" height="220" alt="">
            </div>
            <div class="flex flex-col">
                <p class="font-bold w-72">${invoice.companyName}</p>
                <span class="mt-2">${invoice.country}</span>
                <span class="text-sm">${invoice.city}</span>
                <span class="text-sm">${invoice.email}</span>

            </div>

        </div>

        <div class="client">
            <div class="flex flex-col">
                <span class="large-text font-bold" style="font-size: 3rem;">INVOICE</span>
                <span class="text-lg">#${generateInvoiceNumber()}</span>
                <span class="mt-4 text-sm">Balance Due</span>
                <span class="text-lg font-bold">KES ${getTotalPrice(cartItems).toLocaleString()}

                </span>
            </div>
        </div>
    </section>



    <section class="invoice-details w-full px-12">
        <div class="client-name w-full flex items-center mt-2 justify-between p-4">
            <span class="text-md font-bold">${userName.toUpperCase()}</span>
            <div class="flex flex-col w-64">
                <span>${new Date().toDateString()}</span>
            </div>
        </div>
    </section>

    <section class="table p-4 w-full">
        <div class="container mx-auto">
            <table class="min-w-full bg-white border border-gray-300">
                <thead class="bg-gray-700 text-white">
                    <tr>
                        <th class="w-16 px-6 py-3 border border border-gray-300">#</th>
                        <th class="w-4/7 px-6 py-3 border border-gray-300">Description</th>
                        <th class="w-16 px-6 py-3 border border border-gray-300">Qty</th>
                        <th class="w-16 px-6 py-3 border border border-gray-300">Unit Price</th>
                        <th class="w-16 px-6 py-3 border border border-gray-300">Total Amount</th>
                    </tr>
                </thead>

                <tbody>

                    ${displayCartItems(cartItems)
            }




                </tbody>
            </table>
        </div>
    </section>

    <section class="totals w-full px-12">
        <div class="client-name w-full flex items-center mt-2 justify-between p-4">
            <span class="flex flex-col w-72 gap-2 text-blue-600">
                <span class="text-lg border-b border-gray-800 font-bold">BANK DETAILS</span>
                <span class="text-md">Bank Name: <br>
                    <span class="font-bold text-gray-800">${invoice.bankName}</span>
                </span>
                <span class="text-md">Account Name: <br>
                    <span class="font-bold text-gray-800">
                        ${invoice.accountName}
                    </span>
                </span>
                <span class="text-md">Account Number: <br>
                    <span class="font-bold text-gray-800">${invoice.accountNumber}</span>
                </span>
                <span class="text-md">Swift Code: <br>
                    <span class="font-bold text-gray-800">
                        ${invoice.swiftCode}
                    </span>
                </span>

            </span>
            <div class="flex flex-col w-64">
                <div class="text-md w-full flex justify-between">
                    <span>Subtotal:</span>
                    <span>KES ${getTotalPrice(cartItems).toLocaleString()}</span>
                </div>

                <div class="text-md w-full flex justify-between">
                    <span>Total: </span>
                    <span> KES ${getTotalPrice(cartItems).toLocaleString()} </span>
                </div>

                <div class="text-md mt-2 w-full font-bold flex justify-between border-t border-gray-800">
                    <span>BalanceDue: </span>
                    <span> KES ${getTotalPrice(cartItems).toLocaleString()} </span>
                </div>


                <div class="text-sm mt-2 w-full  flex justify-between">
                    <span><span class="font-bold">NOTE:</span> <span class="text-blue-600"> Balance due is inclusive of VAT.</span> </span>
                    <!-- <span> KES ${getTotalPrice(cartItems).toLocaleString()} </span>  -->
                </div>
            </div>
        </div>
    </section>
</div>
        `
        return html;
    }
}

