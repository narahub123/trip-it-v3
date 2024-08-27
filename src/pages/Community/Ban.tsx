import { addReportAPI } from "apis/report";
import { useRef, useState } from "react";

function Ban(props: any) {
  const [click, setClick] = useState(0);
  const [text, setText] = useState("");
  const postId = props.postId;

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const modalOutClick = (e: any) => {
    if (modalRef.current === e.target) {
      props.setBan(0);
    }
  };

  const handleReport = async () => {
    console.log(click);

    let reportType;
    if (click === 1) {
      reportType = "R1";
    } else if (click === 2) {
      reportType = "R2";
    } else if (click === 3) {
      reportType = "R3";
    } else if (click === 4) {
      reportType = "R4";
    }

    await addReportAPI({
      reportType: reportType,
      postId: postId,
      reportDetail: text,
    })
      .then((res) => {
        if (!res) return;
        const data = res.data;

        if (data) {
          window.alert("신고 완ㅇ료");
        }

        props.setBan(0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="valid"
        ref={modalRef}
        onClick={(e) => {
          modalOutClick(e);
        }}
      >
        <div className="valid-modal2">
          <div className="valid-modal-all">
            <p className="valid-modal-font">신고</p>
            <div className="valid-modal-body">
              <span className="valid-modal-reason">
                신고 사유를 선택하세요.
              </span>
              <div className="valid-modal-gr">
                <button
                  className={"valid-modal-grb" + (click == 1 ? "act" : "")}
                  onClick={() => {
                    setClick(1);
                  }}
                >
                  음란
                </button>
                <button
                  className={"valid-modal-grb" + (click == 2 ? "act" : "")}
                  onClick={() => {
                    setClick(2);
                  }}
                >
                  폭력
                </button>
                <button
                  className={"valid-modal-grb" + (click == 3 ? "act" : "")}
                  onClick={() => {
                    setClick(3);
                  }}
                >
                  욕설
                </button>
                <button
                  className={"valid-modal-grb" + (click == 4 ? "act" : "")}
                  onClick={() => {
                    setClick(4);
                  }}
                >
                  기타
                </button>
              </div>
              <div className="valid-modal-start">
                {text === "" && (
                  <span className="valid-modal-reason">
                    신고 사유를 적어주세요.
                  </span>
                )}
                <textarea
                  className="valid-modal-text"
                  value={text}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="valid-modal-hu">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#fc7070"></circle>
                  <path
                    d="M11.2485 14.0939H12.7336L13.0422 7.88978L13.1194 6.05957H10.8821L10.9399 7.88978L11.2485 14.0939ZM11.9814 17.9404C12.8301 17.9404 13.4858 17.4286 13.4858 16.6996C13.4858 15.9706 12.8301 15.4278 11.9814 15.4278C11.1521 15.4278 10.5156 15.9706 10.5156 16.6996C10.5156 17.4286 11.1521 17.9404 11.9814 17.9404Z"
                    fill="white"
                  ></path>
                </svg>
                <div className="valid-modal-red">
                  허위 신고 시 불이익이 있을 수 있습니다.
                </div>
              </div>
              <div className="valid-modal-button">
                <button
                  className="valid-modal-cancel"
                  onClick={() => {
                    props.setBan(0);
                  }}
                >
                  취소
                </button>
                <button
                  className={
                    "valid-modal-check3" +
                    (click == 0 && text === "" ? "" : "act")
                  }
                  onClick={() => {
                    // props.setBan(0);
                    handleReport();
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ban;
