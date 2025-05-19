(function(){
  let nivelAtual=1;
  function entrarNoNivel(nivel){
    const botoes = document.querySelectorAll("button");
    for(const botao of botoes){
      if(botao.innerText.includes(`#${nivel}`)){
        botao.click();
        return true;
      }
    }
    return false;
  }
  function clicarNosBotoesRoxos(callbackFinal){
    const botoes=Array.from(document.querySelectorAll("button"));
    const roxos=botoes.filter(botao=>{
      const cor=getComputedStyle(botao).backgroundColor;
      return cor.includes("rgb(180")||cor.includes("rgb(176")||cor.includes("#b46bff");
    });
    let i=0;
    function clicarDuasVezes(){
      if(i>=roxos.length){callbackFinal();return;}
      const btn=roxos[i];
      btn.click();
      setTimeout(()=>{
        btn.click();
        i++;
        setTimeout(clicarDuasVezes,300);
      },200);
    }
    clicarDuasVezes();
  }
  function verificarSeUltimaLicaoEhTeste(){
    const secoes=Array.from(document.querySelectorAll("div")).filter(div=>div.innerText.includes("Lição"));
    if(secoes.length===0)return false;
    const ultima=secoes[secoes.length-1];
    return ultima.innerText.toLowerCase().includes("progress test");
  }
  function voltarParaLevels(){
    const voltar=Array.from(document.querySelectorAll("button")).find(btn=>btn.innerText.includes("Back to Levels"));
    if(voltar)voltar.click();
  }
  function processarNivel(nivel){
    const entrou=entrarNoNivel(nivel);
    if(!entrou)return;
    setTimeout(()=>{
      clicarNosBotoesRoxos(()=>{
        setTimeout(()=>{
          if(verificarSeUltimaLicaoEhTeste()){
            voltarParaLevels();
            setTimeout(()=>{
              nivelAtual++;
              if(nivelAtual<=16){
                setTimeout(()=>processarNivel(nivelAtual),2500);
              }
            },2000);
          } else {
            voltarParaLevels();
            setTimeout(()=>processarNivel(nivel),2500);
          }
        },1000);
      });
    },1500);
  }
  processarNivel(nivelAtual);
})();
