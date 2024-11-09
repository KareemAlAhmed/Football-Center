
const axios = require('axios');
const fs = require('fs');
let express=require("express")
let router=express.Router()
const cheerio = require('cheerio');  // new addition
const espnUrl = `https://www.espn.com`;

async function getLeaguesNews(){
    try {
        const liga = await axios.get("https://www.espn.com/soccer/league/_/name/esp.1", { timeout: 10000000 });
        const premier = await axios.get("https://www.espn.com/soccer/league/_/name/eng.1", { timeout: 1000000 });
        const bundes = await axios.get("https://www.espn.com/soccer/league/_/name/ger.1", { timeout: 1000000 });
        const seria = await axios.get("https://www.espn.com/soccer/league/_/name/ita.1", { timeout: 1000000 });
    
        const leagues = [liga.data, premier.data, bundes.data, seria.data];
    
        let fullNews = {
            laliga: [],
            premier: [],
            bundes: [],
            seria: []
        };
    
        // Use a Set to keep track of unique article IDs
        const uniqueArticleIds = new Set();
    
        for (let index = 0; index < leagues.length; index++) {
            const data = leagues[index];
            const $ = cheerio.load(data);
            
            let container = $('#news-feed-content');
    
            $(container).find("article").each((i, elem) => {
                let news = {};
                let textBlock = $(elem).find(".item-info-wrap");
    
                news.articleTitle = $(textBlock).find("h1").text();
    
                if (news.articleTitle != "") {
                    news.articleContent = $(textBlock).find("p").text();
                    news.timeStamps = $(textBlock).find(".news-feed_item-meta .timestamp").text();
                    news.author = $(textBlock).find(".news-feed_item-meta .author").text();
    
                    let articleHref = $(textBlock).find("h1 a").attr("href");
    
                    if (textBlock && articleHref != undefined) {
                        let hrefArray = articleHref.split("/");
                        news.articleType = hrefArray[2];
                        news.id = hrefArray[hrefArray.length - 2]; // Unique identifier
                        news.slug = hrefArray[hrefArray.length - 1];
    
                        // Check if the article is unique
                        if (!uniqueArticleIds.has(news.id)) {
                        let logoExist = true;
                        if(news.articleType === "report"){
                            logoExist=false
                        }
                        if(logoExist){
                            news.imgUrl=$(elem).find(".img-wrap picture img").attr("data-default-src")
                        }else{
                            news.imgUrl="No Img"
                        }
                            uniqueArticleIds.add(news.id);
    
                            // Add the article to the respective league's array
                            const key = Object.keys(fullNews)[index];
                            fullNews[key].push(news);
                        }
                    }
                }
            });
        }
      fs.writeFileSync("./news.json", JSON.stringify(fullNews), "utf8");
        // Return the result
        return {
            status: 200,
            data: fullNews
        };
    } catch (error) {
        return {
            status: 400,
            error: error
        };
    }

}
async function getTransferNews(){
    try{
        const {data} = await axios.get("https://www.espn.com/soccer/transfers-news-and-features/",{timeout: 10000000});
        const $ = cheerio.load(data);  // new addition
        let container=$('#news-feed');
        let allNews=[]
        $(container).find("article:not(.contentItem--hero)").each(async (i, elem) => {
            let news={}
            news.titleImageUrl=$(elem).find(".contentItem__logo img").attr("data-src")
            news.for=$(elem).find(".contentItem__header__headings h2").text()
            let forHref=$(elem).find(".contentItem__header__wrapper").attr("href")
    
            if(news.titleImageUrl != undefined && news.titleImageUrl !== "https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN%2Dicon%2Dsoccer.png&w=80&h=80&scale=crop&cquality=40&location=origin"){
                news.forHref=espnUrl +forHref
            }
            if(news.titleImageUrl == undefined){
                news.titleImageUrl="No Image"
                news.forHref="No Linkable"
            }
            let linkAddress=$(elem).find("section a:first-of-type")
            if (linkAddress.length > 0) {
                news.linkAddress=espnUrl+linkAddress.attr("href")
                
                let articleHref=linkAddress.attr("href").split("/")
                news.id=articleHref[articleHref.length - 2]
                news.slug=articleHref[articleHref.length - 1]
                news.articleImageUrl=$(linkAddress).find("picture img").attr("data-default-src")
                news.articleTitle=$(linkAddress).find(".contentItem__contentWrapper .contentItem__titleWrapper h2").text()
                news.articleContent=$(linkAddress).find(".contentItem__contentWrapper .contentItem__titleWrapper p").text()
                news.timeStamps=$(linkAddress).find(".contentItem__contentWrapper .contentMeta__timestamp").text()
                news.author=$(linkAddress).find(".contentItem__contentWrapper .contentMeta__author").text()
               
            }else{
                news.linkAddress="No Url"
                news.id=null
                news.slug=null
                news.articleImageUrl=$(elem).find("section picture img").attr("data-default-src")
                news.articleTitle=$(elem).find("section .contentItem__contentWrapper .contentItem__titleWrapper h2").text()
                news.articleContent=$(elem).find("section .contentItem__contentWrapper .contentItem__titleWrapper p").text()
                news.timeStamps=$(elem).find("section .contentItem__contentWrapper .contentMeta__timestamp").text()
                news.author=$(elem).find("section .contentItem__contentWrapper .contentMeta__author").text()
            }
            
            
    
            allNews.push(news)
        })
    
        const sideContainer=$("section.col-three")
        let sideNews=[]
        $(sideContainer).find("article.sub-module.editorial").each(async (i, elem) => {
            
            let allLis=$(elem).find("li")
            allLis.each(async (i2, elem) => {
                let news={}
                if(i2 % 2 == 0){
                    if(i2 != allLis.length - 1){
                        let firstLi=elem
                        let secondLi=allLis[i2 + 1]
                        
                        let newsLinkAdd=$(firstLi).find(".img-wrap a:first-of-type")
    
    
                        let articleHref=newsLinkAdd.attr("href").split("/")
                        news.id=articleHref[articleHref.length - 2]
                        news.slug=articleHref[articleHref.length - 1]
                        news.articleImageUrl=$(newsLinkAdd).find("picture img").attr("data-default-src")
                        news.articleTitle=$(secondLi).find("h2").text()
                        news.articleContent=$(secondLi).find("p").text()
                        sideNews.push(news)
                    }
                }
            })
        })
        return {
            status:200,
            data:{allNews,sideNews}
        }
    }catch(error){
        return {
            status:400,
            error:error
        }
    }   
}
async function getMajorTransfers(leagueName=null,season=null){

    let leagues=[
        {
            name:"English Premier League",
            slug:"ENG.1"
        },
        {
            name:"Spanish LALIGA",
            slug:"ESP.1"
        },
        {
            name:"German Bundesliga",
            slug:"GER.1"
        },
        {
            name:"MLS",
            slug:"USA.1"
        },
        {
            name:"Mexican Liga BBVA MX",
            slug:"MEX.1"
        },
        {
            name:"Italian Serie A",
            slug:"ITA.1"
        },
        {
            name:"French Ligue 1",
            slug:"FRA.1"
        },
        {
            name:"Dutch Eredivisie",
            slug:"NED.1"
        },
        {
            name:"English League Championship",
            slug:"ENG.2"
        },
        {
            name:"Scottish Premiership",
            slug:"SCO.1"
        },
        {
            name:"Australian A-League Men",
            slug:"AUS.1"
        },
        {
            name:"Argentine Liga Profesional de Fútbol",
            slug:"ARG.1"
        },
        {
            name:"Brazilian Serie A",
            slug:"BRA.1"
        }
    ]
    let wantedLeague=leagues.find(ele=>ele.slug===leagueName)
    let data;
    try{
        if(leagueName != null){
            if(season !=  null){
                data=require(`../data/Transfer/${leagueName}/${season}.json`)
            }else{
                data=require(`../data/Transfer/${leagueName}/2024.json`)
            }
        }else{ 
            data=require(`../data/Transfer/allLeagues.json`)
        }
        return {
            status:200,
            data :{competName:wantedLeague?.name,transfers:data}
        };
    }catch(error){
        return {
            status:400,
            error:error
        }
    }
}
async function getArticleData(articleId,articleSlug){
    try{
        const {data} = await axios.get(`https://www.espn.com/soccer/story/_/id/${articleId}/${articleSlug}`,{timeout: 10000000});
        const $ = cheerio.load(data);
        let newsData={
            sideBarNews:[],
            mainArticleNews:{}
        }
        let sideBarConatiner=$("section#news-feed")
    
        $(sideBarConatiner).find(".container-wrapper .news-feed-item").each(async(i,elem)=>{
            let article={}
            let articleTitleBlock=$(elem).find(".news-feed-item-title a")
            if(articleTitleBlock.length > 0){
                let articleHref=$(articleTitleBlock).attr("href").split("/")
                if(articleHref[2] === "story"){
                    article.type=articleHref[2]
                }
                if(articleHref[2] === "report"){
                    article.type=articleHref[2]
                }
                article.title=$(articleTitleBlock).text()
                article.id=articleHref[articleHref.length - 2]
                article.slug=articleHref[articleHref.length - 1]
            }else{
    
                article.title=$(elem).find(".news-feed-item-title").text()
                article.id=null
                article.slug=null
            }
            article.timestamp=$(elem).find(".news-feed_item-meta .timestamp").text()
            article.author=$(elem).find(".news-feed_item-meta .author").text()
            if(article.title.slice(0,18)==="LIVE Transfer Talk"){
                null
            }else{
                newsData.sideBarNews.push(article)
            }
        })
        let mainContainer=$("section#article-feed article")
    
        let mainArticle={}
        mainArticle.articleTitle=$(mainContainer).find("header.article-header h1").text()
        let articleBody=$(mainContainer).find(".article-body")
        mainArticle.metaData={}
        let metaDataBlock=$(articleBody).find(".article-meta")
        mainArticle.metaData.timeStamps=$(metaDataBlock).find(".timestamp").text()
        metaDataBlock.find('.timestamp').remove();
        mainArticle.metaData.authors=[]
    
        $(metaDataBlock).find(".authors li").each(async(i,elem)=>{
            let author=$(elem).find(".author").text()
            
            mainArticle.metaData.authors.push(author)
        })
        $(articleBody).find(".authors").remove()
        $(articleBody).find(".article-meta").remove()
        $(articleBody).find(".content-reactions").remove()
        let textArray=[]
        articleBody.children().each(async(i,elem)=>{
            let element={}
            element.tagName=$(elem).prop('tagName').toLocaleLowerCase()
            element.textArray=[]
            let className=$(elem).attr('class')
            if(className == undefined){
                className="null"
            }
            if(element.tagName !== "section"  && (element.tagName !== "aside" || (element.tagName === "aside" && className.includes("inline-photo"))) && element.tagName !== "blockquote" &&  !className.includes("contentItem__content--media-card") && element.tagName !== "script" && element.tagName !== "hr"){
                if(element.tagName === "aside" && className.includes("inline-photo")){
                    element.tagName="img"
                    element.text=""
                    let urlContainer=$(elem).find("source:first-of-type").attr("data-srcset").split(",")
                    imgUrl=urlContainer[0].split("&")[0]
                    
                    element.src=imgUrl
                }else if(element.tagName === "ul"){
                    $(elem).find("li").each(async(i,elem2)=>{
                        element.textArray.push($(elem2).text())
                    })
                }else{
                    element.text=$(elem).text()
                }
                textArray.push(element)
            }       
        })
        mainArticle.allContent=textArray
        newsData.mainArticleNews=mainArticle
        fs.writeFileSync("./news.json", JSON.stringify(newsData.mainArticleNews), "utf8");
        return {
            status:200,
            newsData
        };
    }catch(error){
        return {
            status:400,
            error:error
        };
    }
}

