export class Table {
   constructor(content){
      this.content = content;
      this.isStart = false;
      this.startY;
      this.scrollY;
      this.mouseY;
      this.activeTab;
   }
   show = () => {
      console.log(this.content)
      this.content.classList.add('table');
      // this.content.innerHTML = `
      // <p>sdfsdf</p>
      // `
      
   }
   start = (e) => {
      this.isStart = true;
      this.activeTab = e;
      this.startY = e.offsetTop;
      this.mouseY = window.event.pageY;
      e.classList.add('table__active');
      e.innerText = `${this.isStart} +++ ${this.startY} + ${window.event.pageY}`;
      // next add e.clientHeight + e.offsetTop for element 
   }
   move = (e) => {
      
         if(!this.isStart && !this.activeTab.classList.contains('table__active')){ return }

         this.activeTab.style.zIndex = 2;
         console.log(this.isStart)
         let mouseMove = this.mouseY - window.event.pageY;
         this.activeTab.innerText = `${this.isStart} +++ ${this.startY} + ${mouseMove}`;
         this.activeTab.style.transform = `translateY(${-mouseMove}px)`;
         console.log(mouseMove)
   }
   end = (e) => {
      this.isStart = false;
      e.style.zIndex = 0;
      e.classList.remove('table__active');
      this.activeTab = undefined;
     }
   
}
