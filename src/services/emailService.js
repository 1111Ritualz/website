/**
 * emailService.js
 * Sends an order confirmation email with the invoice PDF attached.
 *
 * Uses EmailJS (https://www.emailjs.com) — 200 free emails/month.
 *
 * ── SETUP (one-time, do this on emailjs.com) ──────────────
 *  1. Sign up at https://www.emailjs.com
 *  2. Add an Email Service (Gmail / Outlook) → copy the Service ID
 *  3. Create an Email Template with these variables:
 *       {{to_email}}      {{to_name}}      {{order_id}}
 *       {{product_name}}  {{quantity}}     {{total_amount}}
 *       {{order_date}}    {{address}}      {{payment_method}}
 *       {{message}}
 *     Enable "File attachment" in the template settings.
 *  4. Copy the Template ID and your Public Key (Account → General)
 *  5. Replace the three REPLACE_ME values below.
 * ──────────────────────────────────────────────────────────
 */
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_0u8d4hc';           // ✅ configured
const EMAILJS_TEMPLATE_ID = 'REPLACE_ME_TEMPLATE_ID';    // ⚠️ create template on emailjs.com → paste ID here
const EMAILJS_PUBLIC_KEY  = 'fs37cSTcBKu_TOKiG';         // ✅ configured

/**
 * sendInvoiceEmail
 * Sends an order-confirmation email to the customer with the invoice PDF attached.
 *
 * @param {object} order        – the full order object
 * @param {string} pdfBase64    – data URI from generateInvoicePDF(order, false).base64
 * @param {string} pdfFileName  – filename, e.g. "1111Ritualz_Invoice_ORD123.pdf"
 */
export async function sendInvoiceEmail(order, pdfBase64, pdfFileName) {
    if (
        EMAILJS_SERVICE_ID  === 'REPLACE_ME_SERVICE_ID'  ||
        EMAILJS_TEMPLATE_ID === 'REPLACE_ME_TEMPLATE_ID' ||
        EMAILJS_PUBLIC_KEY  === 'REPLACE_ME_PUBLIC_KEY'
    ) {
        console.warn('[sendInvoiceEmail] EmailJS not configured — skipping email send.');
        return { skipped: true };
    }

    const toEmail = order.email || '';
    if (!toEmail) {
        console.warn('[sendInvoiceEmail] No email address on order — skipping.');
        return { skipped: true };
    }

    const addr = order.address
        ? `${order.address.fullName}, ${order.address.line1}${order.address.line2 ? ', ' + order.address.line2 : ''}, ${order.address.city}, ${order.address.state} – ${order.address.pincode}`
        : '—';

    const templateParams = {
        to_email:       toEmail,
        to_name:        order.address?.fullName || toEmail,
        order_id:       order.orderId || order.id || '—',
        product_name:   order.productName || "Ocean's Shield",
        quantity:       String(order.quantity || 1),
        total_amount:   `Rs. ${Number(order.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
        order_date:     order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : new Date().toLocaleString('en-IN'),
        address:        addr,
        payment_method: order.paymentMethod === 'razorpay' ? 'Razorpay (Online)' : 'WhatsApp / Manual',
        message:        'Thank you for your order! Your invoice is attached. May this ritual cleanse, protect, and restore you. 🙏',
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY,
        );
        console.log('[sendInvoiceEmail] Sent successfully:', response.status, response.text);
        return { success: true, response };
    } catch (err) {
        console.error('[sendInvoiceEmail] Failed:', err);
        return { success: false, error: err };
    }
}
