<template>
    <div class="wrapper">
        <div class="header-bg">
            <v-head></v-head>
            <v-sidebar></v-sidebar>
        </div>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    components: {
        vHead,
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
