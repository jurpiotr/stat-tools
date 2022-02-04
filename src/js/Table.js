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
   }

   start = (e) => {
      this.isStart = true;
      this.activeTab = e;
      console.log
      this.startY = e.offsetTop;
      this.mouseY = window.event.pageY;
      e.classList.add('table__active');
      e.innerText = `e.offsetTop: ${e.offsetTop} + window.event.pageY: ${window.event.pageY} e.clientHeight: ${e.clientHeight}`;
   }
   move = (e) => {
      if(!this.isStart && !this.activeTab?.classList.contains('table__active')){ return }
      this.activeTab.style.zIndex = 1;
      let mouseMoved = this.mouseY - window.event.pageY;
      this.activeTab.style.transform = `translateY(${-mouseMoved}px)`;
      this.activeTab.innerText = `diff move: ${-1*mouseMoved + this.activeTab.offsetTop} + next elem: ${this.activeTab.nextElementSibling.offsetTop}`;
     
      if(-1*mouseMoved + this.activeTab.offsetTop > this.activeTab.nextElementSibling.offsetTop){
         this.activeTab.classList.add('table__row--active')
      }
   }
   end = (e) => {
      this.isStart = false;
      e.style.zIndex = 0;
      e.classList.remove('table__active');
      this.activeTab = undefined;
     }
   
}
