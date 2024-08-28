import { Link } from "react-router-dom";
import "./adminUsersCard.css";
import { UserType } from "types/users";
import { convertDataToDate } from "utilities/profile";

interface AdminUsersCardProps {
  user: UserType;
}

const AdminUsersCard = ({ user }: AdminUsersCardProps) => {
  const defaultImage = "/images/defaultImage.jpg";

  return (
    <li className="admin-users-card">
      <Link
        to={`/admin/users/${user.userId}`}
        className="admin-users-card-link"
      >
        <div className="admin-users-card-photo-container">
          <img src={user.userpic || defaultImage} alt="인물사진" />
        </div>
        <div className="admin-users-card-info-container">
          <div className="admin-users-card-info-item">
            닉네임 : {user.nickname}
          </div>
          <div className="admin-users-card-info-item">
            신고수 : {user.reportCount}
          </div>
          <div className="admin-users-card-info-item">
            회원등급 :
            {user?.[`role`] === "ROLE_USER"
              ? "일반회원"
              : user?.[`role`] === "ROLE_ADMIN"
              ? "관리자"
              : user?.[`role`] === "ROLE_A"
              ? `일반회원(7일 정지[${convertDataToDate(
                  user?.[`endDate`]
                )} 종료])`
              : user?.[`role`] === "ROLE_B"
              ? `일반회원(30일 정지[${convertDataToDate(
                  user?.[`endDate`]
                )} 종료])`
              : user?.[`role`] === "ROLE_C"
              ? "정지회원(영구 정지)"
              : user?.[`role`] === "ROLE_D"
              ? "탈퇴 회원"
              : ""}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default AdminUsersCard;
