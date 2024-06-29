import { useState,useCallback,useEffect,useRef} from 'react'


import './App.css'

function App() {
 const [length,setLength] = useState(5)
 const [numberAllowed , setNumberAllowed] = useState(false)
 const [charAllowed , setCharAllowed] = useState(false)
 const [password, setPassword] =useState("")

 //useRef hook
 const passwordRef = useRef(null)
 const passwordGenerator = useCallback( () => {
  let pass = ""
  let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

  if(numberAllowed) 
    str = str + "1234567890"
  if(charAllowed)
    str = str + "@#$&*%{}[]''"

  for(let i = 0;i <= length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass = pass+str.charAt(char)
  }

  setPassword(pass)
 },[length,numberAllowed,charAllowed,setPassword])


 const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(password)
 },[password])




 useEffect(() =>{
  passwordGenerator()
 },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className='bg-black w-full h-screen text-4xl px-20 py-10 space-y-5'>
        <h1 className='text-center text-white'>Captcha Generator</h1>
        <div className='flex items-center justify-center px-20 py-10'>
       <input type="text"
              value={password}
              className='outline-none  py-1 px-3 mx-auto text-black text-center text-xl text-orange'
              placeholder='password'
              readOnly
              ref={passwordRef}
        />
        
        </div>
       
        <div className='flex text-sm gap-x-2 px-25'>
          <div className='flex items-center gap-x-2'>
              <button
               onClick={copyPasswordToClipboard}
              className='text-white text-center text-2xl px-20 '>Copy</button>
              <input type="range"
                      min={5}
                      max={50} 
                      value={length}
                      className='cursor-pointer text-white text-2xl'
                      onChange={(e) =>{setLength(e.target.value)}}
              />
              <label className='text-white text-2xl'>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-2 px-20'>
            <input type="checkbox"
                   defaultChecked={numberAllowed}
                   id="numberInput"
                   onChange={() =>{setNumberAllowed((prev) => !prev);

                   }}
            />
            <label className='text-white text-2xl ' htmlFor="numberInput">Numbers</label>

          </div>
          <div className='flex items-center gap-x-2 px-20'>
            <input type="checkbox"
                   defaultChecked={charAllowed}
                   id="characterInput"
                   onChange={() =>{setCharAllowed((prev) => !prev);

                   }}
            />
            <label className='text-white text-2xl  ' htmlFor="characterInput">Characters</label>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
