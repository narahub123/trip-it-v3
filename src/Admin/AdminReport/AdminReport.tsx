import { useEffect, useState } from "react";
import "./adminBlock.css";
import MypageSizeController from "Mypage/components/MypageSizeController";
import MypagePagination from "Mypage/components/MypagePagination";
import AdminSort from "Admin/components/AdminSort";
import AdminSearch from "Admin/components/AdminSearch";
import MypageBlockCard from "Mypage/MypageBlock/components/MypageBlockCard";
import { ModalMessageType } from "types/modal";
import { fetchReportsAPI } from "apis/report";
import { mypageReportSnSArray } from "Mypage/data/mypage";
import MypageReportCard from "Mypage/MypageReport/components/MypageReportCard";
import AdminReportCard from "./components/AdminReportCard";

const AdminReport = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<string[]>(["reportDate", "desc"]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "reportDate",
  });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const [message, setMessage] = useState<ModalMessageType>();

  useEffect(() => {
    console.log(sort[0], sort[1], page, size, field.name, search);

    fetchReportsAPI(sort[0], sort[1], page, size, field.name, search)
      .then((res) => {
        setItems(res.data.content);
        setTotal(res.data.totalElements);
      })
      .catch();
  }, [sort, page, size, field.name, search]);

  return (
    <>
      <div className="admin-report-modal"></div>
      <div className="admin-report">
        <div className="admin-report-container">
          <section className="admin-report-panels">
            <span className="admin-report-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="admin-report-panels-right">
              <AdminSort
                sort={sort}
                setSort={setSort}
                sortNSearchArray={mypageReportSnSArray}
              />
            </span>
          </section>
          <section className="admin-report-grid">
            {items?.map((item) => (
              <AdminReportCard
                item={item}
                items={items}
                setItems={setItems}
                key={item.reportId}
              />
            ))}
          </section>
          <section className="admin-report-search">
            <AdminSearch
              sortNSearchArray={mypageReportSnSArray}
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              field={field}
              setField={setField}
              sort={sort}
              setSort={setSort}
            />
          </section>
          <section className="admin-report-pagination">
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

export default AdminReport;
