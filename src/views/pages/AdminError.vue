<template>
    <div class="not-found">
        <div class="msg-box">
            <h1 class="animated fadeInDown">Oops! Insufficient privileges</h1>
            <h2 class="animated fadeInUp">
                To access these content, please contact the Administrator.
            </h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AdminError'
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/_variables';
    @import '../../assets/scss/_mixins';

    .msg-box {
        max-width: 600px;
        margin: 70px auto;

        h1 {
            @include text-bordered-shadow();
        }
    }
</style>

