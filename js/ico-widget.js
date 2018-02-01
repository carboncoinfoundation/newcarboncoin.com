class ICODataWidget extends React.Component {

  state = {
    NCCh_tokens_left: 0,
    NCC_tokens_left: 0,
  }

  componentDidMount() {
    fetch('https://services.newcarboncoin.com/ico/get-token-data', {
      credentials: 'same-origin'
    })
    .then((response => response.json()))
    .then((json => this.setState(json)))
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    const { children } = this.props;
    const { NCCh_tokens_left, NCC_tokens_left } = this.state;
    return (
      <div className="full-width-grey">
        <div className="container">
          <div className="row">
            <TokenBalance tokenName="NCC" tokensDistributed={ NCC_tokens_left } />
            <TokenBalance tokenName="NCCh" tokensDistributed={ NCCh_tokens_left } />
            <TokenBalance tokenName="CCE" tokensDistributed="1450" />
          </div>
        </div>
      </div>
    )
  }
}

class TokenBalance extends React.Component {

  render() {
    const {tokenName, tokensDistributed} = this.props;
    return (
      <div className="col-lg-4 col-sm-12">
        <section className="introduction">
          {tokenName}<br/>
          {tokensDistributed}
        </section>
      </div>
    )
  }
}

class ContractsWidget extends React.Component {

  state = {
    NCC_Contract: 'XXX',
    NCCh_Contract: 'XXX'
  }

  componentDidMount() {
    fetch('https://services.newcarboncoin.com/ico/get-contract-addresses', {
      credentials: 'include'
    })
    .then((response => {
      return response.json()
    }))
    .then((json => this.setState(json)))
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    const {NCC_Contract, NCCh_Contract} = this.state;
    return (
      <div className="full-width-white">
        <div className="container">
          <div className="col-lg-4 col-lf-offset-2 col-sm-12">
            <section className="introduction">
              Ethereum Classic Contract Address:<br/>
              { NCC_Contract }
            </section>
          </div>
          <div className="col-lg-4 col-lf-offset-2 col-sm-12">
            <section className="introduction">
              Ethereum Contract Address:<br/>
              { NCCh_Contract }
            </section>
          </div>
        </div>
      </div>
    )
  }
}

class TermsWidget extends React.Component {

  acceptTerms = () => {
    fetch('https://services.newcarboncoin.com/ico/set-acceptance-cookie', {
      credentials: 'include',
      mode: 'no-cors',
    })
    .then((response => response))
    .then((body => this.props.handleAcceptTurns()))
    .catch(function(ex) {
      console.log('request failed', ex)
    })
  }

  render() {
    const { tokenName, tokensDistributed } = this.props;
    return (
      <div className="full-width-grey">
        <div className="container">
          <div className="col-lg-10 col-lg-offset-2 col-sm-12">
            <section className="terms">
              Do you accept the terms and conditions?
              <button onClick={this.acceptTerms}>Accept</button>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

class ICOWidget extends React.Component {

  state = {
    acceptedTerms: false,
  }

  acceptTerms = () => {
    this.setState({
      acceptedTerms: true,
    })
  }

  render() {
    const { acceptedTerms } = this.state;
    return (
      <div>
        <ICODataWidget />
        {!acceptedTerms && (
          <TermsWidget handleAcceptTurns={this.acceptTerms} />
        )}
        {acceptedTerms && (
          <ContractsWidget />
        )}
      </div>
    )
  }
}
ReactDOM.render(
    <ICOWidget />,
    document.getElementById('ico-widget')
);
