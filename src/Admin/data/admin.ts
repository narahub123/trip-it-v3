import { SortandSearchType } from "Mypage/types/mypage";

// 마이 페이지
export const adminList = [
  { title: "회원 목록", link: "/admin/users" },
  { title: "일정 목록", link: "/admin/schedules" },
  { title: "모집글 목록", link: "/admin/posts" },
  { title: "차단 목록", link: "/admin/blocks" },
  { title: "신고 목록", link: "/admin/reports" },
];

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
