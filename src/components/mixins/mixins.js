/**
 * 2019-11-26 xwy
 * 提取出的公用方法
 */

const mixins = {
  data() {
    return {}
  },
  methods: {
    /**
     * 深拷贝
     * @param obj 对象或数组
     * @returns {*} 拷贝后的对象
     */
    deepCopy: function (obj) {
      let result = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key])   //递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    }
  }
};
export {mixins}
