<template>
    <div class="matchesTable">
        <div class="leaguesInfo" x-data="{ open: false }">
            <p >Best Matches</p>
            <div class="leagueName" >
                <p  class="leaguesBtn" x-on:click="open=!open" @click="show" 
                @focusout="dont"
                tabindex=1
                style="cursor:pointer;">{{currentLeague}}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" @click="show" id="arrow" :style="arrowDown ? null : 'transform: rotate(-180deg);'"
                @focusout="dont"
                tabindex=0><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>
            </div>
            <div class="leagues" x-show="open"  x-on:click.outside="open = false;">
                <ul>
                    <li   v-for="(league,index) in leagues" :key="league.index" @click=" display(league),open =false"  x-on:click="open = false;">
                        <template v-if="index!=leagues.length - 1">
                            <a href="#" class="leagueLink" >{{league}}</a>
                            <hr>
                        </template>
                        <template v-if="index==leagues.length - 1">
                            <a href="#" class="leagueLink" >{{league}}</a>
                        </template>

                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>

<script>

    export default {        
        name:"Table",
        data(){
            return{
                currentLeague:"Premier League",
                leagues:["Premier League","La Ligua","Calcio","bundesliga","Ligue 1"],
                arrowDown:true
            }
        },methods:{
            show(){
                return this.arrowDown=!this.arrowDown;
            },
            dont(){
                this.arrowDown=true;
            },display(league){
                this.currentLeague =league;

            }
        }
    }
</script>

<style scoped>
    .matchesTable{
        width: 70%;
        height: 500px;
        background-color: var(--bg-color);
        flex: 1;
        
    }
    p{
        font-size: 20px;
    }
    .leaguesInfo{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 5px 15px 5px;
        position: relative;
        border-bottom: 2px solid var(--word-color);
    }
    .leaguesInfo p{
        font-weight: bold;
    }
    .leagueName{
        display: flex;
        align-items: center;
    }
    .leagueName svg{
        fill: var(--word-color);
        width: 25px;
        height: 20px;
        margin-top: 3px;
        cursor: pointer;
        outline: none;
        transition: all 0.4s ease;
    }
    .leagues{
        transform: translateY(78%);
        position: absolute;
        left: 10px;
        right: 10px;
        background-color: white;
        bottom: -100%;
        color: var(--bg-color);
        font-weight: bold;
        font-size: 19px;
    }
    hr{
        background-color: var(--bg-color);
        height: 2px;
    }
    .leagues li{
        padding: 0 15px;
        cursor: pointer;
    }
    .leagues li:hover{
        background-color: var(--bg-color);
    }
    .leagues li:hover a{
        color: white;
    }
</style>