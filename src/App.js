import './App.css';
import Data from './Data'
import { Button, Card, Row, Col, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import { useState } from 'react';
import { getResult, getResultWithCSV } from './lib'
import Loader from './Loader';
import csvDownload from 'json-to-csv-export'

let quiz;
const quizShuffle = () => {
  quiz = Data.sort(() => Math.random() - 0.5);
} 
quizShuffle();
let quizLength = quiz.length - 1;

function App() {
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  
  return (
    <div>
      {
        <>
          {!showResult && (
            <Card className="quizCard mb-5">
              <Card.Header>Quiz <Badge bg="primary" className='float-end' style={{marginTop:'2px'}}>{index + 1} / {quiz.length}</Badge></Card.Header>
              <Card.Body>
                <ProgressBar now={progress} />
                <Card.Title>{quiz[index].question}</Card.Title>
                <Card.Text>
                  <img src={quiz[index].image} alt={quiz[index].ans} />
                </Card.Text>
                <Row >
                {
                    quiz[index].option.map((op, i)=>(
                    <Col md={6} className="mb-2 d-grid" key={i}>
                        <Button variant="outline-primary" size="lg" 
                        onClick={async () => { 
                          if(index === quizLength) { 
                            setLoading(true);
                            setTimeout(() => { 
                              setLoading(false); 
                              setShowResult(true) 
                            }, 1000) 
                          } else { 
                            setIndex(index + 1)
                          } 
                          await setQuizResult([...quizResult, getResult(op, quiz[index].ans, quiz[index].image, quiz[index].question)])
                          setProgress((100 / (quizLength + 1)) * (index + 1))
                        }}>
                        <Badge bg="primary" className='float-start mt-1'>
                          {Object.keys(op)}
                        </Badge>
                        {Object.values(op)}
                      </Button>
                    </Col>
                  ))
                }
                </Row>
                { loading && <Loader/> }
              </Card.Body>
            </Card>
          )}
          { showResult && (
            <Card className="quizCard mb-5">
              <Card.Header>
                Result 
                <Button className="float-end" 
                onClick={() => { 
                  quizShuffle();
                  setShowResult(false)
                  setIndex(0)
                  setQuizResult([])
                  setProgress(0)
                }}>
                Quiz Restart
                </Button>
              </Card.Header>
              <Card.Body>
                <ProgressBar>
                  <ProgressBar variant="primary" now={60} key={1}/>
                  <ProgressBar variant="success" now={40} key={2} />
                </ProgressBar>
                <ListGroup variant="flush">
                  <ListGroup.Item><span></span> <strong>Selected</strong> <strong>Correct Answer</strong></ListGroup.Item>
                {
                  quizResult.map((res, i)=>(
                    <ListGroup.Item className='text-start' key={i}>
                      <img src={res.image} alt={Object.values(res.answer)[0]} /> 
                      <span><Badge bg={res.boolean ? 'primary' : 'success'}>{Object.keys(res.selected)[0]}</Badge> {Object.values(res.selected)[0]}</span> 
                      <span><Badge bg={res.boolean ? 'primary' : 'success'}>{Object.keys(res.answer)[0]}</Badge> {Object.values(res.answer)[0]}</span>
                    </ListGroup.Item>
                  ))
                }
                </ListGroup>
                <Button className="float-end" onClick={() => csvDownload(getResultWithCSV(quizResult))}>
                  Download Result
                </Button>
                <div className='float-start'>
                  <h6>
                    Correct Answer <Badge bg="primary">{ 
                      quizResult.filter(r => r.boolean === true).length
                      }</Badge>
                  </h6>
                  <h6>
                    Wrong Answer <Badge bg="success">{
                      quizResult.filter(r => r.boolean === false).length
                    }</Badge>
                  </h6>
                </div>
              </Card.Body>
            </Card>
          )}
        </>
      }
    </div>
  );
}

export default App;
