import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web'
import React,{useState,useEffect} from 'react'
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers'
//import useStyles from './styles';

const alanKey='3fd3a304dfcc160438ecd149a35269a22e956eca572e1d8b807a3e2338fdd0dc/stage'
function App() {

  const [newsArticles,setNewsArticles]=useState([]);
  const [activeArticle,setActiveArticles]=useState(-1);
  //const classes = useStyles();



  useEffect(() =>{
    alanBtn({
      key:alanKey,
      onCommand:({command,articles,number})=>{
        if(command==='newHeadlines'){
          setNewsArticles(articles);
          setActiveArticles(-1);
          console.log(articles);
        }else if (command === 'highlight') {
          setActiveArticles((prevActiveArticle) => prevActiveArticle + 1);
        }else if(command==='open'){
          const parsedNumber=number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article=articles[parsedNumber-1];
          if(parsedNumber>20){
            alanBtn().playText('Please try again')
          }else if(article){
            window.open(article.url,'_blank');
            alanBtn.playText('Opening...');
          }
        }
      }
    })
  },[]);
 
  return (
    // <div className="App">
    //   <div className={classes.logoContainer}>
    //     <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo"/>
    //   </div>
    //   <NewsCards articles={newsArticles}/>
    // </div>

    <div className="App">
      <div>
        {/* <img src="https://alan.app/voice/images/previews/preview.jpg" alt="alan logo"/> */}
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App;
