import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export function getCountryNameAndFlag(code) {
  const name = countries.getName(code, "en");
  if (!name) return code;
  const flag = code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
  return `${name} ${flag}`;
}
