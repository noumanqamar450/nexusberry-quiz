import './App.css';
import Data from './Data'
import { Button, Card, Row, Col, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import { useState } from 'react';
import { getResult } from './lib'
import Loader from './Loader';

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
                          await setQuizResult([...quizResult, getResult(op, quiz[index].ans, quiz[index].image)])
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
                <ListGroup variant="flush">
                  <ListGroup.Item><span></span> <strong>Selected</strong> <strong>Correct Answer</strong></ListGroup.Item>
                {
                  quizResult.map((res, i)=>(
                    <ListGroup.Item className='text-center' key={i}><img src={res.image} alt={res.answer} /> <span>{res.selected}</span> <span>{res.answer}</span></ListGroup.Item>
                  ))
                }
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </>
      }
    </div>
  );
}

export default App;
