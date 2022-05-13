import { useEffect, useState } from 'react';
import './style.css';

function List() {
  // 沒有登入成功的話，跳轉至登入頁
  if (!localStorage.getItem('user')) {
    window.location.href = '/login';
  }

  const [listData, setListData] = useState(''); //全部資料
  const [totalPage, setTotalPage] = useState([]); //全部頁面
  const [showPages, setShowPages] = useState([1, 2, 3, 4, 5]); //分頁頁數
  const [search, setSearch] = useState(''); //搜尋關鍵字

  useEffect(() => {
    (async function () {
      const response = await fetch('http://192.168.18.6:8000/list-api.php');
      const obj = await response.json();
      setListData(obj.data);
      const newTotalPage = totalPage;

      for (let i = 1; i <= obj.totalPage; i++) {
        newTotalPage.push(i);
      }
      setTotalPage(newTotalPage);
    })();
  }, []);

  const pageHandler = async function (e) {
    const pageClicked = parseInt(e.target.innerHTML);
    let showPages = [];

    // 總頁數小於5
    if (totalPage.length <= 5) {
      for (let i = 1; i <= totalPage.length; i++) {
        showPages.push(i);
      }
      //總頁數大於5
    } else {
      //點選的頁數小於3時
      if (pageClicked <= 3) {
        showPages = [1, 2, 3, 4, 5];
        //點選的頁數為最後1-3頁時
      } else if (pageClicked >= totalPage.length - 3) {
        showPages = [
          totalPage.length - 4,
          totalPage.length - 3,
          totalPage.length - 2,
          totalPage.length - 1,
          totalPage.length,
        ];
      } else {
        showPages = [
          pageClicked - 2,
          pageClicked - 1,
          pageClicked,
          pageClicked + 1,
          pageClicked + 2,
        ];
      }
    }

    setShowPages(showPages);

    //有搜尋關鍵字時
    if (search) {
      const response = await fetch(
        'http://192.168.18.6:8000/list-search-api.php',
        {
          method: 'POST',
          body: JSON.stringify({
            clickedPage: parseInt(e.target.innerHTML),
            word: search,
          }),
        }
      );
      const obj = await response.json();
      setListData(obj.search);
    //沒有搜尋關鍵字時
    } else {
      const response = await fetch('http://192.168.18.6:8000/list-api.php', {
        method: 'POST',
        body: JSON.stringify({ clickedPage: parseInt(e.target.innerHTML) }),
      });
      const obj = await response.json();
      setListData(obj.data);
    }
  };

  const searchHandler = async function (e) {
    setSearch(e.target.previousSibling.value);

    const response = await fetch(
      'http://192.168.18.6:8000/list-search-api.php',
      {
        method: 'POST',
        body: JSON.stringify({ word: e.target.previousSibling.value }),
      }
    );
    const obj = await response.json();

    const newTotalPage = [];

    for (let i = 1; i <= obj.totalPage; i++) {
      newTotalPage.push(i);
    }
    setTotalPage(newTotalPage);
    setListData(obj.search);

    const newTotalPage2 = [...newTotalPage];
    if (newTotalPage2.length > 5) {
      newTotalPage2.splice(5);
    }

    setShowPages(newTotalPage2);
  };

  return (
    <>
      {/* 分頁 */}
      <div className="container-fulid m-5">
        <div className="page-control-area d-flex justify-content-between">
          <div aria-label="Page navigation border-secondary text-secondary">
            <ul class="pagination">
              {showPages &&
                showPages.map((v, i) => {
                  return (
                    <li
                      class="page-item"
                      data-index={i}
                      onClick={e => pageHandler(e)}
                    >
                      <a class="page-link  text-secondary" href="#">
                        {v}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* 搜尋按鈕 */}
          <div className="search-area d-flex align-items-center">
            <input
              className="py-1 mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="search-btn btn btn-outline-warning my-2 my-sm-0 "
              type="button"
              onClick={e => {
                searchHandler(e);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <table class="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col text-nowrap">No</th>
              <th scope="col">Time</th>
              <th scope="col">Source IP</th>
              <th scope="col">Source Port</th>
              <th scope="col text-nowrap">Destination IP</th>
              <th scope="col text-nowrap">Destination Port</th>
              <th scope="col">DNS Query Name</th>
            </tr>
          </thead>
          <tbody>
            {listData &&
              listData.map((list, item) => {
                return (
                  <tr>
                    <td>{list.sid}</td>
                    <td>{list.time_epoch}</td>
                    <td>{list.ip_src}</td>
                    <td>{list.udp_srcport}</td>
                    <td>{list.ip_dst}</td>
                    <td>{list.udp_dstport}</td>
                    <td>{list.dns_qry_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default List;
