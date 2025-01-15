import { Client, Account , ID } from "appwrite";
import config from "../config/config"

class User {
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                    .setProject(config.projectID)
        this.account = new Account(this.client);
    }

    async createAccount ({email,password,name}) {
        try {
          const userAccount = await this.account.create(ID.unique(),email,password,name);
          console.log("useraccount",userAccount)
          if (userAccount) {
            // calling another method to login it directly when created
           return this.loginAccount({email,password})
          } else {
            return null
          }
        } catch (error) {
            throw error;
        }
    }

    async loginAccount ({email,password}){
        try {
          return await this.account.createEmailPasswordSession(email,password);
        } 
        catch (error) {
            console.log('this is a login error'  , error)
            // throw error;
        }
    }
    
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    
    async logoutAccount (){
        try {
            this.account.deleteSessions()
            return true
        } 
        catch (error) {
            console.log("LOGOUT ERROR " , error)
            return false
        }
    }

}   

let user = new User();
export default user