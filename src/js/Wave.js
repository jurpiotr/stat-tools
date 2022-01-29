export class Wave {
   constructor(waveElem, scrollPosition, originHeight, outputHeight){
      this.waveElem = waveElem;
      this.scrollPosition = scrollPosition;
      this.originHeight = originHeight;
      this.outputHeight = outputHeight;
      this.originHeights = {
         m: 140,
         c1: 300,
         c2: 64,
         c3: 160
      }
      this.currentHeights = {
         m: 0,
         c1: 0,
         c2: 0,
         c3: 0
      }
   }

   alignDeviationReductor = (pos, output, origin) => {
      const result = origin - window.scrollY/(pos/(origin-output));
         return result;
   }
   scrollToTop = () => {
      if(window.scrollY <= 200) {
         for (const height in this.originHeights) {
            this.currentHeights[height] = this.alignDeviationReductor(this.scrollPosition, this.outputHeight, this.originHeights[height]);
            console.log( this.currentHeights[height])
         }

         this.waveElem.setAttribute('d', 
         `M-0,${this.currentHeights.m} 
         C230,${this.currentHeights.c1} 116,${this.currentHeights.c2} 500,${this.currentHeights.c3} L500.00,0.00 L0.00,0.00 Z`);
      } 
      if (window.scrollY > 200 && this.originHeights != this.outputHeight){
         this.waveElem.setAttribute('d', 
         `M-0,${this.outputHeight} 
         C230,${this.outputHeight} 116,${this.outputHeight} 500,${this.outputHeight} L500.00,0.00 L0.00,0.00 Z`);
      
      }
   }
}
