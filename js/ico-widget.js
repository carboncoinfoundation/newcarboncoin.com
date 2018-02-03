

class ICODataWidget extends React.Component {

  state = {
    NCCh_tokens_left: 0,
    NCC_tokens_left: 0,
  }

  componentDidMount() {
    fetch(`${ICO_backendURL}/ico/get-token-data`, {
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
      <div className="full-width-white">
        <div className="container">
          <div className="row">
            <TokenStatus tokenName="CCE" tokensDistributed="1450" />
            <TokenStatus tokenName="NCC" tokensDistributed={ NCC_tokens_left } />
            <TokenStatus tokenName="NCCh" tokensDistributed={ NCCh_tokens_left } />

          </div>
        </div>
      </div>
    )
  }
}

class TokenStatus extends React.Component {

  render() {
    const {tokenName, tokensDistributed} = this.props;
    const blockExplorerURL = `${TokenInfo[tokenName].blockExplorerURL}/token/${TokenInfo[tokenName].tokenAddress}`;
    return (
      <div className="col-md-4 col-sm-12">
        <section className="TokenStatus">
          <h4>{tokenName}</h4>
          {tokenName != 'CCE' && (
            <dl className="right">
              <dt>Network:</dt><dd>{TokenInfo[tokenName].networkName}</dd>
              <dt>Total supply:</dt><dd>40,000,000</dd>
              <dt className="total">Total issued:</dt><dd className="total">{tokensDistributed}</dd>
              <dt>Links:</dt><dd><a href={blockExplorerURL} target="new">token contract</a> • <a href="https://github.com/carboncoinfoundation/ico" target="new">source code</a></dd>
            </dl>
          )}
          {tokenName === 'CCE' && (
            <dl className="right">
              <dt>Network:</dt><dd>{TokenInfo[tokenName].networkName}</dd>
              <dt>Total supply:</dt><dd>80,000,000</dd>
              <dt className="total">Total issued:</dt><dd className="total">23,000,000</dd>
              <dt>Links:</dt><dd><a href={blockExplorerURL} target="new">token contract</a> • <a href="https://github.com/carboncoinfoundation/swapout" target="new">source code</a></dd>
            </dl>
          )}
        </section>
      </div>
    )
  }
}

class ContractStatus extends React.Component {
  render() {
    const { tokenName, tokenAddress, tokenChoice, price } = this.props;
    const explorerUrl = `${TokenInfo[tokenName].blockExplorerURL}/contract/${TokenInfo[tokenName].contractAddress}`;
    return (
      <div className={`ContractStatus ContractStatus-Selected_${tokenChoice === tokenName}`}>
        <h4>{TokenInfo[tokenName].networkName}</h4>
        <dl className="right">
          <dt>Token:</dt><dd>{tokenName}</dd>
          <dt>Links:</dt><dd><a href={explorerUrl} target="new">Crowdsale contract</a> • <a href="https://github.com/carboncoinfoundation/ico" target="new">source code</a></dd>
          <dt className="total">Price per token:</dt><dd className="total">{price} { TokenInfo[tokenName].networkCurrencyName }</dd>
          <dt>Contract Address</dt><dd className="smaller">{tokenAddress}</dd>

        </dl>
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
    fetch(`${ICO_backendURL}/ico/get-contract-addresses`, {
      credentials: 'include'
    })
    .then((response => {
      return response.json()
    }))
    .then((json => {
      TokenInfo.NCC.contractAddress = json.NCC_Contract;
      TokenInfo.NCCh.contractAddress = json.NCCh_Contract;
      this.setState(json);
    }))
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    const {NCC_Contract, NCCh_Contract} = this.state;
    const { tokenChoice } = this.props;
    return (
      <div className="ContractsWidget">
        <div className="full-width-grey">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-md-offset-2">
                <h2>Please choose a network</h2>
                <p>The same Crowdsale ICO contract is running on Ethereum Classic and Ethereum.</p>
                <p>We wanted to make participation in the ICO as accessible as possible.</p>
                <p>The price of each token has been calculated based on the historical price of Ethereum and Ether Classic.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="full-width-grey">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <section onClick={() => this.props.handleChooseToken('NCC')}>
                  <ContractStatus tokenName="NCC" tokenChoice={tokenChoice} tokenAddress={NCC_Contract} price={2342.1231} />
                </section>
              </div>
              <div className="col-md-6  col-sm-12">
                <section onClick={() => this.props.handleChooseToken('NCCh')}>
                  <ContractStatus tokenName="NCCh" tokenChoice={tokenChoice} tokenAddress={NCCh_Contract} price={9873.1231} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class TermsReminder extends React.Component {

}

class TermsWidget extends React.Component {

  state = {
    t1: false,
    t2: false,
  }

  acceptTerms = () => {
    fetch(`${ICO_backendURL}/ico/set-acceptance-cookie`, {
      credentials: 'include',
      mode: 'no-cors',
    })
    .then((response => response))
    .then((body => this.props.handleAcceptTurns()))
    .catch(function(ex) {
      console.log('request failed', ex)
    })
  }

  acceptItem = (e) => {
    this.setState({[e.target.name]: e.target.checked})
  }

  render() {
    const { tokenName, tokensDistributed, tokenCost } = this.props;
    const {t1, t2, t3} = this.state;

    return (
      <div className="TermsWidget full-width-grey">
        <div className="container">
          <div className="col-md-6 col-sm-12">
            <section>
              <h2>Before we proceed</h2>
              <p>You must accept all the terms and conditions of the Carboncoin ICO before proceeding. We are only sharing the ICO contract details with people who explicitly opt in to the conditions.</p>
            </section>
          </div>
          <div className="col-md-5 col-md-offset-1 col-sm-12">
            <section className="terms">
              <p>Please read and accept the following terms to proceed with the ICO.</p>
              <AcceptanceCheckbox name="t1" text="I have read the Privacy Policy" name="t1" value="privacy" ticked={t1} handleToggle={this.acceptItem} />
              <AcceptanceCheckbox name="t2" text="I have read the Terms and Conditions" name="t2" value="terms" ticked={t2} handleToggle={this.acceptItem}  />
              <p><button className="TermsWidget-proceed btn btn-primary btn-lg" disabled={!(t1 && t2)} onClick={this.acceptTerms}>Proceed to ICO</button></p>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

class AcceptanceCheckbox extends React.Component {

  render() {
    const { text, name, value, ticked, handleToggle } = this.props;

    return (
      <p className="AcceptanceCheckbox">
        <label>
        { text } <input type="checkbox"
              name={name}
              checked={ticked}
              onChange={handleToggle}
              value={value} />
            </label>
      </p>
    )
  }
}

class InstructionsWidget extends React.Component {
  render() {

    const { tokenChoice } = this.props;
    const {networkName, networkCurrencyName, tokenAddress, tokenCost} = TokenInfo[tokenChoice];

    return (
      <div className="InstructionsWidget full-width-white">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-1">
              <h3>ICO Instructions</h3>
              <p>You have chosen the {tokenChoice} token on {networkName}.</p>
            </div>
            <section className="instructions col-md-6">
              <div className="InstructionsWidget-Step">
                <h5>1. Setup and secure an { networkName } wallet</h5>
                <p>It's very important you don't lose access to your tokens. Make sure to fully secure your wallet.</p>
              </div>
              <div className="InstructionsWidget-Step">
                <h5>2. Get some { networkCurrencyName }</h5>

                <p>You will need to send some { networkCurrencyName } to our ICO contract to get your tokens.</p>
              </div>
              <div className="InstructionsWidget-Step">
                <h5>3. Send { networkCurrencyName } to the ICO Contract</h5>

                <p>This is the contract address:</p>

                <p className="important-data">{ TokenInfo[tokenChoice].contractAddress }</p>

                <p>The price is { tokenCost } { networkCurrencyName } for each { tokenChoice } token</p>
                <p>When you send the ICO Contract some Ether, it will mint your NCC tokens and transfer them to your { networkName } address.</p>
              </div>
              <div className="InstructionsWidget-Step">
                <h5>4. Add the { tokenChoice } token to your wallet</h5>
                <dl>
                  <dt>Token address: </dt> <dd>{ tokenAddress }</dd>
                  <dt>Symbol: </dt> <dd>{tokenChoice}</dd>
                  <dt>Decimal Places: </dt> <dd>8</dd>
                </dl>
              </div>

            </section>
          </div>
        </div>
      </div>
    )
  }
}

const TokenInfo = {
  NCC: {
    tokenCost: 43124.12312,
    tokenAddress: '0x7d9597009966630DF9Ae4fA56AFAc2B6ee0De938',
    networkCurrencyName: "Ether Classic",
    networkName: "Ethereum Classic",
    blockExplorerURL: "http://gastracker.io"
  },
  NCCh: {
    tokenCost: 123.14234,
    tokenAddress: '0x879597009966630DF9Ae4fA56AFAc2B6ee0De938',
    networkCurrencyName: "Ether",
    networkName: "Ethereum",
    blockExplorerURL: "https://etherscan.io",
  },
  CCE: {
    tokenAddress: '0x47f92ebf4881359469bceffe1f753fe910701024',
    networkCurrencyName: "Ether",
    networkName: "Ethereum",
    blockExplorerURL: "https://etherscan.io",
  }
}



class ICOWidget extends React.Component {

  state = {
    acceptedTerms: false,
    tokenChoice: false,
    contractAddress: null,
  }

  acceptTerms = () => {
    this.setState({
      acceptedTerms: true,
    })
  }

  chooseToken = (token) => {
    this.setState({
      tokenChoice: token,
    })
  }

  render() {
    const { acceptedTerms, tokenChoice } = this.state;
    return (
      <div>
        <ICODataWidget />
        {!acceptedTerms && (
          <TermsWidget handleAcceptTurns={this.acceptTerms} />
        )}
        {acceptedTerms && (
          <ContractsWidget handleChooseToken={this.chooseToken} tokenChoice={tokenChoice} />
        )}
        {acceptedTerms && tokenChoice && (
          <InstructionsWidget tokenChoice={tokenChoice} />
        )}
      </div>
    )
  }
}
ReactDOM.render(
    <ICOWidget />,
    document.getElementById('ico-widget')
);
