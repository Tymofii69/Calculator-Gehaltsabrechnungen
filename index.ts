// Import stylesheets
import './style.css';

let firstInput = document.querySelectorAll("input")[0];
let secondInput = document.querySelectorAll("input")[1];

//the `P` before the name of property means that it's a percentage. It would be easier, if I won't create so many parametres and just use the actual percentages for 2018 without variables. But the idea is to create a class, that could be used for the individual objects, which will name the Gehaltsabrechnungen for different years. So I can create `new Calculator` named "calc2018"/"calc2022"... . That will make the process of redacting this app for different years/percentages easier 

class Calculator{
  public Psolidaritat:  number;
  public Pkirchen:  number;
  public Prenten:  number;
  public Parbeit:  number;
  public Pkranken:  number;
  public Ppflege:  number;
  public Psparen: number;
  public Pleistung: number;

  public _brutto: number;
  public _lohn: number;

  public solidaritat:  number;
  public kirchen:  number;
  public renten:  number;
  public arbeit:  number;
  public kranken:  number;
  public pflege:  number;
  public sparen: number;
  public leistung: number;




  constructor(Psolidaritat: number, Pkirchen: number,Prenten: number, Parbeit: number, Pkranken: number,Ppflege: number, Psparen: number, Pleistung: number){
     this.Psolidaritat = Psolidaritat;
     this.Pkirchen =     Pkirchen;
     this.Prenten =      Prenten;
     this.Parbeit =      Parbeit;
     this.Pkranken =     Pkranken;
     this.Ppflege =      Ppflege;
     this.Psparen =      Psparen;
     this.Pleistung =    Pleistung;
  }

  public get Brutto(){
    return this._brutto;
  }
  public set Brutto(brtValue: number){
    this._brutto = brtValue + this.Pleistung;
    if (brtValue > 6500){
      this.renten = this.Prenten / 100 * 6500;
      this.arbeit = this.Parbeit / 100 * 6500;
    } else{
      this.renten = this.Prenten / 100 * this._brutto;
      this.arbeit = this.Parbeit / 100 * this._brutto;
    };

    if (brtValue > 4425){
      this.kranken = this.Pkranken * 4425 / 100;
      this.pflege = this.Ppflege * 4425 / 100;
    } else{
      this.kranken = this.Pkranken * this._brutto / 100;
      this.pflege = this.Ppflege * this._brutto / 100;
    }

  }

  public get Lohn(){
    return this._lohn;
  }
  public set Lohn(lohnValue: number){
    this._lohn = lohnValue;
    this.solidaritat = lohnValue * this.Psolidaritat / 100;
    this.kirchen = lohnValue * this.Pkirchen / 100;
  }

  calculate(): number{
    return this._brutto - this._lohn - this.solidaritat - this.kirchen - this.kranken - this.renten - this.arbeit - this.pflege - this.Psparen;
  }

}

let calc2018 = new Calculator(5.5, 8, 9.3, 1.5, 8.2, 1.275, 40, 20);
// calc2018.Brutto = 6800;
// calc2018.Lohn = 1600;
// console.log(calc2018.calculate().toFixed(2));

let button = document.querySelector("button");
button.addEventListener("click", ()=>{
  let brutto: number = Number(firstInput.value);
  let lohn: number = Number(document.querySelectorAll("input")[1].value);
  calc2018.Brutto = brutto;
  calc2018.Lohn = lohn;
  let result: string = calc2018.calculate().toFixed(2);


  document.querySelector("p").innerText = `The result is ${result}!`;
});