import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';


@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage implements OnInit {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;

  private _alerta: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController,
    private _agendamentoService: AgendamentoService
  ) {}

    ngOnInit(): void {

      this.carro = this.navParams.get('carro');
      this.precoTotal = this.navParams.get('precoTotal');
      this.agendamento = new Agendamento(this.carro, this.precoTotal);

      this._alerta =  this._alertCtrl.create({
        title: 'Aviso',
        buttons: [{ text: 'OK', handler: () => this.navCtrl.setRoot(HomePage) }]
      });
    }

    confirmeAgendamento() {

      if (!this.valideCamposObrigatorios()) {
        this.mostreMensagem('Preenchimento obrigatório', 'Você deve preencher todas as informações');
        return
      }

      this._agendamentoService.agenda(this.agendamento)
        .then(confirmado => {
          confirmado ? 
            this._alerta.setSubTitle('Agendamento realizado com sucesso!') :
            this._alerta.setSubTitle('Não foi possível realizar o agendamento. Tente mais tarde');

          this._alerta.present();         
      })
      .catch(err => {
        this.mostreMensagem('Erro', err.message);
      });
  }

  valideCamposObrigatorios() : Boolean {
    return !(!this.agendamento.nome || !this.agendamento.email || !this.agendamento.endereco);
  }

  mostreMensagem(titulo: string, mensagem: string) {
    this._alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: [{ text: 'OK'}]
    }).present();
  }
}
