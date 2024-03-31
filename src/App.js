import { useCallback, useEffect, useState } from "react";
const input = document.getElementsByClassName('input1')

function App() {
  const [password,setPassword] =useState("")
  const [length,setLength] = useState(8)
  const [numberAllow,setNumberAllow] = useState(false)
  const [characterAllow,setCharacterAllow] = useState(false)

  const passwordGenerator = useCallback(()=>{
    
      let pass = ""
      let letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      let num =""
      let char =""
      if(numberAllow){
         num = '1234567890'
      }
      if(characterAllow){
         char = "!@#$%^&*()_+-=<>?:{}|"
      }
      for (let index = 1; index <= length; index++) {
        let totalChar = letter + num + char
        let random = Math.floor(Math.random() * totalChar.length + 1)
        pass += totalChar[random]
      }
      input.innerHTML = pass
      setPassword(pass)
    }
  ,[length,characterAllow,numberAllow,setPassword])

  const copyToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
  }


  useEffect(()=>{
    passwordGenerator()
  },[length,characterAllow,numberAllow,passwordGenerator])
  return (
    <div className="container">
      <div className="inputPass">
      <input
      className="input1"
        type="text"
        value={password}
      />
      <button
      onClick={copyToClipboard}
      >Copy</button>
      </div>
      <div className="parameters">
        <div>
        <input
          className="input2"
          type="range"
          value={length}
          min={6}
          max={20}
          onChange={(e)=>setLength(e.target.value)}
        />
        <label>length({length})</label>
        </div>
        <div>
        <input
          className="input3"
          type="checkbox"
          value={characterAllow}
          onChange={(e)=>setCharacterAllow(prevresult=> !prevresult)}
        />
        <label>characters</label>
        </div>
        <div>
        <input
          className="input4"
          type="checkbox"
          value={numberAllow}
          onChange={(e)=>setNumberAllow(prevresult=> !prevresult)}

        />
        <label>Numbers</label>
        </div>
      </div>
    </div>
  );
}

export default App;
