import {createContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
let [globalUserId, setGlobalUserId] = useState()

const userIdPromise = new Promise(async function (resolve, reject) {
    try {
        const session = await useSession()
        const {data: {id}} = session;
        resolve(id);
    } catch (e) {
        reject(e);
    }
});

userIdPromise.then(userId => {
    console.log('userIdPromise', userId)
    setGlobalUserId(userId)

}).catch(error => {
    // console.error(error);
});
console.log('globalUserId', globalUserId)

const GlobalUserIdContext = createContext(null)

const GlobalUserIdContextProvider = ({children}) => {
    return(
        <GlobalUserIdContext.Provider value={}>

        </GlobalUserIdContext.Provider>
    )
}