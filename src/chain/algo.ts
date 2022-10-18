import algosdk from "algosdk"; 
import { printError, algod} from "./utils";

// DO NOT CHANGE
const algodClient = new algosdk.Algodv2(algod.token, algod.server, algod.port);


interface IAccount{
    address?: string;
    mnemonic?: Uint8Array;
    amount: 0
}

class Algo {
    
    async createAccount() : Promise<IAccount> {
        let account: IAccount = {address: "", mnemonic: Uint8Array.of(0), amount: 0}
        try {  
            const myaccount = algosdk.generateAccount();
            console.log("Account Address = " + myaccount.addr);
            let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
            console.log("Account Mnemonic = "+ account_mnemonic);
            console.log("Account created. Save off Mnemonic and address");
            console.log("Add funds to account using the TestNet Dispenser: ");
            console.log("https://dispenser.testnet.aws.algodev.network/ ");

            account = {
                address: myaccount.addr,
                mnemonic: myaccount.sk,
                amount: 0
            };
        }
        catch (err) {
            console.log("err", err);
        }

        return account;
    };

    async getAccount(addr: string) {
        return await algodClient.accountInformation(addr).do();
    }

    async transactions() {

      const MNEMONIC=""
        try {
          const acct = await algosdk.mnemonicToSecretKey(MNEMONIC)

          console.log("sign transaction with ", acct.addr)
          // Construct a `signer` object that will be used to sign transactions
          // later the during AtomicTransactionComposer group transaction construction
          // process
          const signer = algosdk.makeBasicAccountTransactionSigner(acct) 
          
      
          // AtomicTransactionComposer allows us to easily add transactions
          // and ABI method calls to construct an atomic group
          const atc = new algosdk.AtomicTransactionComposer()
      
          // Get the suggested parameters from the Algod server. 
          // These include current fee levels and suggested first/last rounds.
          const sp = await algodClient.getTransactionParams().do();
    
          const receiverAddress = "IF5CQGK4233JZNLWKR4MPQM45CMGQYHWKGD6PZHQRGBOVETPIZJOJZMU5E";
          const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: acct.addr, // TODO: replace with your address
            to: receiverAddress, // TODO: replace with your address
            amount: 110000,
            suggestedParams: sp,
          });
          atc.addTransaction({ txn: txn2, signer: signer })
      
          // Send the transaction, returns the transaction id for 
          // the first transaction in the group
          const results = await atc.execute(algodClient, 2);
          return results
        } catch (error) {
          printError(error);
          return;
        }
      

      }
}

export { Algo, type IAccount};