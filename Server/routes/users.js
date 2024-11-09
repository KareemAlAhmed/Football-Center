let express=require("express")
let router=express.Router()
const mongoose = require("mongoose")
const {createTokens,validateToken}=require("../jwt")
const bcrypt=require("bcrypt")
const competetions=require("../webScrappingESPN/tournsAndTeams/allComptetion.json")
const nationalTeams=require("../webScrappingESPN/tournsAndTeams/nationalTeams.json")
const allTeams=require("../webScrappingESPN/tournsAndTeams/allTeams2.json")
const allPlayer=require("../webScrappingESPN/playersInfos/allPlayers.json")
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
    },
    favTeam:{
        type:Object,
        default: {}
    },
    favNationalTeam:{
        type:Object,
        default: {}
    },
    followedCompetetions:{
        type:Array
    },
    followedTeams:{
        type:Array
    },
    followedPlayers:{
        type:Array
    }, 
    bookMarks:{
        type:Array
    },
    token:{
        type:String
    },
    theme:{
        type:String,
        default:"dark"
    }
})
const User =mongoose.model("users",UserSchema)


async function  setFavTeamAndCompet(userData){
    const { username, competetion, team } = userData;
    let newcompet=[]
    try {
      const user = await User.findOne({ name: username });
  
      if (!user) {
        return {
            status:400,
            error:"User Doesn't Exist"
        }
      }
      
      const existingTeam = user.followedTeams.map(team => {
        return team.name
      });
      const existingCompetetion= user.followedCompetetions.map(comp => comp.leagueName);
        if(Array.isArray(competetion)){

            let userCompetetions = competetion.filter(ele => {
                return !existingCompetetion.includes(ele);
            });
            if(existingTeam.includes(team.name)){
                return {
                    status:400,
                    error:`Team ${team.name} already exists in your list.` 
                }     
            }
         
            for(let i =0;i<userCompetetions.length;i++){
               newcompet.push(competetions.find(ele=>ele.leagueName===userCompetetions[i])) 
            }
            await User.updateOne({ name: username }, {
                $push: {
                    followedCompetetions: { $each: newcompet }                   
                }
            });
            await User.updateOne({ name: username }, {
                $set: {
                    favTeam:  team                    
                }
            });
        }else{
            if(!existingCompetetion.includes(competetion.leagueName)){
                if (!existingTeam.includes(team.name)) {   
                     
                        await User.updateOne({ name: username }, {
                            $push: {
                                followedCompetetions: competetion
                            }
                        });
                        await User.updateOne({ name: username }, {
                            $set: {
                                favTeam:  team                    
                            }
                        });
                    
                } else {
                    return {
                        status:400,
                        error:`Team ${team.name} already exists in your list.`
                    }  
                }
              }else{
                return {
                    status:400,
                    error:`Competetion ${competetion.leagueName} already exists in your list.` 
                } 
            }
        }
        return {
            status:200,
            message:"Following list updated successfully",
            compets:newcompet
        }
    } catch (error) {
        return {
            status:500,
            error:error
        }
    }
}
async function  setFavNationalTeam(userData){
    const { username, teamName } = userData;

    try {
      const user = await User.findOne({ name: username });
  
      if (!user) {
        return {
            status:400,
            error:"User Doesn't Exist"
        }
      }
        if(user.favNationalTeam != null){
            if(Object.keys(user.favNationalTeam).length !== 0){
                return {
                    status:400,
                    error:`User Has Already A  Favorite National Team.`
                }  
            }
        }

        let isExist=nationalTeams.find(ele=>ele.name===teamName)
        if(isExist){
            await User.updateOne({ name: username }, {
                $set: {
                    favNationalTeam:  isExist                    
                }
            });
        }else{
            return {
                status:400,
                error:`The National Team Doesnt Exist In The DataBase`
            }  
        }

        return {
            status:200,
            message:"Following list updated successfully",
            team:isExist
        }
    } catch (error) {
        return {
            status:500,
            error:"error"
        }
    }
}
async function  updateFollowingList(userData,teamORCompet,buttonOrPage){
    if(buttonOrPage === "ProfilePage"){
        const { username, competetion, team ,player} = userData;
        let newcompet=[]
        try {
          const user = await User.findOne({ name: username });
      
          if (!user) {
            return {
                status:400,
                error:"User Doesn't Exist"
            }
          }
        if(teamORCompet === "team"){
                const existingTeam = user.followedTeams.map(team => {
                    return team.name
                });
                if(user.favTeam != null){              
                    Object.keys(user.favTeam).length > 0 && existingTeam.push(user.favTeam.name)
                }
                const existingCompetetion= user.followedCompetetions.map(comp => comp.leagueName);
    
                if(Array.isArray(competetion)){
        
                    let receivedCompetetions = competetion.filter(ele => {
                        return !existingCompetetion.includes(ele);
                    });
                    if(existingTeam.includes(team.name)){
                        return {
                            status:400,
                            error:`Team ${team.name} already exists in your list.` 
                        }     
                    }
                  
                    for(let i =0;i<receivedCompetetions.length;i++){
                       newcompet.push(competetions.find(ele=>ele.leagueName===receivedCompetetions[i])) 
                    }
                    await User.updateOne({ name: username }, {
                        $push: {
                            followedCompetetions: { $each: newcompet }  ,
                            followedTeams: team                
                        }
                    });
                }else{
                    if(!existingCompetetion.includes(competetion.leagueName)){
                        if (!existingTeam.includes(team.name)) {   
                            await User.updateOne({ name: username }, {
                                $push: {
                                    followedCompetetions: { $each: competetion }  ,
                                    followedTeams: team                
                                }
                            });
                            
                        } else {
                            return {
                                status:400,
                                error:`Team ${team.name} already exists in your list.`
                            }  
                        }
                      }else{
                        return {
                            status:400,
                            error:`Competetion ${competetion.leagueName} already exists in your list.` 
                        } 
                    }
                }
                return {
                    status:200,
                    message:"Following list updated successfully",
                    compets:newcompet
                }
        }else if(teamORCompet === "player"){
            const existingPlayers= user.followedPlayers.map(play => play.name);
            if(!existingPlayers.includes(player.name)){         
                await User.updateOne({ name: username }, {
                    $push: {
                        followedPlayers: player               
                    }
                });                           
            }else{
                return {
                    status:400,
                    error:`Competetion ${play.name} already exists in your list.` 
                } 
            }
            
            return {
                status:200,
                message:"Following list updated successfully"
            }
        }else{
            const existingCompetetion= user.followedCompetetions.map(comp => comp.leagueName);
    
            if(Array.isArray(competetion)){
    
                let receivedCompetetions = competetion.filter(ele => {
                    return !existingCompetetion.includes(ele);
                });
            
                for(let i =0;i<receivedCompetetions.length;i++){
                   newcompet.push(competetions.find(ele=>ele.leagueName===receivedCompetetions[i])) 
                }
                await User.updateOne({ name: username }, {
                    $push: {
                        followedCompetetions:  newcompet              
                    }
                });
            }else{
                if(!existingCompetetion.includes(competetion.leagueName)){         
                    await User.updateOne({ name: username }, {
                        $push: {
                            followedCompetetions: competetion               
                        }
                    });                           
                }else{
                    return {
                        status:400,
                        error:`Competetion ${competetion.leagueName} already exists in your list.` 
                    } 
                }
            }
            return {
                status:200,
                message:"Following list updated successfully"
            }
        }
          
        } catch (error) {
    
            return {
                status:500,
                error:error
            }
        }
    }else{
        const { username, competetion, team ,playerId,teamName,teamId} = userData;
        let newcompet=[]
        try {
          const user = await User.findOne({ name: username });
      
          if (!user) {
            return {
                status:400,
                error:"User Doesn't Exist"
            }
          }
            if(teamORCompet === "team"){
                const existingTeam = user.followedTeams.map(team => {
                    return team.name
                });
                if(user.favTeam != null){              
                    Object.keys(user.favTeam).length > 0 && existingTeam.push(user.favTeam.name)
                }
                if(existingTeam.includes(teamName)){
                    return {
                        status:400,
                        error:`Team ${teamName} already exists in your list.` 
                    }     
                }
                let currentCompet=[]
                let currentTeam=allTeams.find(ele=>ele.id === parseInt(teamId) )
                if(currentTeam.localLeague){
                    currentCompet=[currentTeam.localLeague]
                    const existingCompetetion= user.followedCompetetions.map(comp => comp.leagueName);
                    let receivedCompetetions = currentCompet.filter(ele => {
                        return !existingCompetetion.includes(ele);
                    });
                    
                  
                    for(let i =0;i<receivedCompetetions.length;i++){
                       newcompet.push(competetions.find(ele=>ele.leagueName===receivedCompetetions[i])) 
                    }
                    await User.updateOne({ name: username }, {
                        $push: {
                            followedCompetetions: { $each: newcompet }  ,
                            followedTeams: currentTeam                
                        }
                    });
                    return {
                        status:200,
                        message:"Following list updated successfully",
                        compets:newcompet,
                        team:currentTeam
                    }
                }else{
                    await User.updateOne({ name: username }, {
                        $push: {
                            followedTeams: currentTeam                
                        }
                    });
                    return {
                        status:200,
                        message:"Following list updated successfully",
                        compets:[],
                        team:currentTeam
                    }
                }
                
               
        }else if(teamORCompet === "player"){
            let currentPlayer=allPlayer.find(ele=>ele.id === playerId )
            const existingPlayers= user.followedPlayers.map(play => play.name);
            if(!existingPlayers.includes(currentPlayer.name)){         
                await User.updateOne({ name: username }, {
                    $push: {
                        followedPlayers: currentPlayer               
                    }
                });                           
            }else{
                return {
                    status:400,
                    error:`Competetion ${play.name} already exists in your list.` 
                } 
            }
            
            return {
                status:200,
                message:"Following list updated successfully",
                player:currentPlayer
            }
        }
          
        } catch (error) {
    
            return {
                status:500,
                error:error
            }
        }
    }

}
async function  removeFavTeamOrNational(userData,normalOrNational){
    const { username, teamName } = userData;
    try {
      const user = await User.findOne({ name: username });
  
      if (!user) {
        return {
            status:400,
            error:"User Doesn't Exist"
        }
      }
    if(normalOrNational === "normal"){
            if(user.favTeam != null){  
                if( Object.keys(user.favTeam).length > 0){
                    user.favTeam.name === teamName && await User.updateOne({ name: username }, {
                        $set: {
                            favTeam:  {}                    
                        }
                    });
                }                          
            }else{
                return {
                    status:400,
                    message:`${teamName} is Not Your Favorite Team`
                }
            }
            return {
                status:200,
                message:`${teamName} removed From The List`
            }
    }else{
        if(user.favNationalTeam != null){  
            if( Object.keys(user.favNationalTeam).length > 0){
                user.favNationalTeam.name === teamName && await User.updateOne({ name: username }, {
                    $set: {
                        favNationalTeam:  {}                    
                    }
                });
            }                          
        }else{
            return {
                status:400,
                message:`${teamName} is Not Your Favorite National Team`
            }
        }
        return {
            status:200,
            message:`${teamName} removed From The List`
        }
    }
      
    } catch (error) {

        return {
            status:500,
            error:error
        }
    }
}
async function  removeFollowedTeamOrCompet(userData,teamORCompet,buttonOrPage){  
    let { username, teamName,competName ,playerName} = userData;
    
    try {
      const user = await User.findOne({ name: username });
  
      if (!user) {
        return {
            status:400,
            error:"User Doesn't Exist"
        }
      }
    if(teamORCompet === "team"){
        let newTeams=[]
        const existingTeam = user.followedTeams.map(team => {
            return team.name
        });
        if(!existingTeam.includes(teamName)){
            return {
                status:400,
                error:`You Are Not Following Team ${teamName}.` 
            }     
        }
        newTeams=user.followedTeams.filter(team=>team.name !== teamName)
        await User.updateOne({ name: username }, {
            $set: {
                followedTeams:  newTeams                   
            }
        });           
        return {
            status:200,
            message:`${teamName} removed From The List`
        }
    }else  if(teamORCompet === "player"){
        let newPlayers=[]
        const existingPlayers= user.followedPlayers.map(player => player.name);
        playerName=playerName.trim()
        if(!existingPlayers.includes(playerName)){
            return {
                status:400,
                error:`You Are Not Following ${playerName}.` 
            }     
        }
        newPlayers=user.followedPlayers.filter(player=>player.name !== playerName)
        await User.updateOne({ name: username }, {
            $set: {
                followedPlayers:  newPlayers                   
            }
        });           
        return {
            status:200,
            message:`${playerName} removed From The List`
        }
    }else{
        let newcompet=[]
        const existingCompetetion= user.followedCompetetions.map(comp => comp.leagueName);
        if(!existingCompetetion.includes(competName)){
            return {
                status:400,
                error:`You Are Not Following ${teamName} Competetion.` 
            }     
        }
        newcompet=user.followedCompetetions.filter(comp=>comp.leagueName !== competName)
        await User.updateOne({ name: username }, {
            $set: {
                followedCompetetions:  newcompet                   
            }
        });           
        return {
            status:200,
            message:`${competName} removed From The List`
        }
    }
      
    } catch (error) {
       
        return {
            status:500,
            error:error
        }
    }
}
async function  updateBookmarksList(userData){
    const { username, article} = userData;
    try {
        const user = await User.findOne({ name: username });
  
        if (!user) {
            return {
                status:400,
                error:"User Doesn't Exist"
            }
        }
        const existingBookMarks = user.bookMarks.map(article => {
            return article.articleId
        });
        if(existingBookMarks.includes(article.articleId)){
            return {
                status:400,
                error:`The Article already exists in your BookMarks.` 
            }     
        }
        await User.updateOne({ name: username }, {
            $push: {
                bookMarks:  article               
            }
        })  
    
        return {
            status:200,
            message:"The article has been successfully bookmarked."
        }
    
      
    } catch (error) {

        return {
            status:500,
            error:error
        }
    }
}
async function  removeArticleFromBookmarks(userData){

    const { username, articleId} = userData;
    try {
        const user = await User.findOne({ name: username });
  
        if (!user) {
            return {
                status:400,
                error:"User Doesn't Exist"
            }
        }
        const existingBookMarks = user.bookMarks.map(article => {
            return article.articleId
        });
        if(!existingBookMarks.includes(articleId)){
            return {
                status:400,
                error:`The Article is Not in your BookMarks.` 
            }     
        }
        let newBookMarks=user.bookMarks.filter(article=>article.articleId !== articleId)
        await User.updateOne({ name: username }, {
            $set: {
                bookMarks:  newBookMarks               
            }
        })  
    
        return {
            status:200,
            message:"The article has been successfully removed."
        }
    
      
    } catch (error) {

        return {
            status:500,
            error:error
        }
    }
}
async function  deleteUserAccount(userData){
    const { name} = userData;
    try {
        const user = await User.findOne({ name: name });
  
        if (!user) {
            return {
                status:400,
                error:"User Doesn't Exist"
            }
        }       
        await User.deleteOne({ name: name })  
    
        return {
            status:200,
            message:"Your Account has been successfully removed."
        }
    
      
    } catch (error) {

        return {
            status:500,
            error:error
        }
    }
}
async function  setuserTheme(userData){
    const { username,theme } = userData;

    try {
      const user = await User.findOne({ name: username });
  
      if (!user) {
        return {
            status:400,
            error:"User Doesn't Exist"
        }
      }

     
        await User.updateOne({ name: username }, {
            $set: {
                theme:  theme                    
            }
        });

        return {
            status:200,
            message:"Theme updated successfully"
        }
    } catch (error) {
        return {
            status:500,
            error:"error"
        }
    }
}
router.get("/logout",validateToken,(req,res)=>{
    res.clearCookie("access-token");
    res.json("DONE")
})
router.post("/register",async (req,res)=>{
    try{
        let user= new User(req.body)
        user.password=await bcrypt.hash(user.password,10)
        user.favNationalTeam={}
        user.favTeam={}
        user.bookMarks=[]
        let  result =await user.save();
        result=result.toObject();
        const token=createTokens(user)
        result.image_url ? null : result.image_url="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg"
        res.json({user:result,token})
   
    }catch(error){
        if (error.code === 11000) { // Duplicate key error (MongoDB)
            const duplicateKey = Object.keys(error.keyValue)[0]; // Extract the duplicated field name
            res.status(400).send({ error: `The ${duplicateKey} already exists` }); // Informative error message
        } else {
            console.log(error)
            res.status(500).send({ error: "Error while adding user" }); // Generic error for other issues
        }
    }
})
router.post("/login",async(req,res)=>{ 
    const {email,password}=req.body
    const user=await User.findOne({email:email})
    if(!user) res.status(400).json({error:"User Doesnt Exist"})
    const dbPassword=user.password
    bcrypt.compare(password,dbPassword).then((match)=>{
        if(!match){
            return res.status(400).json({error:"Wrong Password"})
        }
    })
    const token=createTokens(user)
    res.json({user,token})
})
router.put("/updateFavList", async (req, res) => {
    let results=await setFavTeamAndCompet(req.body)
    if(results.status === 200){
        res.json({ message: "Following list updated successfully",compets:results.compets});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/updateFollwingList/:actionType/:buttonOrPage", async (req, res) => {
    let {actionType,buttonOrPage}=req.params
    let results=await updateFollowingList(req.body,actionType,buttonOrPage)
    if(results.status === 200){
        if(buttonOrPage === "ProfilePage"){
            if(actionType === "team"){
                res.json({ message: "Following list updated successfully",compets:results.compets});
            }else if(actionType === "player"){
                res.json({ message: "Following list updated successfully"});
            }else{
                res.json({ message: "Following list updated successfully",compets:results.compets});
            }
        }else{
            if(actionType === "team"){
                res.json({ message: "Following list updated successfully",compets:results.compets,team:results.team});
            }else if(actionType === "player"){
                res.json({ message: "Following list updated successfully",player:results.player});
            }else{
                res.json({ message: "Following list updated successfully",compets:results.compets});
            }
        }
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/setFavNationalTeam", async (req, res) => {
   
    let results=await setFavNationalTeam(req.body)
    if(results.status === 200){
        res.json({ message: "National team has been added",team:results.team});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/removeFavTeam/:teamType", async (req, res) => {
    let {teamType}=req.params
    let results=await removeFavTeamOrNational(req.body,teamType)
    if(results.status === 200){      
        res.json({ message: results.message});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/removeFromFollowedList/:teamOrCompet", async (req, res) => {
    let {teamOrCompet}=req.params
    let results=await removeFollowedTeamOrCompet(req.body,teamOrCompet)
    if(results.status === 200){      
        res.json({ message: results.message});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/updateBookmarksList", async (req, res) => {
    let results=await updateBookmarksList(req.body)
    if(results.status === 200){      
        res.json({ message: results.message});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/removeArticleFromBookmarks", async (req, res) => {
    let results=await removeArticleFromBookmarks(req.body)
    if(results.status === 200){      
        res.json({ message: results.message});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/deleteUserAccount", async (req, res) => {
    let results=await deleteUserAccount(req.body)
    if(results.status === 200){      
        res.json({ message: results.message});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});
router.put("/changeTheme", async (req, res) => {
    let results=await setuserTheme(req.body)
    if(results.status === 200){      
        res.json({ message: results.message});
    }else if(results.status === 400){
        return res.status(400).json({ error: results.error});
    }else if(results.status === 500){
        return res.status(500).json({ error: results.error});
    }
});

module.exports=router






