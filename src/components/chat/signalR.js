import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const getToken = () => localStorage.getItem("token");
    let hubConnection = null;
    let hubConnection1 = null;
    export const startSignalrConnection =(callBack)=>{
         hubConnection = new HubConnectionBuilder()
            .withUrl(apiUrl+"/ChatHub", { accessTokenFactory: () =>  getToken() })
        .build()
        hubConnection.start();
        // hubConnection.on("GetMessage",function(message){
        //     console.log(message);
        //     callBack(-1,0,message);
        // });
        hubConnection.on("ReceiveMessage",function(message){
            callBack(message);
        })

       
        
    }
    
    export const startSignalrConnectionForMessageList = (callBack)=>{
        const hubConnection1 = new HubConnectionBuilder()
        .withUrl(apiUrl+"/ChatHub", { accessTokenFactory: () =>  getToken() })
        .build()
        hubConnection1.start();
        hubConnection1.on("ReceiveMessageList",function(message){
            callBack(message);
        })
    }

    export const sendMessageToChatHub = (conversationModel,callBack)=>{
        hubConnection.invoke("sendMessage",conversationModel)
       
    }