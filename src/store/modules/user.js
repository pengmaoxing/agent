import {login, getAliasInfo} from '@/modules/login/api/login'
import globalAlias from '@/components/global/hierarchyName/hierarchyName.js'

const user = {
  state: {
    isReload: true
  },
  mutations: {
    setReload: (state) => {
      state.isReload = false
    }
  },
  actions: {
    /*
     * 登录
     * */
    login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          sessionStorage.username = userInfo.username;
          sessionStorage.agentLevel = response.obj.agentLevel;
          sessionStorage.agentLevelName = response.obj.agentLevelName;
          sessionStorage.token = response.obj.token;
          sessionStorage.companyId = response.obj.companyId;
          sessionStorage.userId = response.obj.userId;
          sessionStorage.userType = response.obj.userType;
          sessionStorage.name = response.obj.name;

          //resolve
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },



    /**
     * 前端获取别名
     */
    getAliasInfo({commit}) {
      //获取别名
      return new Promise((resolve, reject)=>{
        getAliasInfo().then(res => {
          let data = res.obj;
          if (data) {
            sessionStorage.levelFour = data.levelFour; //推广
            sessionStorage.levelThree = data.levelThree; //渠道
            sessionStorage.levelTwo = data.levelTwo; //运营
            sessionStorage.levelOne = data.levelOne; //服务
            //修改全局变量，钩子在全局JS(hierarchyName.js)之后，可覆盖缓存中的value。
            //如果获取失败，则使用默认名替代。
            globalAlias.topName = data.levelOne || '服务';
            globalAlias.agentName = data.levelTwo || '运营';
            globalAlias.disName = data.levelThree || '渠道';
            globalAlias.subName = data.levelFour || '推广';
            console.log(`alias is online：${data.levelOne},${data.levelTwo},${data.levelThree},${data.levelFour}`)
          }
          resolve()
        }).catch(error => {
          reject(error)
        });
      })
    },

    /*
     * 前端登出
     * */
    logout({commit}) {
      return new Promise((resolve) => {
        sessionStorage.clear();
        resolve()
      })
    },
    /*
    * 首次加载路由Flag
    * */
    setReload({commit}) {
      commit('setReload')
    }
  }
};

export default user
