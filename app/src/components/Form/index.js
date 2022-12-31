import React, {useState} from "react";
import axios from "axios";
import "./styles.css";
import styled from 'styled-components';


const Form = (props) => {
  const [to, setTo] = useState('') 
  const [translate, setTranslate] = useState('')
  const [answer, setAnswer] = useState('Translate somthing')
 

  const handleSubmit = async () => {
    const obj = {
      to,
      translate
    }
    const { data } = await axios.post('http://localhost:8080/index.php', obj);
    console.log(data);
    if(data.success){
      setAnswer(data.message);
    }

  }


    return (
      <Wrapper>
        <InputWrapper>
          <Label>To</Label>
          <Input value={to}  onChange={e => setTo(e.target.value)}/>
        </InputWrapper>
        <InputWrapper>
          <Label>Translate</Label>
          <Input value={translate}  onChange={e => setTranslate(e.target.value)}/>
        </InputWrapper>
        <button onClick={handleSubmit}>Submit</button>
        <AnswerLabel>{answer}</AnswerLabel>
      </Wrapper>
    );
}

export default Form;

const Wrapper = styled.div`
  margin: auto;
  width: 50%;
  padding: 10px;
  background-color: #dedede;
`

const InputWrapper = styled.div`
  margin: auto;
  margin-left: 10px;
`

const Label = styled.p`
  text-align: center;

`

const Input = styled.input`
  display: block;
  margin-right: auto;
  margin-left: auto;
`

const AnswerLabel = styled.p``
