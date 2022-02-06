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
      e.classList.add('table__row--active');
      e.innerText = `e.offsetTop: ${e.offsetTop} + window.event.pageY: ${window.event.pageY} e.clientHeight: ${e.clientHeight}`;
   }
   getPosition = () => {
      return this.activeTab.offsetTop - this.scrollY;
   }
   setTranslateY = () => {

      if(!this.siblingTab){return}
      this.siblingTab.style.transform = `translateY(${this.scrollY}px)`;
      this.activeTab.style.transform = `translateY(${-this.scrollY}px)`;
      console.log(`${this.scrollY} ... ${this.activeTab.style.transform} getPos: ${this.getPosition()} pageY: ${window.event.pageY}`)
   }
   alignTab = () => {
      // function that aligns the tabs position in the Table 
      [
       this.activeTab?.nextElementSibling, 
       this.activeTab?.nextElementSibling?.nextElementSibling,
       this.activeTab?.previousElementSibling,
       this.activeTab?.previousElementSibling?.previousElementSibling].forEach((t) => {
         this.resetStyles(t);
      });
   }
   transformTab = () => {  
      this.scrollY <= 0 ? 
         this.activeTab.parentElement.insertBefore(this.siblingTab,this.activeTab):
         this.activeTab.parentElement.insertBefore(this.activeTab,this.siblingTab);
      
      this.alignTab();
      this.startMouseY = window.event.pageY;

   }
   resetStyles = (tab) => {

      tab?.removeAttribute('style');
      this.activeTab.removeAttribute('style');

   }
   move = () => {
      this.siblingTab = this.scrollY <= 0 ? this.activeTab?.nextElementSibling : this.activeTab?.previousElementSibling;
      
      if(!this.isStart &&
         !this.activeTab?.classList.contains('table__row--active') &&
         !this.siblingTab){ return }
      this.scrollY = this.startMouseY - window.event.pageY;
      this.activeTab.innerText = `diff move: ${-1*this.scrollY + this.activeTab.offsetTop} + next elem: ${this.activeTab.nextElementSibling?.offsetTop}`;
      this.diffPositionTabs = this.siblingTab?.offsetTop - this.activeTab.offsetTop;
      this.alignTab();
      this.setTranslateY();

      if(this.activeTab.nextElementSibling?.offsetTop <= this.getPosition() ||
         this.activeTab.previousElementSibling?.offsetTop > this.getPosition()
      ){
         this.transformTab();
         this.startMouseY = window.event.pageY;
      }

   }
   end = (e) => {
      Math.abs(this.diffPositionTabs/2) < Math.abs(this.scrollY) ? this.transformTab() : this.resetStyles(this.siblingTab);

      e.classList.remove('table__row--active');
      this.activeTab = undefined;
      this.isStart = false;      
     }
   
}
