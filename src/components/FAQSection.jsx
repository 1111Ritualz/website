import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ 
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            padding: '1.5rem 0'
        }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: 0
                }}
            >
                <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontFamily: 'var(--font-primary)', 
                    color: 'var(--color-dark)',
                    fontWeight: 500
                }}>
                    {question}
                </h4>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    style={{ color: 'var(--color-gold)', fontSize: '1.5rem' }}
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ 
                            marginTop: '1rem', 
                            fontSize: '0.95rem', 
                            lineHeight: 1.6,
                            color: 'var(--color-text-light)',
                            whiteSpace: 'pre-line' 
                        }}>
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const faqs = [
        {
            question: "Is this just another bath salt?",
            answer: "No. Every bath salt on the market is made with essential oils, machine-blended, and produced at scale. Ocean Shield is hand-pounded in a sage-cleansed space while specific mantras play. It uses real herbs, whole lavender buds, not lavender extract, because we believe the intelligence of the plant exists in the whole material."
        },
        {
            question: "I don’t have a bathtub. Can I still use it?",
            answer: "Yes, and most of our users don’t. \n\nBucket method: Two to three tablespoons in warm water, poured from head to toe after your shower. \n\nMug method: One to two tablespoons at the end of your shower. \n\nSimple, fast, and effective."
        },
        {
            question: "What exactly do I do?",
            answer: "Every jar comes with a ritual card with exact words to say, a guided process that takes under three minutes, and access to a curated audio experience. No guesswork required."
        },
        {
            question: "How long will one jar last?",
            answer: "Typically 30 to 45 uses depending on quantity. That is about half a month to one and a half months with daily use."
        },
        {
            question: "Is this spiritual or scientific?",
            answer: "Both. The energetic body is documented in Ayurvedic medicine across 3,000 years. The negative ions in salt water reduce cortisol levels. We hold both the science and the tradition with equal respect. You do not need belief for it to work as an experience."
        },
        {
            question: "Will this clog my drain or make a mess?",
            answer: "No. The salt dissolves fully and botanicals are used in controlled quantities. For tubs, a quick rinse is enough."
        },
        {
            question: "Does it have a strong smell?",
            answer: "There is no artificial fragrance. The scent is natural, mild, and fades after use. You are experiencing the plant itself, not a perfume layer."
        },
        {
            question: "Is it safe for sensitive skin?",
            answer: "Yes, for most people. There are no synthetic additives and no artificial fragrance. If you have highly reactive skin, start with a smaller quantity."
        },
        {
            question: "Can children or older adults use it?",
            answer: "Yes, with reduced quantity. Use about half the standard amount and avoid pouring directly over the face."
        },
        {
            question: "Do I have to pour it over my head?",
            answer: "No. You can use it only on your body. The traditional method includes pouring from head to toe, but you can also pour from the neck down across your shoulders and back."
        }
    ];

    return (
        <section id="faqs" style={{ backgroundColor: 'var(--color-cream)', padding: '6rem 2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                        Questions
                    </span>
                    <h2 style={{ marginTop: '1rem' }}>Honest Answers (AKA FAQ’s)</h2>
                </div>
                <div>
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
