const logger = (store : any) => (next : any) => (action : any) => {

    console.log("next", next)
    console.log("action", action)
    next(action)

}

export default logger