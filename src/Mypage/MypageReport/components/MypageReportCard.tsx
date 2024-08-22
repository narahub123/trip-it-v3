import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import "./mypageReportCard.css";
import { useState } from "react";
import { convertYYYYMMDDToDate1 } from "utilities/date";
import { handleReport } from "../Utilities/reports";

interface mypageReportCardProps {
  item: any;
  items: any[];
  setItems: (value: any[]) => void;
}
const MypageReportCard = ({ item, items, setItems }: mypageReportCardProps) => {
  const [detail, setDetail] = useState(false);
  const [open, setOpen] = useState(false);

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
            <button>처리중</button>
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

export default MypageReportCard;
