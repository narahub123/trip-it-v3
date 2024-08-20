import { Route, Routes } from "react-router-dom";
import PlanLayout from "layouts/PlanLayout";
import RootLayout from "layouts/RootLayout";
import Login from "./pages/Auth/Login";
import Normal from "./pages/Auth/Normal";
import Join from "./pages/Auth/Join";
import Community from "./pages/Community/Community";
import Details from "./pages/Community/Detail";
import Chat from "./pages/Chat/Chat";
import { useEffect } from "react";
import refreshAPI from "./utilities/TokenRefresher";

import Profile from "pages/mypage/profile/Profile";
import Block from "pages/mypage/block/Block";

import Test from "test/Test";
import Report from "pages/mypage/Report/Report";
import PostsM from "pages/mypage/PostsM/PostsM";

import SchedulesM from "pages/mypage/SchedulesM/SchedulesM";
import Carousel from "test/Carousel";
import PlanHome from "pages/Plan/PlanHome";
import Schedule from "pages/Schedule/Schedule";
import PlannerHome from "pages/Planner/PlannerHome/PlannerHome";
import Planner from "pages/Planner/Planner";
import Mypage from "Mypage/Mypage";
import MyPageSchedule from "Mypage/MypageSchedule/MyPageSchedule";
import MypageBlock from "Mypage/MypageBlock/MypageBlock";
import MypageReport from "Mypage/MypageReport/MypageReport";
import MypageProfile from "Mypage/MypageProfile/MypageProfile";
import Admin from "pages/admin/Admin";
import Users from "pages/admin/users/Users";
import User from "pages/admin/users/User";
import Blocks from "test/Blocks";
import Reports from "pages/admin/reports/Reports";
import PostsA from "pages/admin/PostsA/PostsA";
import SchedulesA from "pages/admin/SchedulesA/SchedulesA";

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
          <Route path="/mypage" element={<Mypage />}>
            <Route element={<Mypage />} />
            <Route path="/mypage" element={<MypageProfile />} />
            <Route path="/mypage/profile" element={<MypageProfile />} />
            <Route path="/mypage/blocks" element={<MypageBlock />} />
            <Route path="/mypage/reports" element={<MypageReport />} />
            <Route path="/mypage/posts" element={<PostsM />} />
            <Route path="/mypage/schedules" element={<MyPageSchedule />} />
          </Route>
          <Route element={<Admin />}>
            <Route path="/admin" element={<Users />} />
            <Route path="/admin/users/:userId" element={<User />} />
            <Route path="/admin/blocks" element={<Blocks />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/posts" element={<PostsA />} />
            <Route path="/admin/schedules" element={<SchedulesA />} />
          </Route>
          <Route path="/planner" element={<PlannerHome />} />
          <Route path="/plan" element={<PlanHome />} />
          <Route path="/test" element={<Test />}></Route>
          <Route path="/test/carousel" element={<Carousel />} />
          <Route path="/mypage/schedules/:scheduleId" element={<Schedule />} />
          <Route path="/planner/:metroName" element={<Planner />} />
        </Route>
      </Routes>
    </>
  );
}

export default Trip;
