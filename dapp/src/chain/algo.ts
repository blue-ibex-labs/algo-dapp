import algosdk from "algosdk"; 

interface IAccount{
    address?: string;
    mnemonic?: Uint8Array;
    amount: 0
}

class Algo {
    
    algodToken : string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    algodServer = 'http://localhost';
    algodPort = 4001;


    createAccount() : IAccount {
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
        const algodClient = new algosdk.Algodv2(this.algodToken, this.algodServer, this.algodPort);
        return await algodClient.accountInformation(addr).do();
    }
}

export { Algo, type IAccount};