import { createWebHistory, createRouter } from "vue-router";
import MyBoardsComp from "@/components/profile/MyBoardsComp.vue";
import MyAttendProgramComp from "@/components/profile/MyAttendProgramComp.vue";
import MyRanksComp from "@/components/profile/MyRanksComp.vue";
import CreatingBoardComp from "@/components/program/CreatingBoardComp.vue";
import CreateMemberComp from "@/components/CreateMemberComp.vue";
import LoginFormComp from "@/components/LoginFormComp.vue";
import DetailBoardComp from "@/components/program/DetailBoardComp.vue";
import UpdateBoardComp from "@/components/program/UpdateBoardComp.vue";
import Chart from "@/components/chart/ChartSelector.vue";
import AllChatComp from "@/components/AllChatComp.vue";
import ProgramPrivateChatComp from "@/components/chat/ProgramPrivateChatComp.vue";

const routes = [
  {
    path: "/boards/me",
    component: MyBoardsComp,
  },
  {
    path: "/programs/me",
    component: MyAttendProgramComp,
  },
  {
    path: "/ranks/me",
    component: MyRanksComp,
  },
  {
    path: "/create/board",
    component: CreatingBoardComp,
  },
  {
    path: "/create/member",
    component: CreateMemberComp,
  },
  {
    path: "/login",
    component: LoginFormComp,
  },
  {
    path: "/board/:id",
    component: DetailBoardComp,
  },
  {
    path: "/board/update/:id",
    component: UpdateBoardComp,
  },
  {
    path: "/chart",
    component: Chart,
  },
  {
    path: "/client/chat/:id",
    component: AllChatComp,
    props: true, // props 설정 추가
  },
  {
    path: "/client/chats/program_private",
    component: ProgramPrivateChatComp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
