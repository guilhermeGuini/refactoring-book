import * as business from './business.js';
import { invoices } from './invoices.js';
import { plays } from './plays.js';
import { text } from './report.js';

for (let invoice of invoices()) {
    let data = {
        plays: plays(),
        customer: invoice.customer,
        performances: business.createNewObjectWithAmount(invoice.performances, plays()),
        totalAmount: business.totalAmount(invoice.performances, plays()),
        totalVolumeCredits: business.totalVolumeCredits(invoice.performances, plays())
    }
    
    let result = text(data);
    console.log(result)    
}