router.get("/getNews",async(req,res)=>{
    let news=await getLeaguesNews()
    if(news.status != 200){
        res.json(400).json({error:"Error While Extracting data"})
    }else{
        res.json(news.data)
    }
})
router.get("/getTransferNews",async(req,res)=>{
    let transferNews=await getTransferNews()
    if(transferNews.status != 200){
        res.json(400).json({error:"Error While Extracting data"})
    }else{
        res.json(transferNews.data)
    }
})
router.get("/getMajorTransfer/:leagueSlug/season/:season",async(req,res)=>{
    let {leagueSlug,season}=req.params
    let transferNews;
    if(leagueSlug === "any"){
        transferNews=await getMajorTransfers()
        if(transferNews.status != 200){
            res.json(400).json({error:"Error While Extracting data"})
        }else{
            res.json(transferNews.data)
        }
    }else if(leagueSlug !== "any" && season === "any"){
        transferNews=await getMajorTransfers(leagueSlug)
        if(transferNews.status != 200){
            res.json(400).json({error:"Error While Extracting data"})
        }else{
            res.json(transferNews.data)
        }
    }else if(leagueSlug !== "any" && season !== "any"){
        transferNews=await getMajorTransfers(leagueSlug,season)
        if(transferNews.status != 200){
            res.json(400).json({error:"Error While Extracting data"})
        }else{
            res.json(transferNews.data)
        }
    }
})
router.get("/:articleId/:articleSlug/getArticleData",async(req,res)=>{
    let {articleId,articleSlug}=req.params
    let articleData=await getArticleData(articleId,articleSlug)
    if(articleData.status != 200){
        res.json(400).json({error:"Error While Extracting data"})
    }else{
        articleData.newsData.articleId=articleId
        res.json(articleData.newsData)
    }
})




module.exports=router