/**
 * Created by Administrator on 2017/5/26.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

/*公共编辑组件-*/
class EditComponent extends Component {
  constructor(props) {
    super(props);
    this.onSelectChange   = this.onSelectChange.bind(this);
    this.onInputChange  = this.onInputChange.bind(this);
    this.onCheckChange  = this.onCheckChange.bind(this);
    this.onDatePickerChange  = this.onDatePickerChange.bind(this);
    this.setSelectValue = this.setSelectValue.bind(this);
    this.setDatePickerValue = this.setDatePickerValue.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  /*阻止form提交*/
  onFormSubmit(event) {
    event.preventDefault();
  }

  /*普通input*/
  onInputChange(event) {
    let name = event.target.name;
    let value=  event.target.value;
    let state = {};
    state[name] = value;
    console.log(state);
    this.setState(state);
  }

  //checkBox
  onCheckChange(event) {
    let name = event.target.name;
    let value= event.target.checked?'1':'0';
    let state = {};
    state[name] = value;
    console.log(state);
    this.setState(state);
  }

  /**
   * selectpicker
   * @param ref
   * @param callBack 回调函数，选项选择后执行
   */
  onSelectChange(ref,callBack){
    let self = this;
    let name = ref.name;
    $(ref).on('changed.bs.select', function (e) {
      let value = $(ref).selectpicker('val')
      let state = {};
      state[name] = value;
      console.log(state);
      self.setState(state);
      if (callBack) callBack();
    });
  }

  onDatePickerChange(ref,callBack){
    let self = this;
    let name = $(ref).attr('name');
    $(ref).on('dp.change',function(date,oldDate) {
      let value = $(ref).data().date;
      let state = {};
      state[name] = value;
      console.log(state);
      self.setState(state);
      if (callBack) callBack();
    });
  }

  //selectpicker设置选中值
  setSelectValue(ref,value){
    // let val = value||'';//(value === undefined?'':value);
    $(ref).selectpicker('val', value||'');
  }

  //设置DatePicker值
  setDatePickerValue(ref,value){
    let picker = $(ref).data("DateTimePicker");
    if (picker) {
      // let val = value||'';//(value ? value: '');
      picker.date(value||'')
    }
  }
}

/*公共界面-*/
class PubModal extends EditComponent {
  constructor(props) {
    super(props);

    this.state = {
      title:this.props.title,
      warn: '',
      okClick: this.props.okClick||(()=>{}),
      modalStyle:this.props.modalStyle||{}
    };
  }

  /*componentDidMount() {

  }

  componentWillUnmount() {

  }*/

  //留给子类扩展
  ModalBody(){

  }

  OtherButton(){

  }

  showModal(state,callBack){
    let ca = callBack?callBack:()=>{};
    if (state!==undefined)
      this.setState(Object.assign({},state,{warn: ''}),ca)
    else
      this.setState({warn: ''},ca)

    $(this.PubModal).modal({backdrop: 'static', keyboard: false});
  }

  closeModal(){
    $(this.PubModal).modal("hide");
  }

  render() {
    let warn = this.state.warn;
    let WarnSpan = '';
    if ((warn!==undefined)&&(warn!=='')){
      WarnSpan = <span className="label label-warning warn-span" style={{float: 'left'}}>{warn}</span>
    }
    return (
        <div ref={dom=>this.PubModal=dom} className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" style={this.state.modalStyle} role="document">
            <div className="modal-content ">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title">{this.state.title}</h4>
              </div>
              <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
                {/*自定义内容加在这里*/}
                <div ref={dom=>this.PubModalBody=dom} className="modal-body">
                  {this.ModalBody()}
                </div>

                <div className="modal-footer">
                  {WarnSpan}
                  {this.OtherButton()}
                  <button type="submit" className="btn btn-outline-success" onClick={this.state.okClick}>确定</button>
                  <button className="btn btn-outline-warning" data-dismiss="modal">取消</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export {
  PubModal,
  EditComponent,
}