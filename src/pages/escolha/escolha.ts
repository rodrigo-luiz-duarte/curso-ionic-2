import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Acessorio } from '../../domain/carro/acessorio';
import { Carro } from '../../domain/carro/carro';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
    templateUrl: 'escolha.html'
})
export class EscolhaPage implements OnInit {

    public carro: Carro;
    public acessorios: Acessorio[];
    private _precoTotal: number;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController
    ) {}

    ngOnInit() {
        this.carro = this.navParams.get('carroSelecionado');

        this.acessorios = [
            new Acessorio('Freio ABS', 800),
            new Acessorio('Ar-condicionado', 1000),
            new Acessorio('MP3 Player', 500)
        ];

        this._precoTotal = this.carro.preco;
    }

    get precoTotal() {
        return this._precoTotal;
    }

    atualizaTotal(ligado: boolean, acessorio) {

        ligado ?
            this._precoTotal+= acessorio.preco :
            this._precoTotal-= acessorio.preco;
    }

    // novo método 
    avancaNoAgendamento() {

        this.navCtrl.push(CadastroPage, {
            carro: this.carro, 
            precoTotal: this._precoTotal
        });
    }  
}