import { Component, createEffect, createSignal } from "solid-js";
import './components/app.css'
import { Algo, IAccount } from "./chain/algo";


const App: Component = () => {
  const algo = new Algo();

  const [account, setAccount] = createSignal("");
  const [reciver, setReciver] = createSignal({
    username: "",
    amount: "",
  });
  const [algocoin, setalgoCoin] = createSignal();

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f66cd1d01emshd5f00aee61a4c56p16f2aejsnb029116c21a7',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const price = async () => {
    const response = await fetch('https://coinranking1.p.rapidapi.com/coin/TpHE2IShQw-sJ?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', options)
    const json = await response.json();
    
    setalgoCoin(json?.data?.coin);
    console.log(algocoin())
  }


  const handleClick = (event: any) => {
    const address = event.target.value;
    console.log(address);
    algo.createAccount().then((account) => {
      console.log("the account is", account);
      setAccount(account);
      localStorage.setItem("account_value", JSON.stringify(account))
    });

  };


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("On change => ", name, "value => ", value)
    setReciver({ ...reciver(), [name]: value });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(reciver());
  };




createEffect(async() => {
  await price()
  setAccount(JSON.parse(localStorage.getItem("account_value")))
  // console.log(algocoin())
} , []);


  const getAccountDetailshandleClick = (event: any) => {
    algo.getAccount(account()?.address).then((accountdetails) => {
      console.log("accountdetails", accountdetails);
    })
  };



  const transact = () => {
    algo.transactions(account().account_mnemonic).then(txs => {
      console.log("first transation", txs)

    })
  }

  function refre() {
    location.reload()
  }
  console.log("first => ", reciver())

  return (
    <>
      <div class="pb-10 ">

        <div class="container text-center py-10 bg-gradient-to-l from-green-400 to-blue-400">
          <h1 class="text-black text-5xl font-thin">ALGORAND DAPP 1.0</h1>
        </div><hr />
        <div class="flex">
          <div class=" w-3/6 px-4 py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="w-full shadow-2xl border-1 border-black-300 sm:w-auto px-4 py-10 rounded-xl bg-white text-black mb-6 sm:mb-0">


                <h4 class="text-xl">CREATE YOU TESTNET WALLET</h4><br></br>

                <input onChange={handleChange} type="text" class="form-input mb-2  px-4 py-2 rounded-full" name='username' placeholder="NAME"></input>
                <br></br>
                <input onChange={handleChange} type="email" class="form-input mb-2 mt-3 px-4 py-2 rounded-full" name='email' placeholder="EMAIL"></input>
                <br></br>
                <button class=" border-indigo-600 rounded-full px-4 mx-2 py-2 bg-blue-500 font-bold  text-white" onclick={(e)=>{ handleClick(e); handleSubmit(e);}} >Create Account</button>
                {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full" onclick={getAccountDetailshandleClick}>Get Account</button> */}




              </div>
            </div>

          </div>

          <div class=" w-3/6 px-4 py-12">
            <div class="mx-auto max-w-7xl px-4 border-1 border-black-300 sm:px-6 lg:px-8 shadow-2xl sm:w-auto px-4 py-10 rounded-xl bg-white text-black">
              <span class="font-light">Wallet Address</span>
              <h4 class="text-base font-bold  border-gray-200 border- p-4 ">{account()?.address} </h4><br></br>
              <span class="font-light">Wallet Amount</span>
              <p class="text-base font-bold  border-gray-200 border- p-2 ">{account()?.amount}</p>
              <span class="font-light">Wallet Mnemonic</span>
              <p class="text-base font-bold  border-gray-200 border- p-4 ">{account().account_mnemonic}</p>

            </div>

          </div>


        </div>
        <div class="flex">

        <div class=" w-3/6 px-4">
            <div class="mx-auto max-w-7xl border-1 border-black-300 sm:px-6 lg:px-8 shadow-2xl sm:w-auto px-4 py-10 rounded-xl bg-white text-black">
              <h2 class="text-base font-bold  border-gray-200 border- p-2">CURRENCY INFORMATION</h2>
              {/* <table class="border-collapse border mb-4 border-slate-400 ...">
                      <thead>
                        <tr>
                          <th class="border border-slate-300 px-2 py-2...">Address</th>
                          <th class="border border-slate-300 px-2 py-2...">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-slate-300 px-2 py-2 ...">{account()?.address}</td>
                          

                          <td class="border border-slate-300 px-2 py-2...">{account()?.amount}</td>
                        
                        </tr>
                      </tbody>
                    </table> */}

                  <img src={algocoin()?.iconUrl} width='50px' class="mt-2 mb-2"></img>
                  <h2 class="pt-2 pb-2 font-light" text-lg>BlockChain Name: {algocoin()?.name}</h2>
                  <p class="pt-2 pb-2 font-light text-lg">Current Market Price: {algocoin()?.price} $</p>
                  <p class="pt-2 pb-2 font-light text-lg">RANK:{algocoin()?.rank}</p>
                  <p class="pt-2 pb-4 font-light text-lg">Market Cap: {algocoin()?.fullyDilutedMarketCap}$</p>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onclick={refre}>Refresh Data</button>
              </div>

          </div>
          <div class=" w-3/6 px-4 py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="w-full shadow-2xl border-1 border-black-300 sm:w-auto px-4 py-10 rounded-xl bg-white text-black mb-6 sm:mb-0">


              <h2 class="text-base font-bold  border-gray-200 border- p-2">SEND ALGOS</h2>



              <input type="text" class="form-input px-4 py-2 rounded-full" name='account' placeholder="RECIEVER ACCOUNT"></input>
              <br></br>
              <input type="number" class="form-input mb-2 mt-3 px-4 py-2 rounded-full" name='amount' placeholder="TOTAL ALGOS"></input>
              <br></br>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onclick={transact}>SEND</button>

                      

              </div>
            </div>

          </div>

          


        </div>
      </div>
    </>
  );
};

export default App;
