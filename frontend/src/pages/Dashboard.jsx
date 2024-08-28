import { useEffect, useState } from "react";
import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard() {
  const [balance, setBalance] = useState('loading...')
  useEffect(()=>{
    axios.get('http://localhost:2002/api/v1/account/balance',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => setBalance(res.data.balance))
  },[])
  return (
    <div>
      <Appbar />
      <Balance value={balance} />
      <Users />
    </div>
  );
}
