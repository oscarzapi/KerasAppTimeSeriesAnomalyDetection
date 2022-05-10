import '../App.css';
import {Link} from 'react-router-dom'

function Navigator() {
  return (
    <div className="UploadFile">
      <nav>
          <h3>Time series anomaly detection</h3>
          <ul className='nvlink'>
          <li><Link to='/home'>Home</Link></li>
              <li><Link to='/batchProcessing'>Upload File</Link></li>
          </ul>
      </nav>
    </div>
  );
}

export default Navigator;
