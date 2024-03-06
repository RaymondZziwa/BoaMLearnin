import './App.css'
import ChatBot from 'react-simple-chatbot';
import { useState } from 'react';

function App() {
  const[name, SetName] = useState('')
  const[phoneNumber, setPhoneNumber] = useState('')

  const submitData = () => {
    console.log('submit Data')
  } 
  
  const steps = [
    {
      id: '0',
      message: 'Welcome to BOA m-learning.Please complete the payment of the access fee to proceed.',
      trigger: 'askname',
    },
    {
      id: 'askname',
      message: 'What is your name?',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: '2',
    },
    {
      id: '2',
      message: 'Hi {previousValue}. Let us help you  complete your payment.Please choose the network you are going to use for payment.',
      trigger: 'network',
    },
    {
      id: 'network',
      options: [
        { value: 'mtn', label: 'MTN', trigger: 'contact' },
        { value: 'airtel', label: 'AIRTEL', trigger: 'contact' },
      ],
    },
    {
      id: 'contact',
      message: 'Please type your phone number that you wish to use for this payment.',
      trigger: '4',
    },
    {
      id: '4',
      user: true,
      trigger: '5',
    },
    {
      id: '5',
      message: 'Please wait as we process your payment shortly.',
      trigger: '6',
    },
    {
      id: '6',
      message: 'Processing...',
      trigger:  submitData(),
    }
  ]
  return (
    <div className="App">
        <ChatBot steps={steps}/>
    </div>
  )
}

export default App
