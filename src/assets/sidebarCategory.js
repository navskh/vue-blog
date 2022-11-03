const sidebarCategory = [
  {
    name: "원서",
    params: { nav: ["wonseo"] },
    path: "/wonseo",
    children: [
      {
        name: "경쟁률",
        params: { nav: ["wonseo", "ratio"] },
        path: "/wonseo/ratio",
        children: [],
      },
      {
        name: "JX",
        params: { nav: ["wonseo", "jx"] },
        path: "/wonseo/jx",
        children: [],
      },
      {
        name: "예외처리",
        params: { nav: ["wonseo", "exception"] },
        path: "/wonseo/exception",
        children: [
          {
            name: "출력물",
            params: { nav: ["wonseo", "exception", "print-list"] },
            path: "/wonseo/exception/print-list",
            children: [],
          },
          {
            name: "전산파일",
            params: { nav: ["wonseo", "exception", "t5"] },
            path: "/wonseo/exception/t5",
            children: [],
          },
          {
            name: "수험번호",
            params: { nav: ["wonseo", "exception", "suhum-no"] },
            path: "/wonseo/exception/suhum-no",
            children: [],
          },
          {
            name: "중복지원",
            params: { nav: ["wonseo", "exception", "duplicate"] },
            path: "/wonseo/exception/duplicate",
            children: [],
          },
          {
            name: "결제전",
            params: { nav: ["wonseo", "exception", "pay-begin"] },
            path: "/wonseo/exception/pay-begin",
            children: [],
          },
          {
            name: "결제후",
            params: { nav: ["wonseo", "exception", "pay-result"] },
            path: "/wonseo/exception/pay-result",
            children: [],
          },
          {
            name: "결제료",
            params: { nav: ["wonseo", "exception", "pay-info"] },
            path: "/wonseo/exception/pay-info",
            children: [],
          },
        ],
      },
      {
        name: "기타",
        params: { nav: ["wonseo", "etc"] },
        path: "/wonseo/etc",
        children: [
          {
            name: "NonObject",
            params: { nav: ["wonseo", "etc", "non-object"] },
            path: "/wonseo/etc/non-object",
            children: [],
          },
          {
            name: "원서 데이터 오류 검증",
            params: { nav: ["wonseo", "etc", "validate"] },
            path: "/wonseo/etc/validate",
            children: [],
          },
          {
            name: "오즈",
            params: { nav: ["wonseo", "etc", "oz"] },
            path: "/wonseo/etc/oz",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "대학관리자",
    params: { nav: ["admin"] },
    path: "/admin",
    children: [],
  },
  {
    name: "내부관리자(MOA)",
    params: { nav: ["moa"] },
    path: "/moa",
    children: [],
  },
  {
    name: "입학상담앱",
    params: { nav: ["consulting"] },
    path: "/consulting",
    children: [
      {
        name: "기초",
        params: { nav: ["consulting", "foundation"] },
        path: "/consulting/foundation",
        children: [],
      },
      {
        name: "관리자",
        params: { nav: ["consulting", "admin"] },
        path: "/consulting/admin",
        children: [],
      },
      {
        name: "예외처리",
        params: { nav: ["consulting", "exception"] },
        path: "/consulting/exception",
        children: [],
      },
      {
        name: "배포",
        params: { nav: ["consulting", "build"] },
        path: "/consulting/build",
        children: [],
      },
    ],
  },
  {
    name: "내신산출",
    params: { nav: ["nesin"] },
    path: "/nesin",
    children: [],
  },
  {
    name: "PIMS",
    params: { nav: ["pims"] },
    path: "/pims",
    children: [],
  },
  {
    name: "대학별 특이사항",
    params: { nav: ["univ"] },
    path: "/univ",
    children: [],
  },
  {
    name: "콜/ENS/원격제어",
    params: { nav: ["ens"] },
    path: "/ens",
    children: [],
  },
  {
    name: "Host Sample",
    params: { nav: ["host-sample"] },
    path: "/host-sample",
    children: [],
  },
  {
    name: "기타",
    params: { nav: ["etc"] },
    path: "/etc",
    children: [],
  },
];

export default sidebarCategory;
