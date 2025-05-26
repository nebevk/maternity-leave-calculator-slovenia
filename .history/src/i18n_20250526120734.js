/* eslint-disable prettier/prettier */
import { createI18n } from "vue-i18n";

const messages = {
    en: {
        appName: "Maternity Leave Calculator",
        inDevelopment: "In development",
        menu: {
            calculator: "Calculator",
            about: "About",
        },
        footer: "© 2025 By Nejc Bevk",
        calculator: {
            edd: "Expected Due Date (EDD)",
            selectEDD: "Select expected due date",
            birthDate: "Actual Birth Date (if earlier)",
            selectBirthDate: "Select birth date (optional)",
            childrenCount: "Number of children (including multiples)",
            twins: "Twins or multiples",
            specialNeeds: "Child with special needs",
            parentalInfo: "Parental leave: 160 days per parent (60 non-transferable, 100 transferable)",
            motherParental: "Mother's parental leave",
            fatherParental: "Father's parental leave",
            days: "days",
            calculate: "Calculate",
            results: "Results",
            maternityInfo: "Maternity leave: 105 days, starts 28 days before EDD or on birth date if earlier.",
            maternityStart: "Maternity leave start",
            maternityEnd: "Maternity leave end",
            paternityInfo: "Paternity leave: 15 days (+10 for each additional child in case of twins/multiples)",
            paternityDuration: "Paternity leave duration",
            extensions: "Extensions",
            extSpecialNeeds: "+90 days for child with special needs",
            extTwins: "+90 days for twins/multiples",
            ext2kids: "+30 days for 2 children under 8",
            ext3kids: "+60 days for 3 children under 8",
            ext4kids: "+90 days for 4 or more children under 8",
        },
        about: {
            title: "About",
            sources: "Sources",
            explanation: "Calculation Explanation",
            sourcesList: [
                "Official Slovenian government resources on parental leave",
                "Relevant labor law documents",
                "Other reputable sources",
            ],
            aboutText:
                "This page will provide sources and explanations for the maternity leave calculations used in this application.",
            explanationText:
                "The calculator uses the latest Slovenian regulations to estimate the duration and breakdown of maternity, paternity, and mixed parental leave. Please consult official resources for the most up-to-date information.",
        },
    },
    sl: {
        appName: "Kalkulator starševskega dopusta",
        inDevelopment: "V razvoju",
        menu: {
            calculator: "Kalkulator",
            about: "O aplikaciji",
        },
        footer: "© 2025 Nejc Bevk",
        calculator: {
            edd: "Predviden datum poroda (PDP)",
            selectEDD: "Izberite predviden datum poroda",
            birthDate: "Dejanski datum rojstva (če je prej)",
            selectBirthDate: "Izberite datum rojstva (neobvezno)",
            childrenCount: "Število otrok (vključno z večplodnimi)",
            twins: "Dvojčki ali večplodni porod",
            specialNeeds: "Otrok s posebnimi potrebami",
            parentalInfo: "Starševski dopust: 160 dni na starša (60 neprenosljivih, 100 prenosljivih)",
            motherParental: "Starševski dopust matere",
            fatherParental: "Starševski dopust očeta",
            days: "dni",
            calculate: "Izračunaj",
            results: "Rezultati",
            maternityInfo: "Materinski dopust: 105 dni, začne se 28 dni pred PDP ali na dan rojstva, če je prej.",
            maternityStart: "Začetek materinskega dopusta",
            maternityEnd: "Konec materinskega dopusta",
            paternityInfo: "Očetovski dopust: 15 dni (+10 za vsakega dodatnega otroka v primeru dvojčkov/večplodnih)",
            paternityDuration: "Trajanje očetovskega dopusta",
            extensions: "Podaljšanja",
            extSpecialNeeds: "+90 dni za otroka s posebnimi potrebami",
            extTwins: "+90 dni za dvojčke/večplodni porod",
            ext2kids: "+30 dni za 2 otroka mlajša od 8 let",
            ext3kids: "+60 dni za 3 otroke mlajše od 8 let",
            ext4kids: "+90 dni za 4 ali več otrok mlajših od 8 let",
        },
        about: {
            title: "O aplikaciji",
            sources: "Viri",
            explanation: "Pojasnilo izračuna",
            sourcesList: [
                "Uradni viri slovenske vlade o starševskem dopustu",
                "Relevantni dokumenti delovne zakonodaje",
                "Drugi zanesljivi viri",
            ],
            aboutText:
                "Ta stran vsebuje vire in pojasnila za izračune starševskega dopusta v tej aplikaciji.",
            explanationText:
                "Kalkulator uporablja najnovejše slovenske predpise za oceno trajanja in razdelitve materinskega, očetovskega in skupnega starševskega dopusta. Za najbolj ažurne informacije preverite uradne vire.",
        },
    },
};

const i18n = createI18n({
    legacy: false,
    locale: "sl",
    fallbackLocale: "en",
    messages,
});

export default i18n;
