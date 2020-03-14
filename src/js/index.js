// 获取element
var userName = document.getElementById('TANGRAM__PSP_4__userName');
var userNameErr = document.getElementById('TANGRAM__PSP_4__userNameError');
var phone = document.getElementById('TANGRAM__PSP_4__phone');
var phoneErr = document.getElementById('TANGRAM__PSP_4__phoneError');
var password = document.getElementById('TANGRAM__PSP_4__password');
var passwordErr = document.getElementById('TANGRAM__PSP_4__passwordError');
var verifyCode = document.getElementById('TANGRAM__PSP_4__verifyCode');
var verifyCodeErr = document.getElementById('TANGRAM__PSP_4__verifyCodeError');
var verifyCodeSend = document.getElementById('TANGRAM__PSP_4__verifyCodeSend');
// var isAgree = document.getElementById('TANGRAM__PSP_4__isAgree');
var submit = document.getElementById('TANGRAM__PSP_4__submit');
var form = document.getElementById('TANGRAM__PSP_4__form');

// 错误处理函数
function addError (obj, objErr, errText) {
  obj.classList.add('pass-text-input-error');
  objErr.innerText = errText;
  objErr.style.display = 'block';
}
function removeError (obj, objErr) {
  obj.classList.remove('pass-text-input-error');
  objErr.style.display = 'none';
  objErr.innerText = '';
}

// 判断用户名
function checkUserName () {
  var value = userName.value;
  // 去空格
  var space_reg = /\s/g;
  var value = value.replace(space_reg, "");
  userName.value = value;
  // 为空不做处理
  if (value === '') {
    return 1;
  }
  // 长度
  var len = 0;
  for (var i = 0; i < value.length; i++) { 
    if ((value.charCodeAt(i) < 0) || (value.charCodeAt(i) > 255)) {
      len = len + 2;
    } else {
      len++;
    }
  }
  // console.log('value.length', value.length, '  len', len);
  if (len > 14) {
    addError(userName, userNameErr, '用户名不能超过7个汉字或14个字符');
    return -1;
  }
  // 数据类型
  var reg1 = /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/;
  var reg2 = /^[0-9]+$/;
  // console.log('1', reg1.test(value), '  2', reg2.test(value));
  if (!(reg1.test(value) === true && reg2.test(value) === false)) {
    addError(userName, userNameErr, '用户名仅支持中英文、数字和下划线,且不能为纯数字');
    return -2;
  }
  return 0;
}
// 判断手机号
function checkPhone () {
  var value = phone.value;
  // 为空不做处理
  if (value === '') {
    return 1;
  }
  // 判断格式
  var reg = /^[1][0-9]{10}$/;
  if (reg.test(value) === false) {
    addError(phone, phoneErr, '手机号码格式不正确');
    return -1;
  }
}
// 判断密码
function checkPassword () {
  var value = password.value;
  // 为空不做处理
  if (value === '') {
    return 1;
  }
  var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,14}$/;
  if (reg.test(value) === false) {
    addError(password, passwordErr, '密码设置不符合要求');
    return -1;
  }
}
// 判断验证码
function checkVerifyCode () {
  var value = verifyCode.value;
  // 去空格
  var space_reg = /\s/g;
  var value = value.replace(space_reg, "");
  verifyCode.value = value;
  // 为空不做处理
  if (value === '') {
    return 1;
  }
}
// 判判断接受协议
// function checkAgree () {

// }

// 表单级别验证
form.onsubmit = function () {
  event.preventDefault();
  if (checkUserName() === 1) {
    addError(userName, userNameErr, '用户名不能为空');
  }
  if (checkPhone() === 1) {
    addError(phone, phoneErr, '手机号不能为空');
  }
  if (checkPassword() === 1) {
    addError(password, passwordErr, '密码不能为空');
  }
  if (checkVerifyCode() === 1) {
    addError(verifyCode, verifyCodeErr, '验证码不能为空');
  }
}

// 绑定获取焦点事件
userName.onfocus = function () {
  removeError(userName, userNameErr);
}
phone.onfocus = function () {
  removeError(phone, phoneErr);
}
password.onfocus = function () {
  removeError(password, passwordErr);
}
verifyCode.onfocus = function () {
  removeError(verifyCode, verifyCodeErr);
}

// 绑定失去焦点动作
userName.onblur = function () {
  checkUserName()
}
phone.onblur = function () {
  checkPhone()
}
password.onblur = function () {
  checkPassword()
}
verifyCode.onblur = function () {
  checkVerifyCode()
}

// 获取验证码
verifyCodeSend.onclick = function () {
  verifyCodeSend.disabled = true;
  var s = 10;
  verifyCodeSend.value = '重发验证(' + s + '秒)';
  var timer = setInterval(function () {
    s--;
    verifyCodeSend.value = '重发验证(' + s + '秒)';
    if (s < 0) {
      clearInterval(timer);
      verifyCodeSend.disabled = false;
      verifyCodeSend.value = '重发验证';
      addError(verifyCode, verifyCodeErr, '请求超时，请稍后再试');
    }
  }, 1000);
}
