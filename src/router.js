import { createWebHistory, createRouter } from "vue-router";
import MyBoardsComp from "@/components/MyBoardsComp.vue";
import MyAttendProgramComp from "@/components/MyAttendProgramComp.vue";
import MyRanksComp from "@/components/MyRanksComp.vue";
import CreatingBoardComp from "@/components/CreatingBoardComp.vue";

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
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;