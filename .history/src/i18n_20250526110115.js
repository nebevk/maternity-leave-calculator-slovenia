import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        appName: 'Maternity Leave Calculator',
        menu: {
            calculator: 'Calculator',
            about: 'About',
        },
        footer: '© 2025 By Nejc Bevk',
        about: {
            title: 'About',
            sources: 'Sources',
            explanation: 'Calculation Explanation',
            sourcesList: [
                'Official Slovenian government resources on parental leave',
                'Relevant labor law documents',
                'Other reputable sources',
            ],
            aboutText: 'This page will provide sources and explanations for the maternity leave calculations used in this application.',
            explanationText: 'The calculator uses the latest Slovenian regulations to estimate the duration and breakdown of maternity, paternity, and mixed parental leave. Please consult official resources for the most up-to-date information.'
        }
    },
    sl: {
        appName: 'Kalkulator starševskega dopusta',
        menu: {
            calculator: 'Kalkulator',
            about: 'O aplikaciji',
        },
        footer: '© 2025 Nejc Bevk',
        about: {
            title: 'O aplikaciji',
            sources: 'Viri',
            explanation: 'Pojasnilo izračuna',
            sourcesList: [
                'Uradni viri slovenske vlade o starševskem dopustu',
                'Relevantni dokumenti delovne zakonodaje',
                'Drugi zanesljivi viri',
            ],
            aboutText: 'Ta stran vsebuje vire in pojasnila za izračune starševskega dopusta v tej aplikaciji.',
            explanationText: 'Kalkulator uporablja najnovejše slovenske predpise za oceno trajanja in razdelitve materinskega, očetovskega in skupnega starševskega dopusta. Za najbolj ažurne informacije preverite uradne vire.'
        }
    }
};

const i18n = createI18n({
    legacy: false,
    locale: 'sl',
    fallbackLocale: 'en',
    messages,
});

export default i18n; 