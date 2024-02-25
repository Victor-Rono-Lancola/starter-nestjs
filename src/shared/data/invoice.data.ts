/* eslint-disable prettier/prettier */
export function generateInvoiceNumber(): string {
    const invoiceNo = new Date().getTime();
    return (`${invoiceNo}`).slice(-12);
}

export function getItemPrice(item: any) {
    const price = Number(item.unitPrice) * Number(item.quantity);
    return price;
}

export function getTotalPrice(items: any[]) {
    let totalPrice = 0;
    items.map((i) => {
        totalPrice += getItemPrice(i);
    });
    return totalPrice;
}

export function displayCartItems(items: any[]) {
    const rows = items.map((item, index) => tableRows(index, item));
    return rows.join('');
}

export function tableRows(index: number, item: any) {
    const row = `
<tr>
            <td class="w-16 px-6 py-3 border border-gray-300">${index + 1}</td>
            <td class="w-4/7 px-6 py-3 border border-gray-300">
                <span class="text-md">${item.name}</span>
            </td>
            <td class="w-16 px-6 py-3 border border-gray-300">${Number(item.quantity).toLocaleString()}</td>
            <td class="w-16 px-6 py-3 border border-gray-300">${Number(item.unitPrice).toLocaleString()}</td>
            <td class="w-16 px-6 py-3 border border-gray-300">${getItemPrice(item).toLocaleString()}</td>
        </tr>
    `;

    return row;
}