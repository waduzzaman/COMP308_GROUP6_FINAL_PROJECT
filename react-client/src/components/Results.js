import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

//
function Results() {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5001/train_model";


  //runs once after the first rendering of page
  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          setData(result.data)
          setShowLoading(false)
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);

  return (
    <div className='form'>
      { showLoading === false
        ? 
        <div className='fill-window'>

            <h1>Prediction for Heart symptoms Results</h1>
            <p>If results = 1,0 ---- heart disease is present</p>
            <p>If results = 0,1 ---- heart disease is not present</p>
<br/><br/>
            <table className="App-table">
              <tbody>
                
                <tr>
                  <td className="App-td">
                    {data.row1 && data.row1.map((value, index) => (
                      <p key={index}>{value}</p>
                    ))}
                  </td>
                  <td></td>
                  

                </tr>
              </tbody>
            </table>
            </div>
              : 
        < div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner> }
        </div>

                  }</div>
    

  );
}
//
export default Results;
