import { Component, createEffect, createSignal } from "solid-js";
import './components/app.css'
import { Algo, IAccount } from "./chain/algo";


const App: Component = () => {
  const algo = new Algo();

  const [account, setAccount] = createSignal("");

  const handleClick = (event: any) => {
    const address = event.target.value;
    console.log(address);
    algo.createAccount().then((account) => {
      console.log("the account is",account);
      setAccount(account);
      localStorage.setItem("account Value", JSON.stringify(account.address))
    });
    
  };
  

  
  // createEffect(() => localStorage.setItem("account value is", JSON.stringify(account())))

  const getAccountDetailshandleClick = (event: any) => {
    algo.getAccount("O3FTFSEO73ZAAIMPAUSJA2ZLV3CTCO67WHY3VLS5N64DMIKNMQBBNH25NY").then((accountdetails)=>{
      console.log("accountdetails", accountdetails);
    })
  };



  const transact = () => {
    algo.transactions(account().account_mnemonic).then(txs => {
      console.log("first transation", txs)
      
    })
  }

  createEffect(() => {
    console.log("The count is now", account()?.address);
  });
  {console.log(account())}
  return (
    <>
      <div class="h-screen  bg-gradient-to-l from-green-400 to-blue-400 ">
          {/* <div class=" container mx-auto px-4 py-12">
            <div class="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center">
                <table class="border-collapse border mb-4 border-slate-400 ...">
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
                </table>
              </div>

              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full"
                onclick={handleClick}>
                Create Account
              </button>
              
            </div>
          </div> */}
          <div class="container text-center py-10 bg-gradient-to-l from-green-400 to-blue-400">
            <h1 class="text-black text-5xl font-thin">ALGORAND DAPP 1.0</h1>
          </div><hr />
          <div class="flex">
              <div class=" w-3/6 px-4 py-12">
                  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="w-full shadow-2xl sm:w-auto px-4 py-10 rounded-xl bg-white text-black mb-6 sm:mb-0">
                    <button class=" border-indigo-600 rounded-full px-4 mx-2 py-2 bg-blue-500 font-bold  text-white" onclick={handleClick}>Create Account</button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full" onclick={getAccountDetailshandleClick}>Get Account</button>

                  {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full" onclick={transact}>Send Transaction</button>  <br /> */}
                  <br></br>

                  {/* <h4 class="text-base font-bold  border-gray-200 border- p-4 tooltip ">Address:</h4> */}

                    <h4 class="text-base font-bold  border-gray-200 border- p-4 tooltip ">{account()?.address} <span class="tooltiptext">Wallet Address</span></h4><br></br>
                  </div>
                  {/* <input type="email" class="form-input px-4 py-2 rounded-full" placeholder="RECIEVER ACCOUNT"></input>
                  <br></br>
                  <input type="email" class="form-input mb-2 mt-3 px-4 py-2 rounded-full" placeholder="TOTAL ALGOS"></input>
                  <br></br>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">SEND</button> */}
                  </div>
                  
              </div>

              <div class=" w-3/6 px-4 py-12">
                  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="w-full shadow-2xl sm:w-auto px-4 py-10 rounded-xl bg-white text-black mb-6 sm:mb-0">
                    {/* <button class=" border-indigo-600 rounded-full px-4 mx-2 py-2 bg-blue-500 font-bold  text-white" onclick={handleClick}>Create Account</button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full" onclick={getAccountDetailshandleClick}>Get Account</button> */}

                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full" onclick={transact}>Send Transaction</button>  <br />
                  
                  <p class="text-base font-bold  border-gray-200 border- p-4 tooltip ">{account()?.amount} <span class="tooltiptext">Wallet Balance</span></p>

                    
                  </div>
                 
                  </div>
                  
              </div>
          </div>
      </div>
    </>
  );
};

export default App;
