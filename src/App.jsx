import { useState , useCallback ,useEffect,useRef} from 'react'
import { use } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed]  = useState(false);
  const [password , setPassword] = useState("");
  
  //useRef hook
  const passwordRef = useRef(null);

 const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%&*(){}[]|~";

    for( let i = 1 ; i <=length ; i++){
         let randomIndex =  parseInt(Math.random()*str.length);
          let char = str.charAt(randomIndex);
          pass += char;
     }
     setPassword(pass)
 } , [length , numberAllowed, charAllowed , setPassword])  
  //inme kuch bhi chnage hua to hamare in method ko optimize karo 

  
  useEffect( () => {
                passwordGenerator();
  },[length , numberAllowed, charAllowed , passwordGenerator])
  // jis jis pe ye function run hoga.....inme kuch bhi chnage hua to function run hoga vapis


  const copyPasswordToClicpboard = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  },[password])
  

  return (
    <>
    <div className=' w-full max-w-lg mx-auto shadow-md px-4 my-40 py-8  bg-gray-600 rounded-xl'>
     <h1 className= 'text-white text-center my-3 text-3xl'>Password Generator</h1>
        <div className='flex shadow overflow-hidden  rounded-xl mb-4 "'>
                <input
                
                  type="text" 
                  value={password}
                  className='w-full  py-2 px-3 outline-none '
                  placeholder='password'
                  readOnly
                  ref={passwordRef}
                  /> 
                  <button 
                  onClick={copyPasswordToClicpboard}
                  // onKeyUp={{backgroundcolor : "red"}}
                  className=' bg-blue-600 px-3 py-1 text-center  text-white  hover:bg-purple-500 '>Copy </button>
          </div>
          <div className='flex text-lg gap-x-2'>
              <div className='flex items-center gap-x-2 text-orange-500 '>
                  <input 
                      onChange={(e) => setLength(e.target.value)}
                      type="range"
                      min={6}
                      max={100}
                      value={length}
                      
                      className="cursor-pointer"
                      
                  />
                  <label>Length:{length}</label>
              </div>
              
              <div className='flex items-center gap-x-2 text-orange-500 '>
                  <input 
                      type="checkbox"
                      defaultChecked= {numberAllowed}
                      id='numberInput'
                      onChange={(e) => {
                            setNumberAllowed((prev) => !prev)
                       }}
                    />
                  <label>Numbers</label>
              </div>

              <div className='flex items-center gap-x-2 text-orange-500 '>
                  <input 
                      type="checkbox"
                      defaultChecked= {charAllowed}
                      id='numberInput'
                      onChange={() => {
                            setCharAllowed((prev) => !prev)
                      }}
                      
                  />
                  <label>Characters</label>
              </div>
          </div>
     </div>
    </>
  )
}

export default App
