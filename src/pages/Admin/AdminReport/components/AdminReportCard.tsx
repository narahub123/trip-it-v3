import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import "./adminReportCard.css";
import { useState } from "react";
import { convertYYYYMMDDToDate1 } from "utilities/date";

import { updateReportAPI } from "apis/report";
import { ModalMessageType } from "types/modal";

interface mypageReportCardProps {
  item: any;
  items: any[];
  setItems: (value: any[]) => void;
  setOpen: (value: boolean) => void;
  setMessage: (value: ModalMessageType | undefined) => void;
  setReportInfo: React.Dispatch<
    React.SetStateAction<
      | {
          reportId: string | number;
          reportFalse: number;
        }
      | undefined
    >
  >;
}
const AdminReportCard = ({
  item,
  setOpen,
  items,
  setItems,
  setMessage,
  setReportInfo,
}: mypageReportCardProps) => {
  const [detail, setDetail] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const askHandleReport = (reportFalse: number) => {
    setMessage({
      type: "confirm",
      msgs: {
        title: "해당 신고를 처리하시겠습니까?",
        detail: "",
      },
    });
    setOpen(true);
    setOpenDropdown(false);
    setReportInfo({ reportId: item.reportId, reportFalse });
  };

  const handleReport = (
    reportId: string,
    reportFalse: number,
    items: any[],
    setItems: (value: any[]) => void,
    setMessage: (value: ModalMessageType | undefined) => void
  ) => {
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
      .finally(() => setOpenDropdown(false));
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
                  item.reportType === "R1"
                    ? "lewd"
                    : item.reportType === "R2"
                    ? "violence"
                    : item.reportType === "R3"
                    ? "abuse"
                    : "etc"
                }`}
              >
                {item.reportType === "R1"
                  ? "음란"
                  : item.reportType === "R2"
                  ? "폭력"
                  : item.reportType === "R3"
                  ? "욕설"
                  : "기타"}
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
            <div className="admin-report-card-who">
              <div>
                <span>차단한 사람 </span>
                <span>{item.blockUserNickname}</span>
              </div>
              <div>
                <span>차단 당한 사람 </span>
                <span>{item.blockedUserNickname}</span>
              </div>
            </div>
            <div className="mypage-report-card-info-reportId">
              <span className="mypage-report-card-info-reportId-name">
                신고글 :{" "}
              </span>
              <span className="mypage-report-card-info-reportId-detail">
                {item.postTitle}
              </span>
            </div>
            <div className="mypage-report-card-info-date">
              <span>신고 날짜 : </span>
              <span>{convertYYYYMMDDToDate1(item.reportDate)}</span>
            </div>
          </span>
          <span className="mypage-report-card-btn">
            <button onClick={() => setOpenDropdown(!openDropdown)}>
              {item.reportFalse === 1
                ? "신고 처리"
                : item.reportFalse === 2
                ? "허위 신고"
                : "처리중"}
            </button>
            <ul
              className={`mypage-report-card-btn-container${
                openDropdown ? " open" : ""
              }`}
            >
              <li
                className="mypage-report-card-btn-item"
                onClick={() => askHandleReport(1)}
              >
                신고 처리
              </li>
              <li
                className="mypage-report-card-btn-item"
                onClick={() => askHandleReport(2)}
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
