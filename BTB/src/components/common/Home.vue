<template>
    <div class="wrapper">
        <div class="header-bg">
            <v-head></v-head>
            <v-sidebar></v-sidebar>
        </div>
        <div class="content w">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHead from './Header.vue';
import vFooter from './Footer.vue';
import vSidebar from './Sidebar.vue';
export default {
    components: {
        vHead,
        vFooter,
        vSidebar
    }
}

</script>
<style scoped>
.header-bg {
    margin-bottom: 20px;
    background-color: rgba(44, 77, 118, 0.5);
}

</style>
