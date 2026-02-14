const COUNTRY_TO_CURRENCY: Record<string, string> = {
  usa: "USD",
  "united states": "USD",
  philippines: "PHP",
  "united kingdom": "GBP",
  uk: "GBP",
  canada: "CAD",
  australia: "AUD",
  india: "INR",
  japan: "JPY",
  germany: "EUR",
  france: "EUR",
  italy: "EUR",
  spain: "EUR",
};

const COUNTRY_TO_LOCALE: Record<string, string> = {
  usa: "en-US",
  "united states": "en-US",
  philippines: "en-PH",
  "united kingdom": "en-GB",
  uk: "en-GB",
  canada: "en-CA",
  australia: "en-AU",
  india: "en-IN",
  japan: "ja-JP",
  germany: "de-DE",
  france: "fr-FR",
  italy: "it-IT",
  spain: "es-ES",
};

export function getCurrencyCodeByCountry(country?: string): string {
  if (!country) {
    return "USD";
  }
  return COUNTRY_TO_CURRENCY[country.toLowerCase()] ?? "USD";
}

export function getLocaleByCountry(country?: string): string {
  if (!country) {
    return "en-US";
  }
  return COUNTRY_TO_LOCALE[country.toLowerCase()] ?? "en-US";
}

export function formatCurrencyByCountry(amount: number, country?: string): string {
  const currency = getCurrencyCodeByCountry(country);
  const locale = getLocaleByCountry(country);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
