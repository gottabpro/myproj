import React, {useState} from 'react';
import NavbarComponent from './NavbarComponent';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from "axios"
import { clearCache } from 'clear-cache';

function AddTransaction({username, status}) {

  const sender = username;
  const [recipient, setrecipient] = useState("");
  const [amount, setamount] = useState(0);
  const [fee, setfee] = useState(0);
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [response, setresponse] = useState([])
  const [show, setshow] = useState(false);

  const handleShow = () => setshow(true)
  const handleClose = () => setshow(false)
  

  var param = {
    transaction: {
      sender: sender,
      recipient: recipient,
      amount: amount,
      fee: fee,
      message: message
    } ,
    
    password: password
  }

  function transact(event){
    event.preventDefault();
    if(status){
    axios.post("/api/transact", param)
      .then(res => {
        console.log(res);
        setresponse(res.data);
      })
      .catch(err => {
        console.log(err)
      })
    }
    else{
      setresponse("Login to transact.")
    }
    setamount(0);
    setfee(0);
    setmessage("");
    setpassword("");
    setrecipient("");
  }
  return (
    <div>
      <h1>Add a transaction</h1>
      <Form>
        <Form.Group>
          <Form.Label>Recipient</Form.Label>
          <Form.Control type="text" placeholder="Recipient" value={recipient} onChange={(event) => setrecipient(event.target.value)
          }/>
          
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={amount} onChange={(event) => setamount(event.target.value)
          }/>
          
        </Form.Group>
        <Form.Group>
          <Form.Label>Fee</Form.Label>
          <Form.Control type="number" value={fee} onChange={(event) => setfee(event.target.value)
          }/>
          
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setpassword(event.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Additional Message</Form.Label>
          <Form.Control type="text" placeholder="Message" value={message} onChange={(event) => setmessage(event.target.value)}/>
        </Form.Group>
        
        <Button variant="primary" onClick={handleShow}>
          Transact
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>Recipient: {recipient}</Modal.Body>
          <Modal.Body>Amount: {amount}</Modal.Body>
          <Modal.Body>Message: {message}</Modal.Body>
          <Modal.Body>Fee: {fee}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              handleClose();
              clearCache();
              }}>
              Close
            </Button>
            <Button variant="success" onClick={transact}>
              Proceed to Transact
            </Button>
            {response}
          </Modal.Footer>
        </Modal>
  
      </Form>
    </div>
  );
}

export default AddTransaction;