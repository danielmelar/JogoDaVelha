import React, {useState} from 'react'

export default function App(){

  // ESTILOS
  const tabu={
    display:'flex',
    flexDirection:'column'
  }

  const tabuLinha={
    display:'flex',
    flexDirection:'row'
  }

  const casa={
    width: 100,
    height:100,
    display:'flex',
    justifyContent:'center',
    alignItens: 'center',
    flexDirection: 'row',
    cursor:'pointer',
    fontSize:60,
    border:'1px solid #000'
  }

  // indica qunado o jogo iniciar
  const jogoInicial=[['','',''],['','',''],['','','']]
  const[jogo, setJogo]=useState([['','',''],['','',''],['','','']])
  const[simboloAtual, setSimbolo] = useState('x')
  const [jogando, setJogando]=useState(true)

  const tabuleiro=(j)=>{
    return(
      <div style={tabu}>
        <div style={tabuLinha}>
          <div style={casa} casa-pos='00' onClick=''>{j[0][0]}</div>
          <div style={casa} casa-pos='01' onClick=''>{j[0][1]}</div>
          <div style={casa} casa-pos='02' onClick=''>{j[0][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} casa-pos='10' onClick=''>{j[1][0]}</div>
          <div style={casa} casa-pos='11' onClick=''>{j[1][1]}</div>
          <div style={casa} casa-pos='12' onClick=''>{j[1][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} casa-pos='20' onClick=''>{j[2][0]}</div>
          <div style={casa} casa-pos='21' onClick=''>{j[2][1]}</div>
          <div style={casa} casa-pos='22' onClick=''>{j[2][2]}</div>
        </div>
      </div>
    )
  }

  const ButtonJogarNovamente=()=>{
    if(!jogando){
      return <button onClick={()=> reiniciar()}>Jogar Novamente</button>
    }
  }

  const verificaVitoria=()=>{
    // linhas
    let pontos=0
    let vitoria=false
    for(let l=0; l<3;l++){
      pontos=0
      for(let c=0;c<3;c++){
        if(jogo[l][c] == simboloAtual){
          pontos++;
        }
      }
      if(pontos >= 3){
        vitoria=true
        break
      }
    }

    // colunas
    for(let c=0;c<0;c++){
      pontos=0
      for(let l=0;l<3;l++){
        if(jogo[l][c] == simboloAtual){
          pontos++
        } 
      }
      if(pontos>3){
        vitoria=true
        break 
      }
    }
    
    // digagonais
    pontos=0
    for(let d=0;d<3;d++){
      if(jogo[d][d]  == simboloAtual){
          pontos++
        } 
      }
    
    if(pontos>3){
      vitoria=true
      }
    pontos=0
    let l=0
    for(let c=2;c>=2;c--){
      if(jogo[l][c] == simboloAtual){
        pontos++
      
      }
      l++
    }
    if(pontos>3){
      vitoria=true
    }
    return vitoria
  }

  const trocaJogador=()=>{
    simboloAtual =='X'?setSimbolo('O'):setSimbolo('X')
  }

  const retPos=(e)=>{
    const p=e.target.getAttribute('data-pos')
    const pos=[parseInt(e.substring(0,1)), parseInt(p.substring(1,2))]

    return pos
  }

  const verificaEspacoVazio=(e)=>{
    if(jogo[retPos(e)[0]][retPos(e)[1]]== ''){
      return true
    }else{
      return false
    }
  }

  const joga=(e)=>{
    if(jogando){
      if(verificaEspacoVazio(e)){
        jogo[retPos(e)[0], retPos(e)[1]]=simboloAtual
        trocaJogador()
        if(verificaVitoria()){
          trocaJogador()
          alert('Jogador ' + simboloAtual + ' Ganhou!')
          setJogando(false)
        }
      }else{
        alert('Campo não disponivel')
      }
    }
  }

  const reiniciar=()=>{
    setJogando(true)
    setJogo(jogoInicial)
    setSimbolo('X')
  }

  return(
    <>
      {tabuleiro(jogoInicial)}
    </>
  )
}
