export class Wave {
   constructor(svgElem, scrollPosition, originHeight, outputHeight){
      this.svgElem = svgElem;
      this.waveElem = svgElem.getElementsByTagName('path')[0];
      this.scrollPosition = scrollPosition;
      this.originHeight = originHeight;
      this.outputHeight = outputHeight;
      this.originHeights = {
         svg: 100,
         m: 140,
         c1: 300,
         c2: 64,
         c3: 160
      }
      this.currentHeights = {
         svg: 0,
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
            // if searched variable 'height' is relative to the svg origin height then the given value must be proportionally smaller for entered output height (e.g. devided by 8)
            this.currentHeights[height] = this.alignDeviationReductor(this.scrollPosition, height==='svg'?this.outputHeight/8:this.outputHeight, this.originHeights[height]);
         }
         this.waveElem.setAttribute('d', 
         `M-0,${this.currentHeights.m} 
         C230,${this.currentHeights.c1} 116,${this.currentHeights.c2} 500,${this.currentHeights.c3} 
         L500.00,0.00 L0.00,0.00 Z`);

         // changing height for SVG element
         this.svgElem.style.height = `${this.currentHeights.svg}%`;

      } 
      if (window.scrollY > 200 && this.originHeights != this.outputHeight){
         this.waveElem.setAttribute('d', 
         `M-0,${this.outputHeight} 
         C230,${this.outputHeight} 116,${this.outputHeight} 500,${this.outputHeight} 
         L500.00,0.00 L0.00,0.00 Z`);
      }
   }
}
