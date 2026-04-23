var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/kuroshiro/lib/util.js
var require_util = __commonJS({
  "node_modules/kuroshiro/lib/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.kanaToRomaji = exports2.kanaToKatakana = exports2.kanaToHiragna = exports2.toRawRomaji = exports2.toRawKatakana = exports2.toRawHiragana = exports2.hasJapanese = exports2.hasKanji = exports2.hasKana = exports2.hasKatakana = exports2.hasHiragana = exports2.isJapanese = exports2.isKanji = exports2.isKana = exports2.isKatakana = exports2.isHiragana = exports2.patchTokens = exports2.getStrType = exports2.ROMANIZATION_SYSTEM = void 0;
    var KATAKANA_HIRAGANA_SHIFT = "\u3041".charCodeAt(0) - "\u30A1".charCodeAt(0);
    var HIRAGANA_KATAKANA_SHIFT = "\u30A1".charCodeAt(0) - "\u3041".charCodeAt(0);
    var ROMANIZATION_SYSTEM = {
      NIPPON: "nippon",
      PASSPORT: "passport",
      HEPBURN: "hepburn"
    };
    exports2.ROMANIZATION_SYSTEM = ROMANIZATION_SYSTEM;
    var isHiragana = function isHiragana2(ch) {
      ch = ch[0];
      return ch >= "\u3040" && ch <= "\u309F";
    };
    exports2.isHiragana = isHiragana;
    var isKatakana = function isKatakana2(ch) {
      ch = ch[0];
      return ch >= "\u30A0" && ch <= "\u30FF";
    };
    exports2.isKatakana = isKatakana;
    var isKana = function isKana2(ch) {
      return isHiragana(ch) || isKatakana(ch);
    };
    exports2.isKana = isKana;
    var isKanji = function isKanji2(ch) {
      ch = ch[0];
      return ch >= "\u4E00" && ch <= "\u9FCF" || ch >= "\uF900" && ch <= "\uFAFF" || ch >= "\u3400" && ch <= "\u4DBF";
    };
    exports2.isKanji = isKanji;
    var isJapanese = function isJapanese2(ch) {
      return isKana(ch) || isKanji(ch);
    };
    exports2.isJapanese = isJapanese;
    var hasHiragana = function hasHiragana2(str) {
      for (let i = 0; i < str.length; i++) {
        if (isHiragana(str[i])) return true;
      }
      return false;
    };
    exports2.hasHiragana = hasHiragana;
    var hasKatakana = function hasKatakana2(str) {
      for (let i = 0; i < str.length; i++) {
        if (isKatakana(str[i])) return true;
      }
      return false;
    };
    exports2.hasKatakana = hasKatakana;
    var hasKana = function hasKana2(str) {
      for (let i = 0; i < str.length; i++) {
        if (isKana(str[i])) return true;
      }
      return false;
    };
    exports2.hasKana = hasKana;
    var hasKanji = function hasKanji2(str) {
      for (let i = 0; i < str.length; i++) {
        if (isKanji(str[i])) return true;
      }
      return false;
    };
    exports2.hasKanji = hasKanji;
    var hasJapanese = function hasJapanese2(str) {
      for (let i = 0; i < str.length; i++) {
        if (isJapanese(str[i])) return true;
      }
      return false;
    };
    exports2.hasJapanese = hasJapanese;
    var toRawHiragana = function toRawHiragana2(str) {
      return [...str].map((ch) => {
        if (ch > "\u30A0" && ch < "\u30F7") {
          return String.fromCharCode(ch.charCodeAt(0) + KATAKANA_HIRAGANA_SHIFT);
        }
        return ch;
      }).join("");
    };
    exports2.toRawHiragana = toRawHiragana;
    var toRawKatakana = function toRawKatakana2(str) {
      return [...str].map((ch) => {
        if (ch > "\u3040" && ch < "\u3097") {
          return String.fromCharCode(ch.charCodeAt(0) + HIRAGANA_KATAKANA_SHIFT);
        }
        return ch;
      }).join("");
    };
    exports2.toRawKatakana = toRawKatakana;
    var toRawRomaji = function toRawRomaji2(str, system) {
      system = system || ROMANIZATION_SYSTEM.HEPBURN;
      const romajiSystem = {
        nippon: {
          // 数字と記号
          "\uFF11": "1",
          "\uFF12": "2",
          "\uFF13": "3",
          "\uFF14": "4",
          "\uFF15": "5",
          "\uFF16": "6",
          "\uFF17": "7",
          "\uFF18": "8",
          "\uFF19": "9",
          "\uFF10": "0",
          "\uFF01": "!",
          "\u201C": '"',
          "\u201D": '"',
          "\uFF03": "#",
          "\uFF04": "$",
          "\uFF05": "%",
          "\uFF06": "&",
          "\u2019": "'",
          "\uFF08": "(",
          "\uFF09": ")",
          "\uFF1D": "=",
          "\uFF5E": "~",
          "\uFF5C": "|",
          "\uFF20": "@",
          "\u2018": "`",
          "\uFF0B": "+",
          "\uFF0A": "*",
          "\uFF1B": ";",
          "\uFF1A": ":",
          "\uFF1C": "<",
          "\uFF1E": ">",
          "\u3001": ",",
          "\u3002": ".",
          "\uFF0F": "/",
          "\uFF1F": "?",
          "\uFF3F": "_",
          "\u30FB": "\uFF65",
          "\u300C": '"',
          "\u300D": '"',
          "\uFF5B": "{",
          "\uFF5D": "}",
          "\uFFE5": "\\",
          "\uFF3E": "^",
          // 直音-清音(ア～ノ)
          \u3042: "a",
          \u3044: "i",
          \u3046: "u",
          \u3048: "e",
          \u304A: "o",
          \u30A2: "a",
          \u30A4: "i",
          \u30A6: "u",
          \u30A8: "e",
          \u30AA: "o",
          \u304B: "ka",
          \u304D: "ki",
          \u304F: "ku",
          \u3051: "ke",
          \u3053: "ko",
          \u30AB: "ka",
          \u30AD: "ki",
          \u30AF: "ku",
          \u30B1: "ke",
          \u30B3: "ko",
          \u3055: "sa",
          \u3057: "si",
          \u3059: "su",
          \u305B: "se",
          \u305D: "so",
          \u30B5: "sa",
          \u30B7: "si",
          \u30B9: "su",
          \u30BB: "se",
          \u30BD: "so",
          \u305F: "ta",
          \u3061: "ti",
          \u3064: "tu",
          \u3066: "te",
          \u3068: "to",
          \u30BF: "ta",
          \u30C1: "ti",
          \u30C4: "tu",
          \u30C6: "te",
          \u30C8: "to",
          \u306A: "na",
          \u306B: "ni",
          \u306C: "nu",
          \u306D: "ne",
          \u306E: "no",
          \u30CA: "na",
          \u30CB: "ni",
          \u30CC: "nu",
          \u30CD: "ne",
          \u30CE: "no",
          // 直音-清音(ハ～ヲ)
          \u306F: "ha",
          \u3072: "hi",
          \u3075: "hu",
          \u3078: "he",
          \u307B: "ho",
          \u30CF: "ha",
          \u30D2: "hi",
          \u30D5: "hu",
          \u30D8: "he",
          \u30DB: "ho",
          \u307E: "ma",
          \u307F: "mi",
          \u3080: "mu",
          \u3081: "me",
          \u3082: "mo",
          \u30DE: "ma",
          \u30DF: "mi",
          \u30E0: "mu",
          \u30E1: "me",
          \u30E2: "mo",
          \u3084: "ya",
          \u3086: "yu",
          \u3088: "yo",
          \u30E4: "ya",
          \u30E6: "yu",
          \u30E8: "yo",
          \u3089: "ra",
          \u308A: "ri",
          \u308B: "ru",
          \u308C: "re",
          \u308D: "ro",
          \u30E9: "ra",
          \u30EA: "ri",
          \u30EB: "ru",
          \u30EC: "re",
          \u30ED: "ro",
          \u308F: "wa",
          \u3090: "wi",
          \u3091: "we",
          \u3092: "wo",
          \u30EF: "wa",
          \u30F0: "wi",
          \u30F1: "we",
          \u30F2: "wo",
          // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
          \u304C: "ga",
          \u304E: "gi",
          \u3050: "gu",
          \u3052: "ge",
          \u3054: "go",
          \u30AC: "ga",
          \u30AE: "gi",
          \u30B0: "gu",
          \u30B2: "ge",
          \u30B4: "go",
          \u3056: "za",
          \u3058: "zi",
          \u305A: "zu",
          \u305C: "ze",
          \u305E: "zo",
          \u30B6: "za",
          \u30B8: "zi",
          \u30BA: "zu",
          \u30BC: "ze",
          \u30BE: "zo",
          \u3060: "da",
          \u3062: "di",
          \u3065: "du",
          \u3067: "de",
          \u3069: "do",
          \u30C0: "da",
          \u30C2: "di",
          \u30C5: "du",
          \u30C7: "de",
          \u30C9: "do",
          \u3070: "ba",
          \u3073: "bi",
          \u3076: "bu",
          \u3079: "be",
          \u307C: "bo",
          \u30D0: "ba",
          \u30D3: "bi",
          \u30D6: "bu",
          \u30D9: "be",
          \u30DC: "bo",
          \u3071: "pa",
          \u3074: "pi",
          \u3077: "pu",
          \u307A: "pe",
          \u307D: "po",
          \u30D1: "pa",
          \u30D4: "pi",
          \u30D7: "pu",
          \u30DA: "pe",
          \u30DD: "po",
          // 拗音-清音(キャ～リョ)
          \u304D\u3083: "kya",
          \u304D\u3085: "kyu",
          \u304D\u3087: "kyo",
          \u3057\u3083: "sya",
          \u3057\u3085: "syu",
          \u3057\u3087: "syo",
          \u3061\u3083: "tya",
          \u3061\u3085: "tyu",
          \u3061\u3087: "tyo",
          \u306B\u3083: "nya",
          \u306B\u3085: "nyu",
          \u306B\u3087: "nyo",
          \u3072\u3083: "hya",
          \u3072\u3085: "hyu",
          \u3072\u3087: "hyo",
          \u307F\u3083: "mya",
          \u307F\u3085: "myu",
          \u307F\u3087: "myo",
          \u308A\u3083: "rya",
          \u308A\u3085: "ryu",
          \u308A\u3087: "ryo",
          \u30AD\u30E3: "kya",
          \u30AD\u30E5: "kyu",
          \u30AD\u30E7: "kyo",
          \u30B7\u30E3: "sya",
          \u30B7\u30E5: "syu",
          \u30B7\u30E7: "syo",
          \u30C1\u30E3: "tya",
          \u30C1\u30E5: "tyu",
          \u30C1\u30E7: "tyo",
          \u30CB\u30E3: "nya",
          \u30CB\u30E5: "nyu",
          \u30CB\u30E7: "nyo",
          \u30D2\u30E3: "hya",
          \u30D2\u30E5: "hyu",
          \u30D2\u30E7: "hyo",
          \u30DF\u30E3: "mya",
          \u30DF\u30E5: "myu",
          \u30DF\u30E7: "myo",
          \u30EA\u30E3: "rya",
          \u30EA\u30E5: "ryu",
          \u30EA\u30E7: "ryo",
          // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
          \u304E\u3083: "gya",
          \u304E\u3085: "gyu",
          \u304E\u3087: "gyo",
          \u3058\u3083: "zya",
          \u3058\u3085: "zyu",
          \u3058\u3087: "zyo",
          \u3062\u3083: "dya",
          \u3062\u3085: "dyu",
          \u3062\u3087: "dyo",
          \u3073\u3083: "bya",
          \u3073\u3085: "byu",
          \u3073\u3087: "byo",
          \u3074\u3083: "pya",
          \u3074\u3085: "pyu",
          \u3074\u3087: "pyo",
          \u304F\u308E: "kwa",
          \u3050\u308E: "gwa",
          \u30AE\u30E3: "gya",
          \u30AE\u30E5: "gyu",
          \u30AE\u30E7: "gyo",
          \u30B8\u30E3: "zya",
          \u30B8\u30E5: "zyu",
          \u30B8\u30E7: "zyo",
          \u30C2\u30E3: "dya",
          \u30C2\u30E5: "dyu",
          \u30C2\u30E7: "dyo",
          \u30D3\u30E3: "bya",
          \u30D3\u30E5: "byu",
          \u30D3\u30E7: "byo",
          \u30D4\u30E3: "pya",
          \u30D4\u30E5: "pyu",
          \u30D4\u30E7: "pyo",
          \u30AF\u30EE: "kwa",
          \u30B0\u30EE: "gwa",
          // 小書きの仮名、符号
          \u3041: "a",
          \u3043: "i",
          \u3045: "u",
          \u3047: "e",
          \u3049: "o",
          \u3083: "ya",
          \u3085: "yu",
          \u3087: "yo",
          \u308E: "wa",
          \u30A1: "a",
          \u30A3: "i",
          \u30A5: "u",
          \u30A7: "e",
          \u30A9: "o",
          \u30E3: "ya",
          \u30E5: "yu",
          \u30E7: "yo",
          \u30EE: "wa",
          \u30F5: "ka",
          \u30F6: "ke",
          \u3093: "n",
          \u30F3: "n",
          // ー: "",
          "\u3000": " ",
          // 外来音(イェ～グォ)
          \u3044\u3047: "ye",
          // うぃ: "",
          // うぇ: "",
          // うぉ: "",
          \u304D\u3047: "kye",
          // くぁ: "",
          \u304F\u3043: "kwi",
          \u304F\u3047: "kwe",
          \u304F\u3049: "kwo",
          // ぐぁ: "",
          \u3050\u3043: "gwi",
          \u3050\u3047: "gwe",
          \u3050\u3049: "gwo",
          \u30A4\u30A7: "ye",
          // ウィ: "",
          // ウェ: "",
          // ウォ: "",
          // ヴ: "",
          // ヴァ: "",
          // ヴィ: "",
          // ヴェ: "",
          // ヴォ: "",
          // ヴュ: "",
          // ヴョ: "",
          \u30AD\u30A7: "kya",
          // クァ: "",
          \u30AF\u30A3: "kwi",
          \u30AF\u30A7: "kwe",
          \u30AF\u30A9: "kwo",
          // グァ: "",
          \u30B0\u30A3: "gwi",
          \u30B0\u30A7: "gwe",
          \u30B0\u30A9: "gwo",
          // 外来音(シェ～フョ)
          \u3057\u3047: "sye",
          \u3058\u3047: "zye",
          \u3059\u3043: "swi",
          \u305A\u3043: "zwi",
          \u3061\u3047: "tye",
          \u3064\u3041: "twa",
          \u3064\u3043: "twi",
          \u3064\u3047: "twe",
          \u3064\u3049: "two",
          // てぃ: "ti",
          // てゅ: "tyu",
          // でぃ: "di",
          // でゅ: "dyu",
          // とぅ: "tu",
          // どぅ: "du",
          \u306B\u3047: "nye",
          \u3072\u3047: "hye",
          \u3075\u3041: "hwa",
          \u3075\u3043: "hwi",
          \u3075\u3047: "hwe",
          \u3075\u3049: "hwo",
          \u3075\u3085: "hwyu",
          \u3075\u3087: "hwyo",
          \u30B7\u30A7: "sye",
          \u30B8\u30A7: "zye",
          \u30B9\u30A3: "swi",
          \u30BA\u30A3: "zwi",
          \u30C1\u30A7: "tye",
          \u30C4\u30A1: "twa",
          \u30C4\u30A3: "twi",
          \u30C4\u30A7: "twe",
          \u30C4\u30A9: "two",
          // ティ: "ti",
          // テュ: "tyu",
          // ディ: "di",
          // デュ: "dyu",
          // トゥ: "tu",
          // ドゥ: "du",
          \u30CB\u30A7: "nye",
          \u30D2\u30A7: "hye",
          \u30D5\u30A1: "hwa",
          \u30D5\u30A3: "hwi",
          \u30D5\u30A7: "hwe",
          \u30D5\u30A9: "hwo",
          \u30D5\u30E5: "hwyu",
          \u30D5\u30E7: "hwyo"
        },
        passport: {
          // 数字と記号
          "\uFF11": "1",
          "\uFF12": "2",
          "\uFF13": "3",
          "\uFF14": "4",
          "\uFF15": "5",
          "\uFF16": "6",
          "\uFF17": "7",
          "\uFF18": "8",
          "\uFF19": "9",
          "\uFF10": "0",
          "\uFF01": "!",
          "\u201C": '"',
          "\u201D": '"',
          "\uFF03": "#",
          "\uFF04": "$",
          "\uFF05": "%",
          "\uFF06": "&",
          "\u2019": "'",
          "\uFF08": "(",
          "\uFF09": ")",
          "\uFF1D": "=",
          "\uFF5E": "~",
          "\uFF5C": "|",
          "\uFF20": "@",
          "\u2018": "`",
          "\uFF0B": "+",
          "\uFF0A": "*",
          "\uFF1B": ";",
          "\uFF1A": ":",
          "\uFF1C": "<",
          "\uFF1E": ">",
          "\u3001": ",",
          "\u3002": ".",
          "\uFF0F": "/",
          "\uFF1F": "?",
          "\uFF3F": "_",
          "\u30FB": "\uFF65",
          "\u300C": '"',
          "\u300D": '"',
          "\uFF5B": "{",
          "\uFF5D": "}",
          "\uFFE5": "\\",
          "\uFF3E": "^",
          // 直音-清音(ア～ノ)
          \u3042: "a",
          \u3044: "i",
          \u3046: "u",
          \u3048: "e",
          \u304A: "o",
          \u30A2: "a",
          \u30A4: "i",
          \u30A6: "u",
          \u30A8: "e",
          \u30AA: "o",
          \u304B: "ka",
          \u304D: "ki",
          \u304F: "ku",
          \u3051: "ke",
          \u3053: "ko",
          \u30AB: "ka",
          \u30AD: "ki",
          \u30AF: "ku",
          \u30B1: "ke",
          \u30B3: "ko",
          \u3055: "sa",
          \u3057: "shi",
          \u3059: "su",
          \u305B: "se",
          \u305D: "so",
          \u30B5: "sa",
          \u30B7: "shi",
          \u30B9: "su",
          \u30BB: "se",
          \u30BD: "so",
          \u305F: "ta",
          \u3061: "chi",
          \u3064: "tsu",
          \u3066: "te",
          \u3068: "to",
          \u30BF: "ta",
          \u30C1: "chi",
          \u30C4: "tsu",
          \u30C6: "te",
          \u30C8: "to",
          \u306A: "na",
          \u306B: "ni",
          \u306C: "nu",
          \u306D: "ne",
          \u306E: "no",
          \u30CA: "na",
          \u30CB: "ni",
          \u30CC: "nu",
          \u30CD: "ne",
          \u30CE: "no",
          // 直音-清音(ハ～ヲ)
          \u306F: "ha",
          \u3072: "hi",
          \u3075: "fu",
          \u3078: "he",
          \u307B: "ho",
          \u30CF: "ha",
          \u30D2: "hi",
          \u30D5: "fu",
          \u30D8: "he",
          \u30DB: "ho",
          \u307E: "ma",
          \u307F: "mi",
          \u3080: "mu",
          \u3081: "me",
          \u3082: "mo",
          \u30DE: "ma",
          \u30DF: "mi",
          \u30E0: "mu",
          \u30E1: "me",
          \u30E2: "mo",
          \u3084: "ya",
          \u3086: "yu",
          \u3088: "yo",
          \u30E4: "ya",
          \u30E6: "yu",
          \u30E8: "yo",
          \u3089: "ra",
          \u308A: "ri",
          \u308B: "ru",
          \u308C: "re",
          \u308D: "ro",
          \u30E9: "ra",
          \u30EA: "ri",
          \u30EB: "ru",
          \u30EC: "re",
          \u30ED: "ro",
          \u308F: "wa",
          \u3090: "i",
          \u3091: "e",
          \u3092: "o",
          \u30EF: "wa",
          \u30F0: "i",
          \u30F1: "e",
          \u30F2: "o",
          // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
          \u304C: "ga",
          \u304E: "gi",
          \u3050: "gu",
          \u3052: "ge",
          \u3054: "go",
          \u30AC: "ga",
          \u30AE: "gi",
          \u30B0: "gu",
          \u30B2: "ge",
          \u30B4: "go",
          \u3056: "za",
          \u3058: "ji",
          \u305A: "zu",
          \u305C: "ze",
          \u305E: "zo",
          \u30B6: "za",
          \u30B8: "ji",
          \u30BA: "zu",
          \u30BC: "ze",
          \u30BE: "zo",
          \u3060: "da",
          \u3062: "ji",
          \u3065: "zu",
          \u3067: "de",
          \u3069: "do",
          \u30C0: "da",
          \u30C2: "ji",
          \u30C5: "zu",
          \u30C7: "de",
          \u30C9: "do",
          \u3070: "ba",
          \u3073: "bi",
          \u3076: "bu",
          \u3079: "be",
          \u307C: "bo",
          \u30D0: "ba",
          \u30D3: "bi",
          \u30D6: "bu",
          \u30D9: "be",
          \u30DC: "bo",
          \u3071: "pa",
          \u3074: "pi",
          \u3077: "pu",
          \u307A: "pe",
          \u307D: "po",
          \u30D1: "pa",
          \u30D4: "pi",
          \u30D7: "pu",
          \u30DA: "pe",
          \u30DD: "po",
          // 拗音-清音(キャ～リョ)
          \u304D\u3083: "kya",
          \u304D\u3085: "kyu",
          \u304D\u3087: "kyo",
          \u3057\u3083: "sha",
          \u3057\u3085: "shu",
          \u3057\u3087: "sho",
          \u3061\u3083: "cha",
          \u3061\u3085: "chu",
          \u3061\u3087: "cho",
          \u306B\u3083: "nya",
          \u306B\u3085: "nyu",
          \u306B\u3087: "nyo",
          \u3072\u3083: "hya",
          \u3072\u3085: "hyu",
          \u3072\u3087: "hyo",
          \u307F\u3083: "mya",
          \u307F\u3085: "myu",
          \u307F\u3087: "myo",
          \u308A\u3083: "rya",
          \u308A\u3085: "ryu",
          \u308A\u3087: "ryo",
          \u30AD\u30E3: "kya",
          \u30AD\u30E5: "kyu",
          \u30AD\u30E7: "kyo",
          \u30B7\u30E3: "sha",
          \u30B7\u30E5: "shu",
          \u30B7\u30E7: "sho",
          \u30C1\u30E3: "cha",
          \u30C1\u30E5: "chu",
          \u30C1\u30E7: "cho",
          \u30CB\u30E3: "nya",
          \u30CB\u30E5: "nyu",
          \u30CB\u30E7: "nyo",
          \u30D2\u30E3: "hya",
          \u30D2\u30E5: "hyu",
          \u30D2\u30E7: "hyo",
          \u30DF\u30E3: "mya",
          \u30DF\u30E5: "myu",
          \u30DF\u30E7: "myo",
          \u30EA\u30E3: "rya",
          \u30EA\u30E5: "ryu",
          \u30EA\u30E7: "ryo",
          // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
          \u304E\u3083: "gya",
          \u304E\u3085: "gyu",
          \u304E\u3087: "gyo",
          \u3058\u3083: "ja",
          \u3058\u3085: "ju",
          \u3058\u3087: "jo",
          \u3062\u3083: "ja",
          \u3062\u3085: "ju",
          \u3062\u3087: "jo",
          \u3073\u3083: "bya",
          \u3073\u3085: "byu",
          \u3073\u3087: "byo",
          \u3074\u3083: "pya",
          \u3074\u3085: "pyu",
          \u3074\u3087: "pyo",
          // くゎ: "",
          // ぐゎ: "",
          \u30AE\u30E3: "gya",
          \u30AE\u30E5: "gyu",
          \u30AE\u30E7: "gyo",
          \u30B8\u30E3: "ja",
          \u30B8\u30E5: "ju",
          \u30B8\u30E7: "jo",
          \u30C2\u30E3: "ja",
          \u30C2\u30E5: "ju",
          \u30C2\u30E7: "jo",
          \u30D3\u30E3: "bya",
          \u30D3\u30E5: "byu",
          \u30D3\u30E7: "byo",
          \u30D4\u30E3: "pya",
          \u30D4\u30E5: "pyu",
          \u30D4\u30E7: "pyo",
          // クヮ: "",
          // グヮ: "",
          // 小書きの仮名、符号
          \u3041: "a",
          \u3043: "i",
          \u3045: "u",
          \u3047: "e",
          \u3049: "o",
          \u3083: "ya",
          \u3085: "yu",
          \u3087: "yo",
          \u308E: "wa",
          \u30A1: "a",
          \u30A3: "i",
          \u30A5: "u",
          \u30A7: "e",
          \u30A9: "o",
          \u30E3: "ya",
          \u30E5: "yu",
          \u30E7: "yo",
          \u30EE: "wa",
          \u30F5: "ka",
          \u30F6: "ke",
          \u3093: "n",
          \u30F3: "n",
          // ー: "",
          "\u3000": " ",
          // 外来音(イェ～グォ)
          // いぇ: "",
          // うぃ: "",
          // うぇ: "",
          // うぉ: "",
          // きぇ: "",
          // くぁ: "",
          // くぃ: "",
          // くぇ: "",
          // くぉ: "",
          // ぐぁ: "",
          // ぐぃ: "",
          // ぐぇ: "",
          // ぐぉ: "",
          // イェ: "",
          // ウィ: "",
          // ウェ: "",
          // ウォ: "",
          \u30F4: "b"
          // ヴァ: "",
          // ヴィ: "",
          // ヴェ: "",
          // ヴォ: "",
          // ヴュ: "",
          // ヴョ: "",
          // キェ: "",
          // クァ: "",
          // クィ: "",
          // クェ: "",
          // クォ: "",
          // グァ: "",
          // グィ: "",
          // グェ: "",
          // グォ: "",
          // 外来音(シェ～フョ)
          // しぇ: "",
          // じぇ: "",
          // すぃ: "",
          // ずぃ: "",
          // ちぇ: "",
          // つぁ: "",
          // つぃ: "",
          // つぇ: "",
          // つぉ: "",
          // てぃ: "",
          // てゅ: "",
          // でぃ: "",
          // でゅ: "",
          // とぅ: "",
          // どぅ: "",
          // にぇ: "",
          // ひぇ: "",
          // ふぁ: "",
          // ふぃ: "",
          // ふぇ: "",
          // ふぉ: "",
          // ふゅ: "",
          // ふょ: "",
          // シェ: "",
          // ジェ: "",
          // スィ: "",
          // ズィ: "",
          // チェ: "",
          // ツァ: "",
          // ツィ: "",
          // ツェ: "",
          // ツォ: "",
          // ティ: "",
          // テュ: "",
          // ディ: "",
          // デュ: "",
          // トゥ: "",
          // ドゥ: "",
          // ニェ: "",
          // ヒェ: "",
          // ファ: "",
          // フィ: "",
          // フェ: "",
          // フォ: "",
          // フュ: "",
          // フョ: ""
        },
        hepburn: {
          // 数字と記号
          "\uFF11": "1",
          "\uFF12": "2",
          "\uFF13": "3",
          "\uFF14": "4",
          "\uFF15": "5",
          "\uFF16": "6",
          "\uFF17": "7",
          "\uFF18": "8",
          "\uFF19": "9",
          "\uFF10": "0",
          "\uFF01": "!",
          "\u201C": '"',
          "\u201D": '"',
          "\uFF03": "#",
          "\uFF04": "$",
          "\uFF05": "%",
          "\uFF06": "&",
          "\u2019": "'",
          "\uFF08": "(",
          "\uFF09": ")",
          "\uFF1D": "=",
          "\uFF5E": "~",
          "\uFF5C": "|",
          "\uFF20": "@",
          "\u2018": "`",
          "\uFF0B": "+",
          "\uFF0A": "*",
          "\uFF1B": ";",
          "\uFF1A": ":",
          "\uFF1C": "<",
          "\uFF1E": ">",
          "\u3001": ",",
          "\u3002": ".",
          "\uFF0F": "/",
          "\uFF1F": "?",
          "\uFF3F": "_",
          "\u30FB": "\uFF65",
          "\u300C": '"',
          "\u300D": '"',
          "\uFF5B": "{",
          "\uFF5D": "}",
          "\uFFE5": "\\",
          "\uFF3E": "^",
          // 直音-清音(ア～ノ)
          \u3042: "a",
          \u3044: "i",
          \u3046: "u",
          \u3048: "e",
          \u304A: "o",
          \u30A2: "a",
          \u30A4: "i",
          \u30A6: "u",
          \u30A8: "e",
          \u30AA: "o",
          \u304B: "ka",
          \u304D: "ki",
          \u304F: "ku",
          \u3051: "ke",
          \u3053: "ko",
          \u30AB: "ka",
          \u30AD: "ki",
          \u30AF: "ku",
          \u30B1: "ke",
          \u30B3: "ko",
          \u3055: "sa",
          \u3057: "shi",
          \u3059: "su",
          \u305B: "se",
          \u305D: "so",
          \u30B5: "sa",
          \u30B7: "shi",
          \u30B9: "su",
          \u30BB: "se",
          \u30BD: "so",
          \u305F: "ta",
          \u3061: "chi",
          \u3064: "tsu",
          \u3066: "te",
          \u3068: "to",
          \u30BF: "ta",
          \u30C1: "chi",
          \u30C4: "tsu",
          \u30C6: "te",
          \u30C8: "to",
          \u306A: "na",
          \u306B: "ni",
          \u306C: "nu",
          \u306D: "ne",
          \u306E: "no",
          \u30CA: "na",
          \u30CB: "ni",
          \u30CC: "nu",
          \u30CD: "ne",
          \u30CE: "no",
          // 直音-清音(ハ～ヲ)
          \u306F: "ha",
          \u3072: "hi",
          \u3075: "fu",
          \u3078: "he",
          \u307B: "ho",
          \u30CF: "ha",
          \u30D2: "hi",
          \u30D5: "fu",
          \u30D8: "he",
          \u30DB: "ho",
          \u307E: "ma",
          \u307F: "mi",
          \u3080: "mu",
          \u3081: "me",
          \u3082: "mo",
          \u30DE: "ma",
          \u30DF: "mi",
          \u30E0: "mu",
          \u30E1: "me",
          \u30E2: "mo",
          \u3084: "ya",
          \u3086: "yu",
          \u3088: "yo",
          \u30E4: "ya",
          \u30E6: "yu",
          \u30E8: "yo",
          \u3089: "ra",
          \u308A: "ri",
          \u308B: "ru",
          \u308C: "re",
          \u308D: "ro",
          \u30E9: "ra",
          \u30EA: "ri",
          \u30EB: "ru",
          \u30EC: "re",
          \u30ED: "ro",
          \u308F: "wa",
          \u3090: "i",
          \u3091: "e",
          \u3092: "o",
          \u30EF: "wa",
          \u30F0: "i",
          \u30F1: "e",
          \u30F2: "o",
          // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
          \u304C: "ga",
          \u304E: "gi",
          \u3050: "gu",
          \u3052: "ge",
          \u3054: "go",
          \u30AC: "ga",
          \u30AE: "gi",
          \u30B0: "gu",
          \u30B2: "ge",
          \u30B4: "go",
          \u3056: "za",
          \u3058: "ji",
          \u305A: "zu",
          \u305C: "ze",
          \u305E: "zo",
          \u30B6: "za",
          \u30B8: "ji",
          \u30BA: "zu",
          \u30BC: "ze",
          \u30BE: "zo",
          \u3060: "da",
          \u3062: "ji",
          \u3065: "zu",
          \u3067: "de",
          \u3069: "do",
          \u30C0: "da",
          \u30C2: "ji",
          \u30C5: "zu",
          \u30C7: "de",
          \u30C9: "do",
          \u3070: "ba",
          \u3073: "bi",
          \u3076: "bu",
          \u3079: "be",
          \u307C: "bo",
          \u30D0: "ba",
          \u30D3: "bi",
          \u30D6: "bu",
          \u30D9: "be",
          \u30DC: "bo",
          \u3071: "pa",
          \u3074: "pi",
          \u3077: "pu",
          \u307A: "pe",
          \u307D: "po",
          \u30D1: "pa",
          \u30D4: "pi",
          \u30D7: "pu",
          \u30DA: "pe",
          \u30DD: "po",
          // 拗音-清音(キャ～リョ)
          \u304D\u3083: "kya",
          \u304D\u3085: "kyu",
          \u304D\u3087: "kyo",
          \u3057\u3083: "sha",
          \u3057\u3085: "shu",
          \u3057\u3087: "sho",
          \u3061\u3083: "cha",
          \u3061\u3085: "chu",
          \u3061\u3087: "cho",
          \u306B\u3083: "nya",
          \u306B\u3085: "nyu",
          \u306B\u3087: "nyo",
          \u3072\u3083: "hya",
          \u3072\u3085: "hyu",
          \u3072\u3087: "hyo",
          \u307F\u3083: "mya",
          \u307F\u3085: "myu",
          \u307F\u3087: "myo",
          \u308A\u3083: "rya",
          \u308A\u3085: "ryu",
          \u308A\u3087: "ryo",
          \u30AD\u30E3: "kya",
          \u30AD\u30E5: "kyu",
          \u30AD\u30E7: "kyo",
          \u30B7\u30E3: "sha",
          \u30B7\u30E5: "shu",
          \u30B7\u30E7: "sho",
          \u30C1\u30E3: "cha",
          \u30C1\u30E5: "chu",
          \u30C1\u30E7: "cho",
          \u30CB\u30E3: "nya",
          \u30CB\u30E5: "nyu",
          \u30CB\u30E7: "nyo",
          \u30D2\u30E3: "hya",
          \u30D2\u30E5: "hyu",
          \u30D2\u30E7: "hyo",
          \u30DF\u30E3: "mya",
          \u30DF\u30E5: "myu",
          \u30DF\u30E7: "myo",
          \u30EA\u30E3: "rya",
          \u30EA\u30E5: "ryu",
          \u30EA\u30E7: "ryo",
          // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
          \u304E\u3083: "gya",
          \u304E\u3085: "gyu",
          \u304E\u3087: "gyo",
          \u3058\u3083: "ja",
          \u3058\u3085: "ju",
          \u3058\u3087: "jo",
          \u3062\u3083: "ja",
          \u3062\u3085: "ju",
          \u3062\u3087: "jo",
          \u3073\u3083: "bya",
          \u3073\u3085: "byu",
          \u3073\u3087: "byo",
          \u3074\u3083: "pya",
          \u3074\u3085: "pyu",
          \u3074\u3087: "pyo",
          // くゎ: "",
          // ぐゎ: "",
          \u30AE\u30E3: "gya",
          \u30AE\u30E5: "gyu",
          \u30AE\u30E7: "gyo",
          \u30B8\u30E3: "ja",
          \u30B8\u30E5: "ju",
          \u30B8\u30E7: "jo",
          \u30C2\u30E3: "ja",
          \u30C2\u30E5: "ju",
          \u30C2\u30E7: "jo",
          \u30D3\u30E3: "bya",
          \u30D3\u30E5: "byu",
          \u30D3\u30E7: "byo",
          \u30D4\u30E3: "pya",
          \u30D4\u30E5: "pyu",
          \u30D4\u30E7: "pyo",
          // クヮ: "",
          // グヮ: "",
          // 小書きの仮名、符号
          \u3041: "a",
          \u3043: "i",
          \u3045: "u",
          \u3047: "e",
          \u3049: "o",
          \u3083: "ya",
          \u3085: "yu",
          \u3087: "yo",
          \u308E: "wa",
          \u30A1: "a",
          \u30A3: "i",
          \u30A5: "u",
          \u30A7: "e",
          \u30A9: "o",
          \u30E3: "ya",
          \u30E5: "yu",
          \u30E7: "yo",
          \u30EE: "wa",
          \u30F5: "ka",
          \u30F6: "ke",
          \u3093: "n",
          \u30F3: "n",
          // ー: "",
          "\u3000": " ",
          // 外来音(イェ～グォ)
          \u3044\u3047: "ye",
          \u3046\u3043: "wi",
          \u3046\u3047: "we",
          \u3046\u3049: "wo",
          \u304D\u3047: "kye",
          \u304F\u3041: "kwa",
          \u304F\u3043: "kwi",
          \u304F\u3047: "kwe",
          \u304F\u3049: "kwo",
          \u3050\u3041: "gwa",
          \u3050\u3043: "gwi",
          \u3050\u3047: "gwe",
          \u3050\u3049: "gwo",
          \u30A4\u30A7: "ye",
          \u30A6\u30A3: "wi",
          \u30A6\u30A7: "we",
          \u30A6\u30A9: "wo",
          \u30F4: "vu",
          \u30F4\u30A1: "va",
          \u30F4\u30A3: "vi",
          \u30F4\u30A7: "ve",
          \u30F4\u30A9: "vo",
          \u30F4\u30E5: "vyu",
          \u30F4\u30E7: "vyo",
          \u30AD\u30A7: "kya",
          \u30AF\u30A1: "kwa",
          \u30AF\u30A3: "kwi",
          \u30AF\u30A7: "kwe",
          \u30AF\u30A9: "kwo",
          \u30B0\u30A1: "gwa",
          \u30B0\u30A3: "gwi",
          \u30B0\u30A7: "gwe",
          \u30B0\u30A9: "gwo",
          // 外来音(シェ～フョ)
          \u3057\u3047: "she",
          \u3058\u3047: "je",
          // すぃ: "",
          // ずぃ: "",
          \u3061\u3047: "che",
          \u3064\u3041: "tsa",
          \u3064\u3043: "tsi",
          \u3064\u3047: "tse",
          \u3064\u3049: "tso",
          \u3066\u3043: "ti",
          \u3066\u3085: "tyu",
          \u3067\u3043: "di",
          \u3067\u3085: "dyu",
          \u3068\u3045: "tu",
          \u3069\u3045: "du",
          \u306B\u3047: "nye",
          \u3072\u3047: "hye",
          \u3075\u3041: "fa",
          \u3075\u3043: "fi",
          \u3075\u3047: "fe",
          \u3075\u3049: "fo",
          \u3075\u3085: "fyu",
          \u3075\u3087: "fyo",
          \u30B7\u30A7: "she",
          \u30B8\u30A7: "je",
          // スィ: "",
          // ズィ: "",
          \u30C1\u30A7: "che",
          \u30C4\u30A1: "tsa",
          \u30C4\u30A3: "tsi",
          \u30C4\u30A7: "tse",
          \u30C4\u30A9: "tso",
          \u30C6\u30A3: "ti",
          \u30C6\u30E5: "tyu",
          \u30C7\u30A3: "di",
          \u30C7\u30E5: "dyu",
          \u30C8\u30A5: "tu",
          \u30C9\u30A5: "du",
          \u30CB\u30A7: "nye",
          \u30D2\u30A7: "hye",
          \u30D5\u30A1: "fa",
          \u30D5\u30A3: "fi",
          \u30D5\u30A7: "fe",
          \u30D5\u30A9: "fo",
          \u30D5\u30E5: "fyu",
          \u30D5\u30E7: "fyo"
        }
      };
      const reg_tsu = /(っ|ッ)([bcdfghijklmnopqrstuvwyz])/gm;
      const reg_xtsu = /っ|ッ/gm;
      let pnt = 0;
      let ch;
      let r;
      let result = "";
      if (system === ROMANIZATION_SYSTEM.PASSPORT) {
        str = str.replace(/ー/gm, "");
      }
      if (system === ROMANIZATION_SYSTEM.NIPPON || system === ROMANIZATION_SYSTEM.HEPBURN) {
        const reg_hatu = new RegExp(/(ん|ン)(?=あ|い|う|え|お|ア|イ|ウ|エ|オ|ぁ|ぃ|ぅ|ぇ|ぉ|ァ|ィ|ゥ|ェ|ォ|や|ゆ|よ|ヤ|ユ|ヨ|ゃ|ゅ|ょ|ャ|ュ|ョ)/g);
        let match;
        const indices = [];
        while ((match = reg_hatu.exec(str)) !== null) {
          indices.push(match.index + 1);
        }
        if (indices.length !== 0) {
          let mStr = "";
          for (let i = 0; i < indices.length; i++) {
            if (i === 0) {
              mStr += `${str.slice(0, indices[i])}'`;
            } else {
              mStr += `${str.slice(indices[i - 1], indices[i])}'`;
            }
          }
          mStr += str.slice(indices[indices.length - 1]);
          str = mStr;
        }
      }
      const max = str.length;
      while (pnt <= max) {
        if (r = romajiSystem[system][str.substring(pnt, pnt + 2)]) {
          result += r;
          pnt += 2;
        } else {
          result += (r = romajiSystem[system][ch = str.substring(pnt, pnt + 1)]) ? r : ch;
          pnt += 1;
        }
      }
      result = result.replace(reg_tsu, "$2$2");
      if (system === ROMANIZATION_SYSTEM.PASSPORT || system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/cc/gm, "tc");
      }
      result = result.replace(reg_xtsu, "tsu");
      if (system === ROMANIZATION_SYSTEM.PASSPORT || system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/nm/gm, "mm");
        result = result.replace(/nb/gm, "mb");
        result = result.replace(/np/gm, "mp");
      }
      if (system === ROMANIZATION_SYSTEM.NIPPON) {
        result = result.replace(/aー/gm, "\xE2");
        result = result.replace(/iー/gm, "\xEE");
        result = result.replace(/uー/gm, "\xFB");
        result = result.replace(/eー/gm, "\xEA");
        result = result.replace(/oー/gm, "\xF4");
      }
      if (system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/aー/gm, "\u0101");
        result = result.replace(/iー/gm, "\u012B");
        result = result.replace(/uー/gm, "\u016B");
        result = result.replace(/eー/gm, "\u0113");
        result = result.replace(/oー/gm, "\u014D");
      }
      return result;
    };
    exports2.toRawRomaji = toRawRomaji;
    var getStrType = function getStrType2(str) {
      let hasKJ = false;
      let hasHK = false;
      for (let i = 0; i < str.length; i++) {
        if (isKanji(str[i])) {
          hasKJ = true;
        } else if (isHiragana(str[i]) || isKatakana(str[i])) {
          hasHK = true;
        }
      }
      if (hasKJ && hasHK) return 1;
      if (hasKJ) return 0;
      if (hasHK) return 2;
      return 3;
    };
    exports2.getStrType = getStrType;
    var patchTokens = function patchTokens2(tokens) {
      for (let cr = 0; cr < tokens.length; cr++) {
        if (hasJapanese(tokens[cr].surface_form)) {
          if (!tokens[cr].reading) {
            if (tokens[cr].surface_form.split("").every(isKana)) {
              tokens[cr].reading = toRawKatakana(tokens[cr].surface_form);
            } else {
              tokens[cr].reading = tokens[cr].surface_form;
            }
          } else if (hasHiragana(tokens[cr].reading)) {
            tokens[cr].reading = toRawKatakana(tokens[cr].reading);
          }
        } else {
          tokens[cr].reading = tokens[cr].surface_form;
        }
      }
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].pos && tokens[i].pos === "\u52A9\u52D5\u8A5E" && (tokens[i].surface_form === "\u3046" || tokens[i].surface_form === "\u30A6")) {
          if (i - 1 >= 0 && tokens[i - 1].pos && tokens[i - 1].pos === "\u52D5\u8A5E") {
            tokens[i - 1].surface_form += "\u3046";
            if (tokens[i - 1].pronunciation) {
              tokens[i - 1].pronunciation += "\u30FC";
            } else {
              tokens[i - 1].pronunciation = `${tokens[i - 1].reading}\u30FC`;
            }
            tokens[i - 1].reading += "\u30A6";
            tokens.splice(i, 1);
            i--;
          }
        }
      }
      for (let j = 0; j < tokens.length; j++) {
        if (tokens[j].pos && (tokens[j].pos === "\u52D5\u8A5E" || tokens[j].pos === "\u5F62\u5BB9\u8A5E") && tokens[j].surface_form.length > 1 && (tokens[j].surface_form[tokens[j].surface_form.length - 1] === "\u3063" || tokens[j].surface_form[tokens[j].surface_form.length - 1] === "\u30C3")) {
          if (j + 1 < tokens.length) {
            tokens[j].surface_form += tokens[j + 1].surface_form;
            if (tokens[j].pronunciation) {
              tokens[j].pronunciation += tokens[j + 1].pronunciation;
            } else {
              tokens[j].pronunciation = `${tokens[j].reading}${tokens[j + 1].reading}`;
            }
            tokens[j].reading += tokens[j + 1].reading;
            tokens.splice(j + 1, 1);
            j--;
          }
        }
      }
      return tokens;
    };
    exports2.patchTokens = patchTokens;
    var kanaToHiragna = function kanaToHiragna2(str) {
      return toRawHiragana(str);
    };
    exports2.kanaToHiragna = kanaToHiragna;
    var kanaToKatakana = function kanaToKatakana2(str) {
      return toRawKatakana(str);
    };
    exports2.kanaToKatakana = kanaToKatakana;
    var kanaToRomaji = function kanaToRomaji2(str, system) {
      return toRawRomaji(str, system);
    };
    exports2.kanaToRomaji = kanaToRomaji;
  }
});

