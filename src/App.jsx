import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numallowed, setnumallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState('')

  //useRef
  const passwordRef = useRef(null)

  //copyPasswordToClipboard
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,51)
    window.navigator.clipboard.writeText(password)
  },[password])

  //useCallback
  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let char = "!@#$%^&*()_+"

    if(numallowed) str += num
    if(charallowed) str += char

    for(let i=0; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

  },[length,numallowed,charallowed,setpassword])


  //useEffect
  useEffect(()=>{
    passwordgenerator()
  },[length,numallowed,charallowed,passwordgenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-700">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden pb-4'>
          <input type="text"
            value = {password}
            className="text-black outline-none w-full px-3 py-1"
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numallowed}
              onChange={()=>{setnumallowed((prev)=> !prev)}}
            />
            <label htmlFor="Numberinput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charallowed}
              onChange={()=>{setcharallowed((prev)=> !prev)}}
            />
            <label htmlFor="characterinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
