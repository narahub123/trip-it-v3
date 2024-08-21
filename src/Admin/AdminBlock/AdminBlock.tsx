import { useEffect, useState } from "react";
import "./adminBlock.css";

import MypageSizeController from "Mypage/components/MypageSizeController";

import MypagePagination from "Mypage/components/MypagePagination";
import AdminSort from "Admin/components/AdminSort";
import AdminSearch from "Admin/components/AdminSearch";

import { fetchBlocksAPI } from "apis/block";
import MypageBlockCard from "Mypage/MypageBlock/components/MypageBlockCard";
import { ModalMessageType } from "types/modal";
import { mypageBlockSnSArray } from "Mypage/data/mypage";

const AdminBlock = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "blockDate",
  });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const [message, setMessage] = useState<ModalMessageType>();
  const [unblock, setUnblock] = useState<{
    nickname: string;
    blockId: string | number;
  }>({ nickname: "", blockId: "" });

  useEffect(() => {
    console.log(sort[0], sort[1], page, size, field.name, search);

    fetchBlocksAPI(sort[0], sort[1], page, size, field.name, search)
      .then((res) => {
        setItems(res.data.content);
        setTotal(res.data.totalElements);
      })
      .catch();
  }, [sort, page, size, field.name, search]);

  return (
    <>
      <div className="admin-block-modal"></div>
      <div className="admin-block">
        <div className="admin-block-container">
          <section className="admin-block-panels">
            <span className="admin-block-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="admin-block-panels-right">
              <AdminSort
                sort={sort}
                setSort={setSort}
                sortNSearchArray={mypageBlockSnSArray}
              />
            </span>
          </section>
          <section className="admin-block-grid">
            {items?.map((item) => (
              <MypageBlockCard
                item={item}
                key={item.blockId}
                setMessage={setMessage}
                setOpen={setOpen}
                setUnblock={setUnblock}
              />
            ))}
          </section>
          <section className="admin-block-search">
            <AdminSearch
              sortNSearchArray={mypageBlockSnSArray}
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              field={field}
              setField={setField}
              sort={sort}
              setSort={setSort}
            />
          </section>
          <section className="admin-block-pagination">
            <MypagePagination
              page={page}
              setPage={setPage}
              numPages={numPages}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminBlock;
