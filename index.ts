import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";



interface ICoins { 
    id : number;
    genstand : string;
    bud : number;
    navn : string;
}








//GetAll
 let getAllButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
 getAllButton.addEventListener("click", getAllCoins)

 

 let getAllOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("getAll");

 let url : string = "http://localhost:55534/api/coin/";



//GetOne
let inputGetone : HTMLInputElement = <HTMLInputElement>document.getElementById("getoneInput");
let getoneButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getoneButton");
getoneButton.addEventListener("click" , getOneCoin);
let getoneOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("getOne");


//Post
let postButton : HTMLButtonElement = <HTMLInputElement>document.getElementById("addButton");
postButton.addEventListener("click", addCoin)






function getAllCoins(): void{
    axios.get<ICoins[]>(url)
    .then((response: AxiosResponse<ICoins[]>) => {
        let data: ICoins[] = response.data;
        let longHtml: string = "<ol>";
        getAllOutput.innerHTML = JSON.stringify(data);
        
        data.forEach( (coins : ICoins) => {
            console.log(coins.id, coins.genstand, coins.bud, coins.navn)
            longHtml += "<li>" + "Id: "+ coins.id + " - " +  "Genstand: "+ coins.genstand + " - " + "Bud: " + coins.bud + " - " + "Navn: " + coins.navn +
            "</li>"; 
        });
        longHtml += "</ol>";
        getAllOutput.innerHTML = longHtml;
    })
    .catch((error: AxiosError) => {
        console.log(error);
        getAllOutput.innerHTML = error.message;
    });
}




function getOneCoin() : void {
    let id = inputGetone.value;
   
       if (id.length > 0)
       {
           axios.get<ICoins>(url + "/" + id)
               .then((response: AxiosResponse<ICoins>) =>{
               let dataOne : ICoins = response.data;
               let longHtml2: string = "<ol>";
   
               console.log(dataOne);
   
               getoneOutput.innerHTML = JSON.stringify(dataOne);
   
           
               console.log(dataOne.id, dataOne.genstand, dataOne.bud, dataOne.navn);
               
               longHtml2 += "<li>" + "Id: " + dataOne.id + " - "+ " Genstand: " + dataOne.genstand + " - " +" Bud: " +  dataOne.bud + " - "+ "Navn: " + dataOne.navn + "</li>";
               
          
               longHtml2 += "</ol>";
               getoneOutput.innerHTML = longHtml2; 
           });
       }      
       
   }


function addCoin(): void{

    let idinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addID");
    let genstandinputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("addGenstand");
    
    let addoutputElement : HTMLDivElement = <HTMLDivElement>document.getElementById("postOutput");


    let myID = Number(idinputElement.value);
    let myGenstand = genstandinputElement.value;
    


    axios.post<ICoins[]>(url, {Id : myID, Genstand: myGenstand,})
        .then((response : AxiosResponse<ICoins[]>) => {
            let message =  "<h6 id='responseMessage'>" + response.status + " " + response.statusText + "</h6>"; 
            
        addoutputElement.innerHTML = message;
        console.log(message);
    })

    .catch(function (error) {
    addoutputElement.innerHTML = error.message;
    console.log(error);

    });

}




