import { createWebHistory, createRouter } from "vue-router";
import MyBoardsComp from "@/components/profile/MyBoardsComp.vue";
import MyAttendProgramComp from "@/components/profile/MyAttendProgramComp.vue";
import MyRanksComp from "@/components/profile/MyRanksComp.vue";
import CreatingBoardComp from "@/components/CreatingBoardComp.vue";
import CreateMemberComp from "@/components/CreateMemberComp.vue";
import LoginFormComp from "@/components/LoginFormComp.vue";
import DetailBoardComp from "@/components/DetailBoardComp.vue";

const routes = [
    {
        path: "/boards/me",
        component: MyBoardsComp
    },
    {
        path: "/programs/me",
        component: MyAttendProgramComp
    },
    {
        path: "/ranks/me",
        component: MyRanksComp
    },
    {
        path: "/create/board",
        component: CreatingBoardComp
    },
    {
        path: "/create/member",
        component: CreateMemberComp
    },
    {
        path: "/login",
        component: LoginFormComp
    },
    {
        path: "/board/:id",
        component: DetailBoardComp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;