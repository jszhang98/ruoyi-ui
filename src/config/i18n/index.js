import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en/translation.json";
import cn from "./cn/translation.json";
//import crc32 from "crc/crc32";

/* 语言包导入*/

Vue.use(VueI18n);
const { crc32 } = require("crc");
const i18n = new VueI18n({
  locale: "en", // set locale 默认情况下是中文，使用cn文件下的语言
  messages: { en, cn },
});

export function lang(key) {
  //console.log(key);
  let hashKey = `k${crc32(key).toString(16)}`;

  let words = i18n.t(hashKey);
  console.log(hashKey, words);
  if (words === hashKey) {
    words = key;
    console.log(key, "-没翻译");
  }
  return words;
}
export default i18n;
