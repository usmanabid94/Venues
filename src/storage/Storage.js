import  AsyncStorage  from "@react-native-community/async-storage"



class Storage {


    static async saveItem(remember) {
        try {
            await AsyncStorage.setItem('remember', remember);
        }
        catch (error) {
            console.log('error while saving in db',error)
        }
    }
    static async getItem(item) {
        try {
            item = await AsyncStorage.getItem(item);
            return item
        }
        catch (error) {
            console.log('error while retieving from db',error)
        }
    }


}

export default Storage;