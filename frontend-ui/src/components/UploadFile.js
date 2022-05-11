import { useState } from 'react';
import Chart from '../components/Chart'
import '../App.css';

function UploadFile() {

  const [data,setData] = useState([])
  const [selectFile, setSelectFile] = useState("")

  const handleChange = (event)=> {
    console.log(event.target.name,event.target.files[0])
    setSelectFile(event.target.files[0])
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    const url = "http://localhost:8000/batchProcessing"
    const formData = new FormData()
    formData.append('filePath', selectFile, selectFile.name)

    const reqOpt = {method:"POST", body:formData}
    const resp = await fetch(url, reqOpt)
      .then(resp => resp.json())
      .then(resp2 => {     
        const data = []
        resp2.result.forEach(e => {
          data.push({'timestamp': new Date(e.timestamp), 'value_x': e.value_x, 'value_y':e.value_y})
        })
        console.log(resp2.result)
      setData(data)
    })
  }

  return (
    <div className="UploadFile">
      <form onSubmit={handleUpload}>
        <input type='file' name='selectFile' onChange={handleChange}></input>
        <input type='submit' value='submit'></input>
        </form>
        <Chart data={data} ></Chart>
    
    </div>
  );
}

export default UploadFile;