// node_modules/kuroshiro/lib/core.js
var require_core = __commonJS({
  "node_modules/kuroshiro/lib/core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _util = require_util();
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var Kuroshiro2 = class {
      /**
       * Constructor
       * @constructs Kuroshiro
       */
      constructor() {
        this._analyzer = null;
      }
      /**
       * Initialize Kuroshiro
       * @memberOf Kuroshiro
       * @instance
       * @returns {Promise} Promise object represents the result of initialization
       */
      init(analyzer) {
        var _this = this;
        return _asyncToGenerator(function* () {
          if (!analyzer || typeof analyzer !== "object" || typeof analyzer.init !== "function" || typeof analyzer.parse !== "function") {
            throw new Error("Invalid initialization parameter.");
          } else if (_this._analyzer == null) {
            yield analyzer.init();
            _this._analyzer = analyzer;
          } else {
            throw new Error("Kuroshiro has already been initialized.");
          }
        })();
      }
      /**
       * Convert given string to target syllabary with options available
       * @memberOf Kuroshiro
       * @instance
       * @param {string} str Given String
       * @param {Object} [options] Settings Object
       * @param {string} [options.to="hiragana"] Target syllabary ["hiragana"|"katakana"|"romaji"]
       * @param {string} [options.mode="normal"] Convert mode ["normal"|"spaced"|"okurigana"|"furigana"]
       * @param {string} [options.romajiSystem="hepburn"] Romanization System ["nippon"|"passport"|"hepburn"]
       * @param {string} [options.delimiter_start="("] Delimiter(Start)
       * @param {string} [options.delimiter_end=")"] Delimiter(End)
       * @returns {Promise} Promise object represents the result of conversion
       */
      convert(str, options) {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          options = options || {};
          options.to = options.to || "hiragana";
          options.mode = options.mode || "normal";
          options.romajiSystem = options.romajiSystem || _util.ROMANIZATION_SYSTEM.HEPBURN;
          options.delimiter_start = options.delimiter_start || "(";
          options.delimiter_end = options.delimiter_end || ")";
          str = str || "";
          if (["hiragana", "katakana", "romaji"].indexOf(options.to) === -1) {
            throw new Error("Invalid Target Syllabary.");
          }
          if (["normal", "spaced", "okurigana", "furigana"].indexOf(options.mode) === -1) {
            throw new Error("Invalid Conversion Mode.");
          }
          const ROMAJI_SYSTEMS = Object.keys(_util.ROMANIZATION_SYSTEM).map((e) => _util.ROMANIZATION_SYSTEM[e]);
          if (ROMAJI_SYSTEMS.indexOf(options.romajiSystem) === -1) {
            throw new Error("Invalid Romanization System.");
          }
          const rawTokens = yield _this2._analyzer.parse(str);
          const tokens = (0, _util.patchTokens)(rawTokens);
          if (options.mode === "normal" || options.mode === "spaced") {
            switch (options.to) {
              case "katakana":
                if (options.mode === "normal") {
                  return tokens.map((token) => token.reading).join("");
                }
                return tokens.map((token) => token.reading).join(" ");
              case "romaji":
                const romajiConv = (token) => {
                  let preToken;
                  if ((0, _util.hasJapanese)(token.surface_form)) {
                    preToken = token.pronunciation || token.reading;
                  } else {
                    preToken = token.surface_form;
                  }
                  return (0, _util.toRawRomaji)(preToken, options.romajiSystem);
                };
                if (options.mode === "normal") {
                  return tokens.map(romajiConv).join("");
                }
                return tokens.map(romajiConv).join(" ");
              case "hiragana":
                for (let hi = 0; hi < tokens.length; hi++) {
                  if ((0, _util.hasKanji)(tokens[hi].surface_form)) {
                    if (!(0, _util.hasKatakana)(tokens[hi].surface_form)) {
                      tokens[hi].reading = (0, _util.toRawHiragana)(tokens[hi].reading);
                    } else {
                      tokens[hi].reading = (0, _util.toRawHiragana)(tokens[hi].reading);
                      let tmp = "";
                      let hpattern = "";
                      for (let hc = 0; hc < tokens[hi].surface_form.length; hc++) {
                        if ((0, _util.isKanji)(tokens[hi].surface_form[hc])) {
                          hpattern += "(.*)";
                        } else {
                          hpattern += (0, _util.isKatakana)(tokens[hi].surface_form[hc]) ? (0, _util.toRawHiragana)(tokens[hi].surface_form[hc]) : tokens[hi].surface_form[hc];
                        }
                      }
                      const hreg = new RegExp(hpattern);
                      const hmatches = hreg.exec(tokens[hi].reading);
                      if (hmatches) {
                        let pickKJ = 0;
                        for (let hc1 = 0; hc1 < tokens[hi].surface_form.length; hc1++) {
                          if ((0, _util.isKanji)(tokens[hi].surface_form[hc1])) {
                            tmp += hmatches[pickKJ + 1];
                            pickKJ++;
                          } else {
                            tmp += tokens[hi].surface_form[hc1];
                          }
                        }
                        tokens[hi].reading = tmp;
                      }
                    }
                  } else {
                    tokens[hi].reading = tokens[hi].surface_form;
                  }
                }
                if (options.mode === "normal") {
                  return tokens.map((token) => token.reading).join("");
                }
                return tokens.map((token) => token.reading).join(" ");
              default:
                throw new Error("Unknown option.to param");
            }
          } else if (options.mode === "okurigana" || options.mode === "furigana") {
            const notations = [];
            for (let i = 0; i < tokens.length; i++) {
              const strType = (0, _util.getStrType)(tokens[i].surface_form);
              switch (strType) {
                case 0:
                  notations.push([tokens[i].surface_form, 1, (0, _util.toRawHiragana)(tokens[i].reading), tokens[i].pronunciation || tokens[i].reading]);
                  break;
                case 1:
                  let pattern = "";
                  let isLastTokenKanji = false;
                  const subs = [];
                  for (let c = 0; c < tokens[i].surface_form.length; c++) {
                    if ((0, _util.isKanji)(tokens[i].surface_form[c])) {
                      if (!isLastTokenKanji) {
                        isLastTokenKanji = true;
                        pattern += "(.+)";
                        subs.push(tokens[i].surface_form[c]);
                      } else {
                        subs[subs.length - 1] += tokens[i].surface_form[c];
                      }
                    } else {
                      isLastTokenKanji = false;
                      subs.push(tokens[i].surface_form[c]);
                      pattern += (0, _util.isKatakana)(tokens[i].surface_form[c]) ? (0, _util.toRawHiragana)(tokens[i].surface_form[c]) : tokens[i].surface_form[c];
                    }
                  }
                  const reg = new RegExp(`^${pattern}$`);
                  const matches = reg.exec((0, _util.toRawHiragana)(tokens[i].reading));
                  if (matches) {
                    let pickKanji = 1;
                    for (let c1 = 0; c1 < subs.length; c1++) {
                      if ((0, _util.isKanji)(subs[c1][0])) {
                        notations.push([subs[c1], 1, matches[pickKanji], (0, _util.toRawKatakana)(matches[pickKanji])]);
                        pickKanji += 1;
                      } else {
                        notations.push([subs[c1], 2, (0, _util.toRawHiragana)(subs[c1]), (0, _util.toRawKatakana)(subs[c1])]);
                      }
                    }
                  } else {
                    notations.push([tokens[i].surface_form, 1, (0, _util.toRawHiragana)(tokens[i].reading), tokens[i].pronunciation || tokens[i].reading]);
                  }
                  break;
                case 2:
                  for (let c2 = 0; c2 < tokens[i].surface_form.length; c2++) {
                    notations.push([tokens[i].surface_form[c2], 2, (0, _util.toRawHiragana)(tokens[i].reading[c2]), tokens[i].pronunciation && tokens[i].pronunciation[c2] || tokens[i].reading[c2]]);
                  }
                  break;
                case 3:
                  for (let c3 = 0; c3 < tokens[i].surface_form.length; c3++) {
                    notations.push([tokens[i].surface_form[c3], 3, tokens[i].surface_form[c3], tokens[i].surface_form[c3]]);
                  }
                  break;
                default:
                  throw new Error("Unknown strType");
              }
            }
            let result = "";
            switch (options.to) {
              case "katakana":
                if (options.mode === "okurigana") {
                  for (let n0 = 0; n0 < notations.length; n0++) {
                    if (notations[n0][1] !== 1) {
                      result += notations[n0][0];
                    } else {
                      result += notations[n0][0] + options.delimiter_start + (0, _util.toRawKatakana)(notations[n0][2]) + options.delimiter_end;
                    }
                  }
                } else {
                  for (let n1 = 0; n1 < notations.length; n1++) {
                    if (notations[n1][1] !== 1) {
                      result += notations[n1][0];
                    } else {
                      result += `<ruby>${notations[n1][0]}<rp>${options.delimiter_start}</rp><rt>${(0, _util.toRawKatakana)(notations[n1][2])}</rt><rp>${options.delimiter_end}</rp></ruby>`;
                    }
                  }
                }
                return result;
              case "romaji":
                if (options.mode === "okurigana") {
                  for (let n2 = 0; n2 < notations.length; n2++) {
                    if (notations[n2][1] !== 1) {
                      result += notations[n2][0];
                    } else {
                      result += notations[n2][0] + options.delimiter_start + (0, _util.toRawRomaji)(notations[n2][3], options.romajiSystem) + options.delimiter_end;
                    }
                  }
                } else {
                  result += "<ruby>";
                  for (let n3 = 0; n3 < notations.length; n3++) {
                    result += `${notations[n3][0]}<rp>${options.delimiter_start}</rp><rt>${(0, _util.toRawRomaji)(notations[n3][3], options.romajiSystem)}</rt><rp>${options.delimiter_end}</rp>`;
                  }
                  result += "</ruby>";
                }
                return result;
              case "hiragana":
                if (options.mode === "okurigana") {
                  for (let n4 = 0; n4 < notations.length; n4++) {
                    if (notations[n4][1] !== 1) {
                      result += notations[n4][0];
                    } else {
                      result += notations[n4][0] + options.delimiter_start + notations[n4][2] + options.delimiter_end;
                    }
                  }
                } else {
                  for (let n5 = 0; n5 < notations.length; n5++) {
                    if (notations[n5][1] !== 1) {
                      result += notations[n5][0];
                    } else {
                      result += `<ruby>${notations[n5][0]}<rp>${options.delimiter_start}</rp><rt>${notations[n5][2]}</rt><rp>${options.delimiter_end}</rp></ruby>`;
                    }
                  }
                }
                return result;
              default:
                throw new Error("Invalid Target Syllabary.");
            }
          }
        })();
      }
    };
    var Util = {
      isHiragana: _util.isHiragana,
      isKatakana: _util.isKatakana,
      isKana: _util.isKana,
      isKanji: _util.isKanji,
      isJapanese: _util.isJapanese,
      hasHiragana: _util.hasHiragana,
      hasKatakana: _util.hasKatakana,
      hasKana: _util.hasKana,
      hasKanji: _util.hasKanji,
      hasJapanese: _util.hasJapanese,
      kanaToHiragna: _util.kanaToHiragna,
      kanaToKatakana: _util.kanaToKatakana,
      kanaToRomaji: _util.kanaToRomaji
    };
    Kuroshiro2.Util = Util;
    var _default = Kuroshiro2;
    exports2.default = _default;
  }
});

