import { useEffect, useState } from "react";
import "./adminUsers.css";
import { fetchUsersAPI } from "apis/users";
import { UserType } from "types/users";
import AdminUsersCard from "./components/AdminUsersCard";
import MypageSizeController from "Mypage/components/MypageSizeController";
import { usersSnSArray } from "Admin/data/admin";
import MypagePagination from "Mypage/components/MypagePagination";
import AdminSort from "Admin/components/AdminSort";
import AdminSearch from "Admin/components/AdminSearch";
import { LuLoader2 } from "react-icons/lu";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [sort, setSort] = useState<string[]>(["regdate", "desc"]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "regdate",
  });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsersAPI(sort[0], sort[1], page, size, field.name, search)
      .then((res) => {
        setUsers(res.data.content);
        setTotal(res.data.totalElements);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [sort, page, size, field.name, search]);

  return (
    <>
      <div className="admin-users-modal"></div>
      <div className="admin-users">
        <div className="admin-users-container">
          <section className="admin-users-panels">
            <span className="admin-users-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="admin-users-panels-right">
              <AdminSort
                sort={sort}
                setSort={setSort}
                sortNSearchArray={usersSnSArray}
              />
            </span>
          </section>
          {loading && (
            <section className="admin-users-grid-loading">
              <LuLoader2 />
            </section>
          )}
          {!loading && users.length === 0 && (
            <section className="admin-users-grid-empty">
              검색 결과가 없습니다.
            </section>
          )}
          <section className="admin-users-grid">
            {users?.map((user) => (
              <AdminUsersCard user={user} key={user.userId} />
            ))}
          </section>
          <section className="admin-users-search">
            <AdminSearch
              sortNSearchArray={usersSnSArray}
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              field={field}
              setField={setField}
            />
          </section>
          {users.length !== 0 && (
            <section className="admin-users-pagination">
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

export default AdminUsers;
