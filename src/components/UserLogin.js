import { useState } from 'react';

function UserLogin() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const fd = new FormData(document.formAll);

  const doLogin = async function (e) {
    e.preventDefault();
    const response = await fetch(
      'http://192.168.18.6:8000/user-login-api.php',
      {
        method: 'POST',
        body: fd,
      }
    );
    const obj = await response.json();
    console.log('obj', obj);
    if (obj.success) {
      localStorage.setItem('user', obj.account);
      window.location.href = 'list';
    } else {
      window.alert(obj.error);
    }
    console.log(obj);
  };

  return (
    <>
      <div className="logIn-wrap container col-3 mt-5 p-5 border border-dark">
        <form name="formAll" onSubmit={e => doLogin(e)}>
          <h2 className="text-center">Login</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Account</label>
            <input
              name="account"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={account}
              onChange={e => {
                setAccount(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="button-wrap d-flex justify-content-center">
            <button type="submit" className="btn btn-dark text-center w-50">
              登入
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
