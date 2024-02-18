import { LightningElement } from 'lwc';
const DEALY = 300;
export default class MovieSearch extends LightningElement {
    selectedType = "";
    selectedSearch = "";
    loading = false;
    selectedPageNo = "1";
    dealyTimeout;
    searchResult = [];
    selectedMovie = "";

    
    get typeoptions() {
        return [
            { label: 'None', value: "" },
            { label: 'Movie', value: 'movie' },
            { label: 'Series', value: 'series' },
            { label: 'TV Showes', value: 'episode' },
        ];
    } 
    handleChange(event){
        
        let {name, value}= event.target;
        this.loading = true;
        if(name === 'type'){
            this.selectedType = value;
        }else if(name === 'search'){
            this.selectedSearch = value;
        }else if(name === 'pageno'){
            this.selectedPageNo = value;
        }
        //Debounding 
        clearTimeout(this.dealyTimeout);
        this.dealyTimeout = setTimeout(()=>{
            this.searchMovie();
        },DEALY);
              
    }
    // this Method Will Search for the Enter Movie
    async searchMovie(){

        const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=176bcade`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("Movie Search Output", data);
        }
    

   
}