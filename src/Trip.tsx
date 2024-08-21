import { Route, Routes } from "react-router-dom";
import RootLayout from "layouts/RootLayout";
import Login from "./pages/Auth/Login";
import Normal from "./pages/Auth/Normal";
import Join from "./pages/Auth/Join";
import Community from "./pages/Community/Community";
import Details from "./pages/Community/Detail";
import Chat from "./pages/Chat/Chat";
import { useEffect } from "react";
import refreshAPI from "./utilities/TokenRefresher";
import PostsM from "pages/mypage/PostsM/PostsM";
import PlannerHome from "pages/Planner/PlannerHome/PlannerHome";
import Planner from "pages/Planner/Planner";
import Mypage from "Mypage/Mypage";
import MyPageSchedule from "Mypage/MypageSchedule/MyPageSchedule";
import MypageBlock from "Mypage/MypageBlock/MypageBlock";
import MypageReport from "Mypage/MypageReport/MypageReport";
import MypageProfile from "Mypage/MypageProfile/MypageProfile";
import Users from "pages/admin/users/Users";
import User from "pages/admin/users/User";
import Blocks from "test/Blocks";
import Reports from "pages/admin/reports/Reports";
import PostsA from "pages/admin/PostsA/PostsA";
import SchedulesA from "pages/admin/SchedulesA/SchedulesA";
import MypageSchedulePost from "Mypage/MypageSchedule/MypageSchedulePost/MypageSchedulePost";
import Admin from "Admin/Admin";
import AdminUsers from "Admin/AdminUser/AdminUsers";
import AdminUser from "Admin/AdminUser/AdminUser";

function Trip() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await refreshAPI.get("");
      } catch (err) {
        console.log("에러확인 : ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Chat />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Community></Community>}></Route>
          <Route path="/community" element={<Community></Community>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/login/normal" element={<Normal></Normal>}></Route>
          <Route path="/join" element={<Join></Join>}></Route>
          <Route path="/detail" Component={Details}></Route>
          <Route path="/planner/:metroName" element={<Planner />} />
          <Route path="/mypage" element={<Mypage />}>
            <Route element={<Mypage />} />
            <Route path="/mypage" element={<MypageProfile />} />
            <Route path="/mypage/profile" element={<MypageProfile />} />
            <Route path="/mypage/blocks" element={<MypageBlock />} />
            <Route path="/mypage/reports" element={<MypageReport />} />
            <Route path="/mypage/posts" element={<PostsM />} />
            <Route path="/mypage/schedules" element={<MyPageSchedule />} />
            <Route
              path="/mypage/schedules/:scheduleId"
              element={<MypageSchedulePost />}
            />
          </Route>
          <Route element={<Admin />}>
            <Route path="/admin" element={<AdminUsers />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:userId" element={<AdminUser />} />
            <Route path="/admin/blocks" element={<Blocks />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/posts" element={<PostsA />} />
            <Route path="/admin/schedules" element={<SchedulesA />} />
          </Route>
          <Route path="/planner" element={<PlannerHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default Trip;
