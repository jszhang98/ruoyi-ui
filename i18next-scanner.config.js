const fs = require("fs"); // node自带 fs文件转换
const { crc32 } = require("crc"); // 事先下载 npm install crc 类似哈希的转换格式
module.exports = {
  input: [
    "src/**/*.{js,vue}", // Use ! to filter out files or directories
    "!src/config/i18n/**",
    "!**/node_modules/**",
  ],
  output: "./", // 输出目录
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ["en", "cn", "dn"],
    defaultLng: "cn",
    resource: {
      loadPath: "./src/config/i18n/{{lng}}/{{ns}}.json", // 输入路径
      savePath: "./src/config/i18n/{{lng}}/{{ns}}.json", // 输出路径
      jsonIndent: 2,
      lineEnding: "\n",
    },
    removeUnusedKeys: false, // 移除未使用的key
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: function customTransform(file, enc, done) {
    // 自己通过该函数来加工key或value
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    /**
     * @param {list} array 指定扫描的标识
     */
    parser.parseFuncFromString(content, { list: ["lang"] }, (key, options) => {
      options.defaultValue = key;
      // 将传入的文字转成配置的 key，不一定非用 crc，别的也行，如果内容不会影响 json 格式，不用也行
      let hashKey = `k${crc32(key).toString(16)}`;
      parser.set(hashKey, options);
    });

    done();
  },
};
