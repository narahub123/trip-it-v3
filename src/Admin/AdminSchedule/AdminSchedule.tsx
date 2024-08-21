import { useEffect, useState } from "react";
import "./adminSchedule.css";

import MypageSizeController from "Mypage/components/MypageSizeController";

import MypagePagination from "Mypage/components/MypagePagination";
import AdminSort from "Admin/components/AdminSort";
import AdminSearch from "Admin/components/AdminSearch";
import { fetchSchedulesAAPI } from "apis/schedule";
import { mypageScheduleSnSArray } from "Mypage/data/mypage";
import MypageScheduleCard from "Mypage/MypageSchedule/components/MypageScheduleCard";

const AdminSchedule = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selections, setSelections] = useState<(number | string)[]>([]);
  const [sort, setSort] = useState<string[]>(["registerDate", "desc"]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "metroId",
  });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const offset = (page - 1) * size;
  console.log(search);

  useEffect(() => {
    console.log(sort[0], sort[1], page, size, field.name, search);

    fetchSchedulesAAPI(sort[0], sort[1], page, size, field.name, search)
      .then((res) => {
        console.log(res.data);

        setItems(res.data.content);
        setTotal(res.data.totalElements);
      })
      .catch();
  }, [sort, page, size, field.name, search]);
  return (
    <>
      <div className="admin-schedule-modal"></div>
      <div className="admin-schedule">
        <div className="admin-schedule-container">
          <section className="admin-schedule-panels">
            <span className="admin-schedule-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="admin-schedule-panels-right">
              <AdminSort
                sort={sort}
                setSort={setSort}
                sortNSearchArray={mypageScheduleSnSArray}
              />
            </span>
          </section>
          <section className="admin-schedule-grid">
            {items?.map((item) => (
              <MypageScheduleCard
                item={item}
                key={item.scheduleId}
                selections={selections}
                setSelections={setSelections}
              />
            ))}
          </section>
          <section className="admin-schedule-search">
            <AdminSearch
              sortNSearchArray={mypageScheduleSnSArray}
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              field={field}
              setField={setField}
              sort={sort}
              setSort={setSort}
            />
          </section>
          <section className="admin-schedule-pagination">
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

export default AdminSchedule;
