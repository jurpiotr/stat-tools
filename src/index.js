import './sass/index.scss';

const wave = document.querySelector('.wave');

let posY = 0;
const waveH = {
   scrollPosition: 200,
   outputHeightWave: 50,
   m: 100,
   c1: 180,
   c2: 24,
   c3: 120
}

const alignDeviationReductor = (pos, output, origin) => {
   const result = origin - window.scrollY/(pos/(origin-output));
   return result;
}

window.addEventListener('scroll', () => {
 scrollToTop();

})
const scrollToTop = () => {
   if(posY < window.scrollY && window.scrollY <= 200){
      let m1Height = alignDeviationReductor(waveH.scrollPosition, waveH.outputHeightWave, waveH.m);
      let c1Height = alignDeviationReductor(waveH.scrollPosition, waveH.outputHeightWave, waveH.c1);
      let c2Height = alignDeviationReductor(waveH.scrollPosition, waveH.outputHeightWave, waveH.c2);
      let c3Height = alignDeviationReductor(waveH.scrollPosition, waveH.outputHeightWave, waveH.c3);

      wave.setAttribute('d', 
      `M-0,${m1Height} 
      C230,${c1Height} 116,${c2Height} 500,${c3Height} L500.00,0.00 L0.00,0.00 Z`);
      posY = window.scrollY;
   } else if(posY > window.scrollY && window.scrollY <= 200){
      wave.setAttribute('d', 
      `M-0,${posY + window.scrollY} C230,180 116,24 500,${window.scrollY} L500.00,0.00 L0.00,0.00 Z`);
      posY = window.scrollY;
   }

 };
 