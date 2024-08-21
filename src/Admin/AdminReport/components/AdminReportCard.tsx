import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import "./adminReportCard.css";
import { useState } from "react";
import { convertYYYYMMDDToDate1 } from "utilities/date";

import { updateReportAPI } from "apis/report";
import { MessageType } from "types/template";

interface mypageReportCardProps {
  item: any;
  items: any[];
  setItems: (value: any[]) => void;
}
const AdminReportCard = ({ item, items, setItems }: mypageReportCardProps) => {
  const [detail, setDetail] = useState(false);
  const [open, setOpen] = useState(false);

  const handleReport = (
    reportId: string,
    reportFalse: number,
    items: any[],
    setItems: (value: any[]) => void,
    setMessage?: (value: MessageType | undefined) => void
  ) => {
    if (!window.confirm(`신고를 처리하시겠습니까?`)) {
      return;
    }
    // setMessage(fetchMessage(1, reportMsgs));

    updateReportAPI(reportId, reportFalse)
      .then((res) => {
        if (!res) return;

        const code = res.data.code;
        if (code === "ok" || res.status === 200) {
          // setMessage(fetchMessage(2, reportMsgs));

          const newItems = items.map((item) => ({
            ...item,
            reportFalse:
              item.reportId === reportId ? reportFalse : item.reportFalse,
          }));

          setItems(newItems);
        }
      })
      .catch((err) => {
        console.log(err);
        // setMessage(fetchMessage(err.msgId, reportMsgs));
      })
      .finally(() => setOpen(false));
  };

  console.log(item.reportFalse);

  return (
    <li className="mypage-report-card">
      <div className="mypage-report-card-container">
        <div className="mypage-report-card-upper">
          <span className="mypage-report-card-info">
            <div className="mypage-report-card-info-reportType">
              <button
                className={`mypage-report-card-info-reportType-button ${
                  item.reportType === "음란"
                    ? "lewd"
                    : item.reportType === "폭력"
                    ? "violence"
                    : item.reportType === "욕설"
                    ? "abuse"
                    : "etc"
                }`}
              >
                {item.reportType}
              </button>
              {item.reportDetail && (
                <span
                  className={`mypage-report-card-info-reportType-dropdown${
                    detail ? " active" : ""
                  }`}
                  onClick={() => setDetail(!detail)}
                >
                  <IoIosArrowDropup />
                </span>
              )}
            </div>
            <div className="mypage-report-card-info-reportId">
              <span>신고글 : </span>
              <span>{item.postId.postId}</span>
            </div>
            <div className="mypage-report-card-info-date">
              <span>신고 날짜 : </span>
              <span>{convertYYYYMMDDToDate1(item.reportDate)}</span>
            </div>
          </span>
          <span className="mypage-report-card-btn">
            <button onClick={() => setOpen(!open)}>
              {item.reportFalse === 1
                ? "신고 처리"
                : item.reportFalse === 2
                ? "허위 신고"
                : "처리중"}
            </button>
            <ul
              className={`mypage-report-card-btn-container${
                open ? " open" : ""
              }`}
            >
              <li
                className="mypage-report-card-btn-item"
                onClick={() => handleReport(item.reportId, 1, items, setItems)}
              >
                신고 처리
              </li>
              <li
                className="mypage-report-card-btn-item"
                onClick={() => handleReport(item.reportId, 2, items, setItems)}
              >
                허위 신고
              </li>
            </ul>
          </span>
        </div>
        <div className={`mypage-report-card-lower${detail ? " active" : ""}`}>
          <div className="mypage-report-card-lower-container">
            <p className="mypage-report-card-lower-title">신고내용</p>
            <p className="mypage-report-card-lower-detail">
              {item.reportDetail}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AdminReportCard;
