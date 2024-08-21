import { SortandSearchType } from "Mypage/types/mypage";

// 마이 페이지
export const adminList = [
  { title: "회원 목록", link: "/admin/users" },
  { title: "일정 목록", link: "/admin/schedules" },
  { title: "모집글 목록", link: "/admin/posts" },
  { title: "차단 목록", link: "/admin/blocks" },
  { title: "신고 목록", link: "/admin/reports" },
];

// 유저 목록
export const usersSnSArray: SortandSearchType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "email" },
    type: "normal", // 값 그대로 적용
    title: "이메일",
    sort: { key: "email", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "username" },
    type: "normal", // 값 그대로 적용
    title: "이름",
    sort: { key: "username", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "nickname" },
    type: "normal", // 값 그대로 적용
    title: "닉네임",
    sort: { key: "nickname", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "birth" },
    type: "date", // 값 그대로 적용
    title: "생년월일",
    sort: { key: "birth", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "gender" },
    type: "normal", // 값 그대로 적용
    title: "성별",
    sort: { key: "gender", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { m: "남성", f: "여성" },
    },
  },
  {
    field: { name: "intro" },
    type: "normal", // 값 그대로 적용
    title: "소개글",
    sort: { key: "intro", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "role" },
    type: "normal", // 값 그대로 적용
    title: "등급",
    sort: { key: "role", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { ROLE_USER: "일반회원", ROLE_ADMIN: "관리자" },
    },
  },
  {
    field: { name: "regdate" },
    type: "date", // 값 그대로 적용
    title: "가입 날짜",
    sort: { key: "regdate", value: "desc" },
    search: { able: false, type: "normal" },
  },
  {
    field: { name: "userpic" },
    type: "image", // 값 그대로 적용
    title: "회원 사진",
    sort: { key: "userpic", value: "asc" },
    search: { able: false },
  },
  {
    field: { name: "reportCount" },
    type: "normal", // 값 그대로 적용
    title: "신고 횟수",
    sort: { key: "reportCount", value: "asc" },
    search: { able: true, type: "normal" },
  },
];

// 일정 페이지
export const adminScheduleSnSArray: SortandSearchType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "scheduleId" },
    type: "checkbox",
    title: "삭제",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "metroId" },
    type: "normal",
    title: "지역",
    sort: { key: "metroId", value: "asc" },
    search: {
      able: true,
      type: "normal",
    },
  },
  {
    field: { name: "scheduleTitle" },
    type: "normal",
    title: "일정 제목",
    sort: { key: "scheduleTitle", value: "asc" },
    search: {
      able: true,
      type: "normal",
    },
  },
  {
    field: { name: "registerDate" },
    type: "date", // 값 그대로 적용
    title: "등록 날짜",
    sort: { key: "registerDate", value: "desc" },
    search: { able: false, type: "normal" },
  },
  {
    field: { name: "startDate" },
    type: "date", // 값 그대로 적용
    title: "시작 날짜",
    sort: { key: "startDate", value: "asc" },
    search: { able: false, type: "normal" },
  },
  {
    field: { name: "endDate" },
    type: "date", // 값 그대로 적용
    title: "종료 날짜",
    sort: { key: "endDate", value: "asc" },
    search: { able: false, type: "normal" },
  },
];
