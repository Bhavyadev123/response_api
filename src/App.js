import React, { useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Button } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import './App.css';

function App() {
  const [formId, setFormId] = useState('');
  const [questionId, setQuestionId] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        "form_id": formId,
        "email": "",
        "responses": [
          {
            "question_id": questionId, 
            "type": "SHORT_TEXT",
            "text": "1"
          }
        ],
        "submit_time": Date.now().toString(),
        "storage_used": 0
      };

      await axios.post('https://stage.form.heartfullapps.com/response', payload);
      setMessage('Response submitted Successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit response. Please check the form ID and question ID and try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Responses</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="FORM ID"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Assignment />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <TextField
            label="QUESTION ID" 
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Assignment />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          SUBMIT RESPONSE
        </Button>
      </form>
      <div className="message">
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
