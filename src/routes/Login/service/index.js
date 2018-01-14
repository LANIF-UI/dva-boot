// 模拟
export async function login(params) {
  return new Promise((resolve) => {
    setTimeout(_ => {
      if (params.password === 'admin')
        resolve({status: true, message: '登录成功', data: {name: '管理员'}})
      else 
        resolve({status: false, message: '密码不正确，密码为admin'})
      }, 1000);
  });
}