const error = (store : any) => (next : any) => (action : any) => {

    if(action.type === "error"){
        console.log("Toastify: " + action.payload.message )
    }else{
        next(action)
    }

} 

export default error