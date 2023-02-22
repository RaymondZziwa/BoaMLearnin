const express = require('express')
const app = express()
const dotenv = require('dotenv')
const momo = require('mtn-momo')
const port = 5000
dotenv.config({ path: './.env' });

app.post('/pay', (req , res)=>{
  const name = req.body.name
  const phoneNumber = req.body.phoneNumber

    const { Collections } = momo.create({
        callbackHost: process.env.CALLBACK_HOST
      });
    
    const collections = Collections({
        userSecret: process.env.USER_SECRET,
        userId: process.env.USER_ID,
        primaryKey: process.env.PRIMARY_KEY
    });
    
    // Request to pay
    collections
      .requestToPay({
        amount: "500",
        currency: "EUR",
        externalId: "123456",
        payer: {
          partyIdType: "MSISDN",
          partyId: "256775149572"
        },
        payerMessage: "testing",
        payeeNote: "testing"
      })
      .then(transactionId => {
        console.log({ transactionId });
    
        // Get transaction status
        return collections.getTransaction(transactionId);
      })
      .then(transaction => {
        console.log({ transaction });
        res.send({transaction})
        // Get account balance
        return collections.getBalance();
        
      })
      .then(accountBalance => console.log({ accountBalance }))
      .catch(error => {
        console.log(error);
        res.send(error)
      });
    
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})  