// node_modules/kuroshiro/lib/index.js
var require_lib = __commonJS({
  "node_modules/kuroshiro/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _core = _interopRequireDefault(require_core());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _default = _core.default;
    exports2.default = _default;
  }
});

// node_modules/kuromoji/src/viterbi/ViterbiNode.js
var require_ViterbiNode = __commonJS({
  "node_modules/kuromoji/src/viterbi/ViterbiNode.js"(exports2, module2) {
    "use strict";
    function ViterbiNode(node_name, node_cost, start_pos, length, type, left_id, right_id, surface_form) {
      this.name = node_name;
      this.cost = node_cost;
      this.start_pos = start_pos;
      this.length = length;
      this.left_id = left_id;
      this.right_id = right_id;
      this.prev = null;
      this.surface_form = surface_form;
      if (type === "BOS") {
        this.shortest_cost = 0;
      } else {
        this.shortest_cost = Number.MAX_VALUE;
      }
      this.type = type;
    }
    module2.exports = ViterbiNode;
  }
});

// node_modules/kuromoji/src/viterbi/ViterbiLattice.js
var require_ViterbiLattice = __commonJS({
  "node_modules/kuromoji/src/viterbi/ViterbiLattice.js"(exports2, module2) {
    "use strict";
    var ViterbiNode = require_ViterbiNode();
    function ViterbiLattice() {
      this.nodes_end_at = [];
      this.nodes_end_at[0] = [new ViterbiNode(-1, 0, 0, 0, "BOS", 0, 0, "")];
      this.eos_pos = 1;
    }
    ViterbiLattice.prototype.append = function(node) {
      var last_pos = node.start_pos + node.length - 1;
      if (this.eos_pos < last_pos) {
        this.eos_pos = last_pos;
      }
      var prev_nodes = this.nodes_end_at[last_pos];
      if (prev_nodes == null) {
        prev_nodes = [];
      }
      prev_nodes.push(node);
      this.nodes_end_at[last_pos] = prev_nodes;
    };
    ViterbiLattice.prototype.appendEos = function() {
      var last_index = this.nodes_end_at.length;
      this.eos_pos++;
      this.nodes_end_at[last_index] = [new ViterbiNode(-1, 0, this.eos_pos, 0, "EOS", 0, 0, "")];
    };
    module2.exports = ViterbiLattice;
  }
});

// node_modules/kuromoji/src/util/SurrogateAwareString.js
var require_SurrogateAwareString = __commonJS({
  "node_modules/kuromoji/src/util/SurrogateAwareString.js"(exports2, module2) {
    "use strict";
    function SurrogateAwareString(str) {
      this.str = str;
      this.index_mapping = [];
      for (var pos = 0; pos < str.length; pos++) {
        var ch = str.charAt(pos);
        this.index_mapping.push(pos);
        if (SurrogateAwareString.isSurrogatePair(ch)) {
          pos++;
        }
      }
      this.length = this.index_mapping.length;
    }
    SurrogateAwareString.prototype.slice = function(index) {
      if (this.index_mapping.length <= index) {
        return "";
      }
      var surrogate_aware_index = this.index_mapping[index];
      return this.str.slice(surrogate_aware_index);
    };
    SurrogateAwareString.prototype.charAt = function(index) {
      if (this.str.length <= index) {
        return "";
      }
      var surrogate_aware_start_index = this.index_mapping[index];
      var surrogate_aware_end_index = this.index_mapping[index + 1];
      if (surrogate_aware_end_index == null) {
        return this.str.slice(surrogate_aware_start_index);
      }
      return this.str.slice(surrogate_aware_start_index, surrogate_aware_end_index);
    };
    SurrogateAwareString.prototype.charCodeAt = function(index) {
      if (this.index_mapping.length <= index) {
        return NaN;
      }
      var surrogate_aware_index = this.index_mapping[index];
      var upper = this.str.charCodeAt(surrogate_aware_index);
      var lower;
      if (upper >= 55296 && upper <= 56319 && surrogate_aware_index < this.str.length) {
        lower = this.str.charCodeAt(surrogate_aware_index + 1);
        if (lower >= 56320 && lower <= 57343) {
          return (upper - 55296) * 1024 + lower - 56320 + 65536;
        }
      }
      return upper;
    };
    SurrogateAwareString.prototype.toString = function() {
      return this.str;
    };
    SurrogateAwareString.isSurrogatePair = function(ch) {
      var utf16_code = ch.charCodeAt(0);
      if (utf16_code >= 55296 && utf16_code <= 56319) {
        return true;
      } else {
        return false;
      }
    };
    module2.exports = SurrogateAwareString;
  }
});

// node_modules/kuromoji/src/viterbi/ViterbiBuilder.js
var require_ViterbiBuilder = __commonJS({
  "node_modules/kuromoji/src/viterbi/ViterbiBuilder.js"(exports2, module2) {
    "use strict";
    var ViterbiNode = require_ViterbiNode();
    var ViterbiLattice = require_ViterbiLattice();
    var SurrogateAwareString = require_SurrogateAwareString();
    function ViterbiBuilder(dic) {
      this.trie = dic.trie;
      this.token_info_dictionary = dic.token_info_dictionary;
      this.unknown_dictionary = dic.unknown_dictionary;
    }
    ViterbiBuilder.prototype.build = function(sentence_str) {
      var lattice = new ViterbiLattice();
      var sentence = new SurrogateAwareString(sentence_str);
      var key, trie_id, left_id, right_id, word_cost;
      for (var pos = 0; pos < sentence.length; pos++) {
        var tail = sentence.slice(pos);
        var vocabulary = this.trie.commonPrefixSearch(tail);
        for (var n = 0; n < vocabulary.length; n++) {
          trie_id = vocabulary[n].v;
          key = vocabulary[n].k;
          var token_info_ids = this.token_info_dictionary.target_map[trie_id];
          for (var i = 0; i < token_info_ids.length; i++) {
            var token_info_id = parseInt(token_info_ids[i]);
            left_id = this.token_info_dictionary.dictionary.getShort(token_info_id);
            right_id = this.token_info_dictionary.dictionary.getShort(token_info_id + 2);
            word_cost = this.token_info_dictionary.dictionary.getShort(token_info_id + 4);
            lattice.append(new ViterbiNode(token_info_id, word_cost, pos + 1, key.length, "KNOWN", left_id, right_id, key));
          }
        }
        var surrogate_aware_tail = new SurrogateAwareString(tail);
        var head_char = new SurrogateAwareString(surrogate_aware_tail.charAt(0));
        var head_char_class = this.unknown_dictionary.lookup(head_char.toString());
        if (vocabulary == null || vocabulary.length === 0 || head_char_class.is_always_invoke === 1) {
          key = head_char;
          if (head_char_class.is_grouping === 1 && 1 < surrogate_aware_tail.length) {
            for (var k = 1; k < surrogate_aware_tail.length; k++) {
              var next_char = surrogate_aware_tail.charAt(k);
              var next_char_class = this.unknown_dictionary.lookup(next_char);
              if (head_char_class.class_name !== next_char_class.class_name) {
                break;
              }
              key += next_char;
            }
          }
          var unk_ids = this.unknown_dictionary.target_map[head_char_class.class_id];
          for (var j = 0; j < unk_ids.length; j++) {
            var unk_id = parseInt(unk_ids[j]);
            left_id = this.unknown_dictionary.dictionary.getShort(unk_id);
            right_id = this.unknown_dictionary.dictionary.getShort(unk_id + 2);
            word_cost = this.unknown_dictionary.dictionary.getShort(unk_id + 4);
            lattice.append(new ViterbiNode(unk_id, word_cost, pos + 1, key.length, "UNKNOWN", left_id, right_id, key.toString()));
          }
        }
      }
      lattice.appendEos();
      return lattice;
    };
    module2.exports = ViterbiBuilder;
  }
});

// node_modules/kuromoji/src/viterbi/ViterbiSearcher.js
var require_ViterbiSearcher = __commonJS({
  "node_modules/kuromoji/src/viterbi/ViterbiSearcher.js"(exports2, module2) {
    "use strict";
    function ViterbiSearcher(connection_costs) {
      this.connection_costs = connection_costs;
    }
    ViterbiSearcher.prototype.search = function(lattice) {
      lattice = this.forward(lattice);
      return this.backward(lattice);
    };
    ViterbiSearcher.prototype.forward = function(lattice) {
      var i, j, k;
      for (i = 1; i <= lattice.eos_pos; i++) {
        var nodes = lattice.nodes_end_at[i];
        if (nodes == null) {
          continue;
        }
        for (j = 0; j < nodes.length; j++) {
          var node = nodes[j];
          var cost = Number.MAX_VALUE;
          var shortest_prev_node;
          var prev_nodes = lattice.nodes_end_at[node.start_pos - 1];
          if (prev_nodes == null) {
            continue;
          }
          for (k = 0; k < prev_nodes.length; k++) {
            var prev_node = prev_nodes[k];
            var edge_cost;
            if (node.left_id == null || prev_node.right_id == null) {
              console.log("Left or right is null");
              edge_cost = 0;
            } else {
              edge_cost = this.connection_costs.get(prev_node.right_id, node.left_id);
            }
            var _cost = prev_node.shortest_cost + edge_cost + node.cost;
            if (_cost < cost) {
              shortest_prev_node = prev_node;
              cost = _cost;
            }
          }
          node.prev = shortest_prev_node;
          node.shortest_cost = cost;
        }
      }
      return lattice;
    };
    ViterbiSearcher.prototype.backward = function(lattice) {
      var shortest_path = [];
      var eos = lattice.nodes_end_at[lattice.nodes_end_at.length - 1][0];
      var node_back = eos.prev;
      if (node_back == null) {
        return [];
      }
      while (node_back.type !== "BOS") {
        shortest_path.push(node_back);
        if (node_back.prev == null) {
          return [];
        }
        node_back = node_back.prev;
      }
      return shortest_path.reverse();
    };
    module2.exports = ViterbiSearcher;
  }
});

// node_modules/kuromoji/src/util/IpadicFormatter.js
var require_IpadicFormatter = __commonJS({
  "node_modules/kuromoji/src/util/IpadicFormatter.js"(exports2, module2) {
    "use strict";
    function IpadicFormatter() {
    }
    IpadicFormatter.prototype.formatEntry = function(word_id, position, type, features) {
      var token = {};
      token.word_id = word_id;
      token.word_type = type;
      token.word_position = position;
      token.surface_form = features[0];
      token.pos = features[1];
      token.pos_detail_1 = features[2];
      token.pos_detail_2 = features[3];
      token.pos_detail_3 = features[4];
      token.conjugated_type = features[5];
      token.conjugated_form = features[6];
      token.basic_form = features[7];
      token.reading = features[8];
      token.pronunciation = features[9];
      return token;
    };
    IpadicFormatter.prototype.formatUnknownEntry = function(word_id, position, type, features, surface_form) {
      var token = {};
      token.word_id = word_id;
      token.word_type = type;
      token.word_position = position;
      token.surface_form = surface_form;
      token.pos = features[1];
      token.pos_detail_1 = features[2];
      token.pos_detail_2 = features[3];
      token.pos_detail_3 = features[4];
      token.conjugated_type = features[5];
      token.conjugated_form = features[6];
      token.basic_form = features[7];
      return token;
    };
    module2.exports = IpadicFormatter;
  }
});

// node_modules/kuromoji/src/Tokenizer.js
var require_Tokenizer = __commonJS({
  "node_modules/kuromoji/src/Tokenizer.js"(exports2, module2) {
    "use strict";
    var ViterbiBuilder = require_ViterbiBuilder();
    var ViterbiSearcher = require_ViterbiSearcher();
    var IpadicFormatter = require_IpadicFormatter();
    var PUNCTUATION = /、|。/;
    function Tokenizer(dic) {
      this.token_info_dictionary = dic.token_info_dictionary;
      this.unknown_dictionary = dic.unknown_dictionary;
      this.viterbi_builder = new ViterbiBuilder(dic);
      this.viterbi_searcher = new ViterbiSearcher(dic.connection_costs);
      this.formatter = new IpadicFormatter();
    }
    Tokenizer.splitByPunctuation = function(input) {
      var sentences = [];
      var tail = input;
      while (true) {
        if (tail === "") {
          break;
        }
        var index = tail.search(PUNCTUATION);
        if (index < 0) {
          sentences.push(tail);
          break;
        }
        sentences.push(tail.substring(0, index + 1));
        tail = tail.substring(index + 1);
      }
      return sentences;
    };
    Tokenizer.prototype.tokenize = function(text) {
      var sentences = Tokenizer.splitByPunctuation(text);
      var tokens = [];
      for (var i = 0; i < sentences.length; i++) {
        var sentence = sentences[i];
        this.tokenizeForSentence(sentence, tokens);
      }
      return tokens;
    };
    Tokenizer.prototype.tokenizeForSentence = function(sentence, tokens) {
      if (tokens == null) {
        tokens = [];
      }
      var lattice = this.getLattice(sentence);
      var best_path = this.viterbi_searcher.search(lattice);
      var last_pos = 0;
      if (tokens.length > 0) {
        last_pos = tokens[tokens.length - 1].word_position;
      }
      for (var j = 0; j < best_path.length; j++) {
        var node = best_path[j];
        var token, features, features_line;
        if (node.type === "KNOWN") {
          features_line = this.token_info_dictionary.getFeatures(node.name);
          if (features_line == null) {
            features = [];
          } else {
            features = features_line.split(",");
          }
          token = this.formatter.formatEntry(node.name, last_pos + node.start_pos, node.type, features);
        } else if (node.type === "UNKNOWN") {
          features_line = this.unknown_dictionary.getFeatures(node.name);
          if (features_line == null) {
            features = [];
          } else {
            features = features_line.split(",");
          }
          token = this.formatter.formatUnknownEntry(node.name, last_pos + node.start_pos, node.type, features, node.surface_form);
        } else {
          token = this.formatter.formatEntry(node.name, last_pos + node.start_pos, node.type, []);
        }
        tokens.push(token);
      }
      return tokens;
    };
    Tokenizer.prototype.getLattice = function(text) {
      return this.viterbi_builder.build(text);
    };
    module2.exports = Tokenizer;
  }
});

