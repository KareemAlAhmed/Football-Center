<template>
    <div class="NavBar">
        <div class="logo">
            <h1>Football Center</h1>
        </div>
        <div class="NavSections">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Today's Matches</a></li>
                <li><a href="#">Fixtures</a></li>
                <li><a href="#">Leagues</a></li>
                <li><a href="#">Clubs</a></li>
                <li><a href="#">News</a></li>
            </ul>
        </div>
        <div class="search">
            <form method="GET" action="/search">
                <input type="text" placeholder="Search..." v-model="searchInfo">
                <div class="searchLogo"><img src="../assets/loupe.png" style="width:20px;height:20px;"></div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name:"NavBar"
        ,data(){
            return{
                searchInfo:""
            }
        }
    }
</script>

<style scoped>
    .NavBar{
        max-width: 100vw;
        height: 70px;
        background-color: var(--bg-color);
        color: var(--word-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 274px;
    }
    ul{
        list-style: none;
    }
    ul li{
        display: inline-block;
        font-size: 20px;
        margin: 0 10px;
    }
    a{
        position: relative;
        cursor: pointer;
    }
    ul li a::after{
        content: '';
        width: 0;
        height: 2px;
        background-color: white;
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s linear;
    }
    ul li a:hover{
        color: white;
    }
    ul li a:hover::after{
        width: 100%;
    }
    h1{
        font-size: 27px;
        font-weight: bold;
    }
    form{
        height: 30px;
        border: 1px solid var(--word-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 7px 0 10px;
    }
    .search input{
        background-color: transparent;
        color: var(--word-color);
        outline: none;
        font-size: 20px;
    }
    .search input::placeholder{
        font-size: 20px;
    }
    .search input:focus{
        border-color: white;
        outline: none;
    }
    .search .searchLogo{       
        border-left: 1px solid var(--word-color);
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 5px;
    }
</style>