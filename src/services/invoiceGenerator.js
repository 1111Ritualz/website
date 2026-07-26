/**
 * invoiceGenerator.js
 * Generates a clean, well-spaced A4 PDF invoice for 1111 Ritualz orders.
 *
 * @param {object}  order    – order object with all fields
 * @param {boolean} download – true = auto-download, false = return jsPDF doc
 */
export async function generateInvoicePDF(order, download = true) {
    const { jsPDF } = await import('jspdf');

    const doc  = new jsPDF({ unit: 'pt', format: 'a4' }); // pt = points, more precise
    const PW   = doc.internal.pageSize.getWidth();         // 595.28 pt
    const PH   = doc.internal.pageSize.getHeight();        // 841.89 pt
    const ML   = 40;   // margin left
    const MR   = 40;   // margin right
    const CW   = PW - ML - MR; // content width

    /* ── tiny helpers ───────────────────────────────────── */
    let cy = 0; // current Y cursor

    const move  = (pts) => { cy += pts; };
    const at    = ()    => cy;

    const setFont = (style = 'normal', size = 10, r = 30, g = 30, b = 30) => {
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
        doc.setTextColor(r, g, b);
    };

    const hline = (y = cy, color = [210, 195, 155], lx = ML, rx = PW - MR) => {
        doc.setDrawColor(...color);
        doc.setLineWidth(0.5);
        doc.line(lx, y, rx, y);
    };

    const rect = (x, y, w, h, r = 30, g = 30, b = 30, mode = 'F') => {
        doc.setFillColor(r, g, b);
        doc.rect(x, y, w, h, mode);
    };

    const rRect = (x, y, w, h, rx, ry, r, g, b, mode = 'F') => {
        doc.setFillColor(r, g, b);
        doc.roundedRect(x, y, w, h, rx, ry, mode);
    };

    const txt = (str, x, y, opts = {}) =>
        doc.text(String(str ?? '—'), x, y, opts);

    const formatDate = (d) => {
        if (!d) return '—';
        try {
            return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch { return String(d); }
    };

    /* ════════════════════════════════════════════════════
       1. HEADER BAND
       ════════════════════════════════════════════════════ */
    const headerH = 90;
    rect(0, 0, PW, headerH, 12, 12, 12);

    // Brand
    setFont('bold', 24, 212, 175, 55);
    txt('11:11 RITUALZ', ML, 38);

    setFont('normal', 9, 170, 170, 170);
    txt('Ritualize yourself with us', ML, 56);

    setFont('normal', 8, 120, 120, 120);
    txt('www.1111ritualz.com', ML, 70);

    // INVOICE word (right)
    setFont('bold', 30, 255, 255, 255);
    txt('INVOICE', PW - MR, 45, { align: 'right' });

    // Invoice number under it
    const invoiceNum = `#${(order.orderId || order.id || 'N/A').toString().toUpperCase()}`;
    setFont('normal', 9, 212, 175, 55);
    txt(invoiceNum, PW - MR, 62, { align: 'right' });

    cy = headerH + 28;

    /* ════════════════════════════════════════════════════
       2. META ROW  (Order details LEFT  |  Bill To RIGHT)
       ════════════════════════════════════════════════════ */
    const midX   = PW / 2 + 10;
    const labelW = 95;  // width reserved for labels on left side

    // ── LEFT: order meta ──
    const metaRows = [
        ['Order ID',        `#${order.orderId || order.id || '—'}`],
        ['Date',            formatDate(order.createdAt || order.date)],
        ['Payment',         order.paymentMethod === 'razorpay' ? 'Razorpay (Online)' : 'WhatsApp / Manual'],
    ];
    if (order.razorpayPaymentId) {
        metaRows.push(['Txn ID', order.razorpayPaymentId]);
    }
    if (order.email) {
        metaRows.push(['Email', order.email]);
    }

    const rowH = 18;
    metaRows.forEach(([label, value], i) => {
        const ry = at() + i * rowH;
        setFont('normal', 9, 110, 110, 110);
        txt(label, ML, ry);
        setFont('bold', 9, 25, 25, 25);
        // Truncate long values to avoid overflow into right column
        const maxW = midX - ML - labelW - 8;
        const lines = doc.splitTextToSize(value, maxW);
        txt(lines[0], ML + labelW, ry); // only first line for meta rows
    });

    // ── RIGHT: Bill To ──
    let billY = at();

    setFont('bold', 8, 212, 175, 55);
    txt('BILL TO', midX, billY);
    billY += 16;

    setFont('bold', 10, 20, 20, 20);
    txt(order.address?.fullName || order.email || '—', midX, billY);
    billY += 15;

    setFont('normal', 9, 80, 80, 80);

    if (order.address) {
        const addr    = order.address;
        const addrStr = [
            addr.line1,
            addr.line2,
            `${addr.city}, ${addr.state}`,
            `Pincode: ${addr.pincode}`,
        ].filter(Boolean);
        addrStr.forEach(line => {
            txt(line, midX, billY);
            billY += 14;
        });
    }

    if (order.phone) {
        setFont('normal', 9, 80, 80, 80);
        txt(`Phone: ${order.phone}`, midX, billY);
        billY += 14;
    }

    if (order.email) {
        setFont('normal', 9, 80, 80, 80);
        txt(`Email: ${order.email}`, midX, billY);
        billY += 14;
    }

    // Advance cursor past the taller of the two columns
    cy = Math.max(at() + metaRows.length * rowH, billY) + 18;

    /* ════════════════════════════════════════════════════
       3. DIVIDER
       ════════════════════════════════════════════════════ */
    hline(at());
    move(20);

    /* ════════════════════════════════════════════════════
       4. ITEMS TABLE
       ════════════════════════════════════════════════════ */
    // Column X positions
    const tProduct = ML;
    const tQty     = ML + CW * 0.52;
    const tRate    = ML + CW * 0.67;
    const tAmt     = PW - MR;

    // Table header row
    const thH = 24;
    rect(ML, at(), CW, thH, 240, 232, 210);

    setFont('bold', 8.5, 60, 55, 40);
    txt('PRODUCT DESCRIPTION', tProduct + 6, at() + 16);
    txt('QTY',                 tQty,         at() + 16);
    txt('UNIT PRICE',          tRate,         at() + 16);
    txt('TOTAL',               tAmt,          at() + 16, { align: 'right' });

    move(thH);

    // Thin column lines
    hline(at(), [200, 190, 170]);

    // Item row
    const qty       = Number(order.quantity  || 1);
    const total     = Number(order.totalAmount || order.amount || 0);
    const unitPrice = qty > 0 ? total / qty : total;

    const itemRowH = 30;
    move(itemRowH * 0.7);

    setFont('bold', 10, 20, 20, 20);
    txt(order.productName || "Ocean's Shield", tProduct + 6, at());

    setFont('normal', 9, 80, 80, 80);
    txt('Ritual bath salt blend — natural ingredients', tProduct + 6, at() + 14);

    setFont('normal', 10, 20, 20, 20);
    txt(String(qty), tQty, at());

    txt(`Rs. ${unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, tRate, at());

    setFont('bold', 10, 20, 20, 20);
    txt(`Rs. ${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, tAmt, at(), { align: 'right' });

    move(itemRowH * 0.6);
    hline(at(), [220, 210, 190]);
    move(22);

    /* ════════════════════════════════════════════════════
       5. TOTALS BLOCK (right-aligned)
       ════════════════════════════════════════════════════ */
    const totX  = ML + CW * 0.55;
    const totW  = PW - MR - totX;
    const totLH = 20; // line height for totals

    const drawTotalLine = (label, value, isBold = false, isGold = false) => {
        if (isBold) {
            setFont('bold', 10, isGold ? 160 : 20, isGold ? 130 : 20, isGold ? 20 : 20);
        } else {
            setFont('normal', 9, 90, 90, 90);
        }
        txt(label, totX, at());
        setFont(isBold ? 'bold' : 'normal', isBold ? 10 : 9, 20, 20, 20);
        txt(value, PW - MR, at(), { align: 'right' });
        move(totLH);
    };

    drawTotalLine('Subtotal',   `Rs. ${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
    drawTotalLine('Shipping',   'FREE');
    drawTotalLine('GST / Tax',  'Inclusive');

    hline(at(), [200, 185, 150], totX, PW - MR);
    move(8);

    // Grand Total highlight box
    rRect(totX - 6, at() - 14, totW + 10, 24, 3, 3, 242, 236, 216);
    setFont('bold', 11, 120, 90, 20);
    txt('GRAND TOTAL', totX, at());
    setFont('bold', 11, 20, 20, 20);
    txt(`Rs. ${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, PW - MR, at(), { align: 'right' });
    move(30);

    /* ════════════════════════════════════════════════════
       6. STATUS BADGE
       ════════════════════════════════════════════════════ */
    const status = (order.status || 'ORDER PLACED').toUpperCase();
    const sColors = {
        DELIVERED: [21, 128, 61],
        SHIPPED:   [14, 116, 144],
        CANCELLED: [153, 27, 27],
    };
    const [sr, sg, sb] = Object.entries(sColors).find(([k]) => status.includes(k))?.[1] || [133, 100, 4];

    rRect(ML, at() - 16, 120, 22, 4, 4, sr, sg, sb);
    setFont('bold', 8.5, 255, 255, 255);
    txt(status, ML + 60, at(), { align: 'center' });
    move(18);

    /* ════════════════════════════════════════════════════
       7. AFFIRMATION / THANK YOU
       ════════════════════════════════════════════════════ */
    hline(at());
    move(20);

    setFont('bold', 10, 160, 135, 85);
    txt('"May this ritual cleanse, protect, and restore you."', PW / 2, at(), { align: 'center' });
    move(18);

    setFont('normal', 8.5, 140, 140, 140);
    txt('Thank you for your purchase!  Questions? Email us: 1111ritualz@gmail.com', PW / 2, at(), { align: 'center' });
    move(12);

    setFont('normal', 7.5, 160, 160, 160);
    txt('This is a system-generated invoice and does not require a physical signature.', PW / 2, at(), { align: 'center' });

    /* ════════════════════════════════════════════════════
       8. FOOTER BAND
       ════════════════════════════════════════════════════ */
    rect(0, PH - 30, PW, 30, 12, 12, 12);
    setFont('normal', 7.5, 110, 110, 110);
    txt(
        '11:11 RITUALZ  |  www.1111ritualz.com  |  1111ritualz@gmail.com  |  +91 96533 90161',
        PW / 2, PH - 12, { align: 'center' }
    );

    /* ════════════════════════════════════════════════════
       9. OUTPUT
       ════════════════════════════════════════════════════ */
    const fileName = `1111Ritualz_Invoice_${(order.orderId || order.id || 'order').toString().replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    if (download) {
        doc.save(fileName);
        return null;
    } else {
        // Return base64 string (for email attachment)
        return {
            doc,
            fileName,
            base64: doc.output('datauristring'), // "data:application/pdf;base64,..."
        };
    }
}
