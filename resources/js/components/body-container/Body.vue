<template>
    <div class="bodyContainer">
        <table-component></table-component>
        <sideBar-component></sideBar-component>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .bodyContainer{
        max-width: 100vw;
        padding: 0 274px;
        display: flex;
        justify-content: space-between;
        gap: 70px;
        margin-top: 30px;
        color: var(--word-color);
    }
</style>