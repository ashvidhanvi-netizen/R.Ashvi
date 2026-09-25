const App = ()=> {

const [nameUser,setNameUser] = useState("")
const [numberUser,setNumberUser] = useState("")
const [showData,setShowData] = useState("")

const nameChange = (e) => {

  setNameUser(e.target.value)
}

const numberChange = (e) => {

  setNumberUser(e.target.value)
}

const handleclick = () => {
  const obj = {id: DataTransfer.now(), name: nameUser, number: numberUser}


}


rteurn (
<>
<div>
<input type="text" onchange={nameChange}  placeholder="Enter the Name"/>
<input type="text" onchange={numberChange} placeholder="Enter the Number"/>
<button onClick={handleclick}>click to login</button>

</div>
<div>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>user Name</th>
        <th>user Number</th>
      </tr>
    </thead>
    <tbody>
      {showData.map((e)) => {




      }}
    </tbody>
  </table>
</div>



</>



)




}