// node_modules/async/dist/async.js
var require_async = __commonJS({
  "node_modules/async/dist/async.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.async = global2.async || {});
    })(exports2, function(exports3) {
      "use strict";
      function slice(arrayLike, start) {
        start = start | 0;
        var newLen = Math.max(arrayLike.length - start, 0);
        var newArr = Array(newLen);
        for (var idx = 0; idx < newLen; idx++) {
          newArr[idx] = arrayLike[start + idx];
        }
        return newArr;
      }
      var apply = function(fn) {
        var args = slice(arguments, 1);
        return function() {
          var callArgs = slice(arguments);
          return fn.apply(null, args.concat(callArgs));
        };
      };
      var initialParams = function(fn) {
        return function() {
          var args = slice(arguments);
          var callback = args.pop();
          fn.call(this, args, callback);
        };
      };
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
      var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
      function fallback(fn) {
        setTimeout(fn, 0);
      }
      function wrap(defer) {
        return function(fn) {
          var args = slice(arguments, 1);
          defer(function() {
            fn.apply(null, args);
          });
        };
      }
      var _defer;
      if (hasSetImmediate) {
        _defer = setImmediate;
      } else if (hasNextTick) {
        _defer = process.nextTick;
      } else {
        _defer = fallback;
      }
      var setImmediate$1 = wrap(_defer);
      function asyncify(func) {
        return initialParams(function(args, callback) {
          var result;
          try {
            result = func.apply(this, args);
          } catch (e) {
            return callback(e);
          }
          if (isObject(result) && typeof result.then === "function") {
            result.then(function(value) {
              invokeCallback(callback, null, value);
            }, function(err) {
              invokeCallback(callback, err.message ? err : new Error(err));
            });
          } else {
            callback(null, result);
          }
        });
      }
      function invokeCallback(callback, error, value) {
        try {
          callback(error, value);
        } catch (e) {
          setImmediate$1(rethrow, e);
        }
      }
      function rethrow(error) {
        throw error;
      }
      var supportsSymbol = typeof Symbol === "function";
      function isAsync(fn) {
        return supportsSymbol && fn[Symbol.toStringTag] === "AsyncFunction";
      }
      function wrapAsync(asyncFn) {
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
      }
      function applyEach$1(eachfn) {
        return function(fns) {
          var args = slice(arguments, 1);
          var go = initialParams(function(args2, callback) {
            var that = this;
            return eachfn(fns, function(fn, cb) {
              wrapAsync(fn).apply(that, args2.concat(cb));
            }, callback);
          });
          if (args.length) {
            return go.apply(this, args);
          } else {
            return go;
          }
        };
      }
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var Symbol$1 = root.Symbol;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
          value[symToStringTag$1] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag$1] = tag;
          } else {
            delete value[symToStringTag$1];
          }
        }
        return result;
      }
      var objectProto$1 = Object.prototype;
      var nativeObjectToString$1 = objectProto$1.toString;
      function objectToString(value) {
        return nativeObjectToString$1.call(value);
      }
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      var breakLoop = {};
      function noop() {
      }
      function once(fn) {
        return function() {
          if (fn === null) return;
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
        };
      }
      var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator;
      var getIterator = function(coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
      };
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array.isArray;
      function stubFalse() {
        return false;
      }
      var freeExports = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      var argsTag$1 = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag$1 = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports$1 = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
      var freeModule$1 = freeExports$1 && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var freeProcess = moduleExports$1 && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      var objectProto$2 = Object.prototype;
      var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      var objectProto$5 = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
        return value === proto;
      }
      function overArg(func, transform2) {
        return function(arg) {
          return func(transform2(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$3.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function createArrayIterator(coll) {
        var i = -1;
        var len = coll.length;
        return function next() {
          return ++i < len ? { value: coll[i], key: i } : null;
        };
      }
      function createES2015Iterator(iterator2) {
        var i = -1;
        return function next() {
          var item = iterator2.next();
          if (item.done)
            return null;
          i++;
          return { value: item.value, key: i };
        };
      }
      function createObjectIterator(obj) {
        var okeys = keys(obj);
        var i = -1;
        var len = okeys.length;
        return function next() {
          var key = okeys[++i];
          if (key === "__proto__") {
            return next();
          }
          return i < len ? { value: obj[key], key } : null;
        };
      }
      function iterator(coll) {
        if (isArrayLike(coll)) {
          return createArrayIterator(coll);
        }
        var iterator2 = getIterator(coll);
        return iterator2 ? createES2015Iterator(iterator2) : createObjectIterator(coll);
      }
      function onlyOnce(fn) {
        return function() {
          if (fn === null) throw new Error("Callback was already called.");
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
        };
      }
      function _eachOfLimit(limit) {
        return function(obj, iteratee, callback) {
          callback = once(callback || noop);
          if (limit <= 0 || !obj) {
            return callback(null);
          }
          var nextElem = iterator(obj);
          var done = false;
          var running = 0;
          var looping = false;
          function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
              done = true;
              callback(err);
            } else if (value === breakLoop || done && running <= 0) {
              done = true;
              return callback(null);
            } else if (!looping) {
              replenish();
            }
          }
          function replenish() {
            looping = true;
            while (running < limit && !done) {
              var elem = nextElem();
              if (elem === null) {
                done = true;
                if (running <= 0) {
                  callback(null);
                }
                return;
              }
              running += 1;
              iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
          }
          replenish();
        };
      }
      function eachOfLimit(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
      }
      function doLimit(fn, limit) {
        return function(iterable, iteratee, callback) {
          return fn(iterable, limit, iteratee, callback);
        };
      }
      function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback || noop);
        var index2 = 0, completed = 0, length = coll.length;
        if (length === 0) {
          callback(null);
        }
        function iteratorCallback(err, value) {
          if (err) {
            callback(err);
          } else if (++completed === length || value === breakLoop) {
            callback(null);
          }
        }
        for (; index2 < length; index2++) {
          iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
        }
      }
      var eachOfGeneric = doLimit(eachOfLimit, Infinity);
      var eachOf = function(coll, iteratee, callback) {
        var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
        eachOfImplementation(coll, wrapAsync(iteratee), callback);
      };
      function doParallel(fn) {
        return function(obj, iteratee, callback) {
          return fn(eachOf, obj, wrapAsync(iteratee), callback);
        };
      }
      function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = callback || noop;
        arr = arr || [];
        var results = [];
        var counter = 0;
        var _iteratee = wrapAsync(iteratee);
        eachfn(arr, function(value, _, callback2) {
          var index2 = counter++;
          _iteratee(value, function(err, v) {
            results[index2] = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      var map = doParallel(_asyncMap);
      var applyEach = applyEach$1(map);
      function doParallelLimit(fn) {
        return function(obj, limit, iteratee, callback) {
          return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
        };
      }
      var mapLimit = doParallelLimit(_asyncMap);
      var mapSeries = doLimit(mapLimit, 1);
      var applyEachSeries = applyEach$1(mapSeries);
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index2];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var auto = function(tasks, concurrency, callback) {
        if (typeof concurrency === "function") {
          callback = concurrency;
          concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$1 = keys(tasks);
        var numTasks = keys$$1.length;
        if (!numTasks) {
          return callback(null);
        }
        if (!concurrency) {
          concurrency = numTasks;
        }
        var results = {};
        var runningTasks = 0;
        var hasError = false;
        var listeners = /* @__PURE__ */ Object.create(null);
        var readyTasks = [];
        var readyToCheck = [];
        var uncheckedDependencies = {};
        baseForOwn(tasks, function(task, key) {
          if (!isArray(task)) {
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
          }
          var dependencies = task.slice(0, task.length - 1);
          var remainingDependencies = dependencies.length;
          if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
          }
          uncheckedDependencies[key] = remainingDependencies;
          arrayEach(dependencies, function(dependencyName) {
            if (!tasks[dependencyName]) {
              throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
            }
            addListener(dependencyName, function() {
              remainingDependencies--;
              if (remainingDependencies === 0) {
                enqueueTask(key, task);
              }
            });
          });
        });
        checkForDeadlocks();
        processQueue();
        function enqueueTask(key, task) {
          readyTasks.push(function() {
            runTask(key, task);
          });
        }
        function processQueue() {
          if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
          }
          while (readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
          }
        }
        function addListener(taskName, fn) {
          var taskListeners = listeners[taskName];
          if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
          }
          taskListeners.push(fn);
        }
        function taskComplete(taskName) {
          var taskListeners = listeners[taskName] || [];
          arrayEach(taskListeners, function(fn) {
            fn();
          });
          processQueue();
        }
        function runTask(key, task) {
          if (hasError) return;
          var taskCallback = onlyOnce(function(err, result) {
            runningTasks--;
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            if (err) {
              var safeResults = {};
              baseForOwn(results, function(val, rkey) {
                safeResults[rkey] = val;
              });
              safeResults[key] = result;
              hasError = true;
              listeners = /* @__PURE__ */ Object.create(null);
              callback(err, safeResults);
            } else {
              results[key] = result;
              taskComplete(key);
            }
          });
          runningTasks++;
          var taskFn = wrapAsync(task[task.length - 1]);
          if (task.length > 1) {
            taskFn(results, taskCallback);
          } else {
            taskFn(taskCallback);
          }
        }
        function checkForDeadlocks() {
          var currentTask;
          var counter = 0;
          while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            arrayEach(getDependents(currentTask), function(dependent) {
              if (--uncheckedDependencies[dependent] === 0) {
                readyToCheck.push(dependent);
              }
            });
          }
          if (counter !== numTasks) {
            throw new Error(
              "async.auto cannot execute tasks due to a recursive dependency"
            );
          }
        }
        function getDependents(taskName) {
          var result = [];
          baseForOwn(tasks, function(task, key) {
            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
              result.push(key);
            }
          });
          return result;
        }
      };
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var INFINITY = 1 / 0;
      var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseSlice(array, start, end) {
        var index2 = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index2 < length) {
          result[index2] = array[index2 + start];
        }
        return result;
      }
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === void 0 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function asciiToArray(string) {
        return string.split("");
      }
      var rsAstralRange = "\\ud800-\\udfff";
      var rsComboMarksRange = "\\u0300-\\u036f";
      var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange = "\\u20d0-\\u20ff";
      var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
      var rsVarRange = "\\ufe0e\\ufe0f";
      var rsZWJ = "\\u200d";
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      var rsAstralRange$1 = "\\ud800-\\udfff";
      var rsComboMarksRange$1 = "\\u0300-\\u036f";
      var reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
      var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
      var rsVarRange$1 = "\\ufe0e\\ufe0f";
      var rsAstral = "[" + rsAstralRange$1 + "]";
      var rsCombo = "[" + rsComboRange$1 + "]";
      var rsFitz = "\\ud83c[\\udffb-\\udfff]";
      var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
      var rsNonAstral = "[^" + rsAstralRange$1 + "]";
      var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
      var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
      var rsZWJ$1 = "\\u200d";
      var reOptMod = rsModifier + "?";
      var rsOptVar = "[" + rsVarRange$1 + "]?";
      var rsOptJoin = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
      var rsSeq = rsOptVar + reOptMod + rsOptJoin;
      var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var reTrim = /^\s+|\s+$/g;
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === void 0)) {
          return string.replace(reTrim, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
      var FN_ARG_SPLIT = /,/;
      var FN_ARG = /(=.+)?(\s*)$/;
      var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
      function parseParams(func) {
        func = func.toString().replace(STRIP_COMMENTS, "");
        func = func.match(FN_ARGS)[2].replace(" ", "");
        func = func ? func.split(FN_ARG_SPLIT) : [];
        func = func.map(function(arg) {
          return trim(arg.replace(FN_ARG, ""));
        });
        return func;
      }
      function autoInject(tasks, callback) {
        var newTasks = {};
        baseForOwn(tasks, function(taskFn, key) {
          var params;
          var fnIsAsync = isAsync(taskFn);
          var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
          if (isArray(taskFn)) {
            params = taskFn.slice(0, -1);
            taskFn = taskFn[taskFn.length - 1];
            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
          } else if (hasNoDeps) {
            newTasks[key] = taskFn;
          } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
              throw new Error("autoInject task functions require explicit parameters.");
            }
            if (!fnIsAsync) params.pop();
            newTasks[key] = params.concat(newTask);
          }
          function newTask(results, taskCb) {
            var newArgs = arrayMap(params, function(name) {
              return results[name];
            });
            newArgs.push(taskCb);
            wrapAsync(taskFn).apply(null, newArgs);
          }
        });
        auto(newTasks, callback);
      }
      function DLL() {
        this.head = this.tail = null;
        this.length = 0;
      }
      function setInitial(dll, node) {
        dll.length = 1;
        dll.head = dll.tail = node;
      }
      DLL.prototype.removeLink = function(node) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        node.prev = node.next = null;
        this.length -= 1;
        return node;
      };
      DLL.prototype.empty = function() {
        while (this.head) this.shift();
        return this;
      };
      DLL.prototype.insertAfter = function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next) node.next.prev = newNode;
        else this.tail = newNode;
        node.next = newNode;
        this.length += 1;
      };
      DLL.prototype.insertBefore = function(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev) node.prev.next = newNode;
        else this.head = newNode;
        node.prev = newNode;
        this.length += 1;
      };
      DLL.prototype.unshift = function(node) {
        if (this.head) this.insertBefore(this.head, node);
        else setInitial(this, node);
      };
      DLL.prototype.push = function(node) {
        if (this.tail) this.insertAfter(this.tail, node);
        else setInitial(this, node);
      };
      DLL.prototype.shift = function() {
        return this.head && this.removeLink(this.head);
      };
      DLL.prototype.pop = function() {
        return this.tail && this.removeLink(this.tail);
      };
      DLL.prototype.toArray = function() {
        var arr = Array(this.length);
        var curr = this.head;
        for (var idx = 0; idx < this.length; idx++) {
          arr[idx] = curr.data;
          curr = curr.next;
        }
        return arr;
      };
      DLL.prototype.remove = function(testFn) {
        var curr = this.head;
        while (!!curr) {
          var next = curr.next;
          if (testFn(curr)) {
            this.removeLink(curr);
          }
          curr = next;
        }
        return this;
      };
      function queue(worker, concurrency, payload) {
        if (concurrency == null) {
          concurrency = 1;
        } else if (concurrency === 0) {
          throw new Error("Concurrency must not be zero");
        }
        var _worker = wrapAsync(worker);
        var numRunning = 0;
        var workersList = [];
        var processingScheduled = false;
        function _insert(data, insertAtFront, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0 && q.idle()) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          for (var i = 0, l = data.length; i < l; i++) {
            var item = {
              data: data[i],
              callback: callback || noop
            };
            if (insertAtFront) {
              q._tasks.unshift(item);
            } else {
              q._tasks.push(item);
            }
          }
          if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
              processingScheduled = false;
              q.process();
            });
          }
        }
        function _next(tasks) {
          return function(err) {
            numRunning -= 1;
            for (var i = 0, l = tasks.length; i < l; i++) {
              var task = tasks[i];
              var index2 = baseIndexOf(workersList, task, 0);
              if (index2 === 0) {
                workersList.shift();
              } else if (index2 > 0) {
                workersList.splice(index2, 1);
              }
              task.callback.apply(task, arguments);
              if (err != null) {
                q.error(err, task.data);
              }
            }
            if (numRunning <= q.concurrency - q.buffer) {
              q.unsaturated();
            }
            if (q.idle()) {
              q.drain();
            }
            q.process();
          };
        }
        var isProcessing = false;
        var q = {
          _tasks: new DLL(),
          concurrency,
          payload,
          saturated: noop,
          unsaturated: noop,
          buffer: concurrency / 4,
          empty: noop,
          drain: noop,
          error: noop,
          started: false,
          paused: false,
          push: function(data, callback) {
            _insert(data, false, callback);
          },
          kill: function() {
            q.drain = noop;
            q._tasks.empty();
          },
          unshift: function(data, callback) {
            _insert(data, true, callback);
          },
          remove: function(testFn) {
            q._tasks.remove(testFn);
          },
          process: function() {
            if (isProcessing) {
              return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
              var tasks = [], data = [];
              var l = q._tasks.length;
              if (q.payload) l = Math.min(l, q.payload);
              for (var i = 0; i < l; i++) {
                var node = q._tasks.shift();
                tasks.push(node);
                workersList.push(node);
                data.push(node.data);
              }
              numRunning += 1;
              if (q._tasks.length === 0) {
                q.empty();
              }
              if (numRunning === q.concurrency) {
                q.saturated();
              }
              var cb = onlyOnce(_next(tasks));
              _worker(data, cb);
            }
            isProcessing = false;
          },
          length: function() {
            return q._tasks.length;
          },
          running: function() {
            return numRunning;
          },
          workersList: function() {
            return workersList;
          },
          idle: function() {
            return q._tasks.length + numRunning === 0;
          },
          pause: function() {
            q.paused = true;
          },
          resume: function() {
            if (q.paused === false) {
              return;
            }
            q.paused = false;
            setImmediate$1(q.process);
          }
        };
        return q;
      }
      function cargo(worker, payload) {
        return queue(worker, 1, payload);
      }
      var eachOfSeries = doLimit(eachOfLimit, 1);
      function reduce(coll, memo, iteratee, callback) {
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOfSeries(coll, function(x, i, callback2) {
          _iteratee(memo, x, function(err, v) {
            memo = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, memo);
        });
      }
      function seq() {
        var _functions = arrayMap(arguments, wrapAsync);
        return function() {
          var args = slice(arguments);
          var that = this;
          var cb = args[args.length - 1];
          if (typeof cb == "function") {
            args.pop();
          } else {
            cb = noop;
          }
          reduce(
            _functions,
            args,
            function(newargs, fn, cb2) {
              fn.apply(that, newargs.concat(function(err) {
                var nextargs = slice(arguments, 1);
                cb2(err, nextargs);
              }));
            },
            function(err, results) {
              cb.apply(that, [err].concat(results));
            }
          );
        };
      }
      var compose = function() {
        return seq.apply(null, slice(arguments).reverse());
      };
      var _concat = Array.prototype.concat;
      var concatLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err) {
            if (err) return callback2(err);
            return callback2(null, slice(arguments, 1));
          });
        }, function(err, mapResults) {
          var result = [];
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              result = _concat.apply(result, mapResults[i]);
            }
          }
          return callback(err, result);
        });
      };
      var concat = doLimit(concatLimit, Infinity);
      var concatSeries = doLimit(concatLimit, 1);
      var constant = function() {
        var values = slice(arguments);
        var args = [null].concat(values);
        return function() {
          var callback = arguments[arguments.length - 1];
          return callback.apply(this, args);
        };
      };
      function identity(value) {
        return value;
      }
      function _createTester(check, getResult) {
        return function(eachfn, arr, iteratee, cb) {
          cb = cb || noop;
          var testPassed = false;
          var testResult;
          eachfn(arr, function(value, _, callback) {
            iteratee(value, function(err, result) {
              if (err) {
                callback(err);
              } else if (check(result) && !testResult) {
                testPassed = true;
                testResult = getResult(true, value);
                callback(null, breakLoop);
              } else {
                callback();
              }
            });
          }, function(err) {
            if (err) {
              cb(err);
            } else {
              cb(null, testPassed ? testResult : getResult(false));
            }
          });
        };
      }
      function _findGetResult(v, x) {
        return x;
      }
      var detect = doParallel(_createTester(identity, _findGetResult));
      var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
      var detectSeries = doLimit(detectLimit, 1);
      function consoleFunc(name) {
        return function(fn) {
          var args = slice(arguments, 1);
          args.push(function(err) {
            var args2 = slice(arguments, 1);
            if (typeof console === "object") {
              if (err) {
                if (console.error) {
                  console.error(err);
                }
              } else if (console[name]) {
                arrayEach(args2, function(x) {
                  console[name](x);
                });
              }
            }
          });
          wrapAsync(fn).apply(null, args);
        };
      }
      var dir = consoleFunc("dir");
      function doDuring(fn, test, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
        function next(err) {
          if (err) return callback(err);
          var args = slice(arguments, 1);
          args.push(check);
          _test.apply(this, args);
        }
        function check(err, truth) {
          if (err) return callback(err);
          if (!truth) return callback(null);
          _fn(next);
        }
        check(null, true);
      }
      function doWhilst(iteratee, test, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        var next = function(err) {
          if (err) return callback(err);
          var args = slice(arguments, 1);
          if (test.apply(this, args)) return _iteratee(next);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function doUntil(iteratee, test, callback) {
        doWhilst(iteratee, function() {
          return !test.apply(this, arguments);
        }, callback);
      }
      function during(test, fn, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
        function next(err) {
          if (err) return callback(err);
          _test(check);
        }
        function check(err, truth) {
          if (err) return callback(err);
          if (!truth) return callback(null);
          _fn(next);
        }
        _test(check);
      }
      function _withoutIndex(iteratee) {
        return function(value, index2, callback) {
          return iteratee(value, callback);
        };
      }
      function eachLimit(coll, iteratee, callback) {
        eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      function eachLimit$1(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      var eachSeries = doLimit(eachLimit$1, 1);
      function ensureAsync(fn) {
        if (isAsync(fn)) return fn;
        return initialParams(function(args, callback) {
          var sync = true;
          args.push(function() {
            var innerArgs = arguments;
            if (sync) {
              setImmediate$1(function() {
                callback.apply(null, innerArgs);
              });
            } else {
              callback.apply(null, innerArgs);
            }
          });
          fn.apply(this, args);
          sync = false;
        });
      }
      function notId(v) {
        return !v;
      }
      var every = doParallel(_createTester(notId, notId));
      var everyLimit = doParallelLimit(_createTester(notId, notId));
      var everySeries = doLimit(everyLimit, 1);
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            truthValues[index2] = !!v;
            callback2(err);
          });
        }, function(err) {
          if (err) return callback(err);
          var results = [];
          for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
          }
          callback(null, results);
        });
      }
      function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            if (err) {
              callback2(err);
            } else {
              if (v) {
                results.push({ index: index2, value: x });
              }
              callback2();
            }
          });
        }, function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, arrayMap(results.sort(function(a, b) {
              return a.index - b.index;
            }), baseProperty("value")));
          }
        });
      }
      function _filter(eachfn, coll, iteratee, callback) {
        var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
        filter2(eachfn, coll, wrapAsync(iteratee), callback || noop);
      }
      var filter = doParallel(_filter);
      var filterLimit = doParallelLimit(_filter);
      var filterSeries = doLimit(filterLimit, 1);
      function forever(fn, errback) {
        var done = onlyOnce(errback || noop);
        var task = wrapAsync(ensureAsync(fn));
        function next(err) {
          if (err) return done(err);
          task(next);
        }
        next();
      }
      var groupByLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err, key) {
            if (err) return callback2(err);
            return callback2(null, { key, val });
          });
        }, function(err, mapResults) {
          var result = {};
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              var key = mapResults[i].key;
              var val = mapResults[i].val;
              if (hasOwnProperty2.call(result, key)) {
                result[key].push(val);
              } else {
                result[key] = [val];
              }
            }
          }
          return callback(err, result);
        });
      };
      var groupBy = doLimit(groupByLimit, Infinity);
      var groupBySeries = doLimit(groupByLimit, 1);
      var log = consoleFunc("log");
      function mapValuesLimit(obj, limit, iteratee, callback) {
        callback = once(callback || noop);
        var newObj = {};
        var _iteratee = wrapAsync(iteratee);
        eachOfLimit(obj, limit, function(val, key, next) {
          _iteratee(val, key, function(err, result) {
            if (err) return next(err);
            newObj[key] = result;
            next();
          });
        }, function(err) {
          callback(err, newObj);
        });
      }
      var mapValues = doLimit(mapValuesLimit, Infinity);
      var mapValuesSeries = doLimit(mapValuesLimit, 1);
      function has(obj, key) {
        return key in obj;
      }
      function memoize(fn, hasher) {
        var memo = /* @__PURE__ */ Object.create(null);
        var queues = /* @__PURE__ */ Object.create(null);
        hasher = hasher || identity;
        var _fn = wrapAsync(fn);
        var memoized = initialParams(function memoized2(args, callback) {
          var key = hasher.apply(null, args);
          if (has(memo, key)) {
            setImmediate$1(function() {
              callback.apply(null, memo[key]);
            });
          } else if (has(queues, key)) {
            queues[key].push(callback);
          } else {
            queues[key] = [callback];
            _fn.apply(null, args.concat(function() {
              var args2 = slice(arguments);
              memo[key] = args2;
              var q = queues[key];
              delete queues[key];
              for (var i = 0, l = q.length; i < l; i++) {
                q[i].apply(null, args2);
              }
            }));
          }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
      }
      var _defer$1;
      if (hasNextTick) {
        _defer$1 = process.nextTick;
      } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
      } else {
        _defer$1 = fallback;
      }
      var nextTick = wrap(_defer$1);
      function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};
        eachfn(tasks, function(task, key, callback2) {
          wrapAsync(task)(function(err, result) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            results[key] = result;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      function parallelLimit(tasks, callback) {
        _parallel(eachOf, tasks, callback);
      }
      function parallelLimit$1(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
      }
      var queue$1 = function(worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue(function(items, cb) {
          _worker(items[0], cb);
        }, concurrency, 1);
      };
      var priorityQueue = function(worker, concurrency) {
        var q = queue$1(worker, concurrency);
        q.push = function(data, priority, callback) {
          if (callback == null) callback = noop;
          if (typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          priority = priority || 0;
          var nextNode = q._tasks.head;
          while (nextNode && priority >= nextNode.priority) {
            nextNode = nextNode.next;
          }
          for (var i = 0, l = data.length; i < l; i++) {
            var item = {
              data: data[i],
              priority,
              callback
            };
            if (nextNode) {
              q._tasks.insertBefore(nextNode, item);
            } else {
              q._tasks.push(item);
            }
          }
          setImmediate$1(q.process);
        };
        delete q.unshift;
        return q;
      };
      function race(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks)) return callback(new TypeError("First argument to race must be an array of functions"));
        if (!tasks.length) return callback();
        for (var i = 0, l = tasks.length; i < l; i++) {
          wrapAsync(tasks[i])(callback);
        }
      }
      function reduceRight(array, memo, iteratee, callback) {
        var reversed = slice(array).reverse();
        reduce(reversed, memo, iteratee, callback);
      }
      function reflect(fn) {
        var _fn = wrapAsync(fn);
        return initialParams(function reflectOn(args, reflectCallback) {
          args.push(function callback(error, cbArg) {
            if (error) {
              reflectCallback(null, { error });
            } else {
              var value;
              if (arguments.length <= 2) {
                value = cbArg;
              } else {
                value = slice(arguments, 1);
              }
              reflectCallback(null, { value });
            }
          });
          return _fn.apply(this, args);
        });
      }
      function reflectAll(tasks) {
        var results;
        if (isArray(tasks)) {
          results = arrayMap(tasks, reflect);
        } else {
          results = {};
          baseForOwn(tasks, function(task, key) {
            results[key] = reflect.call(this, task);
          });
        }
        return results;
      }
      function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function(value, cb) {
          iteratee(value, function(err, v) {
            cb(err, !v);
          });
        }, callback);
      }
      var reject = doParallel(reject$1);
      var rejectLimit = doParallelLimit(reject$1);
      var rejectSeries = doLimit(rejectLimit, 1);
      function constant$1(value) {
        return function() {
          return value;
        };
      }
      function retry(opts, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;
        var options = {
          times: DEFAULT_TIMES,
          intervalFunc: constant$1(DEFAULT_INTERVAL)
        };
        function parseTimes(acc, t) {
          if (typeof t === "object") {
            acc.times = +t.times || DEFAULT_TIMES;
            acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
            acc.errorFilter = t.errorFilter;
          } else if (typeof t === "number" || typeof t === "string") {
            acc.times = +t || DEFAULT_TIMES;
          } else {
            throw new Error("Invalid arguments for async.retry");
          }
        }
        if (arguments.length < 3 && typeof opts === "function") {
          callback = task || noop;
          task = opts;
        } else {
          parseTimes(options, opts);
          callback = callback || noop;
        }
        if (typeof task !== "function") {
          throw new Error("Invalid arguments for async.retry");
        }
        var _task = wrapAsync(task);
        var attempt = 1;
        function retryAttempt() {
          _task(function(err) {
            if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
              setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
              callback.apply(null, arguments);
            }
          });
        }
        retryAttempt();
      }
      var retryable = function(opts, task) {
        if (!task) {
          task = opts;
          opts = null;
        }
        var _task = wrapAsync(task);
        return initialParams(function(args, callback) {
          function taskFn(cb) {
            _task.apply(null, args.concat(cb));
          }
          if (opts) retry(opts, taskFn, callback);
          else retry(taskFn, callback);
        });
      };
      function series(tasks, callback) {
        _parallel(eachOfSeries, tasks, callback);
      }
      var some = doParallel(_createTester(Boolean, identity));
      var someLimit = doParallelLimit(_createTester(Boolean, identity));
      var someSeries = doLimit(someLimit, 1);
      function sortBy(coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        map(coll, function(x, callback2) {
          _iteratee(x, function(err, criteria) {
            if (err) return callback2(err);
            callback2(null, { value: x, criteria });
          });
        }, function(err, results) {
          if (err) return callback(err);
          callback(null, arrayMap(results.sort(comparator), baseProperty("value")));
        });
        function comparator(left, right) {
          var a = left.criteria, b = right.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
        }
      }
      function timeout(asyncFn, milliseconds, info) {
        var fn = wrapAsync(asyncFn);
        return initialParams(function(args, callback) {
          var timedOut = false;
          var timer;
          function timeoutCallback() {
            var name = asyncFn.name || "anonymous";
            var error = new Error('Callback function "' + name + '" timed out.');
            error.code = "ETIMEDOUT";
            if (info) {
              error.info = info;
            }
            timedOut = true;
            callback(error);
          }
          args.push(function() {
            if (!timedOut) {
              callback.apply(null, arguments);
              clearTimeout(timer);
            }
          });
          timer = setTimeout(timeoutCallback, milliseconds);
          fn.apply(null, args);
        });
      }
      var nativeCeil = Math.ceil;
      var nativeMax = Math.max;
      function baseRange(start, end, step, fromRight) {
        var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
        while (length--) {
          result[fromRight ? length : ++index2] = start;
          start += step;
        }
        return result;
      }
      function timeLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
      }
      var times = doLimit(timeLimit, Infinity);
      var timesSeries = doLimit(timeLimit, 1);
      function transform(coll, accumulator, iteratee, callback) {
        if (arguments.length <= 3) {
          callback = iteratee;
          iteratee = accumulator;
          accumulator = isArray(coll) ? [] : {};
        }
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOf(coll, function(v, k, cb) {
          _iteratee(accumulator, v, k, cb);
        }, function(err) {
          callback(err, accumulator);
        });
      }
      function tryEach(tasks, callback) {
        var error = null;
        var result;
        callback = callback || noop;
        eachSeries(tasks, function(task, callback2) {
          wrapAsync(task)(function(err, res) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            } else {
              result = res;
            }
            error = err;
            callback2(!err);
          });
        }, function() {
          callback(error, result);
        });
      }
      function unmemoize(fn) {
        return function() {
          return (fn.unmemoized || fn).apply(null, arguments);
        };
      }
      function whilst(test, iteratee, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        if (!test()) return callback(null);
        var next = function(err) {
          if (err) return callback(err);
          if (test()) return _iteratee(next);
          var args = slice(arguments, 1);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function until(test, iteratee, callback) {
        whilst(function() {
          return !test.apply(this, arguments);
        }, iteratee, callback);
      }
      var waterfall = function(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks)) return callback(new Error("First argument to waterfall must be an array of functions"));
        if (!tasks.length) return callback();
        var taskIndex = 0;
        function nextTask(args) {
          var task = wrapAsync(tasks[taskIndex++]);
          args.push(onlyOnce(next));
          task.apply(null, args);
        }
        function next(err) {
          if (err || taskIndex === tasks.length) {
            return callback.apply(null, arguments);
          }
          nextTask(slice(arguments, 1));
        }
        nextTask([]);
      };
      var index = {
        apply,
        applyEach,
        applyEachSeries,
        asyncify,
        auto,
        autoInject,
        cargo,
        compose,
        concat,
        concatLimit,
        concatSeries,
        constant,
        detect,
        detectLimit,
        detectSeries,
        dir,
        doDuring,
        doUntil,
        doWhilst,
        during,
        each: eachLimit,
        eachLimit: eachLimit$1,
        eachOf,
        eachOfLimit,
        eachOfSeries,
        eachSeries,
        ensureAsync,
        every,
        everyLimit,
        everySeries,
        filter,
        filterLimit,
        filterSeries,
        forever,
        groupBy,
        groupByLimit,
        groupBySeries,
        log,
        map,
        mapLimit,
        mapSeries,
        mapValues,
        mapValuesLimit,
        mapValuesSeries,
        memoize,
        nextTick,
        parallel: parallelLimit,
        parallelLimit: parallelLimit$1,
        priorityQueue,
        queue: queue$1,
        race,
        reduce,
        reduceRight,
        reflect,
        reflectAll,
        reject,
        rejectLimit,
        rejectSeries,
        retry,
        retryable,
        seq,
        series,
        setImmediate: setImmediate$1,
        some,
        someLimit,
        someSeries,
        sortBy,
        timeout,
        times,
        timesLimit: timeLimit,
        timesSeries,
        transform,
        tryEach,
        unmemoize,
        until,
        waterfall,
        whilst,
        // aliases
        all: every,
        allLimit: everyLimit,
        allSeries: everySeries,
        any: some,
        anyLimit: someLimit,
        anySeries: someSeries,
        find: detect,
        findLimit: detectLimit,
        findSeries: detectSeries,
        forEach: eachLimit,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit$1,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
      };
      exports3["default"] = index;
      exports3.apply = apply;
      exports3.applyEach = applyEach;
      exports3.applyEachSeries = applyEachSeries;
      exports3.asyncify = asyncify;
      exports3.auto = auto;
      exports3.autoInject = autoInject;
      exports3.cargo = cargo;
      exports3.compose = compose;
      exports3.concat = concat;
      exports3.concatLimit = concatLimit;
      exports3.concatSeries = concatSeries;
      exports3.constant = constant;
      exports3.detect = detect;
      exports3.detectLimit = detectLimit;
      exports3.detectSeries = detectSeries;
      exports3.dir = dir;
      exports3.doDuring = doDuring;
      exports3.doUntil = doUntil;
      exports3.doWhilst = doWhilst;
      exports3.during = during;
      exports3.each = eachLimit;
      exports3.eachLimit = eachLimit$1;
      exports3.eachOf = eachOf;
      exports3.eachOfLimit = eachOfLimit;
      exports3.eachOfSeries = eachOfSeries;
      exports3.eachSeries = eachSeries;
      exports3.ensureAsync = ensureAsync;
      exports3.every = every;
      exports3.everyLimit = everyLimit;
      exports3.everySeries = everySeries;
      exports3.filter = filter;
      exports3.filterLimit = filterLimit;
      exports3.filterSeries = filterSeries;
      exports3.forever = forever;
      exports3.groupBy = groupBy;
      exports3.groupByLimit = groupByLimit;
      exports3.groupBySeries = groupBySeries;
      exports3.log = log;
      exports3.map = map;
      exports3.mapLimit = mapLimit;
      exports3.mapSeries = mapSeries;
      exports3.mapValues = mapValues;
      exports3.mapValuesLimit = mapValuesLimit;
      exports3.mapValuesSeries = mapValuesSeries;
      exports3.memoize = memoize;
      exports3.nextTick = nextTick;
      exports3.parallel = parallelLimit;
      exports3.parallelLimit = parallelLimit$1;
      exports3.priorityQueue = priorityQueue;
      exports3.queue = queue$1;
      exports3.race = race;
      exports3.reduce = reduce;
      exports3.reduceRight = reduceRight;
      exports3.reflect = reflect;
      exports3.reflectAll = reflectAll;
      exports3.reject = reject;
      exports3.rejectLimit = rejectLimit;
      exports3.rejectSeries = rejectSeries;
      exports3.retry = retry;
      exports3.retryable = retryable;
      exports3.seq = seq;
      exports3.series = series;
      exports3.setImmediate = setImmediate$1;
      exports3.some = some;
      exports3.someLimit = someLimit;
      exports3.someSeries = someSeries;
      exports3.sortBy = sortBy;
      exports3.timeout = timeout;
      exports3.times = times;
      exports3.timesLimit = timeLimit;
      exports3.timesSeries = timesSeries;
      exports3.transform = transform;
      exports3.tryEach = tryEach;
      exports3.unmemoize = unmemoize;
      exports3.until = until;
      exports3.waterfall = waterfall;
      exports3.whilst = whilst;
      exports3.all = every;
      exports3.allLimit = everyLimit;
      exports3.allSeries = everySeries;
      exports3.any = some;
      exports3.anyLimit = someLimit;
      exports3.anySeries = someSeries;
      exports3.find = detect;
      exports3.findLimit = detectLimit;
      exports3.findSeries = detectSeries;
      exports3.forEach = eachLimit;
      exports3.forEachSeries = eachSeries;
      exports3.forEachLimit = eachLimit$1;
      exports3.forEachOf = eachOf;
      exports3.forEachOfSeries = eachOfSeries;
      exports3.forEachOfLimit = eachOfLimit;
      exports3.inject = reduce;
      exports3.foldl = reduce;
      exports3.foldr = reduceRight;
      exports3.select = filter;
      exports3.selectLimit = filterLimit;
      exports3.selectSeries = filterSeries;
      exports3.wrapSync = asyncify;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/doublearray/doublearray.js
