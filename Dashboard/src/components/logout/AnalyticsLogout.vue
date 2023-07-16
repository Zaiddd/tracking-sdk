<template></template>
<script>
export default {
    methods: {
        async deleteCookie(name) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
    },
    created() {
        localStorage.clear();
        this.deleteCookie("kpiJwtToken");
        this.deleteCookie("appId");
        this.$router.push("/analytics/login");
    }
}
</script>