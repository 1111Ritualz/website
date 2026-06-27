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
                    color: '#fff',
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
                            color: 'rgba(255, 255, 255, 0.7)',
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
            question: "What makes this different from Epsom or spa salts?",
            answer: "Epsom salts focus on magnesium and muscle relaxation.\nThis goes beyond that.\nIt is built as a ritual system:\nMineral base for physical effect\nWhole herbs for sensory and traditional value\nStructured usage for consistency\nIt is not a spa product. It is a daily reset tool."
        },
        {
            question: "Is this spiritual or scientific?",
            answer: "Both, depending on how you approach it.\nSalt water interaction and negative ions are scientifically studied\nHerbal usage is rooted in traditional systems like Ayurveda\nThe ritual layer is optional but enhances consistency and intent\nYou do not need belief for it to work as an experience."
        },
        {
            question: "I don’t have a bathtub. Can I still use it?",
            answer: "Yes, and most people do not use bathtubs.\nBucket method\nTwo to three tablespoons in warm water, poured after your shower\nMug method\nOne to two tablespoons at the end of your shower\nSimple, fast, and effective."
        },
        {
            question: "What exactly do I do?",
            answer: "Every jar comes with: \n- A ritual card with exact words to say\n- A guided process that takes under three minutes\n- Access to a curated audio experience\nAlso written on the website in How To Use Section\nNo guesswork required."
        },
        {
            question: "Can I use it every day?",
            answer: "Yes. Daily use is where the effect compounds.\nThis is not a once a week luxury. It is designed to integrate into your routine."
        },
        {
            question: "Will this clog my drain or make a mess?",
            answer: "No.\nThe salt dissolves fully and botanicals are used in controlled quantities.\nFor tubs, a quick rinse is enough."
        },
        {
            question: "Will it stain my skin or bathroom?",
            answer: "No.\nThe herbs used do not release staining pigments at these levels."
        },
        {
            question: "Does it have a strong smell?",
            answer: "There is no artificial fragrance.\nThe scent is natural, mild, and fades after use.\nYou are experiencing the plant itself, not a perfume layer."
        },
        {
            question: "How long will one jar last?",
            answer: "Typically 30 to 45 uses depending on quantity.\nThat is about half month to one month with daily use."
        },
        {
            question: "Is it safe for sensitive skin?",
            answer: "Yes, for most people.\nThere are no synthetic additives and no artificial fragrance.\nIf you have highly reactive skin, start with a smaller quantity."
        },
        {
            question: "Can I use it during periods or after workouts?",
            answer: "Yes.\nMany users prefer it during physical fatigue, mental burnout, and hormonal cycles."
        },
        {
            question: "Can children or older adults use it?",
            answer: "Yes, with reduced quantity.\nUse about half the standard amount and avoid pouring directly over the face."
        },
        {
            question: "Will this fix my stress or sleep issues?",
            answer: "What it does is create a consistent reset moment, physically and mentally.\nThis supports better sleep and reduced stress over time with regular use."
        },
        {
            question: "Is this only for spiritual people?",
            answer: "No.\nAt a minimum, it functions as a mineral rinse and a sensory experience.\nThe ritual layer is optional."
        },
        {
            question: "Can I mix this with soap or body wash?",
            answer: "No.\nUse it after your regular shower.\nIt is a final layer, not a cleanser."
        },
        {
            question: "Do I need to dry off differently?",
            answer: "Let the water sit on your skin for one to two minutes before towel drying.\nThis allows better mineral interaction."
        },
        {
            question: "How should I store it?",
            answer: "Keep it in a cool and dry place with the lid tightly closed.\nMoisture exposure can affect texture over time."
        },
        {
            question: "Do I have to pour it over my head?",
            answer: "No. You can use it only on your body.\nThe traditional method includes pouring from head to toe, but it is not mandatory.\nIf you prefer, pour it from the neck down and let it flow across your shoulders, chest, and back.\nThe primary interaction happens through your skin, so full body contact is enough."
        },
        {
            question: "Can I avoid my face and hair completely?",
            answer: "Yes.\nThere is no requirement to involve your face or hair.\nThis is a body application ritual and works effectively without touching the head area."
        },
        {
            question: "Can I use it with hot or cold water?",
            answer: "Warm water is recommended.\nIt helps the salt dissolve better and allows the body to relax, improving the overall experience.\nCold water can be used, but the effect will feel different and less calming."
        },
        {
            question: "How much should I use each time?",
            answer: "For daily use, for a mug using one to two tablespoons is enough.\nAnd for a bucket, three to four spoons is enough. \nFor a deeper experience, you can increase slightly, but more is not always better.\nConsistency matters more than quantity."
        },
        {
            question: "What if I don’t feel anything immediately?",
            answer: "That is normal.\nThis is not designed as an instant reaction product.\nThe effect builds with repeated use as part of a routine."
        },
        {
            question: "Can I use it more than once a day?",
            answer: "Yes, but it is usually not necessary.\nOnce a day is sufficient for most people.\nIf used more frequently, reduce the quantity per use."
        },
        {
            question: "Can I use it in a quick shower?",
            answer: "Yes.\nEven a short use at the end of your shower is effective.\nThe ritual is designed to fit into real routines, not require extra time."
        },
        {
            question: "What if I skip a few days?",
            answer: "Nothing negative happens.\nJust resume your routine.\nConsistency over time matters more than perfection."
        },
        {
            question: "Can I travel with it?",
            answer: "Yes.\nJust ensure the lid is tightly closed and kept away from moisture."
        },
        {
            question: "Why 11:11 Ritualz Ocean's Shield Bath Salt?",
            answer: "Because, \n11:11 Ritualz is an artisanal wellness brand that creates intentionally crafted bathproducts, including Ocean's Shield, designed to cleanse the energetic body using realherbs and sea salt, without essential oils or machinery."
        }
    ];

    return (
        <section id="faqs" style={{ backgroundColor: 'var(--color-dark)', padding: '6rem 2rem', color: '#fff' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                        Questions
                    </span>
                    <h2 style={{ marginTop: '1rem', color: '#fff' }}>Honest Answers (AKA FAQ’s)</h2>
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
