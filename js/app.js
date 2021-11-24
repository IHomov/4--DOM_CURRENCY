const countriesURL = "https://restcountries.com/v3.1/all";
const cursNbuURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

let countries = await fetch(countriesURL);
countries = await countries.json();  // валюта всех стран

let cursNbu = await fetch(cursNbuURL); // курс валют НБУ
cursNbu = await cursNbu.json();

countries = countries
                    .filter(item => item.currencies)
                    .map(item => ({
                        title: item.name.common,
                        flag: item.flags.png,
                        cc: Object.keys(item.currencies)
                    }));

for(let rate of cursNbu){
        rate.countries = countries.filter(item => item.cc.includes(rate.cc));
}
    
cardPlace.innerHTML = cursNbu.map(item => `
        <table class="table table-bordered table-hover text-wrap ">
            <thead>
                <tr>
                <th scope="col">Currency</th>
                <th scope="col">Rate</th>
                <th scope="col">Flag</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class = "w-25">${item.txt} (${item.cc})</td>
                    <td class = "w-25" >${item.rate}</td>
                        ${item.countries.map(item => `
                    <td class = "d-flex flex-wrap class = "w-25"> <img src = "${item.flag}"
                        style="width: 3rem; height: 1.5rem"
                                title=
                                        "${item.title}"
                        alt= "flag"
                        class=" border border-2 ">
                    </td>`).join('')}
                
                </tr>
            </tbody>
        </table >
    `).join('');


let tag = document.createElement('h1');
tag.innerHTML = `<h1> Курсы валют от НБУ на ${cursNbu[0].exchangedate}</h1>`;
cardPlace.prepend(tag);

