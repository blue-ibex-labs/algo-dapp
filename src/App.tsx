import { Component, createEffect, createSignal } from "solid-js";
import { Algo, IAccount } from "./chain/algo";

const App: Component = () => {
  const algo = new Algo();

  const [account, setAccount] = createSignal("");

  const handleClick = (event: any) => {
    const address = event.target.value;
    console.log(address);
    algo.createAccount().then((account) => {
      console.log(account);
      setAccount(account);
    });
  };

  const transact = () => {
    algo.transactions().then(txs => {
      console.log(txs)
    })
  }

  createEffect(() => {
    console.log("The count is now", account());
  });

  return (
    <div class="bg-white py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <table class="border-collapse border border-slate-400 ...">
            <thead>
              <tr>
                <th class="border border-slate-300 ...">Address</th>
                <th class="border border-slate-300 ...">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-300 ...">{account().address}</td>
                <td class="border border-slate-300 ...">{account().amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onclick={handleClick}
        >
          Create Account
        </button>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onclick={transact}
        >
          Send Transaction
        </button>
      </div>
    </div>
  );
};

export default App;