var require_doublearray = __commonJS({
  "node_modules/doublearray/doublearray.js"(exports2, module2) {
    (function() {
      "use strict";
      var TERM_CHAR = "\0", TERM_CODE = 0, ROOT_ID = 0, NOT_FOUND = -1, BASE_SIGNED = true, CHECK_SIGNED = true, BASE_BYTES = 4, CHECK_BYTES = 4, MEMORY_EXPAND_RATIO = 2;
      var newBC = function(initial_size) {
        if (initial_size == null) {
          initial_size = 1024;
        }
        var initBase = function(_base, start, end) {
          for (var i = start; i < end; i++) {
            _base[i] = -i + 1;
          }
          if (0 < check.array[check.array.length - 1]) {
            var last_used_id = check.array.length - 2;
            while (0 < check.array[last_used_id]) {
              last_used_id--;
            }
            _base[start] = -last_used_id;
          }
        };
        var initCheck = function(_check, start, end) {
          for (var i = start; i < end; i++) {
            _check[i] = -i - 1;
          }
        };
        var realloc = function(min_size) {
          var new_size = min_size * MEMORY_EXPAND_RATIO;
          var base_new_array = newArrayBuffer(base.signed, base.bytes, new_size);
          initBase(base_new_array, base.array.length, new_size);
          base_new_array.set(base.array);
          base.array = null;
          base.array = base_new_array;
          var check_new_array = newArrayBuffer(check.signed, check.bytes, new_size);
          initCheck(check_new_array, check.array.length, new_size);
          check_new_array.set(check.array);
          check.array = null;
          check.array = check_new_array;
        };
        var first_unused_node = ROOT_ID + 1;
        var base = {
          signed: BASE_SIGNED,
          bytes: BASE_BYTES,
          array: newArrayBuffer(BASE_SIGNED, BASE_BYTES, initial_size)
        };
        var check = {
          signed: CHECK_SIGNED,
          bytes: CHECK_BYTES,
          array: newArrayBuffer(CHECK_SIGNED, CHECK_BYTES, initial_size)
        };
        base.array[ROOT_ID] = 1;
        check.array[ROOT_ID] = ROOT_ID;
        initBase(base.array, ROOT_ID + 1, base.array.length);
        initCheck(check.array, ROOT_ID + 1, check.array.length);
        return {
          getBaseBuffer: function() {
            return base.array;
          },
          getCheckBuffer: function() {
            return check.array;
          },
          loadBaseBuffer: function(base_buffer) {
            base.array = base_buffer;
            return this;
          },
          loadCheckBuffer: function(check_buffer) {
            check.array = check_buffer;
            return this;
          },
          size: function() {
            return Math.max(base.array.length, check.array.length);
          },
          getBase: function(index) {
            if (base.array.length - 1 < index) {
              return -index + 1;
            }
            return base.array[index];
          },
          getCheck: function(index) {
            if (check.array.length - 1 < index) {
              return -index - 1;
            }
            return check.array[index];
          },
          setBase: function(index, base_value) {
            if (base.array.length - 1 < index) {
              realloc(index);
            }
            base.array[index] = base_value;
          },
          setCheck: function(index, check_value) {
            if (check.array.length - 1 < index) {
              realloc(index);
            }
            check.array[index] = check_value;
          },
          setFirstUnusedNode: function(index) {
            first_unused_node = index;
          },
          getFirstUnusedNode: function() {
            return first_unused_node;
          },
          shrink: function() {
            var last_index = this.size() - 1;
            while (true) {
              if (0 <= check.array[last_index]) {
                break;
              }
              last_index--;
            }
            base.array = base.array.subarray(0, last_index + 2);
            check.array = check.array.subarray(0, last_index + 2);
          },
          calc: function() {
            var unused_count = 0;
            var size = check.array.length;
            for (var i = 0; i < size; i++) {
              if (check.array[i] < 0) {
                unused_count++;
              }
            }
            return {
              all: size,
              unused: unused_count,
              efficiency: (size - unused_count) / size
            };
          },
          dump: function() {
            var dump_base = "";
            var dump_check = "";
            var i;
            for (i = 0; i < base.array.length; i++) {
              dump_base = dump_base + " " + this.getBase(i);
            }
            for (i = 0; i < check.array.length; i++) {
              dump_check = dump_check + " " + this.getCheck(i);
            }
            console.log("base:" + dump_base);
            console.log("chck:" + dump_check);
            return "base:" + dump_base + " chck:" + dump_check;
          }
        };
      };
      function DoubleArrayBuilder(initial_size) {
        this.bc = newBC(initial_size);
        this.keys = [];
      }
      DoubleArrayBuilder.prototype.append = function(key, record) {
        this.keys.push({ k: key, v: record });
        return this;
      };
      DoubleArrayBuilder.prototype.build = function(keys, sorted) {
        if (keys == null) {
          keys = this.keys;
        }
        if (keys == null) {
          return new DoubleArray(this.bc);
        }
        if (sorted == null) {
          sorted = false;
        }
        var buff_keys = keys.map(function(k) {
          return {
            k: stringToUtf8Bytes(k.k + TERM_CHAR),
            v: k.v
          };
        });
        if (sorted) {
          this.keys = buff_keys;
        } else {
          this.keys = buff_keys.sort(function(k1, k2) {
            var b1 = k1.k;
            var b2 = k2.k;
            var min_length = Math.min(b1.length, b2.length);
            for (var pos = 0; pos < min_length; pos++) {
              if (b1[pos] === b2[pos]) {
                continue;
              }
              return b1[pos] - b2[pos];
            }
            return b1.length - b2.length;
          });
        }
        buff_keys = null;
        this._build(ROOT_ID, 0, 0, this.keys.length);
        return new DoubleArray(this.bc);
      };
      DoubleArrayBuilder.prototype._build = function(parent_index, position, start, length) {
        var children_info = this.getChildrenInfo(position, start, length);
        var _base = this.findAllocatableBase(children_info);
        this.setBC(parent_index, children_info, _base);
        for (var i = 0; i < children_info.length; i = i + 3) {
          var child_code = children_info[i];
          if (child_code === TERM_CODE) {
            continue;
          }
          var child_start = children_info[i + 1];
          var child_len = children_info[i + 2];
          var child_index = _base + child_code;
          this._build(child_index, position + 1, child_start, child_len);
        }
      };
      DoubleArrayBuilder.prototype.getChildrenInfo = function(position, start, length) {
        var current_char = this.keys[start].k[position];
        var i = 0;
        var children_info = new Int32Array(length * 3);
        children_info[i++] = current_char;
        children_info[i++] = start;
        var next_pos = start;
        var start_pos = start;
        for (; next_pos < start + length; next_pos++) {
          var next_char = this.keys[next_pos].k[position];
          if (current_char !== next_char) {
            children_info[i++] = next_pos - start_pos;
            children_info[i++] = next_char;
            children_info[i++] = next_pos;
            current_char = next_char;
            start_pos = next_pos;
          }
        }
        children_info[i++] = next_pos - start_pos;
        children_info = children_info.subarray(0, i);
        return children_info;
      };
      DoubleArrayBuilder.prototype.setBC = function(parent_id, children_info, _base) {
        var bc = this.bc;
        bc.setBase(parent_id, _base);
        var i;
        for (i = 0; i < children_info.length; i = i + 3) {
          var code = children_info[i];
          var child_id = _base + code;
          var prev_unused_id = -bc.getBase(child_id);
          var next_unused_id = -bc.getCheck(child_id);
          if (child_id !== bc.getFirstUnusedNode()) {
            bc.setCheck(prev_unused_id, -next_unused_id);
          } else {
            bc.setFirstUnusedNode(next_unused_id);
          }
          bc.setBase(next_unused_id, -prev_unused_id);
          var check = parent_id;
          bc.setCheck(child_id, check);
          if (code === TERM_CODE) {
            var start_pos = children_info[i + 1];
            var value = this.keys[start_pos].v;
            if (value == null) {
              value = 0;
            }
            var base = -value - 1;
            bc.setBase(child_id, base);
          }
        }
      };
      DoubleArrayBuilder.prototype.findAllocatableBase = function(children_info) {
        var bc = this.bc;
        var _base;
        var curr = bc.getFirstUnusedNode();
        while (true) {
          _base = curr - children_info[0];
          if (_base < 0) {
            curr = -bc.getCheck(curr);
            continue;
          }
          var empty_area_found = true;
          for (var i = 0; i < children_info.length; i = i + 3) {
            var code = children_info[i];
            var candidate_id = _base + code;
            if (!this.isUnusedNode(candidate_id)) {
              curr = -bc.getCheck(curr);
              empty_area_found = false;
              break;
            }
          }
          if (empty_area_found) {
            return _base;
          }
        }
      };
      DoubleArrayBuilder.prototype.isUnusedNode = function(index) {
        var bc = this.bc;
        var check = bc.getCheck(index);
        if (index === ROOT_ID) {
          return false;
        }
        if (check < 0) {
          return true;
        }
        return false;
      };
      function DoubleArray(bc) {
        this.bc = bc;
        this.bc.shrink();
      }
      DoubleArray.prototype.contain = function(key) {
        var bc = this.bc;
        key += TERM_CHAR;
        var buffer = stringToUtf8Bytes(key);
        var parent = ROOT_ID;
        var child = NOT_FOUND;
        for (var i = 0; i < buffer.length; i++) {
          var code = buffer[i];
          child = this.traverse(parent, code);
          if (child === NOT_FOUND) {
            return false;
          }
          if (bc.getBase(child) <= 0) {
            return true;
          } else {
            parent = child;
            continue;
          }
        }
        return false;
      };
      DoubleArray.prototype.lookup = function(key) {
        key += TERM_CHAR;
        var buffer = stringToUtf8Bytes(key);
        var parent = ROOT_ID;
        var child = NOT_FOUND;
        for (var i = 0; i < buffer.length; i++) {
          var code = buffer[i];
          child = this.traverse(parent, code);
          if (child === NOT_FOUND) {
            return NOT_FOUND;
          }
          parent = child;
        }
        var base = this.bc.getBase(child);
        if (base <= 0) {
          return -base - 1;
        } else {
          return NOT_FOUND;
        }
      };
      DoubleArray.prototype.commonPrefixSearch = function(key) {
        var buffer = stringToUtf8Bytes(key);
        var parent = ROOT_ID;
        var child = NOT_FOUND;
        var result = [];
        for (var i = 0; i < buffer.length; i++) {
          var code = buffer[i];
          child = this.traverse(parent, code);
          if (child !== NOT_FOUND) {
            parent = child;
            var grand_child = this.traverse(child, TERM_CODE);
            if (grand_child !== NOT_FOUND) {
              var base = this.bc.getBase(grand_child);
              var r = {};
              if (base <= 0) {
                r.v = -base - 1;
              }
              r.k = utf8BytesToString(arrayCopy(buffer, 0, i + 1));
              result.push(r);
            }
            continue;
          } else {
            break;
          }
        }
        return result;
      };
      DoubleArray.prototype.traverse = function(parent, code) {
        var child = this.bc.getBase(parent) + code;
        if (this.bc.getCheck(child) === parent) {
          return child;
        } else {
          return NOT_FOUND;
        }
      };
      DoubleArray.prototype.size = function() {
        return this.bc.size();
      };
      DoubleArray.prototype.calc = function() {
        return this.bc.calc();
      };
      DoubleArray.prototype.dump = function() {
        return this.bc.dump();
      };
      var newArrayBuffer = function(signed, bytes, size) {
        if (signed) {
          switch (bytes) {
            case 1:
              return new Int8Array(size);
            case 2:
              return new Int16Array(size);
            case 4:
              return new Int32Array(size);
            default:
              throw new RangeError("Invalid newArray parameter element_bytes:" + bytes);
          }
        } else {
          switch (bytes) {
            case 1:
              return new Uint8Array(size);
            case 2:
              return new Uint16Array(size);
            case 4:
              return new Uint32Array(size);
            default:
              throw new RangeError("Invalid newArray parameter element_bytes:" + bytes);
          }
        }
      };
      var arrayCopy = function(src, src_offset, length) {
        var buffer = new ArrayBuffer(length);
        var dstU8 = new Uint8Array(buffer, 0, length);
        var srcU8 = src.subarray(src_offset, length);
        dstU8.set(srcU8);
        return dstU8;
      };
      var stringToUtf8Bytes = function(str) {
        var bytes = new Uint8Array(new ArrayBuffer(str.length * 4));
        var i = 0, j = 0;
        while (i < str.length) {
          var unicode_code;
          var utf16_code = str.charCodeAt(i++);
          if (utf16_code >= 55296 && utf16_code <= 56319) {
            var upper = utf16_code;
            var lower = str.charCodeAt(i++);
            if (lower >= 56320 && lower <= 57343) {
              unicode_code = (upper - 55296) * (1 << 10) + (1 << 16) + (lower - 56320);
            } else {
              return null;
            }
          } else {
            unicode_code = utf16_code;
          }
          if (unicode_code < 128) {
            bytes[j++] = unicode_code;
          } else if (unicode_code < 1 << 11) {
            bytes[j++] = unicode_code >>> 6 | 192;
            bytes[j++] = unicode_code & 63 | 128;
          } else if (unicode_code < 1 << 16) {
            bytes[j++] = unicode_code >>> 12 | 224;
            bytes[j++] = unicode_code >> 6 & 63 | 128;
            bytes[j++] = unicode_code & 63 | 128;
          } else if (unicode_code < 1 << 21) {
            bytes[j++] = unicode_code >>> 18 | 240;
            bytes[j++] = unicode_code >> 12 & 63 | 128;
            bytes[j++] = unicode_code >> 6 & 63 | 128;
            bytes[j++] = unicode_code & 63 | 128;
          } else {
          }
        }
        return bytes.subarray(0, j);
      };
      var utf8BytesToString = function(bytes) {
        var str = "";
        var code, b1, b2, b3, b4, upper, lower;
        var i = 0;
        while (i < bytes.length) {
          b1 = bytes[i++];
          if (b1 < 128) {
            code = b1;
          } else if (b1 >> 5 === 6) {
            b2 = bytes[i++];
            code = (b1 & 31) << 6 | b2 & 63;
          } else if (b1 >> 4 === 14) {
            b2 = bytes[i++];
            b3 = bytes[i++];
            code = (b1 & 15) << 12 | (b2 & 63) << 6 | b3 & 63;
          } else {
            b2 = bytes[i++];
            b3 = bytes[i++];
            b4 = bytes[i++];
            code = (b1 & 7) << 18 | (b2 & 63) << 12 | (b3 & 63) << 6 | b4 & 63;
          }
          if (code < 65536) {
            str += String.fromCharCode(code);
          } else {
            code -= 65536;
            upper = 55296 | code >> 10;
            lower = 56320 | code & 1023;
            str += String.fromCharCode(upper, lower);
          }
        }
        return str;
      };
      var doublearray = {
        builder: function(initial_size) {
          return new DoubleArrayBuilder(initial_size);
        },
        load: function(base_buffer, check_buffer) {
          var bc = newBC(0);
          bc.loadBaseBuffer(base_buffer);
          bc.loadCheckBuffer(check_buffer);
          return new DoubleArray(bc);
        }
      };
      if ("undefined" === typeof module2) {
        window.doublearray = doublearray;
      } else {
        module2.exports = doublearray;
      }
    })();
  }
});

// node_modules/kuromoji/src/util/ByteBuffer.js
var require_ByteBuffer = __commonJS({
  "node_modules/kuromoji/src/util/ByteBuffer.js"(exports2, module2) {
    "use strict";
    var stringToUtf8Bytes = function(str) {
      var bytes = new Uint8Array(str.length * 4);
      var i = 0, j = 0;
      while (i < str.length) {
        var unicode_code;
        var utf16_code = str.charCodeAt(i++);
        if (utf16_code >= 55296 && utf16_code <= 56319) {
          var upper = utf16_code;
          var lower = str.charCodeAt(i++);
          if (lower >= 56320 && lower <= 57343) {
            unicode_code = (upper - 55296) * (1 << 10) + (1 << 16) + (lower - 56320);
          } else {
            return null;
          }
        } else {
          unicode_code = utf16_code;
        }
        if (unicode_code < 128) {
          bytes[j++] = unicode_code;
        } else if (unicode_code < 1 << 11) {
          bytes[j++] = unicode_code >>> 6 | 192;
          bytes[j++] = unicode_code & 63 | 128;
        } else if (unicode_code < 1 << 16) {
          bytes[j++] = unicode_code >>> 12 | 224;
          bytes[j++] = unicode_code >> 6 & 63 | 128;
          bytes[j++] = unicode_code & 63 | 128;
        } else if (unicode_code < 1 << 21) {
          bytes[j++] = unicode_code >>> 18 | 240;
          bytes[j++] = unicode_code >> 12 & 63 | 128;
          bytes[j++] = unicode_code >> 6 & 63 | 128;
          bytes[j++] = unicode_code & 63 | 128;
        } else {
        }
      }
      return bytes.subarray(0, j);
    };
    var utf8BytesToString = function(bytes) {
      var str = "";
      var code, b1, b2, b3, b4, upper, lower;
      var i = 0;
      while (i < bytes.length) {
        b1 = bytes[i++];
        if (b1 < 128) {
          code = b1;
        } else if (b1 >> 5 === 6) {
          b2 = bytes[i++];
          code = (b1 & 31) << 6 | b2 & 63;
        } else if (b1 >> 4 === 14) {
          b2 = bytes[i++];
          b3 = bytes[i++];
          code = (b1 & 15) << 12 | (b2 & 63) << 6 | b3 & 63;
        } else {
          b2 = bytes[i++];
          b3 = bytes[i++];
          b4 = bytes[i++];
          code = (b1 & 7) << 18 | (b2 & 63) << 12 | (b3 & 63) << 6 | b4 & 63;
        }
        if (code < 65536) {
          str += String.fromCharCode(code);
        } else {
          code -= 65536;
          upper = 55296 | code >> 10;
          lower = 56320 | code & 1023;
          str += String.fromCharCode(upper, lower);
        }
      }
      return str;
    };
    function ByteBuffer(arg) {
      var initial_size;
      if (arg == null) {
        initial_size = 1024 * 1024;
      } else if (typeof arg === "number") {
        initial_size = arg;
      } else if (arg instanceof Uint8Array) {
        this.buffer = arg;
        this.position = 0;
        return;
      } else {
        throw typeof arg + " is invalid parameter type for ByteBuffer constructor";
      }
      this.buffer = new Uint8Array(initial_size);
      this.position = 0;
    }
    ByteBuffer.prototype.size = function() {
      return this.buffer.length;
    };
    ByteBuffer.prototype.reallocate = function() {
      var new_array = new Uint8Array(this.buffer.length * 2);
      new_array.set(this.buffer);
      this.buffer = new_array;
    };
    ByteBuffer.prototype.shrink = function() {
      this.buffer = this.buffer.subarray(0, this.position);
      return this.buffer;
    };
    ByteBuffer.prototype.put = function(b) {
      if (this.buffer.length < this.position + 1) {
        this.reallocate();
      }
      this.buffer[this.position++] = b;
    };
    ByteBuffer.prototype.get = function(index) {
      if (index == null) {
        index = this.position;
        this.position += 1;
      }
      if (this.buffer.length < index + 1) {
        return 0;
      }
      return this.buffer[index];
    };
    ByteBuffer.prototype.putShort = function(num) {
      if (65535 < num) {
        throw num + " is over short value";
      }
      var lower = 255 & num;
      var upper = (65280 & num) >> 8;
      this.put(lower);
      this.put(upper);
    };
    ByteBuffer.prototype.getShort = function(index) {
      if (index == null) {
        index = this.position;
        this.position += 2;
      }
      if (this.buffer.length < index + 2) {
        return 0;
      }
      var lower = this.buffer[index];
      var upper = this.buffer[index + 1];
      var value = (upper << 8) + lower;
      if (value & 32768) {
        value = -(value - 1 ^ 65535);
      }
      return value;
    };
    ByteBuffer.prototype.putInt = function(num) {
      if (4294967295 < num) {
        throw num + " is over integer value";
      }
      var b0 = 255 & num;
      var b1 = (65280 & num) >> 8;
      var b2 = (16711680 & num) >> 16;
      var b3 = (4278190080 & num) >> 24;
      this.put(b0);
      this.put(b1);
      this.put(b2);
      this.put(b3);
    };
    ByteBuffer.prototype.getInt = function(index) {
      if (index == null) {
        index = this.position;
        this.position += 4;
      }
      if (this.buffer.length < index + 4) {
        return 0;
      }
      var b0 = this.buffer[index];
      var b1 = this.buffer[index + 1];
      var b2 = this.buffer[index + 2];
      var b3 = this.buffer[index + 3];
      return (b3 << 24) + (b2 << 16) + (b1 << 8) + b0;
    };
    ByteBuffer.prototype.readInt = function() {
      var pos = this.position;
      this.position += 4;
      return this.getInt(pos);
    };
    ByteBuffer.prototype.putString = function(str) {
      var bytes = stringToUtf8Bytes(str);
      for (var i = 0; i < bytes.length; i++) {
        this.put(bytes[i]);
      }
      this.put(0);
    };
    ByteBuffer.prototype.getString = function(index) {
      var buf = [], ch;
      if (index == null) {
        index = this.position;
      }
      while (true) {
        if (this.buffer.length < index + 1) {
          break;
        }
        ch = this.get(index++);
        if (ch === 0) {
          break;
        } else {
          buf.push(ch);
        }
      }
      this.position = index;
      return utf8BytesToString(buf);
    };
    module2.exports = ByteBuffer;
  }
});

