
// import { GET_USER,REGISTERING_USER,REGISTERING_USER_SUCCESS,REGISTERING_USER_FAILED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, ADDING_PRODUCT_TO_CART, ADDING_PRODUCT_TO_CART_SUCCESSED, ADDING_PRODUCT_TO_CART_FAILED, PURCHASING_CART, PURCHASE_CART_SUCCESSED, PURCHASE_CART_FAILED, LOGOUT_USER, FETCH_USER_INFO, FETCH_USER_INFO_SUCCESSED, FETCH_USER_INFO_FAILED, FOLLOW_USER, FOLLOW_USER_SUCCESSED, FOLLOW_USER_FAILED, UNFOLLOW_USER, UNFOLLOW_USER_SUCCESSED, UNFOLLOW_USER_FAILED, GET_ALL_PURCHASES, GET_ALL_PURCHASES_SUCCESSED, GET_ALL_PURCHASES_FAILED, GET_ALL_USERS, GET_ALL_USERS_SUCCESSED, GET_ALL_USERS_FAILED, DELETE_USER, DELETE_USER_SUCCESSED, DELETE_USER_FAILED, REQUEST_MONEY, REQUEST_MONEY_SUCCESSED, REQUEST_MONEY_FAILED, VERIFY_CODE, VERIFY_CODE_SUCCESSED, VERIFY_CODE_FAILED, CANCEL_REQUEST, CANCEL_REQUEST_SUCCESSED, CANCEL_REQUEST_FAILED } from "./actionsType";


const initalState={

   
}

const userReducer=(state=initalState,action)=>{
    switch(action.type){
       
        // case REGISTERING_USER:
        //     return {
        //         ...state,
        //         loading:true,
        //         currentUserError:""
        //     }
        // case REGISTERING_USER_SUCCESS:
        //     return {
        //         ...state,
        //         loading:false,
        //         currentUser:action.payload.user,
        //         currentUserId:action.payload.user[0].id,
        //         // userCart:action.payload.cart,
        //         // userWishlist:action.payload.wishlist,
 
        //         userCart:action.payload.cart,
        //         allProds:action.payload.allProds

        //     }
        // case REGISTERING_USER_FAILED:
        //     return {
        //         ...state,
        //         loading:false,
        //         currentUser:{},
        //         currentUserError:action.payload
        //     }
       

        default: return state
    }
}

export default userReducer;