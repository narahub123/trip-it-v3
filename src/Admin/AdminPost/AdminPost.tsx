import { useEffect, useState } from "react";
import "./adminPost.css";

import MypageSizeController from "Mypage/components/MypageSizeController";

import MypagePagination from "Mypage/components/MypagePagination";
import AdminSort from "Admin/components/AdminSort";
import AdminSearch from "Admin/components/AdminSearch";
import MypageScheduleCard from "Mypage/MypageSchedule/components/MypageScheduleCard";
import { fetchPostsAAPI } from "apis/post";
import { adminPostSnSArray } from "Admin/data/admin";
import MypagePostCard from "Mypage/MypagePost/components/MypagePostCard";

const AdminPost = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selections, setSelections] = useState<(number | string)[]>([]);
  const [sort, setSort] = useState<string[]>(["postDate", "desc"]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "postTitle",
  });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수

  useEffect(() => {
    console.log(sort[0], sort[1], page, size, field.name, search);

    fetchPostsAAPI(sort[0], sort[1], page, size, field.name, search)
      .then((res) => {
        setItems(res.data.content);
        setTotal(res.data.totalElements);
      })
      .catch();
  }, [sort, page, size, field.name, search]);

  return (
    <>
      <div className="admin-post-modal"></div>
      <div className="admin-post">
        <div className="admin-post-container">
          <section className="admin-post-panels">
            <span className="admin-post-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="admin-post-panels-right">
              <AdminSort
                sort={sort}
                setSort={setSort}
                sortNSearchArray={adminPostSnSArray}
              />
            </span>
          </section>
          {items.length === 0 && (
            <li className="admin-post-grid-empty">검색 결과가 없습니다.</li>
          )}
          <section className="admin-post-grid">
            {items?.map((item) => (
              <MypagePostCard key={item.scheduleId} post={item} />
            ))}
          </section>
          <section className="admin-post-search">
            <AdminSearch
              sortNSearchArray={adminPostSnSArray}
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              field={field}
              setField={setField}
            />
          </section>
          {items.length !== 0 && (
            <section className="admin-post-pagination">
              <MypagePagination
                page={page}
                setPage={setPage}
                numPages={numPages}
              />
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPost;