// node_modules/kuromoji/src/dict/TokenInfoDictionary.js
var require_TokenInfoDictionary = __commonJS({
  "node_modules/kuromoji/src/dict/TokenInfoDictionary.js"(exports2, module2) {
    "use strict";
    var ByteBuffer = require_ByteBuffer();
    function TokenInfoDictionary() {
      this.dictionary = new ByteBuffer(10 * 1024 * 1024);
      this.target_map = {};
      this.pos_buffer = new ByteBuffer(10 * 1024 * 1024);
    }
    TokenInfoDictionary.prototype.buildDictionary = function(entries) {
      var dictionary_entries = {};
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.length < 4) {
          continue;
        }
        var surface_form = entry[0];
        var left_id = entry[1];
        var right_id = entry[2];
        var word_cost = entry[3];
        var feature = entry.slice(4).join(",");
        if (!isFinite(left_id) || !isFinite(right_id) || !isFinite(word_cost)) {
          console.log(entry);
        }
        var token_info_id = this.put(left_id, right_id, word_cost, surface_form, feature);
        dictionary_entries[token_info_id] = surface_form;
      }
      this.dictionary.shrink();
      this.pos_buffer.shrink();
      return dictionary_entries;
    };
    TokenInfoDictionary.prototype.put = function(left_id, right_id, word_cost, surface_form, feature) {
      var token_info_id = this.dictionary.position;
      var pos_id = this.pos_buffer.position;
      this.dictionary.putShort(left_id);
      this.dictionary.putShort(right_id);
      this.dictionary.putShort(word_cost);
      this.dictionary.putInt(pos_id);
      this.pos_buffer.putString(surface_form + "," + feature);
      return token_info_id;
    };
    TokenInfoDictionary.prototype.addMapping = function(source, target) {
      var mapping = this.target_map[source];
      if (mapping == null) {
        mapping = [];
      }
      mapping.push(target);
      this.target_map[source] = mapping;
    };
    TokenInfoDictionary.prototype.targetMapToBuffer = function() {
      var buffer = new ByteBuffer();
      var map_keys_size = Object.keys(this.target_map).length;
      buffer.putInt(map_keys_size);
      for (var key in this.target_map) {
        var values = this.target_map[key];
        var map_values_size = values.length;
        buffer.putInt(parseInt(key));
        buffer.putInt(map_values_size);
        for (var i = 0; i < values.length; i++) {
          buffer.putInt(values[i]);
        }
      }
      return buffer.shrink();
    };
    TokenInfoDictionary.prototype.loadDictionary = function(array_buffer) {
      this.dictionary = new ByteBuffer(array_buffer);
      return this;
    };
    TokenInfoDictionary.prototype.loadPosVector = function(array_buffer) {
      this.pos_buffer = new ByteBuffer(array_buffer);
      return this;
    };
    TokenInfoDictionary.prototype.loadTargetMap = function(array_buffer) {
      var buffer = new ByteBuffer(array_buffer);
      buffer.position = 0;
      this.target_map = {};
      buffer.readInt();
      while (true) {
        if (buffer.buffer.length < buffer.position + 1) {
          break;
        }
        var key = buffer.readInt();
        var map_values_size = buffer.readInt();
        for (var i = 0; i < map_values_size; i++) {
          var value = buffer.readInt();
          this.addMapping(key, value);
        }
      }
      return this;
    };
    TokenInfoDictionary.prototype.getFeatures = function(token_info_id_str) {
      var token_info_id = parseInt(token_info_id_str);
      if (isNaN(token_info_id)) {
        return "";
      }
      var pos_id = this.dictionary.getInt(token_info_id + 6);
      return this.pos_buffer.getString(pos_id);
    };
    module2.exports = TokenInfoDictionary;
  }
});

// node_modules/kuromoji/src/dict/ConnectionCosts.js
var require_ConnectionCosts = __commonJS({
  "node_modules/kuromoji/src/dict/ConnectionCosts.js"(exports2, module2) {
    "use strict";
    function ConnectionCosts(forward_dimension, backward_dimension) {
      this.forward_dimension = forward_dimension;
      this.backward_dimension = backward_dimension;
      this.buffer = new Int16Array(forward_dimension * backward_dimension + 2);
      this.buffer[0] = forward_dimension;
      this.buffer[1] = backward_dimension;
    }
    ConnectionCosts.prototype.put = function(forward_id, backward_id, cost) {
      var index = forward_id * this.backward_dimension + backward_id + 2;
      if (this.buffer.length < index + 1) {
        throw "ConnectionCosts buffer overflow";
      }
      this.buffer[index] = cost;
    };
    ConnectionCosts.prototype.get = function(forward_id, backward_id) {
      var index = forward_id * this.backward_dimension + backward_id + 2;
      if (this.buffer.length < index + 1) {
        throw "ConnectionCosts buffer overflow";
      }
      return this.buffer[index];
    };
    ConnectionCosts.prototype.loadConnectionCosts = function(connection_costs_buffer) {
      this.forward_dimension = connection_costs_buffer[0];
      this.backward_dimension = connection_costs_buffer[1];
      this.buffer = connection_costs_buffer;
    };
    module2.exports = ConnectionCosts;
  }
});

// node_modules/kuromoji/src/dict/CharacterClass.js
var require_CharacterClass = __commonJS({
  "node_modules/kuromoji/src/dict/CharacterClass.js"(exports2, module2) {
    "use strict";
    function CharacterClass(class_id, class_name, is_always_invoke, is_grouping, max_length) {
      this.class_id = class_id;
      this.class_name = class_name;
      this.is_always_invoke = is_always_invoke;
      this.is_grouping = is_grouping;
      this.max_length = max_length;
    }
    module2.exports = CharacterClass;
  }
});

// node_modules/kuromoji/src/dict/InvokeDefinitionMap.js
var require_InvokeDefinitionMap = __commonJS({
  "node_modules/kuromoji/src/dict/InvokeDefinitionMap.js"(exports2, module2) {
    "use strict";
    var ByteBuffer = require_ByteBuffer();
    var CharacterClass = require_CharacterClass();
    function InvokeDefinitionMap() {
      this.map = [];
      this.lookup_table = {};
    }
    InvokeDefinitionMap.load = function(invoke_def_buffer) {
      var invoke_def = new InvokeDefinitionMap();
      var character_category_definition = [];
      var buffer = new ByteBuffer(invoke_def_buffer);
      while (buffer.position + 1 < buffer.size()) {
        var class_id = character_category_definition.length;
        var is_always_invoke = buffer.get();
        var is_grouping = buffer.get();
        var max_length = buffer.getInt();
        var class_name = buffer.getString();
        character_category_definition.push(new CharacterClass(class_id, class_name, is_always_invoke, is_grouping, max_length));
      }
      invoke_def.init(character_category_definition);
      return invoke_def;
    };
    InvokeDefinitionMap.prototype.init = function(character_category_definition) {
      if (character_category_definition == null) {
        return;
      }
      for (var i = 0; i < character_category_definition.length; i++) {
        var character_class = character_category_definition[i];
        this.map[i] = character_class;
        this.lookup_table[character_class.class_name] = i;
      }
    };
    InvokeDefinitionMap.prototype.getCharacterClass = function(class_id) {
      return this.map[class_id];
    };
    InvokeDefinitionMap.prototype.lookup = function(class_name) {
      var class_id = this.lookup_table[class_name];
      if (class_id == null) {
        return null;
      }
      return class_id;
    };
    InvokeDefinitionMap.prototype.toBuffer = function() {
      var buffer = new ByteBuffer();
      for (var i = 0; i < this.map.length; i++) {
        var char_class = this.map[i];
        buffer.put(char_class.is_always_invoke);
        buffer.put(char_class.is_grouping);
        buffer.putInt(char_class.max_length);
        buffer.putString(char_class.class_name);
      }
      buffer.shrink();
      return buffer.buffer;
    };
    module2.exports = InvokeDefinitionMap;
  }
});

// node_modules/kuromoji/src/dict/CharacterDefinition.js
var require_CharacterDefinition = __commonJS({
  "node_modules/kuromoji/src/dict/CharacterDefinition.js"(exports2, module2) {
    "use strict";
    var InvokeDefinitionMap = require_InvokeDefinitionMap();
    var CharacterClass = require_CharacterClass();
    var SurrogateAwareString = require_SurrogateAwareString();
    var DEFAULT_CATEGORY = "DEFAULT";
    function CharacterDefinition() {
      this.character_category_map = new Uint8Array(65536);
      this.compatible_category_map = new Uint32Array(65536);
      this.invoke_definition_map = null;
    }
    CharacterDefinition.load = function(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
      var char_def = new CharacterDefinition();
      char_def.character_category_map = cat_map_buffer;
      char_def.compatible_category_map = compat_cat_map_buffer;
      char_def.invoke_definition_map = InvokeDefinitionMap.load(invoke_def_buffer);
      return char_def;
    };
    CharacterDefinition.parseCharCategory = function(class_id, parsed_category_def) {
      var category = parsed_category_def[1];
      var invoke = parseInt(parsed_category_def[2]);
      var grouping = parseInt(parsed_category_def[3]);
      var max_length = parseInt(parsed_category_def[4]);
      if (!isFinite(invoke) || invoke !== 0 && invoke !== 1) {
        console.log("char.def parse error. INVOKE is 0 or 1 in:" + invoke);
        return null;
      }
      if (!isFinite(grouping) || grouping !== 0 && grouping !== 1) {
        console.log("char.def parse error. GROUP is 0 or 1 in:" + grouping);
        return null;
      }
      if (!isFinite(max_length) || max_length < 0) {
        console.log("char.def parse error. LENGTH is 1 to n:" + max_length);
        return null;
      }
      var is_invoke = invoke === 1;
      var is_grouping = grouping === 1;
      return new CharacterClass(class_id, category, is_invoke, is_grouping, max_length);
    };
    CharacterDefinition.parseCategoryMapping = function(parsed_category_mapping) {
      var start = parseInt(parsed_category_mapping[1]);
      var default_category = parsed_category_mapping[2];
      var compatible_category = 3 < parsed_category_mapping.length ? parsed_category_mapping.slice(3) : [];
      if (!isFinite(start) || start < 0 || start > 65535) {
        console.log("char.def parse error. CODE is invalid:" + start);
      }
      return { start, default: default_category, compatible: compatible_category };
    };
    CharacterDefinition.parseRangeCategoryMapping = function(parsed_category_mapping) {
      var start = parseInt(parsed_category_mapping[1]);
      var end = parseInt(parsed_category_mapping[2]);
      var default_category = parsed_category_mapping[3];
      var compatible_category = 4 < parsed_category_mapping.length ? parsed_category_mapping.slice(4) : [];
      if (!isFinite(start) || start < 0 || start > 65535) {
        console.log("char.def parse error. CODE is invalid:" + start);
      }
      if (!isFinite(end) || end < 0 || end > 65535) {
        console.log("char.def parse error. CODE is invalid:" + end);
      }
      return { start, end, default: default_category, compatible: compatible_category };
    };
    CharacterDefinition.prototype.initCategoryMappings = function(category_mapping) {
      var code_point;
      if (category_mapping != null) {
        for (var i = 0; i < category_mapping.length; i++) {
          var mapping = category_mapping[i];
          var end = mapping.end || mapping.start;
          for (code_point = mapping.start; code_point <= end; code_point++) {
            this.character_category_map[code_point] = this.invoke_definition_map.lookup(mapping.default);
            for (var j = 0; j < mapping.compatible.length; j++) {
              var bitset = this.compatible_category_map[code_point];
              var compatible_category = mapping.compatible[j];
              if (compatible_category == null) {
                continue;
              }
              var class_id = this.invoke_definition_map.lookup(compatible_category);
              if (class_id == null) {
                continue;
              }
              var class_id_bit = 1 << class_id;
              bitset = bitset | class_id_bit;
              this.compatible_category_map[code_point] = bitset;
            }
          }
        }
      }
      var default_id = this.invoke_definition_map.lookup(DEFAULT_CATEGORY);
      if (default_id == null) {
        return;
      }
      for (code_point = 0; code_point < this.character_category_map.length; code_point++) {
        if (this.character_category_map[code_point] === 0) {
          this.character_category_map[code_point] = 1 << default_id;
        }
      }
    };
    CharacterDefinition.prototype.lookupCompatibleCategory = function(ch) {
      var classes = [];
      var code = ch.charCodeAt(0);
      var integer;
      if (code < this.compatible_category_map.length) {
        integer = this.compatible_category_map[code];
      }
      if (integer == null || integer === 0) {
        return classes;
      }
      for (var bit = 0; bit < 32; bit++) {
        if (integer << 31 - bit >>> 31 === 1) {
          var character_class = this.invoke_definition_map.getCharacterClass(bit);
          if (character_class == null) {
            continue;
          }
          classes.push(character_class);
        }
      }
      return classes;
    };
    CharacterDefinition.prototype.lookup = function(ch) {
      var class_id;
      var code = ch.charCodeAt(0);
      if (SurrogateAwareString.isSurrogatePair(ch)) {
        class_id = this.invoke_definition_map.lookup(DEFAULT_CATEGORY);
      } else if (code < this.character_category_map.length) {
        class_id = this.character_category_map[code];
      }
      if (class_id == null) {
        class_id = this.invoke_definition_map.lookup(DEFAULT_CATEGORY);
      }
      return this.invoke_definition_map.getCharacterClass(class_id);
    };
    module2.exports = CharacterDefinition;
  }
});

