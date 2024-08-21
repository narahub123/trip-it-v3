import { useEffect, useState } from "react";
import "./adminUser.css";
import { UserType } from "types/users";
import { convertDataToDate } from "utilities/profile";
import { fetchUserAPI } from "apis/users";
import { useParams } from "react-router-dom";
import { changeUserRoleAPI } from "apis/profile";

const AdminUser = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [openDropdown, setOpenDropdown] = useState(false);

  console.log(userId);

  useEffect(() => {
    if (!userId) return;

    fetchUserAPI(userId)
      .then((res) => {
        if (!res) return;
        console.log(res.data);
        setUser(res.data);
      })
      .catch();
  }, []);

  const handleRole = (role: string) => {
    if (!user) return;
    changeUserRoleAPI(user.userId, role)
      .then((res) => {
        if (!res) return;
        console.log(res.data);
        const newUser = {
          ...user,
          role,
        };
        setUser(newUser);
        setOpenDropdown(!openDropdown);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <li>loading...</li>;
  }
  return (
    <>
      <div className="admin-user-modal"></div>
      <div className="admin-user">
        <div className="admin-user-container">
          <div className="admin-user-photo">
            <div className="admin-user-photo-container">
              <img src={"/images/defaultImage.jpg"} alt="유저 이미지" />
            </div>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">닉네임</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={user?.nickname}
              />
            </span>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">소개글</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={user?.intro}
              />
            </span>
          </div>

          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">비밀번호</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={`*************`}
              />
            </span>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">이름</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={user?.username}
              />
            </span>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">생년월일</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={user && convertDataToDate(user?.birth)}
              />
            </span>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">이메일</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={user?.email}
              />
            </span>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">신고수</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={user?.reportCount}
              />
            </span>
          </div>
          <div className="admin-user-item">
            <span className="admin-user-detail">
              <p className="admin-user-detail-title">등급</p>
              <input
                type="text"
                className="admin-user-detail-info"
                defaultValue={
                  user?.[`role`] === "ROLE_USER"
                    ? "일반회원"
                    : user?.[`role`] === "ROLE_ADMIN"
                    ? "관리자"
                    : user?.[`role`] === "ROLE_A"
                    ? // && user?.[`endDate`]
                      `일반회원(7일 정지[])
                    `
                    : user?.[`role`] === "ROLE_B" && user?.[`endDate`]
                    ? `일반회원(30일 정지[${convertDataToDate(
                        user?.[`endDate`]
                      )} 종료])`
                    : user?.[`role`] === "ROLE_C" && user?.[`endDate`]
                    ? "정지회원(영구 정지)"
                    : user?.[`role`] === "ROLE_C"
                    ? "탈퇴 회원"
                    : ""
                }
              />
            </span>
            <span className="admin-user-detail-control">
              <p
                className="admin-user-detail-control-title"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                등급 변경
              </p>
              <ul
                className={`admin-user-detail-control-container${
                  openDropdown ? " open" : ""
                }`}
              >
                <li
                  className="admin-user-detail-control-item"
                  onClick={() => handleRole("ROLE_USER")}
                >
                  일반회원
                </li>
                <li
                  className="admin-user-detail-control-item"
                  onClick={() => handleRole("ROLE_ADMIN")}
                >
                  관리자
                </li>
                <li
                  className="admin-user-detail-control-item"
                  onClick={() => handleRole("ROLE_A")}
                >
                  일반회원(7일 정지)
                </li>
                <li
                  className="admin-user-detail-control-item"
                  onClick={() => handleRole("ROLE_B")}
                >
                  일반회원(30일 정지)
                </li>
                <li
                  className="admin-user-detail-control-item"
                  onClick={() => handleRole("ROLE_B")}
                >
                  일반회원(영구정지)
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUser;
