export class Table {
   constructor(content){
      this.content = content;
      this.isStart = false;
      this.scrollY;
      this.startMouseY;
      this.diffPositionTabs;
      this.activeTab;
   }
   show = () => {
      console.log(this.content)
      this.content.classList.add('table');
   }

   start = (e) => {
      this.isStart = true;
      this.activeTab = e;
      this.startMouseY = window.event.pageY;
      e.classList.add('table__active');
      e.innerText = `e.offsetTop: ${e.offsetTop} + window.event.pageY: ${window.event.pageY} e.clientHeight: ${e.clientHeight}`;
   }
   getPosition = () => {
      const pos = this.activeTab.offsetTop - this.scrollY;
      return pos;
   }
   setTranslateY = () => {
      return this.activeTab.nextElementSibling.style.transform = `translateY(${this.scrollY}px)`;
   }
   move = (e) => {
      if(!this.isStart &&
         !this.activeTab?.classList.contains('table__active') ||
         !this.activeTab.nextElementSibling){ return }
      this.activeTab.style.zIndex = 1;
      this.scrollY = this.startMouseY - window.event.pageY;
      this.activeTab.style.transform = `translateY(${-this.scrollY}px)`;
      this.activeTab.innerText = `diff move: ${-1*this.scrollY + this.activeTab.offsetTop} + next elem: ${this.activeTab.nextElementSibling?.offsetTop}`;
      this.diffPositionTabs = this.activeTab.nextElementSibling?.offsetTop - this.activeTab.offsetTop

      if(this.scrollY < 0){

        this.setTranslateY();
      } 
      if(this.activeTab.nextElementSibling?.offsetTop <= this.getPosition()){
         this.scrollY = 0;
         this.activeTab.nextElementSibling.classList.add('table__row--active');

         this.activeTab.nextElementSibling.style.removeProperty('transform');
         this.activeTab.parentElement.insertBefore(this.activeTab.nextElementSibling,this.activeTab);
         this.activeTab.style.transform = `translateY(${ this.scrollY}px)`;
         this.startMouseY = window.event.pageY;
      }

      if( this.scrollY > 0){
         console.log("plus")
      }
      if(this.diffPositionTabs/2 < - this.scrollY){
         this.activeTab.classList.add('table__row--active')
      }
   }
   end = (e) => {
      this.isStart = false;
      e.style.zIndex = 0;
      e.classList.remove('table__active');
      this.activeTab = undefined;
      const result = () => {
         const rows = document.querySelectorAll('.table__row');
         console.log(rows)
         let arr = [];
         rows.forEach((row) => {
            arr.push(row.offsetTop)
         })
         console.log(arr)
      }
      result();
     }
   
}
