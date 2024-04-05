const LANGUAGES = {
  afrikaans: "af",
  albanian: "sq",
  amharic: "am",
  arabic: "ar",
  armenian: "hy",
  assamese: "as",
  azerbaijani: "az",
  bashkir: "ba",
  basque: "eu",
  belarusian: "be",
  bengali: "bn",
  bosnian: "bs",
  breton: "br",
  bulgarian: "bg",
  cantonese: "yue",
  catalan: "ca",
  chinese: "zh",
  croatian: "hr",
  czech: "cs",
  danish: "da",
  dutch: "nl",
  english: "en",
  estonian: "et",
  faroese: "fo",
  finnish: "fi",
  french: "fr",
  galician: "gl",
  georgian: "ka",
  german: "de",
  greek: "el",
  gujarati: "gu",
  "haitian creole": "ht",
  hausa: "ha",
  hawaiian: "haw",
  hebrew: "he",
  hindi: "hi",
  hungarian: "hu",
  icelandic: "is",
  indonesian: "id",
  italian: "it",
  japanese: "ja",
  javanese: "jw",
  kannada: "kn",
  kazakh: "kk",
  khmer: "km",
  korean: "ko",
  lao: "lo",
  latin: "la",
  latvian: "lv",
  lingala: "ln",
  lithuanian: "lt",
  luxembourgish: "lb",
  macedonian: "mk",
  malagasy: "mg",
  malay: "ms",
  malayalam: "ml",
  maltese: "mt",
  maori: "mi",
  marathi: "mr",
  mongolian: "mn",
  myanmar: "my",
  nepali: "ne",
  norwegian: "no",
  nynorsk: "nn",
  occitan: "oc",
  pashto: "ps",
  persian: "fa",
  polish: "pl",
  portuguese: "pt",
  punjabi: "pa",
  romanian: "ro",
  russian: "ru",
  sanskrit: "sa",
  serbian: "sr",
  shona: "sn",
  sindhi: "sd",
  sinhala: "si",
  slovak: "sk",
  slovenian: "sl",
  somali: "so",
  spanish: "es",
  sundanese: "su",
  swahili: "sw",
  swedish: "sv",
  tagalog: "tl",
  tajik: "tg",
  tamil: "ta",
  tatar: "tt",
  telugu: "te",
  thai: "th",
  tibetan: "bo",
  turkish: "tr",
  turkmen: "tk",
  ukrainian: "uk",
  urdu: "ur",
  uzbek: "uz",
  vietnamese: "vi",
  welsh: "cy",
  yiddish: "yi",
  yoruba: "yo",
};

const SCALES = {
  "C major": ["C", "D", "E", "F", "G", "A", "B"],
  "C♯ major": ["C♯", "D♯", "F", "F♯", "G♯", "A♯", "C"],
  "D major": ["D", "E", "F♯", "G", "A", "B", "C♯"],
  "D♯ major": ["D♯", "F", "G", "G♯", "A♯", "C", "D"],
  "E major": ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
  "F major": ["F", "G", "A", "A♯", "C", "D", "E"],
  "F♯ major": ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "F"],
  "G major": ["G", "A", "B", "C", "D", "E", "F♯"],
  "G♯ major": ["G♯", "A♯", "C", "C♯", "D♯", "F", "G"],
  "A major": ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
  "A♯ major": ["A♯", "C", "D", "D♯", "F", "G", "A"],
  "B major": ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"],
  "C minor": ["C", "D", "D♯", "F", "G", "G♯", "A♯"],
  "C♯ minor": ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
  "D minor": ["D", "E", "F", "G", "A", "A♯", "C"],
  "D♯ minor": ["D♯", "F", "F♯", "G♯", "A♯", "B", "C♯"],
  "E minor": ["E", "F♯", "G", "A", "B", "C", "D"],
  "F minor": ["F", "G", "G♯", "A♯", "C", "C♯", "D♯"],
  "F♯ minor": ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
  "G minor": ["G", "A", "A♯", "C", "D", "D♯", "F"],
  "G♯ minor": ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯"],
  "A minor": ["A", "B", "C", "D", "E", "F", "G"],
  "A♯ minor": ["A♯", "C", "C♯", "D♯", "F", "F♯", "G♯"],
  "B minor": ["B", "C♯", "D", "E", "F♯", "G", "A"]
};

