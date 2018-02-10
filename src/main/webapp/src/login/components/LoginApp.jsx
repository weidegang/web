import React, { Component } from 'react'
/**
 * 登录窗口
 */
class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {warn:''}
    this.doLogin = this.doLogin.bind(this)
  }

  componentDidMount() {

  }

  doLogin(){
    let self = this;
    var $login = $(this.loginBtn).button('loading')
    $.ajax({
      type : "post",
      url : "/web/login/doLogin1",
      data : {
        userName:self.userName.value,
        passWord:self.passWord.value,
      },
      async : false,   //注意：此处是同步，不是异步
      success : (data)=>{
        $login.button('reset');
        if(data.result =="success"){
          self.loginForm.submit();
        }else{
          self.setState({warn:data.reason});
        }
      },
      fail:()=>{
        $login.button('reset');
      }
    });
  }

  render() {
    return (
      <div className="demo form-bg" >
        <div className="container">
          <div className="col-md-offset-3 col-md-6" style={{top:"15vh"}}>
            <form ref={dom=>this.loginForm=dom} className="form-horizontal" method="post" action="/web/index">
              <span className="heading">用户登录</span>
              <div className="form-group">
                <input ref={dom=>this.userName=dom} type="text" className="form-control"
                       onChange={(e)=>{this.setState({userName: e.target.value})}}
                       id="userName" name="userName" placeholder="用户名"
                        value={this.state.userName||''} />
                  <i className="fa fa-user"></i>
              </div>
              <div className="form-group help" >
                <input ref={dom=>this.passWord=dom} type="password" className="form-control"
                       onChange={(e)=>{this.setState({passWord: e.target.value})}}
                       id="passWord" name="passWord" placeholder="密　码"
                       value={this.state.passWord||''} />
                <i className="fa fa-lock"></i>
                <a href="#" className="fa fa-question-circle"></a>
              </div>

              <div style={(()=>{
                if (this.state.warn.length===0){
                  return {display:'none'}
                }else
                  return {paddingLeft:'40px',paddingRight:'40px'}
              })()} >
                <div className="alert alert-danger" role="alert" style={{padding:'8px'}}>
                  <span className="fa fa-exclamation-circle" aria-hidden="true"></span>
                  {/*<span className="sr-only">Error:</span>*/}
                  &nbsp;{this.state.warn||''}
                </div>
              </div>
              <div className="form-group">
                <div className="main-checkbox">
                  <input type="checkbox" value="None" id="checkbox1" name="check"/>
                  <label htmlFor="checkbox1"></label>
                </div>
                <span className="text">记住密码</span>
                <button type="button" ref={dom =>this.loginBtn = dom} onClick={this.doLogin}
                        className="btn btn-default"
                        data-loading-text="正在登录...">登录</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

export {LoginApp}