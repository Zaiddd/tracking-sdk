import {createRouter, createWebHistory} from "vue-router";
import TagsList from "@/views/analytics/TagsList.vue";
import NewTag from "@/views/analytics/NewTag.vue";
import Analytics from "@/views/analytics/Analytics.vue";
import AnalyticsRegister from "@/views/analytics/AnalyticsRegister.vue";
import AnalyticsLogin from "@/views/analytics/AnalyticsLogin.vue";
import AnalyticsLogout from "@/components/logout/AnalyticsLogout.vue";
import GettingStarted from "@/views/analytics/GettingStarted.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/analytics/dashboard', name: 'analytics_dashboard', component: Analytics, meta: {requiresUnauth: true}},
        {path: '/analytics/create-tag', name: 'analytics_new_tag', component: NewTag, meta: {requiresUnauth: true}},
        {path: '/analytics/my-tags', name: 'analytics_all_tags', component: TagsList, meta: {requiresUnauth: true}},
        {
            path: '/analytics/register',
            name: 'analytics_register',
            component: AnalyticsRegister,
            meta: {requiresUnauth: false}
        },
        {path: '/analytics/login', name: 'analytics_login', component: AnalyticsLogin, meta: {requiresUnauth: false}},
        {
            path: '/analytics/logout',
            name: 'analytics_logout',
            component: AnalyticsLogout,
            meta: {requiresUnauth: false}
        },
        {
            path: '/analytics/getting-started',
            name: 'analytics_getting_started',
            component: GettingStarted,
            meta: {requiresUnauth: false}
        },
    ],
});

export default router;