const PITCH_RANGES = {
  "C0": "C0", "C#0": "C#0", "D0": "D0", "D#0": "D#0", "E0": "E0",
  "F0": "F0", "F#0": "F#0", "G0": "G0", "G#0": "G#0", "A0": "A0",
  "A#0": "A#0", "B0": "B0",

  "C1": "C1", "C#1": "C#1", "D1": "D1", "D#1": "D#1", "E1": "E1",
  "F1": "F1", "F#1": "F#1", "G1": "G1", "G#1": "G#1", "A1": "A1",
  "A#1": "A#1", "B1": "B1",

  "C2": "C2", "C#2": "C#2", "D2": "D2", "D#2": "D#2", "E2": "E2",
  "F2": "F2", "F#2": "F#2", "G2": "G2", "G#2": "G#2", "A2": "A2",
  "A#2": "A#2", "B2": "B2",

  "C3": "C3", "C#3": "C#3", "D3": "D3", "D#3": "D#3", "E3": "E3",
  "F3": "F3", "F#3": "F#3", "G3": "G3", "G#3": "G#3", "A3": "A3",
  "A#3": "A#3", "B3": "B3",

  "C4": "C4", "C#4": "C#4", "D4": "D4", "D#4": "D#4", "E4": "E4",
  "F4": "F4", "F#4": "F#4", "G4": "G4", "G#4": "G#4", "A4": "A4",
  "A#4": "A#4", "B4": "B4",

  "C5": "C5", "C#5": "C#5", "D5": "D5", "D#5": "D#5", "E5": "E5",
  "F5": "F5", "F#5": "F#5", "G5": "G5", "G#5": "G#5", "A5": "A5",
  "A#5": "A#5", "B5": "B5",

  "C6": "C6", "C#6": "C#6", "D6": "D6", "D#6": "D#6", "E6": "E6",
  "F6": "F6", "F#6": "F#6", "G6": "G6", "G#6": "G#6", "A6": "A6",
  "A#6": "A#6", "B6": "B6",

  "C7": "C7", "C#7": "C#7", "D7": "D7", "D#7": "D#7", "E7": "E7",
  "F7": "F7", "F#7": "F#7", "G7": "G7", "G#7": "G#7", "A7": "A7",
  "A#7": "A#7", "B7": "B7",

  "C8": "C8", "C#8": "C#8", "D8": "D8", "D#8": "D#8", "E8": "E8",
  "F8": "F8", "F#8": "F#8", "G8": "G8", "G#8": "G#8", "A8": "A8",
  "A#8": "A#8", "B8": "B8",

  "C9": "C9", "C#9": "C#9", "D9": "D9", "D#9": "D#9", "E9": "E9",
  "F9": "F9", "F#9": "F#9", "G9": "G9"
};



export const scaleOptions = Object.entries(SCALES).map(([name, scale]) => ({
  value: scale,
  label: name.toUpperCase(),
}));

export const languageOptions = Object.entries(LANGUAGES).map(([name, code]) => ({
  value: code,
  label: name.toUpperCase(),
}));

export const rangeOptions = Object.entries(PITCH_RANGES).map(([name, code]) => ({
  value: code,
  label: name,
}));

export const selectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#96766B",
    color: '#FFFFFF',
    width: "30vw",
    cursor: "text", 
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#F1F0F3',
    fontFamily: 'Proxima Nova',
    fontWeight: 100,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#96766B" : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#96766B",
    fontFamily: 'Proxima Nova',
    fontWeight: 100,
    ":hover": {
      backgroundColor: "#96766B",
      color: "#FFFFFF"
    },
    cursor: "pointer", 
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontWeight: 100,
  }),
  input: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    cursor: "text",
    fontFamily: 'Proxima Nova',
    fontWeight: 100,
  }),
};

export const lightShade = '#FFFFFF';
export const lightAccent = '#F1F0F3';
export const primaryColour = '#A87F4C';
export const darkShade = '#32343E';
export const darkAccent = '#96766B';
