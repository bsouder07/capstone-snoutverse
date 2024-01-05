import React, { useState } from 'react'
import "./EditPost.css";
import {
  Container,
  Form,
  Button,
  Card,
  Figure,
  Row,
  Col,
} from "react-bootstrap";
import { timeSince } from "../../utils/timeSince";
import useToggle from "../../hooks/useToggle";
import api from "../../utils/api.utils";

import { useAuth } from "../../hooks";

function EditPost({post,onSave,onCancel}) {

const [editText,setEditText] =useState(post.text)
const { user, isAuthenticated } = useAuth();

const saveFunction = () => {
    onSave(editText)
}

  return (
    <Card className="card_class" key={post._id}>
    <Card.Body>
      <Figure className="d-flex align-items-center">
        <Figure.Image
          width={70}
          height={70}
          className="rounded-circle"
          src={post.author?.profileImage}
        />
        <figcaption>{post.author.email}</figcaption>
      </Figure>

      
      <div className="textarea">
      <textarea
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      />

      <Button id='saveBtn' onClick={saveFunction}>Save</Button>
      <Button id='cancelBtn' onClick={onCancel}>Cancel</Button>
      </div>
      <Card.Text>
        {new Date(post.created).toLocaleDateString()} -{" "}
        {timeSince(post.created)} ago{" "}
        {post.author._id === user._id &&(
        <Button id="editBtn" type="button" className="btn btn-outline-success" >
          Edit
        </Button>
        )}
        {post.author._id === user._id &&(
        <Button id="deleteBtn"
          type="button"
          className="btn btn-outline-danger"
          
        >
          Delete
        </Button>
        )}
        
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default EditPost




/*
    <div>
        <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        />
        <Button onClick={saveFunction}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
    </div>

*/