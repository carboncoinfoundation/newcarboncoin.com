# ICO Widget plan

## Main component state

* Terms accepted (bool)
* Token choice (NCC or NCCh)

## Child components

### Token Balances (NCC, NCCh, CCE[?])

Visibility: true

Parent container requests balances from services.newcarboncoin.com/ico. Saves these as state. Passed down as props to token balance components.

### Terms widget

Visibility: Terms accepted === false

Contains a number of checkbox components that allow different words to be agreed to. Links out to relevant documents in new tab.

### Terms reminder

Visibility: Terms accepted === true

Show that terms have been accepted. Button to clear acceptance and reset state. This should delete the cookie as well.

### Contract widget

Visibility: Terms accepted === true

Displays the contract addresses

### Instructions

props: Token choice
