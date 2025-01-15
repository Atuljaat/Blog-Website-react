import { Client, ID , Databases , Storage , Query} from "appwrite";
import config from "../config/config"

class Database {
    client = new Client;
    databases;
    storage;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                    .setProject(config.projectID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost (slug,{title,content,featuredImage,status,userID}) {
        try {
         return  await this.databases.createDocument(config.databaseID,config.collectionID,slug,{title,content,featuredImage,status,userID})
        } 
        catch (error) {
            console.log('ERROR IN CREATING POST  : ', error)
        }
    }

    async deletePost (slug){
        try {
        await  this.databases.deleteDocument(config.databaseID,config.collectionID,slug); 
        return true;
    } 
        catch (error) {
            console.log('ERROR DELETING POST : ' , error);
            return false;
        }
    }

    async updatePost (slug,{title,content,featuredImage}){
        try {
         return   await  this.databases.updateDocument(config.databaseID,config.collectionID,slug);
        } catch (error) {
            console.log("ERROR UPDATING POST : " , error)
        }
    }

    async getPost (slug){
            try {
            return  await this.databases.getDocument(config.databaseID,config.collectionID,slug);    
            } 
            catch (error) {
                console.log('ERROR IN GET POST ' , error);
                return false;
            }
    }

    async getPosts (queries = [Query.equal('status','active')]) {
        try {
           return await this.databases.listDocuments(
            config.databaseID,
            config.collectionID,
            queries
           )
        } catch (error) {
            console.log('ERROR GET POSTS : ' , error);
            return false
        }
    }

    // file methods (upload and delete)

    async uploadFile (file){
        try {
           return await this.storage.createFile(config.bucketID,ID.unique(),file)
        } catch (error) {
            console.log('FILE UPLOAD ERROR : ' , error);
            return false
        }
    }

    async deleteFile (id) {
        try {
            await this.storage.deleteFile(config.bucketID,id);
            return true
        } 
        catch (error) {
            console.log('DELETE FILE ERROR :' , error)
            return false
        }
    }

    getFilePreview (fileId){
        return this.storage.getFilePreview(config.bucketID,fileId)
    }
}

let database = new Database();
export default database
