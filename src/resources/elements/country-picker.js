import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from 'aurelia-framework';

export class CountryPicker{

    @bindable country;

    constructor(){  
        this.selected = {"name" : 'Australia', "code" : 'AU'};
        this.templateUrl = 'templates/country-template.html';
    }

    getCountries(countryName){
        let client = new HttpClient();
        return client.fetch('countries.json')
             .then(response  => response.json())
             .then(countries => {
    
                if(!countryName) return countries;
    
                return countries.filter(c => c.name.toUpperCase().indexOf(countryName.toUpperCase() !== -1));
    
             });
    
    }

    countryChanged(evt){
        if(!evt.target) return;

        this.country = evt.target.value;
    }
}

