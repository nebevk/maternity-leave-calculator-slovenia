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
        footer: "© {year} By Nejc Bevk",
        calculator: {
            edd: "Expected Due Date (EDD)",
            selectEDD: "Select expected due date",
            birthDate: "Actual Birth Date (if earlier)",
            selectBirthDate: "Select birth date (optional)",
            newbornsCount: "Number of newborns from this birth",
            existingKidsUnder8: "Existing children under 8 (excluding newborns)",
            specialNeeds: "Child with special needs",
            parentalInfo: "Parental leave: 160 days per parent (60 non-transferable, 100 transferable). Mother + Father must total 320 days.",
            motherParental: "Mother's parental leave",
            fatherParental: "Father's parental leave",
            days: "days",
            calculate: "Calculate",
            results: "Results",
            errorTitle: "Error",
            errorEDD: "Please select an expected due date.",
            errorParentalTotal: "Mother's and father's parental leave must total 320 days.",
            errorParentalCap: "No parent may exceed 260 days (160 own + 100 transferred).",
            errorBirthAfterEDD: "Birth date cannot be more than 4 weeks after the expected due date.",
            maternityInfo: "Maternity leave: 105 days, starts 28 days before EDD or on birth date if earlier.",
            maternityStart: "Maternity leave start",
            maternityEnd: "Maternity leave end",
            paternityInfo: "Paternity leave: 15 days (+10 for each additional newborn in a multiple birth).",
            paternityDuration: "Paternity leave duration",
            extensions: "Extensions",
            extNone: "None",
            extSpecialNeeds: "+90 days for child with special needs",
            extMultiples: "+90 days for twins or multiples",
            extPremature: "+{days} days for premature birth",
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
        footer: "© {year} Nejc Bevk",
        calculator: {
            edd: "Predviden datum poroda (PDP)",
            selectEDD: "Izberite predviden datum poroda",
            birthDate: "Dejanski datum rojstva (če je prej)",
            selectBirthDate: "Izberite datum rojstva (neobvezno)",
            newbornsCount: "Število novorojenčkov pri tem porodu",
            existingKidsUnder8: "Obstoječi otroci, mlajši od 8 let (brez novorojenčkov)",
            specialNeeds: "Otrok s posebnimi potrebami",
            parentalInfo: "Starševski dopust: 160 dni na starša (60 neprenosljivih, 100 prenosljivih). Skupaj mati + oče = 320 dni.",
            motherParental: "Starševski dopust matere",
            fatherParental: "Starševski dopust očeta",
            days: "dni",
            calculate: "Izračunaj",
            results: "Rezultati",
            errorTitle: "Napaka",
            errorEDD: "Izberite predviden datum poroda.",
            errorParentalTotal: "Starševski dopust matere in očeta mora biti skupaj 320 dni.",
            errorParentalCap: "Posamezni starš ne sme preseči 260 dni (160 lastnih + 100 prenesenih).",
            errorBirthAfterEDD: "Datum rojstva ne sme biti več kot 4 tedne po predvidenem datumu poroda.",
            maternityInfo: "Materinski dopust: 105 dni, začne se 28 dni pred PDP ali na dan rojstva, če je prej.",
            maternityStart: "Začetek materinskega dopusta",
            maternityEnd: "Konec materinskega dopusta",
            paternityInfo: "Očetovski dopust: 15 dni (+10 za vsakega dodatnega novorojenčka v primeru večplodnega poroda).",
            paternityDuration: "Trajanje očetovskega dopusta",
            extensions: "Podaljšanja",
            extNone: "Brez",
            extSpecialNeeds: "+90 dni za otroka s posebnimi potrebami",
            extMultiples: "+90 dni za dvojčke ali večplodni porod",
            extPremature: "+{days} dni za prezgodnji porod",
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

const STORAGE_KEY = "mlc.locale";
const savedLocale =
    (typeof window !== "undefined" && window.localStorage?.getItem(STORAGE_KEY)) ||
    "sl";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: savedLocale,
    fallbackLocale: "en",
    messages,
});

export const LOCALE_STORAGE_KEY = STORAGE_KEY;

export default i18n;
