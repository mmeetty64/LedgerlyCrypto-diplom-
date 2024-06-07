import Web3 from "web3";
import ABI from "./ABI.json"

declare var window:any

class Service {
    //window.ethereum
    web3 = new Web3(window.ethereum)
    contract = new this.web3.eth.Contract(ABI as any, "0x5FbDB2315678afecb367f032d93F642f64180aa3")

    async viewCatalog(){
            try {
                return await this.contract.methods.viewCatalog().call()
            } catch (error) {
                console.log(error)
            }
    }
    async viewProdImg(idProd: number){
        try {
            return await this.contract.methods.viewProdImg(idProd).call()
        } catch (error) {
            console.log(error)
        }
    }
    async viewProduct(idProd: number){
        try {
            return await this.contract.methods.viewProduct(idProd).call()
        } catch (error) {
            console.log(error)
        }
    }
    async viewShopData(shop: string){
        try {
            return await this.contract.methods.viewShopData(shop).call()
        } catch (error) {
            console.log(error)
        }
    }

    async viewProdReview(idProd: number){
        try {
            return await this.contract.methods.viewProdReview(idProd).call()
        } catch (error) {
            console.log(error)
        }
    }

    async createReview(prodId: number, grade: number, description: string, address: string){
        try {
            return await this.contract.methods.createReview(prodId, grade, description).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async buyTokens(amount: number, address: string, tokenPrice: number){
        console.log(amount, address, tokenPrice)
        try {
            return await this.contract.methods.buyTokens(amount).send({from: address, value: BigInt(amount * tokenPrice).toString()})
        } catch (error) {
            console.log(error)
        }
    }

    async viewTokenPrice(){
        try {
            return await this.contract.methods.viewTokenPrice().call()
        } catch (error) {
            console.log(error)
        }
    }

    async balanceOf(address: string){
        try {
            return await this.contract.methods.balanceOf(address).call()
        } catch (error) {
            console.log(error)
        }
    }

    async createOrder(prodId: number, addDel: string, amount: number, address: string, tokenPrice: number){
        try {
            return await this.contract.methods.createOrder(prodId, addDel, amount).send({from: address, value: amount * tokenPrice})
        } catch (error) {
            console.log(error)
        }
    }

    async viewRole(user: string){
        try {
            return await this.contract.methods.viewRole(user).call()
        } catch (error) {
            console.log(error)
        }
    }

    async viewOrders(){
        try {
            return await this.contract.methods.viewOrders().call()
        } catch (error) {
            console.log(error)
        }
    }

    async rejectOrder(idOrder: number, address:string){
        try {
            return await this.contract.methods.rejectOrder(idOrder).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async frozeProduct(idProd: number, address:string){
        try {
            return await this.contract.methods.frozeProduct(idProd).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async unfrozeProduct(idProd: number, address:string){
        try {
            return await this.contract.methods.unfrozeProduct(idProd).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async createProduct(title: string, description: string, tokenPrice: number, amount: number, images: string[], address: string){
        try {
            return await this.contract.methods.createProduct(title, description, tokenPrice, amount, images).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async deliveryOrder(idOrder: number, address:string){
        try {
            return await this.contract.methods.deliveryOrder(idOrder).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async completeOrder(idOrder: number, address:string){
        try {
            return await this.contract.methods.completeOrder(idOrder).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async requireShop(title: string, description: string, logo: string, address: string){
        try {
            return await this.contract.methods.requireShop(title, description, logo).send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async viewShop(address: string){
        try {
            return await this.contract.methods.shop(address).call()
        } catch (error) {
            console.log(error)
        }
    }

    async viewShopOrders(){
        try {
            return await this.contract.methods.viewShopOrders().call()
        } catch (error) {
            console.log(error)
        }
    }

    async applyReqShop(number: number, answer: boolean, address: string){
        try {
            return await this.contract.methods.applyReqShop(number, answer).send({from: address})
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }


    // async boostTime(){
    //     try {
    //         return await this.contract.methods.boostTime().send({from: this.Owner})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async donat(partner: string, amount: number, address: string){
    //     try {
    //         return await this.contract.methods.donat(partner, amount).send({from: address})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    // async infoUser(user: string, address: string){
    //     try {
    //         return await this.contract.methods.infoUser(user).call({from: address})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

}
export default new Service();