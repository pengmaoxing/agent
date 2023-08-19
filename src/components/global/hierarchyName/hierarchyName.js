//如果缓存中已经有别名则获取
//如果缓存中没有别名使用默认名
//在线获取别名钩子在此之后，如果有新名字，则会覆盖变量。
var topName = sessionStorage.getItem('levelOne') || '服务商';
var agentName = sessionStorage.getItem('levelTwo') || '运营商';
var disName = sessionStorage.getItem('levelThree') || '渠道商';
var subName = sessionStorage.getItem('levelFour') || '推广商';


let tips = `${topName}、${agentName}、${disName}、${subName}`;

console.log('alias is session values or default values');

console.log(tips);
export default {
  topName,
  agentName,
  disName,
  subName
}
