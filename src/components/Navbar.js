function Navbar() {
  const logOutHandler = function () {
    localStorage.clear();
    window.location.href = 'login';
  };

  const loginHandler = function () {
    window.location.href = 'login';
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-between px-4">
        <h1 className="navbar-brand navbar-title" href="/">
          愛訊電網科技[前端軟體工程師]48HR實作測驗考題
        </h1>
        {localStorage.getItem('user')?.length ? (
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => {
              logOutHandler();
            }}
          >
            登出
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => {
              loginHandler();
            }}
          >
            登入
          </button>
        )}
      </nav>
    </>
  );
}

export default Navbar;
