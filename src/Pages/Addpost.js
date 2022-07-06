import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as allAction from '../Redux/Actions/index'
import { v4 as uuidv4 } from 'uuid';


export default function Addpost() {

  const UserData = useSelector((state) => state.Login)
  let FindId = UserData.data.find((id) => id)
  const unique_id = uuidv4();
  const small_id = unique_id.slice(0, 8)

  const [post, setThePost] = useState({ R_Id: FindId.R_id, title: "", discription: "", image: "" })
  const [img, setImage] = useState();
  const dispatch = useDispatch();
  const { postData } = bindActionCreators(allAction, dispatch);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64Image(file);
    setImage(base64);
  }

  const convertBase64Image = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
    fileReader.readAsDataURL(file);
  });

  const onPostSubmite = () => {
    let obj = {
      U_id: small_id,
      P_id: post.R_Id,
      title: post.title,
      discription: post.discription,
      image: img,
      commentId: [],
      likeId: []
    }
    console.log(obj);
    postData(obj)
  }

  return (
    <div>
      <h1>Addpost</h1>
      <div>
        <div className="mainDiv">
          <h1 className="Tital">Add New Post</h1>
          <table className="Table" border='1' align='center'>
            <tr>
              <td>Title:-</td>
              <td>
                <input type="text" placeholder='Enter Post Title' onChange={(e) => setThePost({ ...post, title: e.target.value })} />
              </td>
            </tr>
            <tr>
              <td>Discription:-</td>
              <td>
                <textarea rows="5" cols="21" onChange={(e) => setThePost({ ...post, discription: e.target.value })}></textarea>
              </td>
            </tr>
            <tr>
              <td>Image:-</td>
              <td>
                <input type="file" onChange={(e) => uploadImage(e)} />
              </td>
            </tr>
            <tr className="allBtn">
              <Link to='/dashboard'><button>Cancle</button></Link>
              <Link to='/dashboard'><button onClick={() => onPostSubmite()}>Submit</button></Link>
            </tr>
          </table>
        </div>
      </div>

    </div >
  )
}