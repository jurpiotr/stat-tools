export class Table {
   constructor(content){
      this.content = content;
      this.isStart = false;
      this.scrollY;
      this.startMouseY;
      this.diffPositionTabs;
      this.activeTab;
      this.siblingTab;
      [...this.tabs] = document.getElementsByClassName('table__row');
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
      return this.activeTab.offsetTop - this.scrollY;
   }
   setTranslateY = () => {

      if(!this.siblingTab){return}
      this.siblingTab.style.transform = `translateY(${this.scrollY}px)`;
      this.activeTab.style.transform = `translateY(${-this.scrollY}px)`;
   }
   alignTab = () => {
      this.tabs.forEach((t) => {
         if(t !== this.activeTab || this.siblingTab)
         this.resetStyles(t);
      });
   }
   transformTab = () => {  
      this.scrollY <= 0 ? 
         this.activeTab.parentElement.insertBefore(this.siblingTab,this.activeTab):
         this.activeTab.parentElement.insertBefore(this.activeTab,this.siblingTab);
      this.scrollY = 0;
      this.alignTab();
      this.startMouseY = window.event.pageY;

   }
   resetStyles = (tab) => {
      console.log("reset")

      tab?.removeAttribute('style') || this.siblingTab?.removeAttribute('style');
      this.activeTab.removeAttribute('style');

   }
   move = () => {
      console.log("MOVE")
      this.siblingTab = this.scrollY <= 0 ? this.activeTab?.nextElementSibling : this.activeTab?.previousElementSibling;
      
      if(!this.isStart &&
         !this.activeTab?.classList.contains('table__active') &&
         !this.siblingTab){ return }
      this.scrollY = this.startMouseY - window.event.pageY;
      this.activeTab.innerText = `diff move: ${-1*this.scrollY + this.activeTab.offsetTop} + next elem: ${this.activeTab.nextElementSibling?.offsetTop}`;
      this.activeTab.style.zIndex = 1;
      this.diffPositionTabs = this.siblingTab?.offsetTop - this.activeTab.offsetTop;
      this.alignTab();
      this.setTranslateY();

      if(this.activeTab.nextElementSibling?.offsetTop <= this.getPosition()){
         this.transformTab();
      }

      if(this.activeTab.previousElementSibling?.offsetTop > this.getPosition()){
         this.transformTab();
         this.startMouseY = window.event.pageY;
      }

   }
   end = (e) => {

      
      console.log(Math.abs(this.diffPositionTabs/2) + ' ...' + Math.abs(this.scrollY));
      if(Math.abs(this.diffPositionTabs/2) < Math.abs(this.scrollY)){
         this.transformTab();
      } else {
         this.resetStyles();
      }

      e.classList.remove('table__active');
      this.activeTab = undefined;
      this.isStart = false;      
     }
   
}
