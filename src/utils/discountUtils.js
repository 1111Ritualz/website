/**
 * Discount utility for 11:11 Ritualz
 * Supported codes:
 * - FAMILY: 20% OFF (Strictly uppercase, capital always)
 * - RITUAL15: 15% OFF
 * - RITUAL10: 10% OFF
 * - RITUAL5: 5% OFF
 */

export const DISCOUNT_CODES = {
    'FAMILY': 0.20,
    'RITUAL15': 0.15,
    'RITUAL10': 0.10,
    'RITUAL5': 0.05,
};

export const validateCoupon = (rawCode) => {
    if (!rawCode || typeof rawCode !== 'string') {
        return { valid: false, code: '', discountRate: 0, message: '' };
    }
    
    // Always convert code to UPPERCASE as required
    const code = rawCode.trim().toUpperCase();

    if (DISCOUNT_CODES[code] !== undefined) {
        const rate = DISCOUNT_CODES[code];
        const percent = Math.round(rate * 100);
        return {
            valid: true,
            code: code,
            discountRate: rate,
            discountPercent: percent,
            message: `Coupon '${code}' applied successfully! (${percent}% OFF)`
        };
    }

    return {
        valid: false,
        code: code,
        discountRate: 0,
        discountPercent: 0,
        message: 'Invalid coupon code. Try FAMILY for 20% off.'
    };
};