// node_modules/kuromoji/src/dict/UnknownDictionary.js
var require_UnknownDictionary = __commonJS({
  "node_modules/kuromoji/src/dict/UnknownDictionary.js"(exports2, module2) {
    "use strict";
    var TokenInfoDictionary = require_TokenInfoDictionary();
    var CharacterDefinition = require_CharacterDefinition();
    var ByteBuffer = require_ByteBuffer();
    function UnknownDictionary() {
      this.dictionary = new ByteBuffer(10 * 1024 * 1024);
      this.target_map = {};
      this.pos_buffer = new ByteBuffer(10 * 1024 * 1024);
      this.character_definition = null;
    }
    UnknownDictionary.prototype = Object.create(TokenInfoDictionary.prototype);
    UnknownDictionary.prototype.characterDefinition = function(character_definition) {
      this.character_definition = character_definition;
      return this;
    };
    UnknownDictionary.prototype.lookup = function(ch) {
      return this.character_definition.lookup(ch);
    };
    UnknownDictionary.prototype.lookupCompatibleCategory = function(ch) {
      return this.character_definition.lookupCompatibleCategory(ch);
    };
    UnknownDictionary.prototype.loadUnknownDictionaries = function(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
      this.loadDictionary(unk_buffer);
      this.loadPosVector(unk_pos_buffer);
      this.loadTargetMap(unk_map_buffer);
      this.character_definition = CharacterDefinition.load(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
    };
    module2.exports = UnknownDictionary;
  }
});

// node_modules/kuromoji/src/dict/DynamicDictionaries.js
var require_DynamicDictionaries = __commonJS({
  "node_modules/kuromoji/src/dict/DynamicDictionaries.js"(exports2, module2) {
    "use strict";
    var doublearray = require_doublearray();
    var TokenInfoDictionary = require_TokenInfoDictionary();
    var ConnectionCosts = require_ConnectionCosts();
    var UnknownDictionary = require_UnknownDictionary();
    function DynamicDictionaries(trie, token_info_dictionary, connection_costs, unknown_dictionary) {
      if (trie != null) {
        this.trie = trie;
      } else {
        this.trie = doublearray.builder(0).build([
          { k: "", v: 1 }
        ]);
      }
      if (token_info_dictionary != null) {
        this.token_info_dictionary = token_info_dictionary;
      } else {
        this.token_info_dictionary = new TokenInfoDictionary();
      }
      if (connection_costs != null) {
        this.connection_costs = connection_costs;
      } else {
        this.connection_costs = new ConnectionCosts(0, 0);
      }
      if (unknown_dictionary != null) {
        this.unknown_dictionary = unknown_dictionary;
      } else {
        this.unknown_dictionary = new UnknownDictionary();
      }
    }
    DynamicDictionaries.prototype.loadTrie = function(base_buffer, check_buffer) {
      this.trie = doublearray.load(base_buffer, check_buffer);
      return this;
    };
    DynamicDictionaries.prototype.loadTokenInfoDictionaries = function(token_info_buffer, pos_buffer, target_map_buffer) {
      this.token_info_dictionary.loadDictionary(token_info_buffer);
      this.token_info_dictionary.loadPosVector(pos_buffer);
      this.token_info_dictionary.loadTargetMap(target_map_buffer);
      return this;
    };
    DynamicDictionaries.prototype.loadConnectionCosts = function(cc_buffer) {
      this.connection_costs.loadConnectionCosts(cc_buffer);
      return this;
    };
    DynamicDictionaries.prototype.loadUnknownDictionaries = function(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
      this.unknown_dictionary.loadUnknownDictionaries(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
      return this;
    };
    module2.exports = DynamicDictionaries;
  }
});

// node_modules/kuromoji/src/loader/DictionaryLoader.js
var require_DictionaryLoader = __commonJS({
  "node_modules/kuromoji/src/loader/DictionaryLoader.js"(exports2, module2) {
    "use strict";
    var path4 = require("path");
    var async = require_async();
    var DynamicDictionaries = require_DynamicDictionaries();
    function DictionaryLoader(dic_path) {
      this.dic = new DynamicDictionaries();
      this.dic_path = dic_path;
    }
    DictionaryLoader.prototype.loadArrayBuffer = function(file, callback) {
      throw new Error("DictionaryLoader#loadArrayBuffer should be overwrite");
    };
    DictionaryLoader.prototype.load = function(load_callback) {
      var dic = this.dic;
      var dic_path = this.dic_path;
      var loadArrayBuffer = this.loadArrayBuffer;
      async.parallel([
        // Trie
        function(callback) {
          async.map(["base.dat.gz", "check.dat.gz"], function(filename, _callback) {
            loadArrayBuffer(path4.join(dic_path, filename), function(err, buffer) {
              if (err) {
                return _callback(err);
              }
              _callback(null, buffer);
            });
          }, function(err, buffers) {
            if (err) {
              return callback(err);
            }
            var base_buffer = new Int32Array(buffers[0]);
            var check_buffer = new Int32Array(buffers[1]);
            dic.loadTrie(base_buffer, check_buffer);
            callback(null);
          });
        },
        // Token info dictionaries
        function(callback) {
          async.map(["tid.dat.gz", "tid_pos.dat.gz", "tid_map.dat.gz"], function(filename, _callback) {
            loadArrayBuffer(path4.join(dic_path, filename), function(err, buffer) {
              if (err) {
                return _callback(err);
              }
              _callback(null, buffer);
            });
          }, function(err, buffers) {
            if (err) {
              return callback(err);
            }
            var token_info_buffer = new Uint8Array(buffers[0]);
            var pos_buffer = new Uint8Array(buffers[1]);
            var target_map_buffer = new Uint8Array(buffers[2]);
            dic.loadTokenInfoDictionaries(token_info_buffer, pos_buffer, target_map_buffer);
            callback(null);
          });
        },
        // Connection cost matrix
        function(callback) {
          loadArrayBuffer(path4.join(dic_path, "cc.dat.gz"), function(err, buffer) {
            if (err) {
              return callback(err);
            }
            var cc_buffer = new Int16Array(buffer);
            dic.loadConnectionCosts(cc_buffer);
            callback(null);
          });
        },
        // Unknown dictionaries
        function(callback) {
          async.map(["unk.dat.gz", "unk_pos.dat.gz", "unk_map.dat.gz", "unk_char.dat.gz", "unk_compat.dat.gz", "unk_invoke.dat.gz"], function(filename, _callback) {
            loadArrayBuffer(path4.join(dic_path, filename), function(err, buffer) {
              if (err) {
                return _callback(err);
              }
              _callback(null, buffer);
            });
          }, function(err, buffers) {
            if (err) {
              return callback(err);
            }
            var unk_buffer = new Uint8Array(buffers[0]);
            var unk_pos_buffer = new Uint8Array(buffers[1]);
            var unk_map_buffer = new Uint8Array(buffers[2]);
            var cat_map_buffer = new Uint8Array(buffers[3]);
            var compat_cat_map_buffer = new Uint32Array(buffers[4]);
            var invoke_def_buffer = new Uint8Array(buffers[5]);
            dic.loadUnknownDictionaries(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
            callback(null);
          });
        }
      ], function(err) {
        load_callback(err, dic);
      });
    };
    module2.exports = DictionaryLoader;
  }
});

// node_modules/kuromoji/src/loader/NodeDictionaryLoader.js
var require_NodeDictionaryLoader = __commonJS({
  "node_modules/kuromoji/src/loader/NodeDictionaryLoader.js"(exports2, module2) {
    "use strict";
    var fs3 = require("fs");
    var node_zlib = require("zlib");
    var DictionaryLoader = require_DictionaryLoader();
    function NodeDictionaryLoader(dic_path) {
      DictionaryLoader.apply(this, [dic_path]);
    }
    NodeDictionaryLoader.prototype = Object.create(DictionaryLoader.prototype);
    NodeDictionaryLoader.prototype.loadArrayBuffer = function(file, callback) {
      fs3.readFile(file, function(err, buffer) {
        if (err) {
          return callback(err);
        }
        node_zlib.gunzip(buffer, function(err2, decompressed) {
          if (err2) {
            return callback(err2);
          }
          var typed_array = new Uint8Array(decompressed);
          callback(null, typed_array.buffer);
        });
      });
    };
    module2.exports = NodeDictionaryLoader;
  }
});

// node_modules/kuromoji/src/TokenizerBuilder.js
var require_TokenizerBuilder = __commonJS({
  "node_modules/kuromoji/src/TokenizerBuilder.js"(exports2, module2) {
    "use strict";
    var Tokenizer = require_Tokenizer();
    var DictionaryLoader = require_NodeDictionaryLoader();
    function TokenizerBuilder(option) {
      if (option.dicPath == null) {
        this.dic_path = "dict/";
      } else {
        this.dic_path = option.dicPath;
      }
    }
    TokenizerBuilder.prototype.build = function(callback) {
      var loader = new DictionaryLoader(this.dic_path);
      loader.load(function(err, dic) {
        callback(err, new Tokenizer(dic));
      });
    };
    module2.exports = TokenizerBuilder;
  }
});

// node_modules/kuromoji/src/dict/builder/ConnectionCostsBuilder.js
var require_ConnectionCostsBuilder = __commonJS({
  "node_modules/kuromoji/src/dict/builder/ConnectionCostsBuilder.js"(exports2, module2) {
    "use strict";
    var ConnectionCosts = require_ConnectionCosts();
    function ConnectionCostsBuilder() {
      this.lines = 0;
      this.connection_cost = null;
    }
    ConnectionCostsBuilder.prototype.putLine = function(line) {
      if (this.lines === 0) {
        var dimensions = line.split(" ");
        var forward_dimension = dimensions[0];
        var backward_dimension = dimensions[1];
        if (forward_dimension < 0 || backward_dimension < 0) {
          throw "Parse error of matrix.def";
        }
        this.connection_cost = new ConnectionCosts(forward_dimension, backward_dimension);
        this.lines++;
        return this;
      }
      var costs = line.split(" ");
      if (costs.length !== 3) {
        return this;
      }
      var forward_id = parseInt(costs[0]);
      var backward_id = parseInt(costs[1]);
      var cost = parseInt(costs[2]);
      if (forward_id < 0 || backward_id < 0 || !isFinite(forward_id) || !isFinite(backward_id) || this.connection_cost.forward_dimension <= forward_id || this.connection_cost.backward_dimension <= backward_id) {
        throw "Parse error of matrix.def";
      }
      this.connection_cost.put(forward_id, backward_id, cost);
      this.lines++;
      return this;
    };
    ConnectionCostsBuilder.prototype.build = function() {
      return this.connection_cost;
    };
    module2.exports = ConnectionCostsBuilder;
  }
});

// node_modules/kuromoji/src/dict/builder/CharacterDefinitionBuilder.js
var require_CharacterDefinitionBuilder = __commonJS({
  "node_modules/kuromoji/src/dict/builder/CharacterDefinitionBuilder.js"(exports2, module2) {
    "use strict";
    var CharacterDefinition = require_CharacterDefinition();
    var InvokeDefinitionMap = require_InvokeDefinitionMap();
    var CATEGORY_DEF_PATTERN = /^(\w+)\s+(\d)\s+(\d)\s+(\d)/;
    var CATEGORY_MAPPING_PATTERN = /^(0x[0-9A-F]{4})(?:\s+([^#\s]+))(?:\s+([^#\s]+))*/;
    var RANGE_CATEGORY_MAPPING_PATTERN = /^(0x[0-9A-F]{4})\.\.(0x[0-9A-F]{4})(?:\s+([^#\s]+))(?:\s+([^#\s]+))*/;
    function CharacterDefinitionBuilder() {
      this.char_def = new CharacterDefinition();
      this.char_def.invoke_definition_map = new InvokeDefinitionMap();
      this.character_category_definition = [];
      this.category_mapping = [];
    }
    CharacterDefinitionBuilder.prototype.putLine = function(line) {
      var parsed_category_def = CATEGORY_DEF_PATTERN.exec(line);
      if (parsed_category_def != null) {
        var class_id = this.character_category_definition.length;
        var char_class = CharacterDefinition.parseCharCategory(class_id, parsed_category_def);
        if (char_class == null) {
          return;
        }
        this.character_category_definition.push(char_class);
        return;
      }
      var parsed_category_mapping = CATEGORY_MAPPING_PATTERN.exec(line);
      if (parsed_category_mapping != null) {
        var mapping = CharacterDefinition.parseCategoryMapping(parsed_category_mapping);
        this.category_mapping.push(mapping);
      }
      var parsed_range_category_mapping = RANGE_CATEGORY_MAPPING_PATTERN.exec(line);
      if (parsed_range_category_mapping != null) {
        var range_mapping = CharacterDefinition.parseRangeCategoryMapping(parsed_range_category_mapping);
        this.category_mapping.push(range_mapping);
      }
    };
    CharacterDefinitionBuilder.prototype.build = function() {
      this.char_def.invoke_definition_map.init(this.character_category_definition);
      this.char_def.initCategoryMappings(this.category_mapping);
      return this.char_def;
    };
    module2.exports = CharacterDefinitionBuilder;
  }
});

// node_modules/kuromoji/src/dict/builder/DictionaryBuilder.js
var require_DictionaryBuilder = __commonJS({
  "node_modules/kuromoji/src/dict/builder/DictionaryBuilder.js"(exports2, module2) {
    "use strict";
    var doublearray = require_doublearray();
    var DynamicDictionaries = require_DynamicDictionaries();
    var TokenInfoDictionary = require_TokenInfoDictionary();
    var ConnectionCostsBuilder = require_ConnectionCostsBuilder();
    var CharacterDefinitionBuilder = require_CharacterDefinitionBuilder();
    var UnknownDictionary = require_UnknownDictionary();
    function DictionaryBuilder() {
      this.tid_entries = [];
      this.unk_entries = [];
      this.cc_builder = new ConnectionCostsBuilder();
      this.cd_builder = new CharacterDefinitionBuilder();
    }
    DictionaryBuilder.prototype.addTokenInfoDictionary = function(line) {
      var new_entry = line.split(",");
      this.tid_entries.push(new_entry);
      return this;
    };
    DictionaryBuilder.prototype.putCostMatrixLine = function(line) {
      this.cc_builder.putLine(line);
      return this;
    };
    DictionaryBuilder.prototype.putCharDefLine = function(line) {
      this.cd_builder.putLine(line);
      return this;
    };
    DictionaryBuilder.prototype.putUnkDefLine = function(line) {
      this.unk_entries.push(line.split(","));
      return this;
    };
    DictionaryBuilder.prototype.build = function() {
      var dictionaries = this.buildTokenInfoDictionary();
      var unknown_dictionary = this.buildUnknownDictionary();
      return new DynamicDictionaries(dictionaries.trie, dictionaries.token_info_dictionary, this.cc_builder.build(), unknown_dictionary);
    };
    DictionaryBuilder.prototype.buildTokenInfoDictionary = function() {
      var token_info_dictionary = new TokenInfoDictionary();
      var dictionary_entries = token_info_dictionary.buildDictionary(this.tid_entries);
      var trie = this.buildDoubleArray();
      for (var token_info_id in dictionary_entries) {
        var surface_form = dictionary_entries[token_info_id];
        var trie_id = trie.lookup(surface_form);
        token_info_dictionary.addMapping(trie_id, token_info_id);
      }
      return {
        trie,
        token_info_dictionary
      };
    };
    DictionaryBuilder.prototype.buildUnknownDictionary = function() {
      var unk_dictionary = new UnknownDictionary();
      var dictionary_entries = unk_dictionary.buildDictionary(this.unk_entries);
      var char_def = this.cd_builder.build();
      unk_dictionary.characterDefinition(char_def);
      for (var token_info_id in dictionary_entries) {
        var class_name = dictionary_entries[token_info_id];
        var class_id = char_def.invoke_definition_map.lookup(class_name);
        unk_dictionary.addMapping(class_id, token_info_id);
      }
      return unk_dictionary;
    };
    DictionaryBuilder.prototype.buildDoubleArray = function() {
      var trie_id = 0;
      var words = this.tid_entries.map(function(entry) {
        var surface_form = entry[0];
        return { k: surface_form, v: trie_id++ };
      });
      var builder = doublearray.builder(1024 * 1024);
      return builder.build(words);
    };
    module2.exports = DictionaryBuilder;
  }
});

// node_modules/kuromoji/src/kuromoji.js
var require_kuromoji = __commonJS({
  "node_modules/kuromoji/src/kuromoji.js"(exports2, module2) {
    "use strict";
    var TokenizerBuilder = require_TokenizerBuilder();
    var DictionaryBuilder = require_DictionaryBuilder();
    var kuromoji = {
      builder: function(option) {
        return new TokenizerBuilder(option);
      },
      dictionaryBuilder: function() {
        return new DictionaryBuilder();
      }
    };
    module2.exports = kuromoji;
  }
});

// node_modules/kuroshiro-analyzer-kuromoji/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/kuroshiro-analyzer-kuromoji/lib/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _kuromoji = require_kuromoji();
    var _kuromoji2 = _interopRequireDefault(_kuromoji);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var isNode = false;
    var isBrowser = typeof window !== "undefined";
    if (!isBrowser && typeof module2 !== "undefined" && module2.exports) {
      isNode = true;
    }
    var Analyzer = function() {
      function Analyzer2() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, dictPath = _ref.dictPath;
        _classCallCheck(this, Analyzer2);
        this._analyzer = null;
        if (!dictPath) {
          if (isNode) this._dictPath = require.resolve("kuromoji").replace(/src(?!.*src).*/, "dict/");
          else this._dictPath = "node_modules/kuromoji/dict/";
        } else {
          this._dictPath = dictPath;
        }
      }
      _createClass(Analyzer2, [{
        key: "init",
        value: function init() {
          var _this = this;
          return new Promise(function(resolve, reject) {
            var self2 = _this;
            if (_this._analyzer == null) {
              _kuromoji2.default.builder({ dicPath: _this._dictPath }).build(function(err, newAnalyzer) {
                if (err) {
                  return reject(err);
                }
                self2._analyzer = newAnalyzer;
                resolve();
              });
            } else {
              reject(new Error("This analyzer has already been initialized."));
            }
          });
        }
        /**
         * Parse the given string
         * @param {string} str input string
         * @returns {Promise} Promise object represents the result of parsing
         * @example The result of parsing
         * [{
         *     "surface_form": "黒白",    // 表層形
         *     "pos": "名詞",               // 品詞 (part of speech)
         *     "pos_detail_1": "一般",      // 品詞細分類1
         *     "pos_detail_2": "*",        // 品詞細分類2
         *     "pos_detail_3": "*",        // 品詞細分類3
         *     "conjugated_type": "*",     // 活用型
         *     "conjugated_form": "*",     // 活用形
         *     "basic_form": "黒白",      // 基本形
         *     "reading": "クロシロ",       // 読み
         *     "pronunciation": "クロシロ",  // 発音
         *     "verbose": {                 // Other properties
         *         "word_id": 413560,
         *         "word_type": "KNOWN",
         *         "word_position": 1
         *     }
         * }]
         */
      }, {
        key: "parse",
        value: function parse() {
          var _this2 = this;
          var str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          return new Promise(function(resolve, reject) {
            if (str.trim() === "") return resolve([]);
            var result = _this2._analyzer.tokenize(str);
            for (var i = 0; i < result.length; i++) {
              result[i].verbose = {};
              result[i].verbose.word_id = result[i].word_id;
              result[i].verbose.word_type = result[i].word_type;
              result[i].verbose.word_position = result[i].word_position;
              delete result[i].word_id;
              delete result[i].word_type;
              delete result[i].word_position;
            }
            resolve(result);
          });
        }
      }]);
      return Analyzer2;
    }();
    exports2.default = Analyzer;
    module2.exports = exports2["default"];
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => JapaneseAnkiPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");
var import_node_fs2 = __toESM(require("node:fs"));
var import_promises2 = require("node:fs/promises");
var import_node_path3 = __toESM(require("node:path"));

// src/ankiconnect.ts
var import_obsidian = require("obsidian");
function normalizeEndpoint(baseUrl) {
  return baseUrl.trim().replace(/\/+$/, "");
}
async function invokeAnkiConnect(baseUrl, action, params) {
  const response = await (0, import_obsidian.requestUrl)({
    url: normalizeEndpoint(baseUrl),
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify({
      action,
      version: 5,
      params
    })
  });
  const data = response.json;
  if (data.error) {
    throw new Error(data.error);
  }
  return data.result;
}
async function getAnkiConnectVersion(baseUrl) {
  return invokeAnkiConnect(baseUrl, "version");
}
async function getAnkiDeckNames(baseUrl) {
  return invokeAnkiConnect(baseUrl, "deckNames");
}
async function canAddAnkiNote(baseUrl, note) {
  const result = await invokeAnkiConnect(baseUrl, "canAddNotes", {
    notes: [note]
  });
  return Boolean(result[0]);
}
async function storeAnkiMediaFile(baseUrl, fileName, data) {
  return invokeAnkiConnect(baseUrl, "storeMediaFile", {
    filename: fileName,
    data
  });
}
async function addAnkiNote(baseUrl, note) {
  return invokeAnkiConnect(baseUrl, "addNote", { note });
}

// src/anki-sync-service.ts
function trimAnkiConnectUrl(baseUrl) {
  return baseUrl.trim();
}
function buildAnkiSyncPayload(record, deckNameOverride, fallbackDeckName) {
  var _a, _b;
  const deckName = (_b = (_a = deckNameOverride != null ? deckNameOverride : record.export.deckName) != null ? _a : fallbackDeckName) != null ? _b : null;
  if (!deckName) {
    throw new Error(
      "No deck name is set in the bundle and no deck override or last used deck was available."
    );
  }
  return {
    deckName,
    noteType: record.export.noteType,
    fields: {
      Front: record.export.fields.Front,
      Back: record.export.fields.Back
    },
    tags: record.export.tags,
    audioFileName: record.audio.fileName
  };
}
var AnkiSyncService = class _AnkiSyncService {
  constructor(baseUrl, deckNames) {
    this.baseUrl = baseUrl;
    this.deckNames = deckNames;
  }
  static async connect(baseUrl) {
    const trimmedUrl = trimAnkiConnectUrl(baseUrl);
    if (!trimmedUrl) {
      throw new Error("Set an AnkiConnect URL in plugin settings before syncing.");
    }
    await getAnkiConnectVersion(trimmedUrl);
    const deckNames = new Set(await getAnkiDeckNames(trimmedUrl));
    return new _AnkiSyncService(trimmedUrl, deckNames);
  }
  async sync(payload, audioBytes = null) {
    if (!this.deckNames.has(payload.deckName)) {
      throw new Error(`Deck "${payload.deckName}" was not found in Anki.`);
    }
    const note = {
      deckName: payload.deckName,
      modelName: payload.noteType,
      fields: payload.fields,
      tags: payload.tags
    };
    const canAdd = await canAddAnkiNote(this.baseUrl, note);
    if (!canAdd) {
      throw new Error(
        "Anki rejected this note. It may already exist, or the selected note type may not match the fields."
      );
    }
    if (payload.audioFileName && audioBytes) {
      await storeAnkiMediaFile(
        this.baseUrl,
        payload.audioFileName,
        audioBytes.toString("base64")
      );
    }
    return addAnkiNote(this.baseUrl, note);
  }
};

// src/audio.ts
var import_obsidian2 = require("obsidian");
function extensionFromFormat(outputFormat) {
  const [codec] = outputFormat.split("_");
  switch (codec) {
    case "mp3":
      return "mp3";
    case "wav":
      return "wav";
    case "opus":
      return "opus";
    case "pcm":
      return "pcm";
    case "ulaw":
      return "ulaw";
    case "alaw":
      return "alaw";
    default:
      return "bin";
  }
}
async function synthesizeJapaneseAudio(settings, japaneseText) {
  const voiceId = settings.elevenLabsVoiceId.trim();
  if (!voiceId) {
    throw new Error("Set an ElevenLabs voice ID in plugin settings.");
  }
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(settings.elevenLabsOutputFormat)}`;
  const response = await (0, import_obsidian2.requestUrl)({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": settings.elevenLabsApiKey
    },
    body: JSON.stringify({
      text: japaneseText,
      model_id: settings.elevenLabsModelId,
      language_code: "ja",
      apply_language_text_normalization: true,
      voice_settings: {
        speed: settings.elevenLabsVoiceSettings.speed,
        stability: settings.elevenLabsVoiceSettings.stability,
        similarity_boost: settings.elevenLabsVoiceSettings.similarityBoost,
        style: settings.elevenLabsVoiceSettings.style,
        use_speaker_boost: settings.elevenLabsVoiceSettings.useSpeakerBoost
      }
    }),
    throw: false
  });
  if (response.status >= 400) {
    throw new Error(response.text || "ElevenLabs request failed.");
  }
  return {
    bytes: Buffer.from(response.arrayBuffer),
    extension: extensionFromFormat(settings.elevenLabsOutputFormat),
    provider: "elevenlabs",
    voiceId,
    modelId: settings.elevenLabsModelId,
    outputFormat: settings.elevenLabsOutputFormat
  };
}

// src/export-bundles-modal.ts
var import_obsidian4 = require("obsidian");

// src/directory-picker.ts
var import_obsidian3 = require("obsidian");
async function pickDirectory(currentDirectory) {
  var _a, _b;
  if (!import_obsidian3.Platform.isDesktopApp) {
    new import_obsidian3.Notice("Directory picking is only available in the desktop app.");
    return null;
  }
  const electron = (_a = window.require) == null ? void 0 : _a.call(window, "electron");
  const dialog = (_b = electron == null ? void 0 : electron.remote) == null ? void 0 : _b.dialog;
  if (!dialog) {
    new import_obsidian3.Notice("Unable to open the desktop directory picker.");
    return null;
  }
  const result = await dialog.showOpenDialog({
    defaultPath: currentDirectory || void 0,
    properties: ["openDirectory", "createDirectory"]
  });
  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }
  return result.filePaths[0];
}

// src/ui-constants.ts
var DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER = "/Users/matthewbridges/Documents/indigo/japanese/anki/bundles";
var DEFAULT_ANKI_DECK_PLACEHOLDER = "Japanese Flash Cards";

// src/export-bundles-modal.ts
var ExportBundlesModal = class extends import_obsidian4.Modal {
  constructor(app, settings, onSubmit) {
    super(app);
    this.deckNameOverride = "";
    this.directoryText = null;
    this.settings = settings;
    this.onSubmitCallback = onSubmit;
    this.directory = settings.lastOutputDirectory;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Export Bundles to Anki" });
    new import_obsidian4.Setting(contentEl).setName("Bundle directory").setDesc("Every .bundle.json file in this folder will be exported to Anki.").addText((text) => {
      this.directoryText = text;
      return text.setPlaceholder(DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER).setValue(this.directory).onChange((value) => {
        this.directory = value.trim();
      });
    }).addButton(
      (button) => button.setButtonText("Browse").onClick(() => {
        void this.browseForDirectory();
      })
    );
    new import_obsidian4.Setting(contentEl).setName("Deck override (optional)").setDesc(
      "If set, every exported bundle will use this deck. If left blank, the exporter uses the bundle deck hint or your last used deck."
    ).addText(
      (text) => text.setPlaceholder(
        this.settings.lastDeckName || DEFAULT_ANKI_DECK_PLACEHOLDER
      ).setValue(this.deckNameOverride).onChange((value) => {
        this.deckNameOverride = value.trim();
      })
    );
    new import_obsidian4.Setting(contentEl).addButton(
      (button) => button.setButtonText("Export Bundles").setCta().onClick(() => {
        const directory = this.directory.trim();
        if (!directory) {
          new import_obsidian4.Notice("Please choose a bundle directory.");
          return;
        }
        this.close();
        this.onSubmitCallback({
          directory,
          deckNameOverride: this.deckNameOverride.trim() || null
        });
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
  async browseForDirectory() {
    var _a;
    try {
      const selectedDirectory = await pickDirectory(this.directory);
      if (!selectedDirectory) {
        return;
      }
      this.directory = selectedDirectory;
      (_a = this.directoryText) == null ? void 0 : _a.setValue(selectedDirectory);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error while opening the directory picker.";
      new import_obsidian4.Notice(`Failed to open directory picker: ${message}`, 1e4);
    }
  }
};

// src/exporter.ts
var import_promises = require("node:fs/promises");
var import_node_path = __toESM(require("node:path"));
function escapeYamlString(value) {
  return JSON.stringify(value);
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function slugify(input) {
  const slug = input.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  if (slug) {
    return slug;
  }
  const date = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
  return `card-${date}`;
}
function buildFrontField(japanese, romaji, audioFileName) {
  const parts = [
    `<pre style="text-align: center;">${escapeHtml(japanese)}</pre>`,
    `<pre style="text-align: center;">${escapeHtml(romaji)}</pre>`
  ];
  if (audioFileName) {
    parts.push(
      `<div style="text-align: center;">[sound:${escapeHtml(audioFileName)}]</div>`
    );
  }
  return parts.join("");
}
function buildBackField(english) {
  return escapeHtml(english);
}
function buildMarkdown(record, audioEmbedPath) {
  var _a, _b, _c;
  const tagsSection = record.export.tags.length > 0 ? ["tags:", ...record.export.tags.map((tag) => `  - ${tag}`)].join("\n") : "tags: []";
  const audioSection = audioEmbedPath ? `## Audio

![[${audioEmbedPath}]]
` : "## Audio\n\nAudio generation was disabled for this bundle.\n";
  return [
    "---",
    `type: ${escapeYamlString("japanese-anki-bundle")}`,
    `created_at: ${escapeYamlString(record.createdAt)}`,
    `deck_name: ${escapeYamlString((_a = record.export.deckName) != null ? _a : "")}`,
    tagsSection,
    `english: ${escapeYamlString(record.source.english)}`,
    `japanese: ${escapeYamlString(record.japanese.text)}`,
    `hiragana: ${escapeYamlString(record.japanese.hiragana)}`,
    `katakana: ${escapeYamlString(record.japanese.katakana)}`,
    `romaji: ${escapeYamlString(record.japanese.romaji)}`,
    `audio_path: ${escapeYamlString((_b = record.audio.relativePath) != null ? _b : "")}`,
    "---",
    "",
    "# Japanese Anki Bundle",
    "",
    "## Source",
    "",
    `- English: ${record.source.english}`,
    `- Japanese: ${record.japanese.text}`,
    `- Hiragana: ${record.japanese.hiragana}`,
    `- Katakana: ${record.japanese.katakana}`,
    `- Romaji: ${record.japanese.romaji}`,
    `- Deck hint: ${(_c = record.export.deckName) != null ? _c : "Not set"}`,
    "",
    audioSection,
    "## Export Fields",
    "",
    "```json",
    JSON.stringify(record.export, null, 2),
    "```",
    ""
  ].join("\n");
}
async function writeBundleFiles(params) {
  var _a, _b, _c, _d, _e;
  const { input, translation, readings, audio } = params;
  const outputDirectory = import_node_path.default.resolve(input.outputDirectory);
  const mediaDirectory = import_node_path.default.join(outputDirectory, "media");
  const baseName = slugify(input.noteSlug || input.englishPhrase);
  const notePath = import_node_path.default.join(outputDirectory, `${baseName}.md`);
  const jsonPath = import_node_path.default.join(outputDirectory, `${baseName}.bundle.json`);
  const audioFileName = audio ? `${baseName}-ja.${audio.extension}` : null;
  const audioPath = audioFileName ? import_node_path.default.join(mediaDirectory, audioFileName) : null;
  const audioRelativePath = audioFileName ? import_node_path.default.posix.join("media", audioFileName) : null;
  await (0, import_promises.mkdir)(outputDirectory, { recursive: true });
  if (audio) {
    await (0, import_promises.mkdir)(mediaDirectory, { recursive: true });
    await (0, import_promises.writeFile)(audioPath, audio.bytes);
  }
  const record = {
    schemaVersion: 1,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    source: {
      english: input.englishPhrase,
      detectedLanguage: translation.sourceLanguage
    },
    japanese: {
      text: translation.japanese,
      hiragana: readings.hiragana,
      katakana: readings.katakana,
      romaji: readings.romaji
    },
    audio: {
      enabled: Boolean(audio),
      fileName: audioFileName,
      relativePath: audioRelativePath,
      provider: (_a = audio == null ? void 0 : audio.provider) != null ? _a : null,
      voiceId: (_b = audio == null ? void 0 : audio.voiceId) != null ? _b : null,
      modelId: (_c = audio == null ? void 0 : audio.modelId) != null ? _c : null,
      outputFormat: (_d = audio == null ? void 0 : audio.outputFormat) != null ? _d : null
    },
    export: {
      deckName: input.deckName,
      tags: input.tags,
      noteType: "Basic (and reversed card)",
      fields: {
        Front: buildFrontField(
          translation.japanese,
          readings.romaji,
          audioFileName
        ),
        Back: buildBackField(input.englishPhrase),
        Japanese: translation.japanese,
        Hiragana: readings.hiragana,
        Romaji: readings.romaji,
        Audio: audioFileName ? `[sound:${audioFileName}]` : ""
      }
    },
    providers: {
      translation: translation.provider,
      audio: (_e = audio == null ? void 0 : audio.provider) != null ? _e : null
    }
  };
  await (0, import_promises.writeFile)(jsonPath, JSON.stringify(record, null, 2), "utf8");
  await (0, import_promises.writeFile)(
    notePath,
    buildMarkdown(record, audioRelativePath),
    "utf8"
  );
  return {
    notePath,
    jsonPath,
    audioPath,
    record
  };
}

// src/generate-bundle-modal.ts
var import_obsidian5 = require("obsidian");
var GenerateBundleModal = class extends import_obsidian5.Modal {
  constructor(app, settings, initialPhrase, onSubmit) {
    super(app);
    this.deckName = "";
    this.noteSlug = "";
    this.outputDirectoryText = null;
    this.settings = settings;
    this.initialPhrase = initialPhrase;
    this.onSubmitCallback = onSubmit;
    this.englishPhrase = initialPhrase;
    this.outputDirectory = settings.lastOutputDirectory;
    this.deckName = settings.lastDeckName;
    this.tagsText = settings.lastTags;
    this.generateAudio = settings.defaultGenerateAudio;
    this.syncToAnki = settings.defaultSyncToAnki;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Generate Japanese Anki Bundle" });
    new import_obsidian5.Setting(contentEl).setName("English phrase").setDesc("The source phrase to translate into Japanese.");
    const phraseInput = contentEl.createEl("textarea", {
      attr: {
        rows: "4",
        placeholder: "e.g. Where is the train station?"
      }
    });
    phraseInput.style.width = "100%";
    phraseInput.style.marginBottom = "1em";
    phraseInput.value = this.englishPhrase;
    phraseInput.addEventListener("input", () => {
      this.englishPhrase = phraseInput.value;
    });
    new import_obsidian5.Setting(contentEl).setName("Output directory").setDesc(
      "Required for each run. The bundle note, JSON sidecar, and media folder will be created here."
    ).addText(
      (text) => {
        this.outputDirectoryText = text;
        return text.setPlaceholder(DEFAULT_BUNDLE_DIRECTORY_PLACEHOLDER).setValue(this.outputDirectory).onChange((value) => {
          this.outputDirectory = value.trim();
        });
      }
    ).addButton(
      (button) => button.setButtonText("Browse").onClick(() => {
        void this.browseForOutputDirectory();
      })
    );
    new import_obsidian5.Setting(contentEl).setName("Deck name (optional)").setDesc("Required only if you want to sync this bundle directly to Anki.").addText((text) => {
      return text.setPlaceholder(DEFAULT_ANKI_DECK_PLACEHOLDER).setValue(this.deckName).onChange((value) => {
        this.deckName = value.trim();
      });
    });
    new import_obsidian5.Setting(contentEl).setName("Tags").setDesc("Comma-separated export tags.").addText(
      (text) => text.setPlaceholder("japanese,anki").setValue(this.tagsText).onChange((value) => {
        this.tagsText = value;
      })
    );
    new import_obsidian5.Setting(contentEl).setName("Note slug").setDesc("Optional filename override. Leave blank to derive from the English phrase.").addText(
      (text) => text.setPlaceholder("where-is-the-train-station").setValue(this.noteSlug).onChange((value) => {
        this.noteSlug = value.trim();
      })
    );
    new import_obsidian5.Setting(contentEl).setName("Generate audio").setDesc("Creates a spoken Japanese file in the media subfolder.").addToggle(
      (toggle) => toggle.setValue(this.generateAudio).onChange((value) => {
        this.generateAudio = value;
      })
    );
    new import_obsidian5.Setting(contentEl).setName("Sync to Anki").setDesc("Pushes the generated Front and Back fields into Anki via AnkiConnect.").addToggle(
      (toggle) => toggle.setValue(this.syncToAnki).onChange((value) => {
        this.syncToAnki = value;
      })
    );
    new import_obsidian5.Setting(contentEl).addButton(
      (button) => button.setButtonText("Generate Bundle").setCta().onClick(() => {
        const englishPhrase = this.englishPhrase.trim();
        const outputDirectory = this.outputDirectory.trim();
        const tags = this.tagsText.split(",").map((tag) => tag.trim()).filter(Boolean);
        if (!englishPhrase) {
          new import_obsidian5.Notice("Please enter an English phrase.");
          return;
        }
        if (!outputDirectory) {
          new import_obsidian5.Notice("Please enter an output directory.");
          return;
        }
        if (this.syncToAnki && !this.deckName.trim() && !this.settings.lastDeckName.trim()) {
          new import_obsidian5.Notice("Please enter an Anki deck name to sync this bundle.");
          return;
        }
        this.close();
        this.onSubmitCallback({
          englishPhrase,
          outputDirectory,
          deckName: this.deckName.trim() || null,
          tags,
          noteSlug: this.noteSlug.trim(),
          generateAudio: this.generateAudio,
          syncToAnki: this.syncToAnki
        });
      })
    );
    if (this.initialPhrase) {
      phraseInput.select();
    }
  }
  onClose() {
    this.contentEl.empty();
  }
  async browseForOutputDirectory() {
    var _a;
    try {
      const selectedDirectory = await pickDirectory(this.outputDirectory);
      if (!selectedDirectory) {
        return;
      }
      this.outputDirectory = selectedDirectory;
      (_a = this.outputDirectoryText) == null ? void 0 : _a.setValue(selectedDirectory);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error while opening the directory picker.";
      new import_obsidian5.Notice(`Failed to open directory picker: ${message}`, 1e4);
    }
  }
};

// src/reading.ts
var import_node_fs = __toESM(require("node:fs"));
var import_node_path2 = __toESM(require("node:path"));
var import_kuroshiro = __toESM(require_lib());
var import_kuroshiro_analyzer_kuromoji = __toESM(require_lib2());
var kuroshiroPromise = null;
var cachedInstallDir = null;
function resolveDictPath(pluginInstallDir) {
  const candidates = [
    pluginInstallDir ? import_node_path2.default.join(pluginInstallDir, "dict") : "",
    import_node_path2.default.join(__dirname, "dict"),
    import_node_path2.default.join(__dirname, "node_modules", "kuromoji", "dict")
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (import_node_fs.default.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `Kuromoji dictionary files are missing. Checked: ${candidates.join(", ")}`
  );
}
async function getKuroshiro() {
  if (!kuroshiroPromise) {
    const kuroshiro = new import_kuroshiro.default();
    const analyzer = new import_kuroshiro_analyzer_kuromoji.default({
      dictPath: resolveDictPath(cachedInstallDir != null ? cachedInstallDir : void 0)
    });
    kuroshiroPromise = kuroshiro.init(analyzer).then(() => kuroshiro);
  }
  return kuroshiroPromise;
}
async function buildReadings(japaneseText, romajiSystem, pluginInstallDir) {
  if (pluginInstallDir) {
    cachedInstallDir = pluginInstallDir;
  }
  const kuroshiro = await getKuroshiro();
  return {
    hiragana: await kuroshiro.convert(japaneseText, {
      to: "hiragana"
    }),
    katakana: await kuroshiro.convert(japaneseText, {
      to: "katakana"
    }),
    romaji: await kuroshiro.convert(japaneseText, {
      to: "romaji",
      mode: "spaced",
      romajiSystem
    })
  };
}

// src/settings.ts
var import_obsidian7 = require("obsidian");

// src/elevenlabs.ts
var import_obsidian6 = require("obsidian");
function buildVoicesUrl(nextPageToken) {
  const url = new URL("https://api.elevenlabs.io/v2/voices");
  url.searchParams.set("page_size", "100");
  url.searchParams.set("sort", "name");
  url.searchParams.set("sort_direction", "asc");
  url.searchParams.set("include_total_count", "false");
  if (nextPageToken) {
    url.searchParams.set("next_page_token", nextPageToken);
  }
  return url.toString();
}
async function fetchElevenLabsVoices(apiKey) {
  var _a, _b, _c, _d, _e, _f;
  const voices = [];
  let nextPageToken = null;
  do {
    const response = await (0, import_obsidian6.requestUrl)({
      url: buildVoicesUrl(nextPageToken),
      method: "GET",
      headers: {
        "xi-api-key": apiKey
      },
      throw: false
    });
    const payload = response.json;
    if (response.status >= 400) {
      const message = (_c = (_b = (_a = payload.detail) == null ? void 0 : _a.message) != null ? _b : response.text) != null ? _c : "Failed to fetch ElevenLabs voices.";
      throw new Error(message);
    }
    for (const voice of (_d = payload.voices) != null ? _d : []) {
      if (!voice.voice_id || !voice.name) {
        continue;
      }
      voices.push({
        voiceId: voice.voice_id,
        name: voice.name,
        category: (_e = voice.category) != null ? _e : null,
        description: (_f = voice.description) != null ? _f : null
      });
    }
    nextPageToken = payload.has_more && payload.next_page_token ? payload.next_page_token : null;
  } while (nextPageToken);
  return voices;
}
async function fetchElevenLabsVoiceSettings(apiKey, voiceId) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const response = await (0, import_obsidian6.requestUrl)({
    url: `https://api.elevenlabs.io/v1/voices/${encodeURIComponent(voiceId)}/settings`,
    method: "GET",
    headers: {
      "xi-api-key": apiKey
    },
    throw: false
  });
  const payload = response.json;
  if (response.status >= 400) {
    const message = (_c = (_b = (_a = payload.detail) == null ? void 0 : _a.message) != null ? _b : response.text) != null ? _c : "Failed to fetch ElevenLabs voice settings.";
    throw new Error(message);
  }
  return {
    speed: (_d = payload.speed) != null ? _d : 1,
    stability: (_e = payload.stability) != null ? _e : 0.5,
    similarityBoost: (_f = payload.similarity_boost) != null ? _f : 0.75,
    style: (_g = payload.style) != null ? _g : 0,
    useSpeakerBoost: (_h = payload.use_speaker_boost) != null ? _h : true
  };
}

// src/settings.ts
var ELEVENLABS_MODEL_OPTIONS = [
  {
    value: "eleven_multilingual_v2",
    label: "Eleven Multilingual v2"
  }
];
var ELEVENLABS_OUTPUT_FORMAT_OPTIONS = [
  {
    value: "mp3_44100_128",
    label: "MP3 44.1 kHz (128kbps)"
  }
];
var DEFAULT_ELEVENLABS_VOICE_SETTINGS = {
  speed: 0.7,
  stability: 1,
  similarityBoost: 0.6,
  style: 0.5,
  useSpeakerBoost: true
};
var DEFAULT_SETTINGS = {
  deepLApiKey: "",
  ankiConnectUrl: "http://127.0.0.1:8765",
  defaultSyncToAnki: false,
  lastDeckName: "",
  elevenLabsApiKey: "",
  elevenLabsVoiceId: "",
  elevenLabsModelId: "eleven_multilingual_v2",
  elevenLabsOutputFormat: "mp3_44100_128",
  elevenLabsVoiceSettings: DEFAULT_ELEVENLABS_VOICE_SETTINGS,
  romajiSystem: "hepburn",
  defaultGenerateAudio: true,
  lastOutputDirectory: "",
  lastTags: "japanese,anki"
};
var JapaneseAnkiSettingTab = class extends import_obsidian7.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Translation" });
    new import_obsidian7.Setting(containerEl).setName("DeepL API key").setDesc("Used for English to Japanese translation through the DeepL API.").addText(
      (text) => text.setPlaceholder("DeepL auth key").setValue(this.plugin.settings.deepLApiKey).onChange(async (value) => {
        this.plugin.settings.deepLApiKey = value.trim();
        await this.plugin.saveSettings();
      })
    ).then((setting) => {
      const input = setting.controlEl.querySelector("input");
      if (input) input.type = "password";
    });
    new import_obsidian7.Setting(containerEl).setName("Romaji system").setDesc("The romanization system used when generating romaji.").addDropdown((dropdown) => {
      const options = [
        { value: "hepburn", label: "Hepburn" },
        { value: "passport", label: "Passport" },
        { value: "nippon", label: "Nippon" }
      ];
      for (const option of options) {
        dropdown.addOption(option.value, option.label);
      }
      dropdown.setValue(this.plugin.settings.romajiSystem);
      dropdown.onChange(async (value) => {
        this.plugin.settings.romajiSystem = value;
        await this.plugin.saveSettings();
      });
    });
    containerEl.createEl("h2", { text: "Anki" });
    new import_obsidian7.Setting(containerEl).setName("AnkiConnect URL").setDesc("Local AnkiConnect endpoint used when syncing cards directly to Anki.").addText(
      (text) => text.setPlaceholder("http://127.0.0.1:8765").setValue(this.plugin.settings.ankiConnectUrl).onChange(async (value) => {
        this.plugin.settings.ankiConnectUrl = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian7.Setting(containerEl).setName("Sync to Anki by default").setDesc("You can still override this per bundle in the generation modal.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.defaultSyncToAnki).onChange(async (value) => {
        this.plugin.settings.defaultSyncToAnki = value;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h2", { text: "Audio" });
    new import_obsidian7.Setting(containerEl).setName("ElevenLabs API key").setDesc("Used when audio generation is enabled in the modal.").addText(
      (text) => text.setPlaceholder("xi-api-key").setValue(this.plugin.settings.elevenLabsApiKey).onChange(async (value) => {
        this.plugin.settings.elevenLabsApiKey = value.trim();
        await this.plugin.saveSettings();
      })
    ).then((setting) => {
      const input = setting.controlEl.querySelector("input");
      if (input) input.type = "password";
    });
    let voiceDropdown = null;
    let voiceStatusEl = null;
    let refreshButtonEl = null;
    let speedSlider = null;
    let stabilitySlider = null;
    let similaritySlider = null;
    let styleSlider = null;
    let speakerBoostToggle = null;
    const formatVoiceLabel = (voice) => {
      if (!voice.category) {
        return voice.name;
      }
      return `${voice.name} (${voice.category})`;
    };
    const setVoiceStatus = (message) => {
      if (voiceStatusEl) {
        voiceStatusEl.setText(message);
      }
    };
    const saveVoiceSettings = async () => {
      await this.plugin.saveSettings();
    };
    const applyVoiceSettingsToUi = (voiceSettings) => {
      speedSlider == null ? void 0 : speedSlider.setValue(Math.round(voiceSettings.speed * 100));
      stabilitySlider == null ? void 0 : stabilitySlider.setValue(Math.round(voiceSettings.stability * 100));
      similaritySlider == null ? void 0 : similaritySlider.setValue(
        Math.round(voiceSettings.similarityBoost * 100)
      );
      styleSlider == null ? void 0 : styleSlider.setValue(Math.round(voiceSettings.style * 100));
      speakerBoostToggle == null ? void 0 : speakerBoostToggle.setValue(voiceSettings.useSpeakerBoost);
    };
    const setVoiceSettings = async (voiceSettings) => {
      this.plugin.settings.elevenLabsVoiceSettings = voiceSettings;
      applyVoiceSettingsToUi(voiceSettings);
      await saveVoiceSettings();
    };
    const loadSelectedVoiceSettings = async (voiceId, showSuccessNotice = false) => {
      const apiKey = this.plugin.settings.elevenLabsApiKey.trim();
      if (!apiKey || !voiceId) {
        return;
      }
      try {
        setVoiceStatus("Loading selected voice settings from ElevenLabs...");
        const voiceSettings = await fetchElevenLabsVoiceSettings(apiKey, voiceId);
        await setVoiceSettings(voiceSettings);
        setVoiceStatus("Loaded voice defaults from ElevenLabs.");
        if (showSuccessNotice) {
          new import_obsidian7.Notice("Loaded ElevenLabs voice defaults.");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error while loading voice settings.";
        setVoiceStatus(message);
        new import_obsidian7.Notice(`Failed to load ElevenLabs voice settings: ${message}`, 1e4);
      }
    };
    const populateVoiceDropdown = (voices, selectedVoiceId) => {
      if (!voiceDropdown) {
        return;
      }
      voiceDropdown.selectEl.innerHTML = "";
      voiceDropdown.addOption("", "Select a voice");
      for (const voice of voices) {
        voiceDropdown.addOption(voice.voiceId, formatVoiceLabel(voice));
      }
      const hasSelectedVoice = voices.some(
        (voice) => voice.voiceId === selectedVoiceId
      );
      if (!hasSelectedVoice && selectedVoiceId) {
        voiceDropdown.addOption(
          selectedVoiceId,
          `Saved voice (${selectedVoiceId.slice(0, 8)}...)`
        );
      }
      voiceDropdown.setValue(hasSelectedVoice ? selectedVoiceId : selectedVoiceId || "");
      voiceDropdown.setDisabled(false);
    };
    const loadVoices = async (showSuccessNotice = false) => {
      if (!voiceDropdown) {
        return;
      }
      const apiKey = this.plugin.settings.elevenLabsApiKey.trim();
      if (!apiKey) {
        voiceDropdown.selectEl.innerHTML = "";
        voiceDropdown.addOption("", "Add your ElevenLabs API key first");
        voiceDropdown.setValue("");
        voiceDropdown.setDisabled(true);
        setVoiceStatus("Voice list is unavailable until an ElevenLabs API key is set.");
        return;
      }
      voiceDropdown.selectEl.innerHTML = "";
      voiceDropdown.addOption("", "Loading voices...");
      voiceDropdown.setValue("");
      voiceDropdown.setDisabled(true);
      setVoiceStatus("Loading saved voices from ElevenLabs...");
      if (refreshButtonEl) {
        refreshButtonEl.disabled = true;
      }
      try {
        const voices = await fetchElevenLabsVoices(apiKey);
        populateVoiceDropdown(voices, this.plugin.settings.elevenLabsVoiceId);
        if (voices.length === 0) {
          setVoiceStatus("No voices were returned for this ElevenLabs account.");
        } else {
          setVoiceStatus(`Loaded ${voices.length} ElevenLabs voices.`);
          if (showSuccessNotice) {
            new import_obsidian7.Notice(`Loaded ${voices.length} ElevenLabs voices.`);
          }
        }
      } catch (error) {
        voiceDropdown.selectEl.innerHTML = "";
        voiceDropdown.addOption("", "Failed to load voices");
        voiceDropdown.setValue("");
        voiceDropdown.setDisabled(true);
        const message = error instanceof Error ? error.message : "Unknown error while loading voices.";
        setVoiceStatus(message);
        new import_obsidian7.Notice(`Failed to load ElevenLabs voices: ${message}`, 1e4);
      } finally {
        if (refreshButtonEl) {
          refreshButtonEl.disabled = false;
        }
      }
    };
    new import_obsidian7.Setting(containerEl).setName("Voice").setDesc("Fetched from ElevenLabs using the saved API key.").addDropdown((dropdown) => {
      voiceDropdown = dropdown;
      dropdown.addOption("", "Loading...");
      dropdown.setDisabled(true);
      dropdown.onChange(async (value) => {
        this.plugin.settings.elevenLabsVoiceId = value.trim();
        await this.plugin.saveSettings();
        if (value.trim()) {
          void loadSelectedVoiceSettings(value.trim());
        }
      });
    }).addButton((button) => {
      button.setButtonText("Refresh").onClick(() => {
        void loadVoices(true);
      });
      refreshButtonEl = button.buttonEl;
    }).then((setting) => {
      voiceStatusEl = setting.descEl.createDiv({
        text: "Voice list will load from ElevenLabs."
      });
    });
    void loadVoices();
    new import_obsidian7.Setting(containerEl).setName("Model ID").setDesc("Single fixed model option for now.").addDropdown((dropdown) => {
      for (const option of ELEVENLABS_MODEL_OPTIONS) {
        dropdown.addOption(option.value, option.label);
      }
      dropdown.setValue(this.plugin.settings.elevenLabsModelId);
      dropdown.onChange(async (value) => {
        this.plugin.settings.elevenLabsModelId = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Audio format").setDesc("Single fixed output format option for now.").addDropdown((dropdown) => {
      for (const option of ELEVENLABS_OUTPUT_FORMAT_OPTIONS) {
        dropdown.addOption(option.value, option.label);
      }
      dropdown.setValue(this.plugin.settings.elevenLabsOutputFormat);
      dropdown.onChange(async (value) => {
        this.plugin.settings.elevenLabsOutputFormat = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Speed").setDesc("Defaults from the selected voice, but you can override it here.").addSlider((slider) => {
      speedSlider = slider;
      slider.setLimits(70, 120, 1).setValue(
        Math.round(this.plugin.settings.elevenLabsVoiceSettings.speed * 100)
      ).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.elevenLabsVoiceSettings.speed = value / 100;
        await saveVoiceSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Stability").setDesc("Higher values keep delivery more consistent.").addSlider((slider) => {
      stabilitySlider = slider;
      slider.setLimits(0, 100, 1).setValue(
        Math.round(
          this.plugin.settings.elevenLabsVoiceSettings.stability * 100
        )
      ).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.elevenLabsVoiceSettings.stability = value / 100;
        await saveVoiceSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Similarity").setDesc("This maps to similarity boost in the API.").addSlider((slider) => {
      similaritySlider = slider;
      slider.setLimits(0, 100, 1).setValue(
        Math.round(
          this.plugin.settings.elevenLabsVoiceSettings.similarityBoost * 100
        )
      ).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.elevenLabsVoiceSettings.similarityBoost = value / 100;
        await saveVoiceSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Style Exaggeration").setDesc("Defaults from the voice, but you can override it here.").addSlider((slider) => {
      styleSlider = slider;
      slider.setLimits(0, 100, 1).setValue(
        Math.round(this.plugin.settings.elevenLabsVoiceSettings.style * 100)
      ).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.elevenLabsVoiceSettings.style = value / 100;
        await saveVoiceSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Speaker Boost").setDesc("Uses ElevenLabs speaker boost for closer voice matching.").addToggle((toggle) => {
      speakerBoostToggle = toggle;
      toggle.setValue(
        this.plugin.settings.elevenLabsVoiceSettings.useSpeakerBoost
      ).onChange(async (value) => {
        this.plugin.settings.elevenLabsVoiceSettings.useSpeakerBoost = value;
        await saveVoiceSettings();
      });
    });
    new import_obsidian7.Setting(containerEl).setName("Generate audio by default").setDesc("You can still override this for each bundle in the modal.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.defaultGenerateAudio).onChange(async (value) => {
        this.plugin.settings.defaultGenerateAudio = value;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h2", { text: "Convenience Defaults" });
    new import_obsidian7.Setting(containerEl).setName("Last tags").setDesc("Comma-separated tags reused as modal defaults.").addText(
      (text) => text.setPlaceholder("japanese,anki").setValue(this.plugin.settings.lastTags).onChange(async (value) => {
        this.plugin.settings.lastTags = value.trim();
        await this.plugin.saveSettings();
      })
    );
  }
};

// src/translation.ts
var import_obsidian8 = require("obsidian");
function getDeepLEndpoint(apiKey) {
  return apiKey.trim().endsWith(":fx") ? "https://api-free.deepl.com/v2/translate" : "https://api.deepl.com/v2/translate";
}
async function translateEnglishToJapanese(apiKey, englishPhrase) {
  var _a, _b, _c, _d, _e, _f, _g;
  const response = await (0, import_obsidian8.requestUrl)({
    url: getDeepLEndpoint(apiKey),
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: [englishPhrase],
      source_lang: "EN",
      target_lang: "JA"
    }),
    throw: false
  });
  const payload = response.json;
  if (response.status >= 400) {
    const message = (_d = (_c = (_b = payload.message) != null ? _b : (_a = payload.detail) == null ? void 0 : _a.message) != null ? _c : response.text) != null ? _d : "Translation request failed with an unknown error.";
    throw new Error(message);
  }
  const translation = (_e = payload.translations) == null ? void 0 : _e[0];
  if (!(translation == null ? void 0 : translation.text)) {
    throw new Error("Translation response did not include translated text.");
  }
  return {
    sourceLanguage: (_f = translation.detected_source_language) != null ? _f : null,
    japanese: translation.text,
    provider: "deepl",
    model: (_g = translation.model_type_used) != null ? _g : null
  };
}

// src/main.ts
var JapaneseAnkiPlugin = class extends import_obsidian9.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "generate-japanese-anki-bundle",
      name: "Generate Japanese Anki bundle",
      callback: () => {
        const initialPhrase = this.getActiveSelection();
        new GenerateBundleModal(
          this.app,
          this.settings,
          initialPhrase,
          (input) => {
            void this.generateBundle(input);
          }
        ).open();
      }
    });
    this.addCommand({
      id: "export-japanese-anki-bundles-to-anki",
      name: "Export Japanese Anki bundles to Anki",
      callback: () => {
        new ExportBundlesModal(this.app, this.settings, (input) => {
          void this.exportBundlesToAnki(input);
        }).open();
      }
    });
    this.addSettingTab(new JapaneseAnkiSettingTab(this.app, this));
  }
  async loadSettings() {
    var _a;
    const persistedSettings = await this.loadData();
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...persistedSettings,
      elevenLabsVoiceSettings: {
        ...DEFAULT_SETTINGS.elevenLabsVoiceSettings,
        ...(_a = persistedSettings == null ? void 0 : persistedSettings.elevenLabsVoiceSettings) != null ? _a : {}
      }
    };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  getActiveSelection() {
    const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian9.MarkdownView);
    if (!markdownView) {
      return "";
    }
    const selection = markdownView.editor.getSelection().trim();
    if (selection) {
      return selection;
    }
    return markdownView.editor.getLine(markdownView.editor.getCursor().line).trim();
  }
  async generateBundle(input) {
    var _a, _b;
    const resolvedDeckName = ((_a = input.deckName) != null ? _a : this.settings.lastDeckName.trim()) || null;
    if (!this.settings.deepLApiKey) {
      new import_obsidian9.Notice("Japanese Anki Bundle: set your DeepL API key in settings.");
      return;
    }
    if (input.generateAudio && !this.settings.elevenLabsApiKey) {
      new import_obsidian9.Notice("Japanese Anki Bundle: set your ElevenLabs API key in settings.");
      return;
    }
    if (input.syncToAnki && !resolvedDeckName) {
      new import_obsidian9.Notice("Japanese Anki Bundle: enter a deck name before syncing to Anki.");
      return;
    }
    try {
      new import_obsidian9.Notice("Translating phrase to Japanese...");
      const translation = await translateEnglishToJapanese(
        this.settings.deepLApiKey,
        input.englishPhrase
      );
      new import_obsidian9.Notice("Generating hiragana, katakana, and romaji...");
      const readings = await buildReadings(
        translation.japanese,
        this.settings.romajiSystem,
        this.getPluginInstallDir()
      );
      let audio = null;
      if (input.generateAudio) {
        new import_obsidian9.Notice("Generating ElevenLabs audio...");
        audio = await synthesizeJapaneseAudio(
          this.settings,
          translation.japanese
        );
      }
      new import_obsidian9.Notice("Writing bundle files...");
      const paths = await writeBundleFiles({
        input,
        translation,
        readings,
        audio
      });
      let noteId = null;
      if (input.syncToAnki && resolvedDeckName) {
        new import_obsidian9.Notice("Syncing bundle to Anki...");
        const syncService = await AnkiSyncService.connect(
          this.settings.ankiConnectUrl
        );
        const syncPayload = buildAnkiSyncPayload(
          paths.record,
          resolvedDeckName
        );
        noteId = await syncService.sync(
          syncPayload,
          (_b = audio == null ? void 0 : audio.bytes) != null ? _b : null
        );
        this.settings.lastDeckName = syncPayload.deckName;
      }
      this.settings.lastOutputDirectory = input.outputDirectory;
      this.settings.lastTags = input.tags.join(",");
      await this.saveSettings();
      const summary = [paths.notePath, paths.jsonPath, paths.audioPath].filter(Boolean).join(" | ");
      const syncSummary = noteId ? ` | Anki note ${noteId}` : "";
      new import_obsidian9.Notice(`Japanese Anki bundle created: ${summary}${syncSummary}`, 1e4);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error while generating bundle.";
      new import_obsidian9.Notice(`Japanese Anki Bundle failed: ${message}`, 1e4);
      console.error("Japanese Anki Bundle error", error);
    }
  }
  getPluginInstallDir() {
    const adapter = this.app.vault.adapter;
    if (!(adapter instanceof import_obsidian9.FileSystemAdapter)) {
      return void 0;
    }
    const basePath = adapter.getBasePath();
    const candidates = [
      import_node_path3.default.resolve(basePath, this.app.vault.configDir, "plugins", this.manifest.id),
      this.manifest.dir ? import_node_path3.default.resolve(basePath, this.manifest.dir) : ""
    ].filter(Boolean);
    for (const candidate of candidates) {
      if (import_node_fs2.default.existsSync(candidate)) {
        return candidate;
      }
    }
    return candidates[0];
  }
  async exportBundlesToAnki(input) {
    try {
      new import_obsidian9.Notice("Loading bundle files...");
      const directory = import_node_path3.default.resolve(input.directory);
      const directoryEntries = await (0, import_promises2.readdir)(directory, { withFileTypes: true });
      const bundleFiles = directoryEntries.filter((entry) => entry.isFile() && entry.name.endsWith(".bundle.json")).map((entry) => import_node_path3.default.join(directory, entry.name)).sort((left, right) => left.localeCompare(right));
      if (bundleFiles.length === 0) {
        throw new Error(`No .bundle.json files were found in ${directory}.`);
      }
      const syncService = await AnkiSyncService.connect(
        this.settings.ankiConnectUrl
      );
      let exportedCount = 0;
      const failures = [];
      let lastSyncedDeckName = null;
      for (const bundlePath of bundleFiles) {
        try {
          const bundleText = await (0, import_promises2.readFile)(bundlePath, "utf8");
          const record = JSON.parse(bundleText);
          const audioBytes = await this.readBundleAudio(bundlePath, record);
          const syncPayload = buildAnkiSyncPayload(
            record,
            input.deckNameOverride,
            this.settings.lastDeckName.trim() || null
          );
          await syncService.sync(
            syncPayload,
            audioBytes
          );
          lastSyncedDeckName = syncPayload.deckName;
          exportedCount += 1;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown export error.";
          failures.push(`${import_node_path3.default.basename(bundlePath)}: ${message}`);
        }
      }
      this.settings.lastOutputDirectory = directory;
      if (lastSyncedDeckName) {
        this.settings.lastDeckName = lastSyncedDeckName;
      }
      await this.saveSettings();
      if (failures.length === 0) {
        new import_obsidian9.Notice(`Exported ${exportedCount} bundle(s) to Anki.`, 1e4);
        return;
      }
      const failureSummary = failures.slice(0, 3).join(" | ");
      new import_obsidian9.Notice(
        `Exported ${exportedCount} bundle(s); ${failures.length} failed. ${failureSummary}`,
        15e3
      );
      console.error("Japanese Anki Bundle export failures", failures);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error while exporting bundles.";
      new import_obsidian9.Notice(`Japanese Anki Bundle export failed: ${message}`, 1e4);
      console.error("Japanese Anki Bundle export error", error);
    }
  }
  async readBundleAudio(bundlePath, record) {
    const relativePath = record.audio.relativePath;
    if (!relativePath || !record.audio.fileName) {
      return null;
    }
    const audioPath = import_node_path3.default.resolve(import_node_path3.default.dirname(bundlePath), relativePath);
    if (!import_node_fs2.default.existsSync(audioPath)) {
      throw new Error(`Audio file is missing: ${audioPath}`);
    }
    return (0, import_promises2.readFile)(audioPath);
  }
};
